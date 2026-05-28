// A1.3.3 — CPU Scheduling algorithms: FCFS, Round-Robin, Priority, SJF
// Animated Gantt chart with editable process table + key metrics.
(function () {
  const root = document.getElementById('scheduling-sim');
  if (!root) return;

  const canvas       = root.querySelector('#sched-canvas');
  const algoSel      = root.querySelector('#sched-algo');
  const quantumInput = root.querySelector('#sched-quantum');
  const quantumWrap  = root.querySelector('#sched-quantum-wrap');
  const resetBtn     = root.querySelector('#sched-reset');
  const stepBtn      = root.querySelector('#sched-step');
  const runBtn       = root.querySelector('#sched-run');
  const addBtn       = root.querySelector('#sched-add');
  const tableEl      = root.querySelector('#sched-table');
  const avgWaitEl    = root.querySelector('#sched-avg-wait');
  const avgTatEl     = root.querySelector('#sched-avg-tat');
  const utilEl       = root.querySelector('#sched-util');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const PALETTE = ['accent', 'green', 'violet', 'amber', 'red'];
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let processes = [];     // {name, arrival, burst, priority}
  let timeline  = [];     // {pid, start, end}
  let currentTime = 0;
  let runTimer = null;

  function L() { return document.documentElement.getAttribute('data-lang') === 'ru' ? 'ru' : 'en'; }
  function tr(en, ru) { return L() === 'ru' ? ru : en; }
  function colorOf(i) { return window.Theme[PALETTE[i % PALETTE.length]]; }

  function defaultProcesses() {
    return [
      { name: 'P1', arrival: 0, burst: 6, priority: 3 },
      { name: 'P2', arrival: 1, burst: 4, priority: 1 },
      { name: 'P3', arrival: 2, burst: 7, priority: 4 },
      { name: 'P4', arrival: 3, burst: 3, priority: 2 },
      { name: 'P5', arrival: 5, burst: 5, priority: 5 }
    ];
  }

  // ---- Scheduling: compute the whole timeline up front so Step can replay it ----
  function cloneProcs() { return processes.map(p => ({ ...p, remaining: p.burst })); }

  function pickByMetric(ready, key) {
    ready.sort((a, b) => a[key] - b[key] || a.arrival - b.arrival);
    return ready[0];
  }

  function scheduleNonPreemptive(metric /* 'burst' | 'priority' | null=FCFS */) {
    const ps = cloneProcs();
    const done = new Set();
    const out = [];
    let t = 0;
    while (done.size < ps.length) {
      const ready = ps.filter(p => !done.has(p.name) && p.arrival <= t);
      if (ready.length === 0) { t++; continue; }
      const pick = metric ? pickByMetric(ready, metric)
                          : ready.sort((a, b) => a.arrival - b.arrival)[0];
      out.push({ pid: pick.name, start: t, end: t + pick.burst });
      t += pick.burst;
      done.add(pick.name);
    }
    return out;
  }

  function scheduleRR() {
    const q = Math.max(1, parseInt(quantumInput.value, 10) || 2);
    const ps = cloneProcs().sort((a, b) => a.arrival - b.arrival);
    const queue = [];
    const out = [];
    let t = 0, i = 0;
    while (queue.length > 0 || i < ps.length) {
      while (i < ps.length && ps[i].arrival <= t) queue.push(ps[i++]);
      if (queue.length === 0) { t = ps[i].arrival; continue; }
      const p = queue.shift();
      const slice = Math.min(q, p.remaining);
      const last = out[out.length - 1];
      if (last && last.pid === p.name && last.end === t) last.end = t + slice;
      else out.push({ pid: p.name, start: t, end: t + slice });
      t += slice;
      p.remaining -= slice;
      while (i < ps.length && ps[i].arrival <= t) queue.push(ps[i++]);
      if (p.remaining > 0) queue.push(p);
    }
    return out;
  }

  function schedule() {
    const algo = algoSel.value;
    if      (algo === 'sjf')      timeline = scheduleNonPreemptive('burst');
    else if (algo === 'priority') timeline = scheduleNonPreemptive('priority');
    else if (algo === 'rr')       timeline = scheduleRR();
    else                          timeline = scheduleNonPreemptive(null);  // FCFS
  }

  // ---- Metrics (only counts processes whose total work has completed by `limit`) ----
  function computeMetrics(limit) {
    if (!processes.length || !timeline.length) return null;
    const totalEnd = timeline[timeline.length - 1].end;
    const horizon = limit === undefined ? totalEnd : Math.min(limit, totalEnd);
    const ran = {}, finish = {};
    for (const s of timeline) {
      const start = s.start, end = Math.min(s.end, horizon);
      if (start >= horizon) break;
      ran[s.pid] = (ran[s.pid] || 0) + (end - start);
      finish[s.pid] = end;
    }
    let waitSum = 0, tatSum = 0, completed = 0;
    for (const p of processes) {
      if (ran[p.name] !== p.burst) continue;
      const tat = finish[p.name] - p.arrival;
      tatSum += tat; waitSum += tat - p.burst; completed++;
    }
    const busy = Object.values(ran).reduce((a, b) => a + b, 0);
    return {
      avgWait: completed ? waitSum / completed : 0,
      avgTAT:  completed ? tatSum  / completed : 0,
      util:    horizon ? (busy / horizon) * 100 : 0,
      completed
    };
  }

  function updateStats() {
    const m = computeMetrics(currentTime > 0 ? currentTime : undefined);
    if (!m || m.completed === 0) {
      avgWaitEl.textContent = '—';
      avgTatEl.textContent  = '—';
      utilEl.textContent    = currentTime > 0 && m ? m.util.toFixed(1) + '%' : '—';
      return;
    }
    avgWaitEl.textContent = m.avgWait.toFixed(2);
    avgTatEl.textContent  = m.avgTAT.toFixed(2);
    utilEl.textContent    = m.util.toFixed(1) + '%';
  }

  // ---- Drawing ----
  function draw() {
    const T = window.Theme;
    ctx.clearRect(0, 0, W, H);
    const padX = 50, barY = 80, barH = 80;
    const total = timeline.length ? timeline[timeline.length - 1].end : 10;
    const unit = (W - padX * 2) / Math.max(total, 1);

    ctx.fillStyle = T.textMuted;
    ctx.font = 'bold 13px system-ui';
    ctx.textAlign = 'left';
    ctx.fillText(tr('Gantt chart — algorithm: ', 'Диаграмма Ганта — алгоритм: ') + algoSel.value.toUpperCase(), padX, 30);

    // Background track
    ctx.fillStyle = T.surface2;
    ctx.fillRect(padX, barY, W - padX * 2, barH);
    ctx.strokeStyle = T.border;
    ctx.lineWidth = 1.2;
    ctx.strokeRect(padX, barY, W - padX * 2, barH);

    // Executed slices up to currentTime
    for (const s of timeline) {
      if (s.start >= currentTime) break;
      const sliceEnd = Math.min(s.end, currentTime);
      const x = padX + s.start * unit;
      const w = (sliceEnd - s.start) * unit;
      const idx = processes.findIndex(p => p.name === s.pid);
      ctx.fillStyle = colorOf(idx >= 0 ? idx : 0);
      ctx.fillRect(x, barY, w, barH);
      ctx.strokeStyle = T.surface;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(x, barY, w, barH);
      if (w > 24) {
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 13px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText(s.pid, x + w / 2, barY + barH / 2 + 5);
      }
    }

    // Tick axis
    ctx.strokeStyle = T.border;
    ctx.fillStyle = T.textFaint;
    ctx.font = '11px ui-monospace';
    ctx.textAlign = 'center';
    const stepSize = total > 40 ? 5 : (total > 20 ? 2 : 1);
    for (let t = 0; t <= total; t += stepSize) {
      const x = padX + t * unit;
      ctx.beginPath();
      ctx.moveTo(x, barY + barH); ctx.lineTo(x, barY + barH + 6); ctx.stroke();
      ctx.fillText(String(t), x, barY + barH + 20);
    }

    // Arrival markers
    processes.forEach((p, i) => {
      const x = padX + p.arrival * unit;
      ctx.fillStyle = colorOf(i);
      ctx.beginPath();
      ctx.moveTo(x, barY - 10);
      ctx.lineTo(x - 5, barY - 2);
      ctx.lineTo(x + 5, barY - 2);
      ctx.closePath();
      ctx.fill();
    });

    // Cursor for current time
    if (currentTime > 0 && currentTime <= total) {
      const x = padX + currentTime * unit;
      ctx.strokeStyle = T.red;
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(x, 45); ctx.lineTo(x, barY + barH + 10); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = T.red;
      ctx.font = 'bold 11px ui-monospace';
      ctx.fillText('t=' + currentTime, x, 42);
    }

    // Legend
    ctx.textAlign = 'left';
    ctx.font = '11px system-ui';
    let lx = padX;
    const ly = H - 20;
    processes.forEach((p, i) => {
      ctx.fillStyle = colorOf(i);
      ctx.fillRect(lx, ly - 8, 12, 12);
      ctx.fillStyle = T.textMuted;
      ctx.fillText(p.name, lx + 16, ly + 2);
      lx += 60;
    });

    if (processes.length === 0) {
      ctx.fillStyle = T.textFaint;
      ctx.font = '14px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText(tr('Add processes to begin.', 'Добавьте процессы, чтобы начать.'), W / 2, H / 2);
    }
  }

  // ---- Table ----
  function renderTable() {
    const headers = [tr('Process', 'Процесс'), tr('Arrival', 'Приход'),
                     tr('Burst', 'Длит.'), tr('Priority', 'Приоритет'), ''];
    let html = '<table class="sched-table"><thead><tr>';
    headers.forEach(h => { html += '<th>' + h + '</th>'; });
    html += '</tr></thead><tbody>';
    processes.forEach((p, i) => {
      html += '<tr>'
        + '<td><span class="sched-dot" style="background:' + colorOf(i) + '"></span>' + p.name + '</td>'
        + '<td><input type="number" min="0" max="50" value="' + p.arrival  + '" data-idx="' + i + '" data-field="arrival"  class="sched-input"></td>'
        + '<td><input type="number" min="1" max="20" value="' + p.burst    + '" data-idx="' + i + '" data-field="burst"    class="sched-input"></td>'
        + '<td><input type="number" min="1" max="9"  value="' + p.priority + '" data-idx="' + i + '" data-field="priority" class="sched-input"></td>'
        + '<td><button type="button" class="sched-del" data-idx="' + i + '" aria-label="' + tr('Delete', 'Удалить') + '">×</button></td>'
        + '</tr>';
    });
    html += '</tbody></table>';
    tableEl.innerHTML = html;

    tableEl.querySelectorAll('input.sched-input').forEach(inp => {
      inp.addEventListener('change', (e) => {
        const idx = parseInt(e.target.dataset.idx, 10);
        const field = e.target.dataset.field;
        const v = parseInt(e.target.value, 10);
        if (!processes[idx] || isNaN(v)) return;
        processes[idx][field] = Math.max(field === 'arrival' ? 0 : 1, v);
        reset();
      });
    });
    tableEl.querySelectorAll('button.sched-del').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.dataset.idx, 10);
        processes.splice(idx, 1);
        reset();
      });
    });
  }

  // ---- Controls ----
  function reset() {
    if (runTimer) { clearInterval(runTimer); runTimer = null; setRunLabel(false); }
    currentTime = 0;
    schedule();
    renderTable();
    draw();
    updateStats();
  }

  function step() {
    if (timeline.length === 0) return false;
    const totalEnd = timeline[timeline.length - 1].end;
    if (currentTime >= totalEnd) return false;
    currentTime = Math.min(totalEnd, currentTime + 1);
    draw();
    updateStats();
    return currentTime < totalEnd;
  }

  function setRunLabel(running) {
    runBtn.innerHTML = running
      ? '<span class="lang-en-inline">⏹ Stop</span><span class="lang-ru-inline">⏹ Стоп</span>'
      : '<span class="lang-en-inline">⏩ Run fast</span><span class="lang-ru-inline">⏩ Авто</span>';
  }

  function updateQuantumVisibility() {
    if (!quantumWrap) return;
    quantumWrap.style.display = algoSel.value === 'rr' ? '' : 'none';
  }

  function addRandom() {
    const used = new Set(processes.map(p => p.name));
    let n = 1; while (used.has('P' + n)) n++;
    processes.push({
      name: 'P' + n,
      arrival: Math.floor(Math.random() * 8),
      burst:    1 + Math.floor(Math.random() * 8),
      priority: 1 + Math.floor(Math.random() * 9)
    });
    reset();
  }

  algoSel.addEventListener('change', () => { updateQuantumVisibility(); reset(); });
  if (quantumInput) quantumInput.addEventListener('input', reset);
  resetBtn.addEventListener('click', reset);
  stepBtn.addEventListener('click', step);
  runBtn.addEventListener('click', () => {
    if (runTimer) { clearInterval(runTimer); runTimer = null; setRunLabel(false); return; }
    if (!timeline.length) return;
    if (currentTime >= timeline[timeline.length - 1].end) currentTime = 0;
    if (reduceMotion) { step(); return; }  // honour user preference: single step only
    setRunLabel(true);
    runTimer = setInterval(() => {
      if (!step()) { clearInterval(runTimer); runTimer = null; setRunLabel(false); }
    }, 220);
  });
  addBtn.addEventListener('click', addRandom);
  document.addEventListener('themechange', draw);
  document.addEventListener('langchange', () => { renderTable(); setRunLabel(!!runTimer); draw(); });

  // ---- Init ----
  processes = defaultProcesses();
  updateQuantumVisibility();
  setRunLabel(false);
  reset();
})();
