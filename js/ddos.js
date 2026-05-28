// A2.4 — DDoS attack visualiser
// Shows legitimate users + a botnet flooding a target server, with a vertical
// load meter and three mitigation modes (none / rate-limit / WAF+blackhole).
(function () {
  const root = document.getElementById('ddos-sim');
  if (!root) return;
  const svg            = document.getElementById('ddos-svg');
  const attackersInput = document.getElementById('ddos-attackers');
  const defenseSel     = document.getElementById('ddos-defense');
  const playBtn        = document.getElementById('ddos-play');
  const resetBtn       = document.getElementById('ddos-reset');
  const loadEl         = document.getElementById('ddos-load');
  const servedEl       = document.getElementById('ddos-stats-served');
  const blockedEl      = document.getElementById('ddos-stats-blocked');
  const droppedEl      = document.getElementById('ddos-stats-dropped');
  const uptimeEl       = document.getElementById('ddos-stats-uptime');
  if (!svg || !attackersInput || !defenseSel || !playBtn || !resetBtn ||
      !loadEl || !servedEl || !blockedEl || !droppedEl || !uptimeEl) return;

  const NS = 'http://www.w3.org/2000/svg';
  const W = 1000, H = 460;

  // Server lives on the right; meter on the very right; sources on the left/bottom.
  const SERVER  = { x: 720, y: 200, w: 110, h: 110 };
  const METER   = { x: 910, y: 60, w: 36, h: 340 };
  const LEGIT_COUNT = 8;

  const reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function L() { return document.documentElement.getAttribute('data-lang') === 'ru' ? 'ru' : 'en'; }
  function tr(en, ru) { return L() === 'ru' ? ru : en; }
  function T() { return window.Theme; }

  // ---- State ------------------------------------------------------------
  let legits   = [];   // { x, y }
  let attackers = [];  // { x, y }
  let packets  = [];   // { sx, sy, t, kind:'legit'|'atk', born, outcome }
  let stats    = { served: 0, blocked: 0, dropped: 0, frames: 0, overloadFrames: 0 };
  let load     = 0;    // 0..100, smoothed
  let frame    = 0;
  let rafHandle = null;
  let running  = true;
  let visible  = false;

  function rebuildSources() {
    legits = [];
    for (let i = 0; i < LEGIT_COUNT; i++) {
      // Scatter on the left half (well clear of the server + meter)
      const x = 40 + Math.random() * 200;
      const y = 50 + Math.random() * 260;
      legits.push({ x, y });
    }
    const n = parseInt(attackersInput.value, 10) || 0;
    attackers = [];
    // Pack the botnet along the bottom in a 2-row grid
    const cols = Math.min(n, 25);
    for (let i = 0; i < n; i++) {
      const c = i % cols;
      const r = Math.floor(i / cols);
      const x = 40 + c * Math.max(18, (760 - 40) / Math.max(cols - 1, 1));
      const y = 360 + r * 30;
      attackers.push({ x, y });
    }
  }

  function resetAll() {
    packets = [];
    stats = { served: 0, blocked: 0, dropped: 0, frames: 0, overloadFrames: 0 };
    load = 0;
    frame = 0;
    rebuildSources();
    render();
  }

  // ---- Mitigation behaviour --------------------------------------------
  // Each tick we decide:
  //  - how many new legit packets fire
  //  - how many new attacker packets fire
  //  - whether each packet survives the defense (becomes a request to server)
  function decideEmissions() {
    const mode = defenseSel.value;
    // Legit ~1 req per ~30 frames; attackers fire ~4x more often.
    legits.filter(() => Math.random() < 0.035).forEach(src => {
      // Rate-limit false-positive ~8%, WAF false-positive ~3%
      const fp = mode === 'rate' ? 0.08 : mode === 'waf' ? 0.03 : 0;
      const outcome = Math.random() < fp ? 'dropped' : 'served';
      packets.push({ sx: src.x, sy: src.y, t: 0, kind: 'legit', outcome });
    });
    attackers.filter(() => Math.random() < 0.14).forEach(src => {
      // Rate-limit catches ~75% (same-IP repeats), WAF catches ~95%
      const catchP = mode === 'rate' ? 0.75 : mode === 'waf' ? 0.95 : 0;
      const outcome = Math.random() < catchP ? 'blocked' : 'served';
      packets.push({ sx: src.x, sy: src.y, t: 0, kind: 'atk', outcome });
    });
  }

  // Advance packet positions; commit stats when each hits the server (or filter).
  function stepPackets() {
    const speed = 0.025; // 0..1 progress per frame
    const wafFilterX = SERVER.x - 80; // visible "shield" line for WAF mode
    const next = [];
    for (const p of packets) {
      p.t += speed;
      // Blocked packets only travel up to the shield, then disappear.
      if (p.outcome === 'blocked' && p.t >= 0.7) {
        stats.blocked++;
        continue;
      }
      if (p.outcome === 'dropped' && p.t >= 0.85) {
        stats.dropped++;
        continue;
      }
      if (p.t >= 1) {
        if (p.outcome === 'served') {
          if (p.kind === 'legit') stats.served++;
          // attacker that slipped through still counts as load but not "served"
        }
        continue;
      }
      next.push(p);
    }
    packets = next;
  }

  // Smooth load: how many requests/sec are currently hitting the server.
  function updateLoad() {
    const inflight = packets.filter(p =>
      p.outcome === 'served' && p.t > 0.6).length;
    // Scale: ~30 in-flight = full load
    const target = Math.min(100, inflight * 3.3);
    load = load * 0.85 + target * 0.15;
    stats.frames++;
    if (load > 95) stats.overloadFrames++;
  }

  // ---- Rendering --------------------------------------------------------
  function clear() { while (svg.firstChild) svg.removeChild(svg.firstChild); }

  function el(tag, attrs) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }

  function drawServer() {
    const t = T();
    const fill = load > 95 ? t.red : (load > 80 ? t.amber : t.primary);
    svg.appendChild(el('rect', {
      x: SERVER.x, y: SERVER.y, width: SERVER.w, height: SERVER.h,
      rx: 10, fill: fill, stroke: fill, 'stroke-width': 3
    }));
    // Rack lines
    for (let i = 0; i < 4; i++) {
      const ry = SERVER.y + 22 + i * 22;
      svg.appendChild(el('line', {
        x1: SERVER.x + 10, x2: SERVER.x + SERVER.w - 10, y1: ry, y2: ry,
        stroke: 'rgba(255,255,255,0.35)', 'stroke-width': 2
      }));
      svg.appendChild(el('circle', {
        cx: SERVER.x + SERVER.w - 16, cy: ry, r: 3,
        fill: load > 95 ? 'white' : (load > 50 ? '#fbbf24' : '#86efac')
      }));
    }
    svg.appendChild(el('text', {
      x: SERVER.x + SERVER.w / 2, y: SERVER.y - 10,
      'text-anchor': 'middle', fill: t.text, 'font-size': 13, 'font-weight': 700
    })).textContent = tr('Server', 'Сервер');
    if (load > 95) {
      svg.appendChild(el('rect', {
        x: SERVER.x + SERVER.w / 2 - 60, y: SERVER.y + SERVER.h + 8,
        width: 120, height: 22, rx: 4, fill: t.red
      }));
      svg.appendChild(el('text', {
        x: SERVER.x + SERVER.w / 2, y: SERVER.y + SERVER.h + 23,
        'text-anchor': 'middle', fill: 'white', 'font-size': 11, 'font-weight': 800
      })).textContent = tr('OVERLOADED', 'ПЕРЕГРУЗКА');
    }
  }

  function drawDefenseLine() {
    const mode = defenseSel.value;
    if (mode === 'none') return;
    const t = T();
    const x = SERVER.x - 80;
    const color = mode === 'waf' ? t.violet : t.amber;
    svg.appendChild(el('line', {
      x1: x, x2: x, y1: 40, y2: H - 30,
      stroke: color, 'stroke-width': 2, 'stroke-dasharray': '6 4', opacity: 0.7
    }));
    const lab = el('text', {
      x: x, y: 30, 'text-anchor': 'middle',
      fill: color, 'font-size': 12, 'font-weight': 700
    });
    lab.textContent = mode === 'waf'
      ? tr('WAF + Blackhole', 'WAF + Blackhole')
      : tr('Rate limiter', 'Ограничитель');
    svg.appendChild(lab);
  }

  function drawLegits() {
    const t = T();
    legits.forEach(s => svg.appendChild(el('circle', {
      cx: s.x, cy: s.y, r: 7, fill: t.green,
      stroke: t.surface, 'stroke-width': 2
    })));
    svg.appendChild(el('text', {
      x: 140, y: 30, 'text-anchor': 'middle',
      fill: t.green, 'font-size': 12, 'font-weight': 700
    })).textContent = tr('Legitimate users', 'Обычные пользователи');
  }

  function drawAttackers() {
    const t = T();
    attackers.forEach(s => {
      svg.appendChild(el('circle', {
        cx: s.x, cy: s.y, r: 6, fill: t.red,
        stroke: t.surface, 'stroke-width': 1.5
      }));
      svg.appendChild(el('text', {
        x: s.x, y: s.y + 3, 'text-anchor': 'middle',
        fill: 'white', 'font-size': 9, 'font-weight': 800
      })).textContent = '☠';
    });
    if (!attackers.length) return;
    svg.appendChild(el('text', {
      x: 400, y: H - 5, 'text-anchor': 'middle',
      fill: t.red, 'font-size': 12, 'font-weight': 700
    })).textContent = tr('Botnet (' + attackers.length + ')',
                         'Ботнет (' + attackers.length + ')');
  }

  function drawPackets() {
    const t = T();
    const tgt = { x: SERVER.x + 8, y: SERVER.y + SERVER.h / 2 };
    const filterX = SERVER.x - 80;
    packets.forEach(p => {
      // Where does this packet stop?  blocked = stops at filter; else = server.
      const endX = p.outcome === 'blocked' ? filterX : tgt.x;
      const endY = p.outcome === 'blocked'
        ? p.sy + (tgt.y - p.sy) * ((filterX - p.sx) / (tgt.x - p.sx || 1))
        : tgt.y;
      // Map p.t in [0..1] -> position from source to endpoint
      const tt = p.outcome === 'blocked' ? Math.min(1, p.t / 0.7)
              : p.outcome === 'dropped' ? Math.min(1, p.t / 0.85)
              : p.t;
      const x = p.sx + (endX - p.sx) * tt;
      const y = p.sy + (endY - p.sy) * tt;
      const color = p.kind === 'legit' ? t.green : t.red;
      let opacity = 1;
      if (p.outcome === 'blocked' && p.t > 0.55) opacity = (0.7 - p.t) / 0.15;
      if (p.outcome === 'dropped' && p.t > 0.7) opacity = (0.85 - p.t) / 0.15;
      svg.appendChild(el('circle', {
        cx: x, cy: y, r: p.kind === 'atk' ? 2.5 : 3,
        fill: color, opacity: Math.max(0, Math.min(1, opacity))
      }));
    });
  }

  function drawMeter() {
    const t = T();
    // Track
    svg.appendChild(el('rect', {
      x: METER.x, y: METER.y, width: METER.w, height: METER.h,
      rx: 6, fill: t.surface2, stroke: t.borderStrong, 'stroke-width': 1
    }));
    // Fill (grows up from the bottom)
    const fh = Math.max(0, Math.min(METER.h, METER.h * (load / 100)));
    let fillCol = t.green;
    if (load > 95) fillCol = t.red;
    else if (load > 80) fillCol = t.amber;
    svg.appendChild(el('rect', {
      x: METER.x + 2, y: METER.y + METER.h - fh + 0,
      width: METER.w - 4, height: fh, rx: 5, fill: fillCol
    }));
    // Tick marks at 50/80/95
    [50, 80, 95].forEach(v => {
      const y = METER.y + METER.h * (1 - v / 100);
      svg.appendChild(el('line', {
        x1: METER.x - 4, x2: METER.x + METER.w + 4,
        y1: y, y2: y,
        stroke: v === 95 ? t.red : (v === 80 ? t.amber : t.textFaint),
        'stroke-width': 1, 'stroke-dasharray': '3 3', opacity: 0.7
      }));
      svg.appendChild(el('text', {
        x: METER.x - 8, y: y + 3,
        'text-anchor': 'end', fill: t.textMuted, 'font-size': 9
      })).textContent = v + '%';
    });
    // Label
    svg.appendChild(el('text', {
      x: METER.x + METER.w / 2, y: METER.y - 12,
      'text-anchor': 'middle', fill: t.text,
      'font-size': 11, 'font-weight': 700
    })).textContent = tr('Server load', 'Нагрузка');
    svg.appendChild(el('text', {
      x: METER.x + METER.w / 2, y: METER.y + METER.h + 16,
      'text-anchor': 'middle', fill: t.textMuted, 'font-size': 10
    })).textContent = Math.round(load) + '%';
  }

  function updateStatsPanel() {
    loadEl.textContent = Math.round(load) + '%';
    if (load > 95) loadEl.style.color = 'var(--red)';
    else if (load > 80) loadEl.style.color = 'var(--amber)';
    else loadEl.style.color = 'var(--green)';

    servedEl.textContent  = stats.served;
    blockedEl.textContent = stats.blocked;
    droppedEl.textContent = stats.dropped;
    const up = stats.frames === 0
      ? 100
      : 100 * (1 - stats.overloadFrames / stats.frames);
    uptimeEl.textContent = up.toFixed(1) + '%';
    if (up < 90) uptimeEl.style.color = 'var(--red)';
    else if (up < 99) uptimeEl.style.color = 'var(--amber)';
    else uptimeEl.style.color = 'var(--green)';
  }

  function render() {
    clear();
    drawDefenseLine();
    drawPackets();
    drawAttackers();
    drawLegits();
    drawServer();
    drawMeter();
    updateStatsPanel();
  }

  // ---- Animation loop ---------------------------------------------------
  function tick() {
    if (!running || !visible || document.hidden) { rafHandle = null; return; }
    frame++;
    decideEmissions();
    stepPackets();
    updateLoad();
    render();
    rafHandle = requestAnimationFrame(tick);
  }

  function startLoop() {
    if (rafHandle == null && running && visible && !document.hidden && !reduceMotion) {
      rafHandle = requestAnimationFrame(tick);
    }
  }

  // ---- Wiring -----------------------------------------------------------
  attackersInput.addEventListener('input', () => { rebuildSources(); render(); });
  defenseSel.addEventListener('change', () => { render(); });
  resetBtn.addEventListener('click', resetAll);
  playBtn.addEventListener('click', () => {
    running = !running;
    playBtn.textContent = running ? tr('Pause', 'Пауза') : tr('Play', 'Запуск');
    if (running) startLoop();
  });

  document.addEventListener('themechange', render);
  document.addEventListener('langchange', () => {
    playBtn.textContent = running ? tr('Pause', 'Пауза') : tr('Play', 'Запуск');
    render();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && rafHandle != null) {
      cancelAnimationFrame(rafHandle); rafHandle = null;
    } else { startLoop(); }
  });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      visible = entries.some(e => e.isIntersecting);
      if (visible) startLoop();
      else if (rafHandle != null) { cancelAnimationFrame(rafHandle); rafHandle = null; }
    }, { rootMargin: '50px' }).observe(svg);
  } else {
    visible = true;
    startLoop();
  }

  // Initial paint + initial state
  playBtn.textContent = tr('Pause', 'Пауза');
  resetAll();

  // For reduced motion: still emit and step a few times so the diagram is
  // informative even if no animation runs.
  if (reduceMotion) {
    for (let i = 0; i < 60; i++) {
      frame++; decideEmissions(); stepPackets(); updateLoad();
    }
    render();
  }
})();
