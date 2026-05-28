// A1.3.4 Polling vs Interrupt Handling
// Pedagogy: side-by-side timeline.
//   Polling — CPU runs a tight loop checking the device every POLL_INTERVAL_MS.
//   Most polls return nothing (wasted CPU). Event detection latency is 0..interval ms.
//   Interrupt — CPU is idle until the device raises an IRQ; CPU jumps to the handler
//   immediately. Near-zero detection latency; no wasted polling cycles.
(function () {
  const root = document.getElementById('polling-sim');
  if (!root) return;
  const canvas = document.getElementById('poll-canvas');
  const rateInput = document.getElementById('poll-rate');
  const playBtn = document.getElementById('poll-play');
  const resetBtn = document.getElementById('poll-reset');
  const cpuOut = document.getElementById('poll-stats-cpu');
  const latOut = document.getElementById('poll-stats-lat');
  const missedOut = document.getElementById('poll-stats-missed');
  if (!canvas || !rateInput || !playBtn || !resetBtn || !cpuOut || !latOut || !missedOut) return;

  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const SIM_DURATION_MS = 30000;
  const POLL_INTERVAL_MS = 100;
  const POLL_COST_MS = 4;
  const HANDLER_COST_MS = 12;
  const IRQ_OVERHEAD_MS = 1;
  const EVENT_LIFETIME_MS = 80;        // event must be detected within this window or it is missed
  const SIM_MS_PER_REAL_MS = 50 / 16;  // sim:wall speed
  const LANE_X = 110, LANE_W = W - LANE_X - 24;
  const LANES = {
    device: { y: 46,  h: 38, label: { en: 'Device',         ru: 'Устройство' } },
    poll:   { y: 116, h: 78, label: { en: 'Polling CPU',    ru: 'CPU (опрос)' } },
    irq:    { y: 226, h: 78, label: { en: 'Interrupt CPU',  ru: 'CPU (прерывания)' } }
  };
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let running = false, simTime = 0;
  let events, polls, irqHandlers;
  let nextEventTime, nextPollTime, lastPollSeen;
  let cpuPollMs, cpuPollWasteMs, cpuIrqMs;
  let prng;

  function mulberry32(seed) {
    return function () {
      seed = (seed + 0x6D2B79F5) | 0; let t = seed;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const lang = () => document.documentElement.getAttribute('data-lang') || 'en';
  const rate = () => Math.max(1, Math.min(20, parseInt(rateInput.value, 10) || 5));
  function scheduleNextEvent() {
    // Exponential inter-arrival with mean 1000/rate ms
    const u = Math.max(0.0001, prng());
    nextEventTime = simTime + (-Math.log(u) * (1000 / rate()));
  }
  function initState() {
    prng = mulberry32(0xC0DE);
    simTime = 0;
    events = []; polls = []; irqHandlers = [];
    nextPollTime = 0;
    lastPollSeen = -POLL_INTERVAL_MS;
    cpuPollMs = 0; cpuPollWasteMs = 0; cpuIrqMs = 0;
    scheduleNextEvent();
    updateStats();
  }

  function advance(dtMs) {
    let remaining = dtMs;
    while (remaining > 0 && simTime < SIM_DURATION_MS) {
      const next = Math.min(SIM_DURATION_MS, nextEventTime, nextPollTime, simTime + remaining);
      const step = next - simTime;
      simTime = next; remaining -= step;
      if (simTime >= nextPollTime && simTime <= SIM_DURATION_MS) { firePoll(simTime); nextPollTime += POLL_INTERVAL_MS; }
      if (simTime >= nextEventTime && simTime <= SIM_DURATION_MS) { fireEvent(simTime); scheduleNextEvent(); }
    }
    if (simTime >= SIM_DURATION_MS) {
      for (const ev of events) {
        if (!ev.handledPoll && !ev.missed && simTime - ev.t > EVENT_LIFETIME_MS) ev.missed = true;
      }
      running = false; updatePlayLabel();
    }
  }
  function firePoll(t) {
    let hit = false;
    for (const ev of events) {
      if (ev.handledPoll || ev.missed) continue;
      if (ev.t <= t && ev.t > lastPollSeen) {
        ev.handledPoll = true;
        ev.latPoll = t - ev.t;
        cpuPollMs += HANDLER_COST_MS;
        hit = true;
      } else if (!ev.handledPoll && t - ev.t > EVENT_LIFETIME_MS) {
        ev.missed = true;
      }
    }
    polls.push({ t, hit });
    cpuPollMs += POLL_COST_MS;
    if (!hit) cpuPollWasteMs += POLL_COST_MS;
    lastPollSeen = t;
  }
  function fireEvent(t) {
    const ev = { t, handledPoll: false, handledIrq: true, latPoll: null, latIrq: IRQ_OVERHEAD_MS, missed: false };
    irqHandlers.push({ start: t, end: t + HANDLER_COST_MS + IRQ_OVERHEAD_MS });
    cpuIrqMs += HANDLER_COST_MS + IRQ_OVERHEAD_MS;
    events.push(ev);
  }

  const tToX = t => LANE_X + (t / SIM_DURATION_MS) * LANE_W;

  function drawLaneBg(lane, customFill) {
    const T = window.Theme;
    ctx.fillStyle = customFill || T.surface2;
    ctx.fillRect(LANE_X, lane.y, LANE_W, lane.h);
    ctx.strokeStyle = T.border; ctx.lineWidth = 1;
    ctx.strokeRect(LANE_X, lane.y, LANE_W, lane.h);
    ctx.fillStyle = T.textMuted;
    ctx.font = 'bold 12px system-ui';
    ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
    ctx.fillText(lane.label[lang()], LANE_X - 10, lane.y + lane.h / 2);
  }
  function drawTimeAxis() {
    const T = window.Theme;
    ctx.strokeStyle = T.border; ctx.lineWidth = 1;
    ctx.fillStyle = T.textFaint; ctx.font = '10px ui-monospace';
    ctx.textAlign = 'center'; ctx.textBaseline = 'top';
    for (let s = 0; s <= 30; s += 5) {
      const x = tToX(s * 1000);
      ctx.beginPath(); ctx.moveTo(x, H - 20); ctx.lineTo(x, H - 14); ctx.stroke();
      ctx.fillText(s + 's', x, H - 12);
    }
    const px = tToX(Math.min(simTime, SIM_DURATION_MS));
    ctx.strokeStyle = T.accent; ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 3]);
    ctx.beginPath(); ctx.moveTo(px, LANES.device.y - 6); ctx.lineTo(px, LANES.irq.y + LANES.irq.h + 4); ctx.stroke();
    ctx.setLineDash([]);
  }
  function drawDevice() {
    drawLaneBg(LANES.device);
    const T = window.Theme;
    const y = LANES.device.y + LANES.device.h / 2;
    for (const ev of events) {
      const x = tToX(ev.t);
      ctx.fillStyle = ev.missed ? T.red : T.violet;
      ctx.beginPath();
      ctx.moveTo(x - 5, y - 7); ctx.lineTo(x + 5, y - 7); ctx.lineTo(x, y + 6);
      ctx.closePath(); ctx.fill();
    }
  }
  function drawPollingLane() {
    const T = window.Theme;
    const lane = LANES.poll;
    drawLaneBg(lane);
    const tickTop = lane.y + 6, tickBot = lane.y + lane.h / 2 - 2;
    const barTop = lane.y + lane.h / 2 + 2, barBot = lane.y + lane.h - 6;
    for (const p of polls) {
      const x = tToX(p.t);
      ctx.strokeStyle = p.hit ? T.green : T.accent;
      ctx.lineWidth = p.hit ? 1.8 : 0.8;
      ctx.globalAlpha = p.hit ? 1 : 0.55;
      ctx.beginPath(); ctx.moveTo(x, tickTop); ctx.lineTo(x, tickBot); ctx.stroke();
    }
    ctx.globalAlpha = 1;
    for (const ev of events) {
      const x0 = tToX(ev.t);
      if (ev.missed) {
        ctx.fillStyle = T.red; ctx.fillRect(x0 - 1, barTop, 2, barBot - barTop);
        ctx.fillStyle = T.red; ctx.font = 'bold 9px ui-monospace';
        ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
        ctx.fillText('X', x0, barBot + 1);
        continue;
      }
      if (!ev.handledPoll) continue;
      const x1 = tToX(ev.t + ev.latPoll);
      ctx.fillStyle = T.amber; ctx.globalAlpha = 0.7;
      ctx.fillRect(x0, barTop, Math.max(1, x1 - x0), (barBot - barTop) * 0.55);
      ctx.globalAlpha = 1;
      const xh1 = tToX(ev.t + ev.latPoll + HANDLER_COST_MS);
      ctx.fillStyle = T.green;
      ctx.fillRect(x1, barTop, Math.max(1, xh1 - x1), barBot - barTop);
    }
    legendChip(LANE_X + 4,   lane.y + 4, T.accent, lang() === 'ru' ? 'опрос (зря)' : 'poll (wasted)', 0.55);
    legendChip(LANE_X + 110, lane.y + 4, T.green,  lang() === 'ru' ? 'опрос (попал)' : 'poll (hit)', 1);
    legendChip(LANE_X + 220, lane.y + 4, T.amber,  lang() === 'ru' ? 'задержка' : 'latency', 0.7);
  }
  function drawIrqLane() {
    const T = window.Theme;
    const lane = LANES.irq;
    drawLaneBg(lane, T.surface);
    ctx.fillStyle = T.textFaint; ctx.font = '10px ui-monospace';
    ctx.textAlign = 'left'; ctx.textBaseline = 'top';
    ctx.fillText(lang() === 'ru' ? 'idle (CPU свободен)' : 'idle (CPU free)', LANE_X + 6, lane.y + 6);
    const top = lane.y + lane.h / 2 + 2, bot = lane.y + lane.h - 6;
    for (const h of irqHandlers) {
      const x0 = tToX(h.start), x1 = tToX(h.end);
      ctx.fillStyle = T.accent;
      ctx.fillRect(x0, top, Math.max(1.5, x1 - x0), bot - top);
    }
    legendChip(LANE_X + 4, lane.y + lane.h - 18, T.accent, lang() === 'ru' ? 'обработчик IRQ' : 'IRQ handler', 1);
  }
  function legendChip(x, y, color, label, alpha) {
    const T = window.Theme;
    ctx.globalAlpha = alpha; ctx.fillStyle = color; ctx.fillRect(x, y, 10, 10);
    ctx.globalAlpha = 1; ctx.fillStyle = T.textMuted;
    ctx.font = '10px system-ui'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    ctx.fillText(label, x + 14, y + 5);
  }
  function draw() {
    const T = window.Theme;
    ctx.fillStyle = T.bg; ctx.fillRect(0, 0, W, H);
    drawDevice(); drawPollingLane(); drawIrqLane(); drawTimeAxis();
  }

  function updateStats() {
    const handledPoll = events.filter(e => e.handledPoll).length;
    const missed = events.filter(e => e.missed).length;
    const sumPollLat = events.reduce((s, e) => s + (e.latPoll || 0), 0);
    const avgPollLat = handledPoll > 0 ? sumPollLat / handledPoll : 0;
    const elapsed = Math.max(1, simTime);
    const pollPct = Math.min(100, (cpuPollMs / elapsed) * 100);
    const wastePct = Math.min(100, (cpuPollWasteMs / elapsed) * 100);
    const irqPct = Math.min(100, (cpuIrqMs / elapsed) * 100);
    const isRu = lang() === 'ru';
    cpuOut.innerHTML = isRu
      ? `Опрос: <b>${pollPct.toFixed(1)}%</b> (зря ${wastePct.toFixed(1)}%) &nbsp; · &nbsp; IRQ: <b>${irqPct.toFixed(2)}%</b>`
      : `Polling: <b>${pollPct.toFixed(1)}%</b> (wasted ${wastePct.toFixed(1)}%) &nbsp; · &nbsp; IRQ: <b>${irqPct.toFixed(2)}%</b>`;
    latOut.innerHTML = isRu
      ? `Опрос: <b>${avgPollLat.toFixed(1)} мс</b> &nbsp; · &nbsp; IRQ: <b>${IRQ_OVERHEAD_MS.toFixed(1)} мс</b>`
      : `Polling: <b>${avgPollLat.toFixed(1)} ms</b> &nbsp; · &nbsp; IRQ: <b>${IRQ_OVERHEAD_MS.toFixed(1)} ms</b>`;
    missedOut.innerHTML = isRu
      ? `Опрос: <b>${missed}</b> &nbsp; · &nbsp; IRQ: <b>0</b> &nbsp; (всего событий ${events.length})`
      : `Polling: <b>${missed}</b> &nbsp; · &nbsp; IRQ: <b>0</b> &nbsp; (events ${events.length})`;
  }

  function updatePlayLabel() {
    const isRu = lang() === 'ru';
    if (running) playBtn.textContent = isRu ? '⏸ Пауза' : '⏸ Pause';
    else if (simTime >= SIM_DURATION_MS) playBtn.textContent = isRu ? '⟲ Заново' : '⟲ Replay';
    else playBtn.textContent = isRu ? '▶ Старт' : '▶ Start';
  }
  function refreshRateLabel() {
    const el = document.getElementById('poll-rate-val');
    if (el) el.textContent = rateInput.value + (lang() === 'ru' ? ' соб./с' : ' ev/s');
  }

  let lastFrameTs = 0;
  function loop(ts) {
    if (running) {
      const wallDt = Math.min(80, ts - lastFrameTs || 16);
      advance(wallDt * SIM_MS_PER_REAL_MS);
      updateStats();
    }
    lastFrameTs = ts;
    draw();
    requestAnimationFrame(loop);
  }
  setInterval(() => {
    if (running && document.hidden) { advance(150); updateStats(); }
  }, 100);

  function play() {
    if (simTime >= SIM_DURATION_MS) initState();
    if (reduceMotion) {
      while (simTime < SIM_DURATION_MS) advance(500);
      updateStats(); draw(); running = false; updatePlayLabel(); return;
    }
    running = true; updatePlayLabel();
  }
  function pause() { running = false; updatePlayLabel(); }
  function reset() { running = false; initState(); draw(); updatePlayLabel(); }

  playBtn.addEventListener('click', () => (running ? pause() : play()));
  resetBtn.addEventListener('click', reset);
  rateInput.addEventListener('input', () => {
    refreshRateLabel();
    if (running || simTime > 0) scheduleNextEvent();
  });
  document.addEventListener('themechange', draw);
  document.addEventListener('langchange', () => { updatePlayLabel(); updateStats(); refreshRateLabel(); draw(); });

  initState();
  draw();
  updatePlayLabel();
  refreshRateLabel();
  requestAnimationFrame(loop);
})();
