// A4.3 — K-Nearest Neighbours classifier playground
// Click to add training points of the selected class.
// Drag the query point (★) — it gets coloured by the majority class among its k nearest neighbours.
(function () {
  const canvas = document.getElementById('knn-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;

  const kInput = document.getElementById('knn-k');
  const kVal = document.getElementById('knn-k-v');
  const classSel = document.getElementById('knn-class');
  const seedBtn = document.getElementById('knn-seed');
  const clearBtn = document.getElementById('knn-clear');
  const resultEl = document.getElementById('knn-result');
  const votesEl = document.getElementById('knn-votes');

  // Class colors — using accent/violet/green for better contrast than amber on light bg
  const COLORS = ['accent', 'violet', 'green']; // class 0/1/2 → theme color names
  let points = []; // {x, y, c}
  let query = { x: W / 2, y: H / 2 };
  let dragging = false;

  function T() { return window.Theme; }
  function cls(c) { return T()[COLORS[c]]; }
  function L() { return document.documentElement.getAttribute('data-lang') === 'ru' ? 'ru' : 'en'; }
  function tr(en, ru) { return L() === 'ru' ? ru : en; }

  function seed() {
    points = [];
    const centers = [[200, 150], [700, 150], [450, 340]];
    for (let i = 0; i < 14; i++) {
      const c0 = centers[0];
      points.push({ x: c0[0] + (Math.random() - 0.5) * 140, y: c0[1] + (Math.random() - 0.5) * 140, c: 0 });
      const c1 = centers[1];
      points.push({ x: c1[0] + (Math.random() - 0.5) * 140, y: c1[1] + (Math.random() - 0.5) * 140, c: 1 });
      const c2 = centers[2];
      points.push({ x: c2[0] + (Math.random() - 0.5) * 140, y: c2[1] + (Math.random() - 0.5) * 140, c: 2 });
    }
    render();
  }

  function distance(a, b) {
    const dx = a.x - b.x, dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function classify() {
    const k = Math.max(1, Math.min(parseInt(kInput.value, 10) || 3, points.length || 1));
    if (points.length === 0) return { label: null, neighbours: [], votes: [0, 0, 0] };
    const sorted = points
      .map(p => ({ p, d: distance(p, query) }))
      .sort((a, b) => a.d - b.d);
    const neighbours = sorted.slice(0, k);
    const votes = [0, 0, 0];
    neighbours.forEach(n => { votes[n.p.c]++; });
    let best = 0;
    for (let i = 1; i < 3; i++) if (votes[i] > votes[best]) best = i;
    return { label: best, neighbours, votes };
  }

  function render() {
    kVal.textContent = kInput.value;
    ctx.clearRect(0, 0, W, H);

    // grid
    ctx.strokeStyle = T().border;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0; x <= W; x += 50) { ctx.moveTo(x, 0); ctx.lineTo(x, H); }
    for (let y = 0; y <= H; y += 50) { ctx.moveTo(0, y); ctx.lineTo(W, y); }
    ctx.stroke();

    // training points
    points.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = cls(p.c);
      ctx.fill();
      ctx.strokeStyle = T().surface;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    // classify the query point
    const res = classify();
    // draw lines to neighbours
    if (res.neighbours.length) {
      ctx.strokeStyle = T().textFaint;
      ctx.setLineDash([4, 4]);
      ctx.lineWidth = 1;
      ctx.beginPath();
      res.neighbours.forEach(n => {
        ctx.moveTo(query.x, query.y);
        ctx.lineTo(n.p.x, n.p.y);
      });
      ctx.stroke();
      ctx.setLineDash([]);
      // farthest of the k defines the kNN circle
      const radius = res.neighbours[res.neighbours.length - 1].d;
      ctx.strokeStyle = T().textMuted;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(query.x, query.y, radius, 0, Math.PI * 2);
      ctx.stroke();
    }

    // query point as a star
    const starColor = res.label !== null ? cls(res.label) : T().textMuted;
    drawStar(query.x, query.y, 11, starColor, T().primary);

    // result text below the canvas
    if (res.label !== null) {
      resultEl.innerHTML = tr('Predicted class:', 'Предсказанный класс:') + ' <b style="color:' + cls(res.label) + '">' + classLabel(res.label) + '</b>';
    } else {
      resultEl.textContent = tr('Add training points to classify the query.', 'Добавьте обучающие точки, чтобы получить классификацию.');
    }
    votesEl.innerHTML = res.votes.map((v, i) =>
      '<span class="knn-vote" style="border-color:' + cls(i) + ';color:' + cls(i) + '">' +
      classLabel(i) + ': <b>' + v + '</b></span>').join(' ');
  }

  function classLabel(c) {
    return tr(['Class A', 'Class B', 'Class C'][c], ['Класс A', 'Класс B', 'Класс C'][c]);
  }

  function drawStar(cx, cy, r, fill, stroke) {
    const spikes = 5, outer = r, inner = r / 2.3;
    ctx.beginPath();
    let rot = -Math.PI / 2;
    const step = Math.PI / spikes;
    ctx.moveTo(cx + Math.cos(rot) * outer, cy + Math.sin(rot) * outer);
    for (let i = 0; i < spikes; i++) {
      rot += step;
      ctx.lineTo(cx + Math.cos(rot) * inner, cy + Math.sin(rot) * inner);
      rot += step;
      ctx.lineTo(cx + Math.cos(rot) * outer, cy + Math.sin(rot) * outer);
    }
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // ---- Input ----
  function canvasPos(e) {
    const r = canvas.getBoundingClientRect();
    const sx = canvas.width / r.width, sy = canvas.height / r.height;
    return { x: (e.clientX - r.left) * sx, y: (e.clientY - r.top) * sy };
  }
  function touchPos(e) {
    const r = canvas.getBoundingClientRect();
    const sx = canvas.width / r.width, sy = canvas.height / r.height;
    const t = e.touches[0] || e.changedTouches[0];
    return { x: (t.clientX - r.left) * sx, y: (t.clientY - r.top) * sy };
  }
  function nearQuery(pos) {
    // 28px in canvas coords for finger tolerance
    return Math.hypot(pos.x - query.x, pos.y - query.y) < 28;
  }
  function clampQuery() {
    query.x = Math.max(0, Math.min(W, query.x));
    query.y = Math.max(0, Math.min(H, query.y));
  }

  canvas.addEventListener('mousedown', (e) => {
    const pos = canvasPos(e);
    if (nearQuery(pos)) { dragging = true; return; }
    const c = parseInt(classSel.value, 10);
    points.push({ x: pos.x, y: pos.y, c });
    render();
  });
  canvas.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    const pos = canvasPos(e);
    query.x = pos.x; query.y = pos.y; clampQuery();
    render();
  });
  window.addEventListener('mouseup', () => { dragging = false; });

  // Touch (mobile/tablet)
  canvas.addEventListener('touchstart', (e) => {
    const pos = touchPos(e);
    if (nearQuery(pos)) { dragging = true; e.preventDefault(); return; }
    const c = parseInt(classSel.value, 10);
    points.push({ x: pos.x, y: pos.y, c });
    render();
  }, { passive: false });
  canvas.addEventListener('touchmove', (e) => {
    if (!dragging) return;
    const pos = touchPos(e);
    query.x = pos.x; query.y = pos.y; clampQuery();
    render();
    e.preventDefault();
  }, { passive: false });
  canvas.addEventListener('touchend', () => { dragging = false; });

  // Keyboard accessibility: make canvas focusable, allow arrow keys to nudge the star.
  canvas.setAttribute('tabindex', '0');
  canvas.addEventListener('keydown', (e) => {
    const step = e.shiftKey ? 30 : 10;
    let handled = true;
    switch (e.key) {
      case 'ArrowLeft':  query.x -= step; break;
      case 'ArrowRight': query.x += step; break;
      case 'ArrowUp':    query.y -= step; break;
      case 'ArrowDown':  query.y += step; break;
      case 'Enter':
      case ' ': {
        const c = parseInt(classSel.value, 10);
        points.push({ x: query.x, y: query.y, c });
        break;
      }
      default: handled = false;
    }
    if (handled) {
      clampQuery();
      render();
      e.preventDefault();
    }
  });

  kInput.addEventListener('input', render);
  seedBtn.addEventListener('click', seed);
  clearBtn.addEventListener('click', () => { points = []; render(); });
  document.addEventListener('themechange', render);
  document.addEventListener('langchange', render);

  seed();
})();
