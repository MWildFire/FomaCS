// TCP vs UDP packet animation
// Pedagogy: side-by-side comparison.
//   TCP — connection-oriented; retransmits lost packets (up to MAX_RETRIES),
//   then delivers them IN ORDER (head-of-line blocking).
//   UDP — fire-and-forget; lost packets just disappear.
(function () {
  const canvas = document.getElementById('proto-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const startBtn = document.getElementById('proto-start');
  const resetBtn = document.getElementById('proto-reset');
  const lossInput = document.getElementById('proto-loss');
  const lossVal = document.getElementById('proto-loss-val');
  const speedInput = document.getElementById('proto-speed');

  const NUM_PACKETS = 12;
  const MAX_RETRIES = 5;       // give up after this many retries (prevents infinite loop at 100% loss)
  const R = 13;                // packet half-size
  const X_SENDER = 80, X_RECEIVER = W - 80;
  const LANES = {
    tcp: { y: 90,  label: 'TCP', color: '#0ea5e9', arrivalY: 175 },
    udp: { y: 280, label: 'UDP', color: '#f59e0b', arrivalY: 365 }
  };

  let running = false;
  let frame = 0;
  let packets = [];
  let stats;
  let nextSeq;
  let lastSendFrame;
  let scheduledRetr;
  let retries; // seq -> retry count for TCP
  let tcpArrivalOrder; // sequence in which TCP packets reached receiver (regardless of seq)
  let udpArrivalOrder; // same for UDP

  function initState() {
    packets = [];
    stats = {
      tcp: { sent: 0, recv: 0, retr: 0, lost: 0, delivered: new Set(), givenUp: new Set() },
      udp: { sent: 0, recv: 0, retr: 0, lost: 0, delivered: new Set(), givenUp: new Set() }
    };
    nextSeq = { tcp: 0, udp: 0 };
    lastSendFrame = { tcp: -100, udp: -100 };
    scheduledRetr = [];
    retries = {};
    tcpArrivalOrder = [];
    udpArrivalOrder = [];
    frame = 0;
    updateStats();
  }

  function lossRate() { return parseInt(lossInput.value) / 100; }
  function speedMul() { return parseInt(speedInput.value); }
  function sendInterval() { return Math.max(12, 40 - speedMul() * 6); }

  function spawn(protocol, seqOverride = null, retr = false) {
    const seq = seqOverride !== null ? seqOverride : nextSeq[protocol]++;
    const lane = LANES[protocol];
    const willLose = Math.random() < lossRate();
    packets.push({
      protocol, seq, retr,
      x: X_SENDER + 20, y: lane.y,
      lost: willLose,
      lostAt: willLose ? (X_SENDER + 60 + Math.random() * (X_RECEIVER - X_SENDER - 120)) : null,
      counted: false,
      done: false,
      arrivalFrame: null
    });
    if (!retr) stats[protocol].sent++;
  }

  function tick() {
    frame++;
    const dx = 1.5 + speedMul() * 0.45;
    const si = sendInterval();

    // Spawn first-time packets
    if (stats.tcp.sent < NUM_PACKETS && frame - lastSendFrame.tcp >= si) {
      spawn('tcp'); lastSendFrame.tcp = frame;
    }
    if (stats.udp.sent < NUM_PACKETS && frame - lastSendFrame.udp >= si) {
      spawn('udp'); lastSendFrame.udp = frame;
    }

    // Fire scheduled retransmissions
    for (let i = scheduledRetr.length - 1; i >= 0; i--) {
      if (frame >= scheduledRetr[i].fireAt) {
        spawn('tcp', scheduledRetr[i].seq, true);
        stats.tcp.retr++;
        scheduledRetr.splice(i, 1);
      }
    }

    // Move packets
    for (const p of packets) {
      if (p.done) continue;
      const lane = LANES[p.protocol];
      if (p.lost && p.x >= p.lostAt) {
        // Drop below the lane
        p.y += 4;
        if (p.y > lane.y + 60 && !p.counted) {
          p.counted = true;
          stats[p.protocol].lost++;
          if (p.protocol === 'tcp') {
            const r = (retries[p.seq] = (retries[p.seq] || 0) + 1);
            if (r <= MAX_RETRIES) {
              scheduledRetr.push({ seq: p.seq, fireAt: frame + 30 });
            } else {
              // Give up — TCP also has a retransmission limit in reality
              stats.tcp.givenUp.add(p.seq);
            }
          }
        }
        if (p.y > lane.y + 80) p.done = true;
      } else {
        p.x += dx;
        if (!p.lost && p.x >= X_RECEIVER && !p.counted) {
          if (!stats[p.protocol].delivered.has(p.seq)) {
            stats[p.protocol].delivered.add(p.seq);
            stats[p.protocol].recv++;
            (p.protocol === 'tcp' ? tcpArrivalOrder : udpArrivalOrder).push(p.seq);
          }
          p.counted = true;
          p.done = true;
          p.arrivalFrame = frame;
        }
      }
    }

    // Clean up: drop fully-finished packets after a brief delay so the X-mark shows
    packets = packets.filter(p => {
      if (!p.done) return true;
      if (p.lost) return false;
      return frame - p.arrivalFrame < 12;
    });

    updateStats();

    // Stop condition: every seq either delivered or given up; in-flight queue empty
    const tcpFinal = stats.tcp.delivered.size + stats.tcp.givenUp.size >= NUM_PACKETS;
    const udpFinal = stats.udp.delivered.size + stats.udp.lost >= NUM_PACKETS;
    if (tcpFinal && udpFinal && stats.tcp.sent >= NUM_PACKETS && stats.udp.sent >= NUM_PACKETS && scheduledRetr.length === 0 && packets.length === 0) {
      running = false;
      const lang = document.documentElement.getAttribute('data-lang') || 'en';
      startBtn.textContent = lang === 'ru' ? '⟲ Заново' : '⟲ Replay';
    }
  }

  function updateStats() {
    document.getElementById('tcp-recv').textContent = stats.tcp.recv + ' / ' + NUM_PACKETS;
    document.getElementById('tcp-retr').textContent = stats.tcp.retr;
    document.getElementById('udp-recv').textContent = stats.udp.recv + ' / ' + NUM_PACKETS;
    document.getElementById('udp-lost').textContent = stats.udp.lost;
  }

  function drawLane(lane) {
    const T = window.Theme;
    ctx.fillStyle = T.surface2;
    ctx.fillRect(50, lane.y - 30, W - 100, 60);
    ctx.strokeStyle = T.border;
    ctx.lineWidth = 1;
    ctx.strokeRect(50, lane.y - 30, W - 100, 60);

    // Sender
    ctx.fillStyle = lane.color;
    ctx.beginPath(); ctx.arc(X_SENDER, lane.y, 22, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.font = 'bold 11px ui-monospace'; ctx.textAlign = 'center';
    ctx.fillText('SRC', X_SENDER, lane.y + 4);

    // Receiver
    ctx.fillStyle = T.primary;
    ctx.beginPath(); ctx.arc(X_RECEIVER, lane.y, 22, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.fillText('DST', X_RECEIVER, lane.y + 4);

    // Protocol label
    ctx.fillStyle = lane.color; ctx.font = 'bold 16px system-ui'; ctx.textAlign = 'left';
    ctx.fillText(lane.label, 18, lane.y - 35);

    // Arrival rail backdrop
    ctx.fillStyle = T.surface;
    ctx.fillRect(50, lane.arrivalY, W - 100, 34);
    ctx.strokeStyle = T.border;
    ctx.strokeRect(50, lane.arrivalY, W - 100, 34);

    const lang = document.documentElement.getAttribute('data-lang') || 'en';
    ctx.font = '10px ui-monospace';
    ctx.fillStyle = T.textFaint;
    ctx.textAlign = 'left';
    ctx.fillText(lane.label === 'TCP'
      ? (lang === 'ru' ? 'Доставлено приложению (по порядку — head-of-line)' : 'Delivered to app (in-order — head-of-line)')
      : (lang === 'ru' ? 'Принято приложением (в порядке прихода — могут быть пропуски)' : 'Delivered (arrival order — gaps allowed)'),
      56, lane.arrivalY - 4);
  }

  // TCP rail: shows seq 0..NUM-1. Slot i is green ONLY if every seq 0..i has been delivered
  // (head-of-line blocking — buffered until in-order). After a give-up, slot is red.
  function drawTcpArrival() {
    const T = window.Theme;
    const lane = LANES.tcp;
    const slotW = (W - 140) / NUM_PACKETS;
    let contiguous = 0;
    while (contiguous < NUM_PACKETS && stats.tcp.delivered.has(contiguous)) contiguous++;
    for (let i = 0; i < NUM_PACKETS; i++) {
      const x = 70 + i * slotW + slotW / 2;
      const y = lane.arrivalY + 17;
      let color, fill;
      if (i < contiguous) { color = T.green; fill = T.green; }
      else if (stats.tcp.givenUp.has(i)) { color = T.red; fill = T.surface; }
      else if (stats.tcp.delivered.has(i)) { color = T.amber; fill = T.surface; }
      else { color = T.borderStrong; fill = T.border; }
      ctx.beginPath();
      ctx.fillStyle = fill;
      ctx.arc(x, y, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.stroke();
      ctx.fillStyle = i < contiguous ? '#fff' : (stats.tcp.givenUp.has(i) ? T.red : T.textMuted);
      ctx.font = 'bold 10px ui-monospace';
      ctx.textAlign = 'center';
      ctx.fillText(i, x, y + 3);
    }
  }

  // UDP rail: shows packets in their actual arrival order. Gaps are gaps.
  function drawUdpArrival() {
    const T = window.Theme;
    const lane = LANES.udp;
    const slotW = (W - 140) / NUM_PACKETS;
    for (let i = 0; i < NUM_PACKETS; i++) {
      const x = 70 + i * slotW + slotW / 2;
      const y = lane.arrivalY + 17;
      const seq = udpArrivalOrder[i];
      let color, fill;
      if (seq !== undefined) {
        const inOrder = (seq === i);
        color = inOrder ? T.green : T.amber;
        fill = color;
      } else {
        color = T.borderStrong; fill = T.border;
      }
      ctx.beginPath();
      ctx.fillStyle = fill;
      ctx.arc(x, y, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.stroke();
      if (seq !== undefined) {
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 10px ui-monospace';
        ctx.textAlign = 'center';
        ctx.fillText(seq, x, y + 3);
      } else {
        ctx.fillStyle = T.textFaint;
        ctx.font = '9px ui-monospace';
        ctx.textAlign = 'center';
        ctx.fillText('—', x, y + 3);
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    drawLane(LANES.tcp);
    drawLane(LANES.udp);

    // Packets in transit
    for (const p of packets) {
      const lane = LANES[p.protocol];
      let fill;
      if (p.lost && p.x >= p.lostAt - 1) fill = '#ef4444';
      else if (p.retr) fill = '#f59e0b';
      else fill = lane.color;

      ctx.fillStyle = fill;
      ctx.fillRect(p.x - R, p.y - R, 2 * R, 2 * R);

      ctx.fillStyle = 'white';
      ctx.font = 'bold 10px ui-monospace';
      ctx.textAlign = 'center';
      ctx.fillText(p.seq, p.x, p.y + 4);

      if (p.retr) {
        ctx.fillStyle = '#92400e';
        ctx.font = 'bold 8px system-ui';
        ctx.fillText('RTX', p.x, p.y - R - 4);
      }
      if (p.lost && p.x >= p.lostAt - 1) {
        ctx.strokeStyle = '#7f1d1d';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(p.x - R + 3, p.y - R + 3); ctx.lineTo(p.x + R - 3, p.y + R - 3);
        ctx.moveTo(p.x + R - 3, p.y - R + 3); ctx.lineTo(p.x - R + 3, p.y + R - 3);
        ctx.stroke();
      }
    }

    drawTcpArrival();
    drawUdpArrival();
  }

  // Driver — runs even if RAF is throttled (preview tool, hidden tabs)
  function loop() {
    if (running) tick();
    draw();
    requestAnimationFrame(loop);
  }
  // Backup driver in case RAF is suspended (background tabs, headless): catch up via setInterval
  setInterval(() => { if (running && document.hidden) tick(); }, 50);

  function start() {
    const tcpDone = stats.tcp.sent >= NUM_PACKETS &&
                    stats.tcp.delivered.size + stats.tcp.givenUp.size >= NUM_PACKETS;
    const udpDone = stats.udp.sent >= NUM_PACKETS &&
                    stats.udp.delivered.size + stats.udp.lost >= NUM_PACKETS;
    if (tcpDone && udpDone) initState();
    running = true;
    const lang = document.documentElement.getAttribute('data-lang') || 'en';
    startBtn.textContent = lang === 'ru' ? '⏸ Пауза' : '⏸ Pause';
  }
  function pause() {
    running = false;
    const lang = document.documentElement.getAttribute('data-lang') || 'en';
    startBtn.textContent = lang === 'ru' ? '▶ Старт' : '▶ Start';
  }

  startBtn.addEventListener('click', () => (running ? pause() : start()));
  resetBtn.addEventListener('click', () => { running = false; initState(); draw(); pause(); });
  lossInput.addEventListener('input', () => { lossVal.textContent = lossInput.value + '%'; });
  document.addEventListener('langchange', () => {
    if (!running) {
      const lang = document.documentElement.getAttribute('data-lang') || 'en';
      startBtn.textContent = lang === 'ru' ? '▶ Старт' : '▶ Start';
    }
  });
  document.addEventListener('themechange', draw);

  initState();
  draw();
  loop();
})();
