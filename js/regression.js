// Linear regression — drag points, line of best fit recomputed live
(function () {
  const canvas = document.getElementById('reg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const M = { l: 60, r: 30, t: 30, b: 50 };
  const showResidEl = document.getElementById('reg-show-resid');

  let points = [];
  let dragIdx = -1;
  let hoverIdx = -1;

  // axes domain
  const XMIN = 0, XMAX = 100, YMIN = 0, YMAX = 100;
  function toScreenX(x) { return M.l + (x - XMIN) / (XMAX - XMIN) * (W - M.l - M.r); }
  function toScreenY(y) { return H - M.b - (y - YMIN) / (YMAX - YMIN) * (H - M.t - M.b); }
  function toDataX(sx) { return XMIN + (sx - M.l) / (W - M.l - M.r) * (XMAX - XMIN); }
  function toDataY(sy) { return YMIN + (H - M.b - sy) / (H - M.t - M.b) * (YMAX - YMIN); }

  function fit() {
    if (points.length < 2) return null;
    const n = points.length;
    let sx = 0, sy = 0, sxx = 0, sxy = 0;
    points.forEach(p => { sx += p.x; sy += p.y; sxx += p.x * p.x; sxy += p.x * p.y; });
    const mx = sx / n, my = sy / n;
    const num = sxy - n * mx * my;
    const den = sxx - n * mx * mx;
    if (Math.abs(den) < 1e-9) return null;
    const m = num / den;
    const b = my - m * mx;
    // R²
    let ssRes = 0, ssTot = 0;
    points.forEach(p => {
      const pred = m * p.x + b;
      ssRes += (p.y - pred) ** 2;
      ssTot += (p.y - my) ** 2;
    });
    const r2 = ssTot === 0 ? 1 : 1 - ssRes / ssTot;
    return { m, b, r2, mx, my };
  }

  function randomData() {
    points = [];
    const slope = (Math.random() - 0.5) * 1.6;
    const intercept = 30 + Math.random() * 40;
    for (let i = 0; i < 14; i++) {
      const x = 10 + i * (80 / 14) + (Math.random() - 0.5) * 4;
      const y = slope * x + intercept + (Math.random() - 0.5) * 30;
      points.push({ x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) });
    }
    draw();
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    for (let x = 0; x <= 100; x += 10) {
      const sx = toScreenX(x);
      ctx.beginPath();
      ctx.moveTo(sx, M.t); ctx.lineTo(sx, H - M.b); ctx.stroke();
    }
    for (let y = 0; y <= 100; y += 10) {
      const sy = toScreenY(y);
      ctx.beginPath();
      ctx.moveTo(M.l, sy); ctx.lineTo(W - M.r, sy); ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = '#1a3a5e';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(M.l, M.t); ctx.lineTo(M.l, H - M.b); ctx.lineTo(W - M.r, H - M.b);
    ctx.stroke();

    // Labels
    ctx.fillStyle = '#475569';
    ctx.font = '11px system-ui';
    ctx.textAlign = 'center';
    for (let x = 0; x <= 100; x += 20) {
      ctx.fillText(String(x), toScreenX(x), H - M.b + 18);
    }
    ctx.textAlign = 'right';
    for (let y = 0; y <= 100; y += 20) {
      ctx.fillText(String(y), M.l - 8, toScreenY(y) + 4);
    }

    // Axis titles
    const lang = document.documentElement.getAttribute('data-lang') || 'en';
    ctx.font = '12px system-ui';
    ctx.fillStyle = '#0f172a';
    ctx.textAlign = 'center';
    ctx.fillText(lang === 'ru' ? 'X (признак)' : 'X (feature)', (M.l + W - M.r) / 2, H - 12);
    ctx.save();
    ctx.translate(16, (M.t + H - M.b) / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(lang === 'ru' ? 'Y (целевая)' : 'Y (target)', 0, 0);
    ctx.restore();

    // Fit line
    const f = fit();
    if (f) {
      // Residuals
      if (showResidEl.checked) {
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.5)';
        ctx.lineWidth = 1.5;
        points.forEach(p => {
          const pred = f.m * p.x + f.b;
          ctx.beginPath();
          ctx.moveTo(toScreenX(p.x), toScreenY(p.y));
          ctx.lineTo(toScreenX(p.x), toScreenY(pred));
          ctx.stroke();
        });
      }
      // Line: y = mx + b across visible x range
      const yLeft = f.m * XMIN + f.b;
      const yRight = f.m * XMAX + f.b;
      ctx.strokeStyle = '#0ea5e9';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(toScreenX(XMIN), toScreenY(yLeft));
      ctx.lineTo(toScreenX(XMAX), toScreenY(yRight));
      ctx.stroke();

      // Equation
      ctx.font = 'bold 13px ui-monospace';
      ctx.textAlign = 'left';
      ctx.fillStyle = '#0ea5e9';
      ctx.fillText('y = ' + f.m.toFixed(2) + '·x + ' + f.b.toFixed(2), M.l + 8, M.t + 18);
    }

    // Points
    points.forEach((p, i) => {
      ctx.beginPath();
      ctx.arc(toScreenX(p.x), toScreenY(p.y), i === dragIdx || i === hoverIdx ? 9 : 6, 0, Math.PI * 2);
      ctx.fillStyle = i === dragIdx ? '#f59e0b' : '#1a3a5e';
      ctx.fill();
      ctx.strokeStyle = 'white'; ctx.lineWidth = 2; ctx.stroke();
    });

    // Stats
    document.getElementById('reg-n').textContent = points.length;
    if (f) {
      document.getElementById('reg-slope').textContent = f.m.toFixed(3);
      document.getElementById('reg-intercept').textContent = f.b.toFixed(2);
      document.getElementById('reg-r2').textContent = f.r2.toFixed(3);
    } else {
      document.getElementById('reg-slope').textContent = '—';
      document.getElementById('reg-intercept').textContent = '—';
      document.getElementById('reg-r2').textContent = '—';
    }
  }

  function getCanvasCoords(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      sx: (e.clientX - rect.left) * scaleX,
      sy: (e.clientY - rect.top) * scaleY
    };
  }

  function pointAt(sx, sy) {
    let best = -1, bestD = 12 * 12;
    points.forEach((p, i) => {
      const dx = toScreenX(p.x) - sx;
      const dy = toScreenY(p.y) - sy;
      const d = dx * dx + dy * dy;
      if (d < bestD) { bestD = d; best = i; }
    });
    return best;
  }

  canvas.addEventListener('mousedown', e => {
    const { sx, sy } = getCanvasCoords(e);
    const i = pointAt(sx, sy);
    if (i >= 0) {
      dragIdx = i;
    } else {
      // Add point if inside plot area
      if (sx >= M.l && sx <= W - M.r && sy >= M.t && sy <= H - M.b) {
        points.push({ x: toDataX(sx), y: toDataY(sy) });
        dragIdx = points.length - 1;
      }
    }
    draw();
  });
  canvas.addEventListener('mousemove', e => {
    const { sx, sy } = getCanvasCoords(e);
    if (dragIdx >= 0) {
      points[dragIdx] = {
        x: Math.max(XMIN, Math.min(XMAX, toDataX(sx))),
        y: Math.max(YMIN, Math.min(YMAX, toDataY(sy)))
      };
    } else {
      hoverIdx = pointAt(sx, sy);
      canvas.style.cursor = hoverIdx >= 0 ? 'grab' : 'crosshair';
    }
    draw();
  });
  canvas.addEventListener('mouseup', () => { dragIdx = -1; draw(); });
  canvas.addEventListener('mouseleave', () => { dragIdx = -1; hoverIdx = -1; draw(); });

  document.getElementById('reg-random').addEventListener('click', randomData);
  document.getElementById('reg-clear').addEventListener('click', () => { points = []; draw(); });
  showResidEl.addEventListener('change', draw);
  document.addEventListener('langchange', draw);

  randomData();
})();
