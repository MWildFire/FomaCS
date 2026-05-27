// A2.1.2 — Cloud / Fog / Edge computing visualiser
// Shows where data is processed and the latency cost as the user/device count grows.
(function () {
  const canvas = document.getElementById('ce-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;

  const modeSel = document.getElementById('ce-mode');
  const devicesInput = document.getElementById('ce-devices');
  const devicesVal = document.getElementById('ce-devices-v');
  const latencyEl = document.getElementById('ce-latency');
  const bandwidthEl = document.getElementById('ce-bandwidth');
  const resilEl = document.getElementById('ce-resil');

  // Layout: devices on the right, edge nodes in the middle, cloud datacentres far left
  const cloudX = 90;
  const fogX = 320;
  const edgeX = 540;
  const devX = 800;

  function t() { return window.Theme; }
  function L() {
    return document.documentElement.getAttribute('data-lang') === 'ru' ? 'ru' : 'en';
  }
  function tr(en, ru) { return L() === 'ru' ? ru : en; }

  function render() {
    const mode = modeSel.value;
    const nDev = parseInt(devicesInput.value, 10);
    devicesVal.textContent = nDev;

    ctx.clearRect(0, 0, W, H);

    // ---- Stats per mode (illustrative numbers) ----
    let latency, bandwidthOK, resilience;
    if (mode === 'cloud') {
      latency = 80 + Math.round(nDev * 0.4);       // round-trip ms grows with congestion
      bandwidthOK = nDev < 60 ? 'OK' : tr('Strained', 'Узкое место');
      resilience = tr('Single region', 'Один регион');
    } else if (mode === 'fog') {
      latency = 25 + Math.round(nDev * 0.15);
      bandwidthOK = 'OK';
      resilience = tr('Regional', 'Региональная');
    } else { // edge
      latency = 4 + Math.round(nDev * 0.05);
      bandwidthOK = 'OK';
      resilience = tr('Distributed', 'Распределённая');
    }

    latencyEl.textContent = latency + ' ms';
    bandwidthEl.textContent = bandwidthOK;
    resilEl.textContent = resilience;
    bandwidthEl.style.color = bandwidthOK === 'OK' ? t().green : t().red;

    // ---- Background tier labels ----
    drawTier(cloudX, t().violet, tr('Cloud · remote DC', 'Облако · удалённый ЦОД'));
    if (mode !== 'cloud') drawTier(fogX, t().accent, tr('Fog · regional', 'Fog · региональный'));
    if (mode === 'edge') drawTier(edgeX, t().green, tr('Edge · on-site', 'Edge · на месте'));

    // ---- Nodes ----
    drawNode(cloudX, 80, 22, t().violet, 'DC1');
    drawNode(cloudX, H - 80, 22, t().violet, 'DC2');

    if (mode !== 'cloud') {
      drawNode(fogX, 100, 18, t().accent, 'F1');
      drawNode(fogX, 220, 18, t().accent, 'F2');
      drawNode(fogX, 340, 18, t().accent, 'F3');
    }
    if (mode === 'edge') {
      for (let i = 0; i < 4; i++) {
        drawNode(edgeX, 80 + i * 80, 14, t().green, 'E' + (i + 1));
      }
    }

    // ---- Devices on the right ----
    const devCount = Math.min(nDev, 80);
    const cols = 4, rows = Math.ceil(devCount / cols);
    const startY = (H - rows * 20) / 2;
    for (let i = 0; i < devCount; i++) {
      const r = Math.floor(i / cols), c = i % cols;
      const x = devX - c * 22, y = startY + r * 20;
      ctx.fillStyle = t().textMuted;
      ctx.fillRect(x - 6, y - 4, 12, 8);
    }
    ctx.fillStyle = t().textMuted;
    ctx.font = '12px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText(tr('Devices (' + nDev + ')', 'Устройства (' + nDev + ')'), devX - 30, H - 18);

    // ---- Data flow lines (animated dashes) ----
    drawFlows(mode);
  }

  function drawTier(x, color, label) {
    ctx.fillStyle = withAlpha(color, 0.05);
    ctx.fillRect(x - 60, 30, 120, H - 80);
    ctx.strokeStyle = withAlpha(color, 0.3);
    ctx.setLineDash([3, 4]);
    ctx.strokeRect(x - 60, 30, 120, H - 80);
    ctx.setLineDash([]);
    ctx.fillStyle = color;
    ctx.font = 'bold 11px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText(label, x, 22);
  }

  function drawNode(x, y, r, color, label) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = withAlpha(color, 0.85);
    ctx.fill();
    ctx.strokeStyle = t().surface;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 10px system-ui';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, x, y);
    ctx.textBaseline = 'alphabetic';
  }

  // Long-running flow animation: a few packets travel right→left through the chosen tier
  let dashOffset = 0;
  function drawFlows(mode) {
    ctx.lineWidth = 1.5;
    ctx.setLineDash([6, 6]);
    ctx.lineDashOffset = -dashOffset;
    const stops = mode === 'cloud'
      ? [[devX - 50, H / 2], [cloudX, H / 2]]
      : mode === 'fog'
        ? [[devX - 50, H / 2], [fogX, 220], [cloudX, H / 2]]
        : [[devX - 50, H / 2], [edgeX, 160], [fogX, 220], [cloudX, H / 2]];
    ctx.strokeStyle = withAlpha(t().accent, 0.7);
    ctx.beginPath();
    ctx.moveTo(stops[0][0], stops[0][1]);
    for (let i = 1; i < stops.length; i++) ctx.lineTo(stops[i][0], stops[i][1]);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  function withAlpha(hex, a) {
    // Convert #rrggbb or rgb(...) to rgba
    const m = hex.match(/^#([0-9a-f]{6})$/i);
    if (m) {
      const n = parseInt(m[1], 16);
      return 'rgba(' + ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + a + ')';
    }
    return hex;
  }

  // Animation loop (respects prefers-reduced-motion + pauses when not visible)
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let visible = false;
  let rafHandle = null;
  function tick() {
    if (reduceMotion || !visible || document.hidden) {
      rafHandle = null;
      return;
    }
    dashOffset = (dashOffset + 1) % 12;
    render();
    rafHandle = requestAnimationFrame(tick);
  }
  function startLoop() {
    if (rafHandle == null && !reduceMotion && visible && !document.hidden) {
      rafHandle = requestAnimationFrame(tick);
    }
  }

  modeSel.addEventListener('change', render);
  devicesInput.addEventListener('input', render);
  document.addEventListener('themechange', render);
  document.addEventListener('langchange', render);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (rafHandle != null) { cancelAnimationFrame(rafHandle); rafHandle = null; }
    } else {
      startLoop();
    }
  });

  // Only animate while the canvas is in view (saves CPU on long pages)
  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      visible = entries.some(e => e.isIntersecting);
      if (visible) startLoop();
      else if (rafHandle != null) { cancelAnimationFrame(rafHandle); rafHandle = null; }
    }, { rootMargin: '50px' }).observe(canvas);
  } else {
    visible = true;
    startLoop();
  }

  render(); // initial paint regardless
})();
