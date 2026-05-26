// Network topology playground — Star / Bus / Ring / Mesh / Hybrid
(function () {
  const svg = document.getElementById('topo-svg');
  if (!svg) return;
  const select = document.getElementById('topo-select');
  const resetBtn = document.getElementById('topo-reset');
  const randBtn = document.getElementById('topo-randfail');
  const noteEl = document.getElementById('topo-note');
  const NS = 'http://www.w3.org/2000/svg';

  const NODE_COUNT = 7;
  let state = {
    topology: 'star',
    nodes: [],
    links: [],
    failed: new Set(),
    targetId: 0
  };

  const TEXT = {
    star: {
      en: '<b>Star</b> — every device connects to the central switch. Cheap and easy to scale, but the central node is a <b>single point of failure</b>. Fail it and watch the whole network go grey.',
      ru: '<b>Звезда</b> — все устройства подключены к центральному коммутатору. Дёшево и легко масштабируется, но центр — <b>единая точка отказа</b>. Уроните его — вся сеть погаснет.'
    },
    bus: {
      en: '<b>Bus</b> — one shared backbone. Easy to install but a single break splits the network. Collisions on the shared medium reduce speed.',
      ru: '<b>Шина</b> — один общий магистральный канал. Дёшево, но обрыв — и сеть пополам. Коллизии на общей среде снижают скорость.'
    },
    ring: {
      en: '<b>Ring</b> — nodes form a closed loop. Predictable performance, but one broken link can break the whole ring (unless dual-ring).',
      ru: '<b>Кольцо</b> — узлы образуют замкнутую петлю. Предсказуемо, но один обрыв ломает кольцо (если не двойное).'
    },
    mesh: {
      en: '<b>Full mesh</b> — every node connects to every other. Maximum reliability — data reroutes around failures. <b>No single point of failure.</b> But cabling and cost grow as O(n²).',
      ru: '<b>Полная mesh</b> — каждый узел связан с каждым. Максимум надёжности — данные обходят отказы. <b>Нет единой точки отказа.</b> Но провода и стоимость растут как O(n²).'
    },
    hybrid: {
      en: '<b>Hybrid</b> — mesh between core switches, star leaves to clients. Balance of cost, speed and resilience. Used in real campuses.',
      ru: '<b>Гибрид</b> — mesh между ядром, звезда на клиентах. Баланс цены, скорости и отказоустойчивости. Применяется в кампусах.'
    }
  };

  function makeNode(id, x, y, isHub = false, isCore = false, isBusPoint = false) {
    return { id, x, y, isHub, isCore, isBusPoint };
  }

  function buildTopology(name) {
    const cx = 400, cy = 230;
    const nodes = [];
    const links = [];

    if (name === 'star') {
      nodes.push(makeNode(0, cx, cy, true));
      for (let i = 1; i <= NODE_COUNT; i++) {
        const a = (i - 1) * (Math.PI * 2 / NODE_COUNT) - Math.PI / 2;
        nodes.push(makeNode(i, cx + Math.cos(a) * 170, cy + Math.sin(a) * 170));
        links.push([0, i]);
      }
    } else if (name === 'bus') {
      const startX = 100, endX = 700, y = cy;
      for (let i = 0; i < NODE_COUNT; i++) {
        const x = startX + (endX - startX) * (i / (NODE_COUNT - 1));
        nodes.push(makeNode(i, x, y - 80));
        nodes.push(makeNode(100 + i, x, y, false, false, true));
        links.push([i, 100 + i]);
        if (i > 0) links.push([100 + (i - 1), 100 + i]);
      }
    } else if (name === 'ring') {
      const R = 170;
      for (let i = 0; i < NODE_COUNT; i++) {
        const a = i * (Math.PI * 2 / NODE_COUNT) - Math.PI / 2;
        nodes.push(makeNode(i, cx + Math.cos(a) * R, cy + Math.sin(a) * R));
        links.push([i, (i + 1) % NODE_COUNT]);
      }
    } else if (name === 'mesh') {
      const R = 170;
      for (let i = 0; i < NODE_COUNT; i++) {
        const a = i * (Math.PI * 2 / NODE_COUNT) - Math.PI / 2;
        nodes.push(makeNode(i, cx + Math.cos(a) * R, cy + Math.sin(a) * R));
      }
      for (let i = 0; i < NODE_COUNT; i++)
        for (let j = i + 1; j < NODE_COUNT; j++) links.push([i, j]);
    } else if (name === 'hybrid') {
      // 3 core nodes in mesh, 4 leaves attached
      const cores = [
        makeNode(0, 280, 200, false, true),
        makeNode(1, 520, 200, false, true),
        makeNode(2, 400, 320, false, true)
      ];
      nodes.push(...cores);
      // full mesh between cores
      links.push([0, 1], [1, 2], [0, 2]);
      // leaves
      const leafPositions = [
        [150, 120], [650, 120], [150, 380], [650, 380]
      ];
      leafPositions.forEach((p, i) => {
        const id = 3 + i;
        nodes.push(makeNode(id, p[0], p[1]));
        // attach to nearest core
        let nearest = 0, dmin = Infinity;
        cores.forEach(c => {
          const d = Math.hypot(c.x - p[0], c.y - p[1]);
          if (d < dmin) { dmin = d; nearest = c.id; }
        });
        links.push([nearest, id]);
      });
    }
    return { nodes, links };
  }

  function reachableFrom(targetId) {
    if (state.failed.has(targetId)) return new Set();
    const adj = new Map();
    state.nodes.forEach(n => adj.set(n.id, []));
    state.links.forEach(([a, b]) => {
      if (state.failed.has(a) || state.failed.has(b)) return;
      adj.get(a).push(b);
      adj.get(b).push(a);
    });
    const seen = new Set([targetId]);
    const queue = [targetId];
    while (queue.length) {
      const u = queue.shift();
      for (const v of adj.get(u)) if (!seen.has(v)) { seen.add(v); queue.push(v); }
    }
    return seen;
  }

  function detectSpof() {
    // count nodes that, if removed, would partition the graph
    let spofCount = 0;
    const liveNodes = state.nodes.filter(n => !n.isHub || state.topology === 'star').map(n => n.id);
    // brute force: remove each node, count reachable from target
    const baseline = reachableFrom(state.targetId).size;
    for (const n of state.nodes) {
      if (n.id === state.targetId) continue;
      if (state.failed.has(n.id)) continue;
      state.failed.add(n.id);
      const r = reachableFrom(state.targetId).size;
      state.failed.delete(n.id);
      if (r < baseline - 1) spofCount++; // partition created
    }
    return spofCount;
  }

  function render() {
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    const reach = reachableFrom(state.targetId);

    // Draw links
    state.links.forEach(([a, b]) => {
      const na = state.nodes.find(n => n.id === a);
      const nb = state.nodes.find(n => n.id === b);
      const line = document.createElementNS(NS, 'line');
      line.setAttribute('x1', na.x); line.setAttribute('y1', na.y);
      line.setAttribute('x2', nb.x); line.setAttribute('y2', nb.y);
      const dead = state.failed.has(a) || state.failed.has(b);
      line.setAttribute('stroke', dead ? '#cbd5e1' : (reach.has(a) && reach.has(b) ? '#94a3b8' : '#cbd5e1'));
      line.setAttribute('stroke-width', '2');
      line.setAttribute('stroke-dasharray', dead ? '4 4' : '');
      svg.appendChild(line);
    });

    // Draw nodes
    state.nodes.forEach(n => {
      const g = document.createElementNS(NS, 'g');
      g.style.cursor = 'pointer';
      g.addEventListener('click', () => {
        if (n.id === state.targetId) return; // can't fail target
        if (state.failed.has(n.id)) state.failed.delete(n.id);
        else state.failed.add(n.id);
        render();
      });

      const circle = document.createElementNS(NS, 'circle');
      circle.setAttribute('cx', n.x); circle.setAttribute('cy', n.y);
      const isHub = n.isHub;
      const isCore = n.isCore;
      const isBusPoint = n.isBusPoint;
      const baseR = isHub ? 24 : (isCore ? 20 : (isBusPoint ? 6 : 16));
      circle.setAttribute('r', baseR);

      let fill = '#0ea5e9';
      if (state.failed.has(n.id)) fill = '#ef4444';
      else if (n.id === state.targetId) fill = '#10b981';
      else if (!reach.has(n.id)) fill = '#94a3b8';
      if (isBusPoint) fill = state.failed.has(n.id) ? '#ef4444' : '#64748b';

      circle.setAttribute('fill', fill);
      circle.setAttribute('stroke', 'white');
      circle.setAttribute('stroke-width', isBusPoint ? '2' : '3');
      if (state.failed.has(n.id)) {
        circle.setAttribute('stroke-dasharray', '3 3');
      }
      g.appendChild(circle);

      // Hub icon
      if (isHub) {
        const t = document.createElementNS(NS, 'text');
        t.setAttribute('x', n.x); t.setAttribute('y', n.y + 5);
        t.setAttribute('text-anchor', 'middle');
        t.setAttribute('font-size', '11');
        t.setAttribute('font-weight', '700');
        t.setAttribute('fill', 'white');
        t.textContent = 'SW';
        g.appendChild(t);
      } else if (isCore) {
        const t = document.createElementNS(NS, 'text');
        t.setAttribute('x', n.x); t.setAttribute('y', n.y + 4);
        t.setAttribute('text-anchor', 'middle');
        t.setAttribute('font-size', '10');
        t.setAttribute('font-weight', '700');
        t.setAttribute('fill', 'white');
        t.textContent = 'C' + n.id;
        g.appendChild(t);
      } else if (n.id === state.targetId) {
        const t = document.createElementNS(NS, 'text');
        t.setAttribute('x', n.x); t.setAttribute('y', n.y + 5);
        t.setAttribute('text-anchor', 'middle');
        t.setAttribute('font-size', '11');
        t.setAttribute('font-weight', '700');
        t.setAttribute('fill', 'white');
        t.textContent = '★';
        g.appendChild(t);
      }

      svg.appendChild(g);
    });

    // Update stats
    const activeLinks = state.links.filter(([a, b]) => !state.failed.has(a) && !state.failed.has(b)).length;
    document.getElementById('topo-stat-links').textContent = activeLinks;
    document.getElementById('topo-stat-reach').textContent =
      reach.size + ' / ' + state.nodes.length;
    document.getElementById('topo-stat-failed').textContent = state.failed.size;
    const spof = detectSpof();
    const spofEl = document.getElementById('topo-stat-spof');
    if (spof === 0) {
      spofEl.textContent = 'none';
      spofEl.style.color = 'var(--green)';
    } else {
      spofEl.textContent = spof;
      spofEl.style.color = 'var(--red)';
    }

    // Note
    const lang = (document.documentElement.getAttribute('data-lang') || 'en');
    noteEl.innerHTML = '<span class="badge">' + (lang === 'ru' ? 'Подсказка' : 'Hint') + '</span>' +
      TEXT[state.topology][lang];
  }

  function setTopology(name) {
    state.topology = name;
    state.failed = new Set();
    const built = buildTopology(name);
    state.nodes = built.nodes;
    state.links = built.links;
    // Pick a target: a real device (not hub/core/bus-point)
    const candidates = state.nodes.filter(n => !n.isHub && !n.isBusPoint && !n.isCore).map(n => n.id);
    state.targetId = candidates[candidates.length - 1];
    render();
  }

  select.addEventListener('change', e => setTopology(e.target.value));
  resetBtn.addEventListener('click', () => { state.failed.clear(); render(); });
  randBtn.addEventListener('click', () => {
    const live = state.nodes.filter(n => !state.failed.has(n.id) && n.id !== state.targetId);
    if (!live.length) return;
    const pick = live[Math.floor(Math.random() * live.length)];
    state.failed.add(pick.id);
    render();
  });
  document.addEventListener('langchange', render);

  setTopology('star');
})();
