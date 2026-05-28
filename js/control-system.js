// A1.3.6 HL — Control Systems: open-loop vs closed-loop thermostat sim.
(function () {
  const root = document.getElementById('control-sim');
  if (!root) return;
  const canvas = document.getElementById('ctrl-canvas');
  const modeSel = document.getElementById('ctrl-mode');
  const targetInput = document.getElementById('ctrl-target');
  const ambientInput = document.getElementById('ctrl-ambient');
  const disturbBtn = document.getElementById('ctrl-disturb');
  const speedSel = document.getElementById('ctrl-speed');
  const playBtn = document.getElementById('ctrl-play');
  const resetBtn = document.getElementById('ctrl-reset');
  const devEl = document.getElementById('ctrl-stats-dev');
  const energyEl = document.getElementById('ctrl-stats-energy');
  if (!canvas || !modeSel || !targetInput || !ambientInput || !disturbBtn ||
      !speedSel || !playBtn || !resetBtn || !devEl || !energyEl) return;

  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const SCENE_W = 360;
  const CH = { l: SCENE_W + 60, r: 24, t: 28, b: 44 };

  // T_END = 60 s simulated; DT physics step; HEATER_POWER = °C/s gross heat;
  // COUPLE = wall loss; HYSTERESIS = closed-loop deadband; OL_DUTY_SEC = open-loop ON-time.
  const T_END = 60, DT = 0.1, HEATER_POWER = 8, COUPLE = 0.06;
  const HYSTERESIS = 0.25, OL_DUTY_SEC = 30, Y_MIN = -10, Y_MAX = 35;

  const L = {
    en: { time: 'Time (s)', temp: 'Temperature (°C)', target: 'Target', actual: 'Room',
      ambient: 'Outside', heaterOn: 'Heater ON', heaterOff: 'Heater OFF',
      window: 'Window OPEN — heat leaking', pause: 'Pause', play: 'Play',
      disturb: 'Open window', disturbActive: 'Close window',
      finished: 'Run finished — press Reset' },
    ru: { time: 'Время (с)', temp: 'Температура (°C)', target: 'Цель', actual: 'Комната',
      ambient: 'Снаружи', heaterOn: 'Нагрев ВКЛ', heaterOff: 'Нагрев ВЫКЛ',
      window: 'Окно ОТКРЫТО — утечка тепла', pause: 'Пауза', play: 'Старт',
      disturb: 'Открыть окно', disturbActive: 'Закрыть окно',
      finished: 'Симуляция завершена — нажми Сброс' },
  };
  const lang = () => L[document.documentElement.getAttribute('data-lang') || 'en'] || L.en;

  let series = [], t = 0, room = 21, heaterOn = false, disturbance = false;
  let playing = true, speed = 1, lastFrame = 0, energyOnSec = 0, devSum = 0;
  let devCount = 0, rafHandle = null, visible = false;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function reset() {
    t = 0; series = []; heaterOn = false; disturbance = false;
    energyOnSec = 0; devSum = 0; devCount = 0; playing = true;
    disturbBtn.classList.remove('active');
    room = parseFloat(ambientInput.value) + 16;
    syncPlayLabel(); syncDisturbLabel(); draw();
  }
  function syncPlayLabel() {
    playBtn.textContent = playing ? lang().pause : lang().play;
    playBtn.setAttribute('aria-pressed', String(!playing));
  }
  function syncDisturbLabel() {
    disturbBtn.textContent = disturbance ? lang().disturbActive : lang().disturb;
  }

  function step() {
    const target = parseFloat(targetInput.value);
    const ambient = parseFloat(ambientInput.value);
    if (modeSel.value === 'closed') {
      // Bang-bang controller (typical bimetallic thermostat)
      if (room < target - HYSTERESIS) heaterOn = true;
      else if (room > target + HYSTERESIS) heaterOn = false;
    } else {
      // Open-loop: dumb timer — ignores room temperature
      heaterOn = (t % 60) < OL_DUTY_SEC;
    }
    const ambEff = ambient - (disturbance ? 5 : 0);
    const heatIn = heaterOn ? HEATER_POWER : 0;
    const loss = COUPLE * (room - ambEff);
    const windowLoss = disturbance ? 0.18 * (room - ambEff) : 0;
    room += (heatIn - loss - windowLoss) * DT;
    if (heaterOn) energyOnSec += DT;
    devSum += Math.abs(room - target); devCount++;
    series.push({ t, room, on: heaterOn, disturb: disturbance });
    t += DT;
    if (t >= T_END) { playing = false; syncPlayLabel(); }
  }

  function tick(now) {
    rafHandle = null;
    if (!visible || document.hidden) return;
    if (!playing) { draw(); return; }
    const dt = lastFrame ? Math.min(0.1, (now - lastFrame) / 1000) : 1 / 60;
    lastFrame = now;
    let budget = dt * speed, steps = 0;
    while (budget >= DT && t < T_END && steps < 200) { step(); budget -= DT; steps++; }
    draw();
    if (!reduceMotion && playing && t < T_END) rafHandle = requestAnimationFrame(tick);
  }
  function startLoop() {
    if (reduceMotion) { draw(); return; }
    if (rafHandle == null && visible && !document.hidden && playing && t < T_END) {
      lastFrame = 0; rafHandle = requestAnimationFrame(tick);
    }
  }
  function stopLoop() {
    if (rafHandle != null) { cancelAnimationFrame(rafHandle); rafHandle = null; }
  }

  const sx = (tt) => CH.l + (tt / T_END) * (W - CH.l - CH.r);
  const sy = (yy) => H - CH.b - ((yy - Y_MIN) / (Y_MAX - Y_MIN)) * (H - CH.t - CH.b);

  function drawScene() {
    const T = window.Theme, LL = lang();
    const target = parseFloat(targetInput.value);
    const ambient = parseFloat(ambientInput.value);

    ctx.fillStyle = T.surface2;
    ctx.fillRect(12, 12, SCENE_W - 12, H - 24);
    ctx.strokeStyle = T.border; ctx.lineWidth = 1;
    ctx.strokeRect(12, 12, SCENE_W - 12, H - 24);

    // Sky (cold tint when ambient < 0)
    const skyGrad = ctx.createLinearGradient(0, 0, 0, H), cold = ambient < 0;
    skyGrad.addColorStop(0, cold ? '#2a4a78' : '#5b8fce');
    skyGrad.addColorStop(1, cold ? '#1a2e4d' : '#3a6ba5');
    ctx.fillStyle = skyGrad; ctx.fillRect(20, 20, 90, H - 40);

    // House
    const hx = 120, hy = 60, hw = 220, hh = 260;
    ctx.fillStyle = T.surface; ctx.fillRect(hx, hy, hw, hh);
    ctx.strokeStyle = T.borderStrong; ctx.lineWidth = 2;
    ctx.strokeRect(hx, hy, hw, hh);
    ctx.fillStyle = T.primary;
    ctx.beginPath();
    ctx.moveTo(hx - 14, hy); ctx.lineTo(hx + hw / 2, hy - 44); ctx.lineTo(hx + hw + 14, hy);
    ctx.closePath(); ctx.fill();

    // Window + cold-air gusts when open
    const wx = hx + 14, wy = hy + 70, ww = 50, wh = 60;
    ctx.fillStyle = disturbance ? '#a3d4ff' : 'rgba(120,170,220,0.65)';
    ctx.fillRect(wx, wy, ww, wh);
    ctx.strokeStyle = T.borderStrong; ctx.lineWidth = 2;
    ctx.strokeRect(wx, wy, ww, wh);
    ctx.beginPath();
    ctx.moveTo(wx + ww / 2, wy); ctx.lineTo(wx + ww / 2, wy + wh);
    ctx.moveTo(wx, wy + wh / 2); ctx.lineTo(wx + ww, wy + wh / 2);
    ctx.stroke();
    if (disturbance && !reduceMotion) {
      ctx.strokeStyle = 'rgba(160,200,240,0.85)'; ctx.lineWidth = 2;
      for (let i = 0; i < 4; i++) {
        const gx = wx + ww + 4 + ((Date.now() / 280 + i * 1.6) % 6) * 18;
        const gy = wy + 12 + i * 12;
        ctx.beginPath(); ctx.moveTo(gx, gy);
        ctx.bezierCurveTo(gx + 20, gy - 6, gx + 36, gy + 6, gx + 50, gy);
        ctx.stroke();
      }
    }

    // Digital display
    const dx = hx + 110, dy = hy + 140;
    ctx.fillStyle = T.bg; ctx.fillRect(dx, dy, 100, 80);
    ctx.strokeStyle = T.border; ctx.lineWidth = 1.5;
    ctx.strokeRect(dx, dy, 100, 80);
    const onTarget = Math.abs(room - target) < 1;
    const wayOff = room < target - 2 || room > target + 2;
    ctx.fillStyle = onTarget ? T.green : (wayOff ? T.red : T.amber);
    ctx.font = 'bold 28px ui-monospace, monospace';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(room.toFixed(1) + '°', dx + 50, dy + 30);
    ctx.fillStyle = T.textMuted; ctx.font = '10px system-ui';
    ctx.fillText(LL.target + ': ' + target.toFixed(0) + '°', dx + 50, dy + 58);
    ctx.fillText(LL.ambient + ': ' + (ambient - (disturbance ? 5 : 0)).toFixed(0) + '°', dx + 50, dy + 72);

    // Radiator + heat waves
    const rx = hx + 14, ry = hy + 200, rw = 110, rh = 36;
    ctx.fillStyle = heaterOn ? '#ff7f4d' : T.surface2;
    ctx.fillRect(rx, ry, rw, rh);
    ctx.strokeStyle = T.borderStrong; ctx.lineWidth = 2;
    ctx.strokeRect(rx, ry, rw, rh);
    ctx.strokeStyle = heaterOn ? '#ff5722' : T.border;
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.moveTo(rx + 10 + i * 18, ry + 4); ctx.lineTo(rx + 10 + i * 18, ry + rh - 4);
      ctx.stroke();
    }
    if (heaterOn && !reduceMotion) {
      ctx.strokeStyle = 'rgba(255,127,77,0.6)'; ctx.lineWidth = 1.8;
      for (let i = 0; i < 3; i++) {
        const yy = ry - 6 - ((Date.now() / 200 + i * 1.4) % 4) * 14;
        ctx.beginPath(); ctx.moveTo(rx + 10, yy);
        ctx.bezierCurveTo(rx + 30, yy - 6, rx + 60, yy + 6, rx + rw - 10, yy);
        ctx.stroke();
      }
    }

    // Status pill
    ctx.fillStyle = heaterOn ? T.red : T.surface2;
    ctx.fillRect(hx + 14, hy + 18, 120, 24);
    ctx.strokeStyle = T.borderStrong; ctx.strokeRect(hx + 14, hy + 18, 120, 24);
    ctx.fillStyle = heaterOn ? '#fff' : T.text;
    ctx.font = 'bold 11px system-ui';
    ctx.fillText(heaterOn ? LL.heaterOn : LL.heaterOff, hx + 74, hy + 30);

    // Disturbance banner
    if (disturbance) {
      ctx.fillStyle = 'rgba(239,68,68,0.18)';
      ctx.fillRect(20, H - 50, SCENE_W - 28, 28);
      ctx.fillStyle = T.red; ctx.font = 'bold 11px system-ui';
      ctx.fillText(LL.window, 20 + (SCENE_W - 28) / 2, H - 36);
    }
    ctx.textBaseline = 'alphabetic';
  }

  function drawChart() {
    const T = window.Theme, LL = lang();
    const target = parseFloat(targetInput.value);

    ctx.fillStyle = T.surface;
    ctx.fillRect(CH.l - 40, CH.t - 10, W - CH.l - CH.r + 50, H - CH.t - CH.b + 26);

    // Grid
    ctx.strokeStyle = T.border; ctx.lineWidth = 1;
    for (let yy = Y_MIN; yy <= Y_MAX; yy += 5) {
      const y = sy(yy);
      ctx.beginPath(); ctx.moveTo(CH.l, y); ctx.lineTo(W - CH.r, y); ctx.stroke();
    }
    for (let tt = 0; tt <= T_END; tt += 10) {
      const x = sx(tt);
      ctx.beginPath(); ctx.moveTo(x, CH.t); ctx.lineTo(x, H - CH.b); ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = T.borderStrong; ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(CH.l, CH.t); ctx.lineTo(CH.l, H - CH.b); ctx.lineTo(W - CH.r, H - CH.b);
    ctx.stroke();

    // Tick labels
    ctx.fillStyle = T.textMuted; ctx.font = '10px system-ui';
    ctx.textAlign = 'right';
    for (let yy = Y_MIN; yy <= Y_MAX; yy += 5) ctx.fillText(String(yy), CH.l - 6, sy(yy) + 3);
    ctx.textAlign = 'center';
    for (let tt = 0; tt <= T_END; tt += 10) ctx.fillText(String(tt), sx(tt), H - CH.b + 14);

    // Axis titles
    ctx.fillStyle = T.text; ctx.font = '11px system-ui';
    ctx.fillText(LL.time, (CH.l + W - CH.r) / 2, H - 8);
    ctx.save();
    ctx.translate(CH.l - 36, (CH.t + H - CH.b) / 2);
    ctx.rotate(-Math.PI / 2); ctx.fillText(LL.temp, 0, 0); ctx.restore();

    // Target ±hysteresis band
    ctx.fillStyle = 'rgba(16,185,129,0.10)';
    const bTop = sy(target + HYSTERESIS), bBot = sy(target - HYSTERESIS);
    ctx.fillRect(CH.l, bTop, W - CH.r - CH.l, bBot - bTop);

    // Target line (green dashed)
    ctx.strokeStyle = T.green; ctx.lineWidth = 2; ctx.setLineDash([6, 5]);
    ctx.beginPath(); ctx.moveTo(CH.l, sy(target)); ctx.lineTo(W - CH.r, sy(target)); ctx.stroke();
    ctx.setLineDash([]);

    // Heater + disturbance ribbons at the bottom of the plot
    const ribY = H - CH.b - 6;
    series.forEach((p, i) => {
      const x1 = sx(p.t);
      const x2 = i + 1 < series.length ? sx(series[i + 1].t) : x1 + 1;
      if (p.on) {
        ctx.fillStyle = 'rgba(255,127,77,0.55)';
        ctx.fillRect(x1, ribY, Math.max(1, x2 - x1), 4);
      }
      if (p.disturb) {
        ctx.fillStyle = 'rgba(239,68,68,0.45)';
        ctx.fillRect(x1, ribY - 6, Math.max(1, x2 - x1), 4);
      }
    });

    // Room temperature line (accent solid)
    if (series.length > 1) {
      ctx.strokeStyle = T.accent; ctx.lineWidth = 2.5;
      ctx.beginPath();
      series.forEach((p, i) => {
        const x = sx(p.t), y = sy(p.room);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();
      const last = series[series.length - 1];
      ctx.fillStyle = T.accent;
      ctx.beginPath();
      ctx.arc(sx(last.t), sy(last.room), 4, 0, Math.PI * 2); ctx.fill();
    }

    // Legend
    const legX = CH.l + 12, legY = CH.t + 6;
    ctx.font = '11px system-ui'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    ctx.strokeStyle = T.green; ctx.lineWidth = 2; ctx.setLineDash([6, 5]);
    ctx.beginPath(); ctx.moveTo(legX, legY); ctx.lineTo(legX + 24, legY); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = T.text; ctx.fillText(LL.target, legX + 30, legY);
    ctx.strokeStyle = T.accent; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(legX + 100, legY); ctx.lineTo(legX + 124, legY); ctx.stroke();
    ctx.fillStyle = T.text; ctx.fillText(LL.actual, legX + 130, legY);

    if (t >= T_END) {
      ctx.fillStyle = T.textMuted; ctx.font = 'bold 11px system-ui';
      ctx.textAlign = 'right'; ctx.textBaseline = 'top';
      ctx.fillText(LL.finished, W - CH.r - 4, CH.t + 4);
    }
    ctx.textBaseline = 'alphabetic';
  }

  function draw() {
    const T = window.Theme;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = T.bg; ctx.fillRect(0, 0, W, H);
    drawScene();
    drawChart();
    devEl.textContent = (devCount ? devSum / devCount : 0).toFixed(2) + '°';
    energyEl.textContent = (energyOnSec * HEATER_POWER).toFixed(0);
  }

  // --- Wiring -----------------------------------------------------------
  modeSel.addEventListener('change', () => { reset(); startLoop(); });
  targetInput.addEventListener('input', draw);
  ambientInput.addEventListener('input', draw);
  speedSel.addEventListener('change', () => { speed = parseFloat(speedSel.value) || 1; });
  disturbBtn.addEventListener('click', () => {
    disturbance = !disturbance;
    disturbBtn.classList.toggle('active', disturbance);
    syncDisturbLabel(); draw();
  });
  playBtn.addEventListener('click', () => {
    if (t >= T_END) reset();
    playing = !playing; syncPlayLabel();
    if (playing) startLoop();
  });
  resetBtn.addEventListener('click', () => { reset(); startLoop(); });

  document.addEventListener('themechange', draw);
  document.addEventListener('langchange', () => { syncPlayLabel(); syncDisturbLabel(); draw(); });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopLoop(); else startLoop();
  });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      visible = entries.some((e) => e.isIntersecting);
      if (visible) startLoop(); else stopLoop();
    }, { rootMargin: '50px' }).observe(canvas);
  } else { visible = true; startLoop(); }

  speed = parseFloat(speedSel.value) || 1;
  reset();
})();
