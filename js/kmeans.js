// K-means clustering — step by step
(function () {
  const canvas = document.getElementById('km-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const COLORS = ['#0ea5e9', '#f59e0b', '#10b981', '#8b5cf6', '#ec4899', '#22d3ee'];

  let k = 3;
  let points = []; // {x, y, cluster}
  let centroids = []; // {x, y, color}
  let iter = 0;
  let inertia = 0;
  let autoTimer = null;

  function rng(min, max) { return min + Math.random() * (max - min); }

  function scatter(n = 60) {
    points = [];
    const clusters = Math.max(2, k);
    for (let c = 0; c < clusters; c++) {
      const cx = rng(80, W - 80);
      const cy = rng(60, H - 60);
      const spread = 38 + Math.random() * 28;
      const per = Math.floor(n / clusters);
      for (let i = 0; i < per; i++) {
        let x, y;
        do {
          x = cx + (Math.random() * 2 - 1) * spread;
          y = cy + (Math.random() * 2 - 1) * spread;
        } while (x < 30 || x > W - 30 || y < 30 || y > H - 30);
        points.push({ x, y, cluster: -1 });
      }
    }
    resetCentroids();
  }

  function resetCentroids() {
    iter = 0;
    inertia = 0;
    centroids = [];
    if (points.length === 0) {
      for (let i = 0; i < k; i++) {
        centroids.push({ x: rng(80, W - 80), y: rng(60, H - 60), color: COLORS[i] });
      }
    } else {
      // pick k random points as starting centroids
      const used = new Set();
      for (let i = 0; i < k; i++) {
        let idx;
        do { idx = Math.floor(Math.random() * points.length); } while (used.has(idx) && used.size < points.length);
        used.add(idx);
        centroids.push({ x: points[idx].x, y: points[idx].y, color: COLORS[i] });
      }
    }
    points.forEach(p => p.cluster = -1);
    updateStats();
    draw();
  }

  function step() {
    if (points.length === 0 || centroids.length === 0) return false;
    let changed = false;

    // 1. Assign
    for (const p of points) {
      let best = 0, bestD = Infinity;
      for (let i = 0; i < centroids.length; i++) {
        const d = (p.x - centroids[i].x) ** 2 + (p.y - centroids[i].y) ** 2;
        if (d < bestD) { bestD = d; best = i; }
      }
      if (p.cluster !== best) changed = true;
      p.cluster = best;
    }

    // 2. Update centroids
    for (let i = 0; i < centroids.length; i++) {
      const members = points.filter(p => p.cluster === i);
      if (members.length === 0) continue;
      const mx = members.reduce((s, p) => s + p.x, 0) / members.length;
      const my = members.reduce((s, p) => s + p.y, 0) / members.length;
      if (Math.abs(centroids[i].x - mx) > 0.5 || Math.abs(centroids[i].y - my) > 0.5) changed = true;
      centroids[i].x = mx;
      centroids[i].y = my;
    }

    iter++;
    inertia = points.reduce((s, p) => {
      const c = centroids[p.cluster];
      return s + (p.x - c.x) ** 2 + (p.y - c.y) ** 2;
    }, 0);
    updateStats();
    draw();
    return changed;
  }

  function updateStats() {
    document.getElementById('km-stat-k').textContent = k;
    document.getElementById('km-stat-n').textContent = points.length;
    document.getElementById('km-stat-iter').textContent = iter;
    document.getElementById('km-stat-inertia').textContent = inertia > 0 ? Math.round(inertia).toLocaleString() : '—';
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 40) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y < H; y += 40) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }

    // Faint cluster regions: voronoi-ish dots
    if (centroids.length && points.length) {
      for (const p of points) {
        const c = p.cluster >= 0 ? centroids[p.cluster] : null;
        if (c) {
          ctx.strokeStyle = c.color;
          ctx.globalAlpha = 0.18;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y); ctx.lineTo(c.x, c.y); ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }

    // Points
    for (const p of points) {
      const color = p.cluster >= 0 ? centroids[p.cluster].color : '#94a3b8';
      ctx.beginPath();
      ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = 'white'; ctx.lineWidth = 1; ctx.stroke();
    }

    // Centroids (stars)
    for (const c of centroids) {
      drawStar(c.x, c.y, 12, c.color);
    }
  }

  function drawStar(cx, cy, r, color) {
    ctx.beginPath();
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI / 2 + i * (Math.PI / 5);
      const rr = i % 2 === 0 ? r : r / 2.2;
      const x = cx + Math.cos(a) * rr;
      const y = cy + Math.sin(a) * rr;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = 'white'; ctx.lineWidth = 2; ctx.stroke();
  }

  // Interactions
  document.getElementById('km-scatter').addEventListener('click', () => { scatter(); });
  document.getElementById('km-step').addEventListener('click', () => { step(); });
  document.getElementById('km-run').addEventListener('click', () => {
    if (autoTimer) { clearInterval(autoTimer); autoTimer = null; return; }
    autoTimer = setInterval(() => {
      const changed = step();
      if (!changed) { clearInterval(autoTimer); autoTimer = null; }
    }, 600);
  });
  document.getElementById('km-reset').addEventListener('click', resetCentroids);
  document.getElementById('km-clear').addEventListener('click', () => {
    points = []; centroids = []; iter = 0; inertia = 0;
    updateStats(); draw();
  });
  document.getElementById('km-k').addEventListener('change', e => {
    k = Math.max(2, Math.min(6, parseInt(e.target.value)));
    resetCentroids();
  });

  canvas.addEventListener('click', e => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    points.push({ x, y, cluster: -1 });
    updateStats();
    draw();
  });

  scatter();
})();
