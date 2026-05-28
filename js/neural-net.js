// Neural Network forward-pass visualization (A4.3 HL)
// 3-layer ANN: 3 inputs -> 4 hidden -> 2 outputs. Click edges to edit weights.
(function () {
  const root = document.getElementById('neural-sim');
  if (!root) return;
  const svg = document.getElementById('nn-svg');
  const inSliders = [
    document.getElementById('nn-input-1'),
    document.getElementById('nn-input-2'),
    document.getElementById('nn-input-3')
  ];
  const actSel = document.getElementById('nn-activation');
  const randBtn = document.getElementById('nn-randomize');
  const stepBtn = document.getElementById('nn-step');
  const outBars = [
    document.getElementById('nn-output-1'),
    document.getElementById('nn-output-2')
  ];
  const predEl = document.getElementById('nn-prediction');
  if (!svg || inSliders.some(s => !s) || !actSel || !randBtn || !stepBtn ||
      outBars.some(b => !b) || !predEl) return;
  const NS = 'http://www.w3.org/2000/svg';

  // ---- Architecture ----
  const W = 1000, H = 480;
  const layers = [3, 4, 2];
  const layerX = [180, 500, 820];
  const nodeR = 28;

  // Pre-set "XOR-like" demo weights: input 1 ≈ XOR(in1, in2), input 3 as bias signal.
  // Hidden layer learns OR & AND-like features, output combines them.
  const demo = {
    // W1[h][i] — hidden h from input i
    W1: [
      [ 1.5,  1.5, -0.5],   // h1: OR-ish
      [-1.5, -1.5,  0.8],   // h2: NOR-ish
      [ 1.2, -1.2,  0.3],   // h3: in1 only
      [-1.2,  1.2,  0.3]    // h4: in2 only
    ],
    b1: [-0.5, 1.2, -0.2, -0.2],
    // W2[o][h]
    W2: [
      [ 1.4, -1.4,  0.6,  0.6],   // class 0: "XOR true"
      [-1.4,  1.4, -0.6, -0.6]    // class 1: "XOR false"
    ],
    b2: [0.0, 0.0]
  };

  let net = clone(demo);
  let inputs = [1, 0, 0.5];
  inSliders[0].value = inputs[0]; inSliders[1].value = inputs[1]; inSliders[2].value = inputs[2];

  // Activations on hidden layer; output always softmax for probabilities.
  const acts = {
    sigmoid: x => 1 / (1 + Math.exp(-x)),
    tanh: x => Math.tanh(x),
    relu: x => Math.max(0, x)
  };

  // ---- Forward pass ----
  function forward(state) {
    const z1 = net.b1.map((b, h) => b + state[0] * net.W1[h][0] + state[1] * net.W1[h][1] + state[2] * net.W1[h][2]);
    const fn = acts[actSel.value] || acts.sigmoid;
    const a1 = z1.map(fn);
    const z2 = net.b2.map((b, o) => b + a1.reduce((s, v, h) => s + v * net.W2[o][h], 0));
    // softmax for output
    const m = Math.max(...z2);
    const ex = z2.map(v => Math.exp(v - m));
    const sum = ex.reduce((a, b) => a + b, 0);
    const a2 = ex.map(v => v / sum);
    return { z1, a1, z2, a2 };
  }

  // ---- Drawing ----
  let hidPos = [], inPos = [], outPos = [];
  let edgeRefs = []; // {el, layer, from, to}
  let nodeRefs = { in: [], hid: [], out: [] };

  function colorForWeight(w) {
    const mag = Math.min(Math.abs(w) / 2.5, 1);
    if (w >= 0) return `rgba(16, 185, 129, ${0.25 + 0.65 * mag})`;
    return `rgba(239, 68, 68, ${0.25 + 0.65 * mag})`;
  }

  function widthForWeight(w) {
    return 1 + Math.min(Math.abs(w), 3) * 1.6;
  }

  function buildPositions() {
    inPos = [];
    for (let i = 0; i < layers[0]; i++) {
      const gap = H / (layers[0] + 1);
      inPos.push({ x: layerX[0], y: gap * (i + 1) });
    }
    hidPos = [];
    for (let i = 0; i < layers[1]; i++) {
      const gap = H / (layers[1] + 1);
      hidPos.push({ x: layerX[1], y: gap * (i + 1) });
    }
    outPos = [];
    for (let i = 0; i < layers[2]; i++) {
      const gap = H / (layers[2] + 1);
      outPos.push({ x: layerX[2], y: gap * (i + 1) });
    }
  }

  function clearSvg() {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
  }

  function svgEl(tag, attrs) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }

  function drawNetwork(activations) {
    const T = window.Theme;
    const lang = document.documentElement.getAttribute('data-lang') || 'en';
    clearSvg();
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    edgeRefs = []; nodeRefs = { in: [], hid: [], out: [] };

    // Layer titles
    const titles = lang === 'ru'
      ? ['Входной слой', 'Скрытый слой', 'Выходной слой']
      : ['Input layer', 'Hidden layer', 'Output layer'];
    for (let l = 0; l < 3; l++) {
      const t = svgEl('text', {
        x: layerX[l], y: 22, 'text-anchor': 'middle',
        'font-size': 14, 'font-weight': 700, fill: T.primary
      });
      t.textContent = titles[l];
      svg.appendChild(t);
      const sub = svgEl('text', {
        x: layerX[l], y: 40, 'text-anchor': 'middle',
        'font-size': 11, fill: T.textMuted
      });
      sub.textContent = l === 1 ? (actSel.options[actSel.selectedIndex].text) : '';
      svg.appendChild(sub);
    }

    // Edges: input -> hidden
    for (let h = 0; h < layers[1]; h++) {
      for (let i = 0; i < layers[0]; i++) {
        const w = net.W1[h][i];
        const line = svgEl('line', {
          x1: inPos[i].x + nodeR, y1: inPos[i].y,
          x2: hidPos[h].x - nodeR, y2: hidPos[h].y,
          stroke: colorForWeight(w),
          'stroke-width': widthForWeight(w),
          'stroke-linecap': 'round',
          cursor: 'pointer'
        });
        line.addEventListener('click', () => openWeightEditor(1, h, i, line));
        svg.appendChild(line);
        edgeRefs.push({ el: line, layer: 1, h, i });

        // Weight label at midpoint, only show when |w| big enough to read
        if (Math.abs(w) > 0.25) {
          const mx = (inPos[i].x + hidPos[h].x) / 2 + (i - 1) * 6;
          const my = (inPos[i].y + hidPos[h].y) / 2 - 4;
          const t = svgEl('text', {
            x: mx, y: my, 'text-anchor': 'middle',
            'font-size': 10, 'font-family': 'ui-monospace, monospace',
            fill: T.textMuted, 'pointer-events': 'none'
          });
          t.textContent = w.toFixed(2);
          svg.appendChild(t);
        }
      }
    }

    // Edges: hidden -> output
    for (let o = 0; o < layers[2]; o++) {
      for (let h = 0; h < layers[1]; h++) {
        const w = net.W2[o][h];
        const line = svgEl('line', {
          x1: hidPos[h].x + nodeR, y1: hidPos[h].y,
          x2: outPos[o].x - nodeR, y2: outPos[o].y,
          stroke: colorForWeight(w),
          'stroke-width': widthForWeight(w),
          'stroke-linecap': 'round',
          cursor: 'pointer'
        });
        line.addEventListener('click', () => openWeightEditor(2, o, h, line));
        svg.appendChild(line);
        edgeRefs.push({ el: line, layer: 2, o, h });

        if (Math.abs(w) > 0.25) {
          const mx = (hidPos[h].x + outPos[o].x) / 2 + (h - 1.5) * 4;
          const my = (hidPos[h].y + outPos[o].y) / 2 - 4;
          const t = svgEl('text', {
            x: mx, y: my, 'text-anchor': 'middle',
            'font-size': 10, 'font-family': 'ui-monospace, monospace',
            fill: T.textMuted, 'pointer-events': 'none'
          });
          t.textContent = w.toFixed(2);
          svg.appendChild(t);
        }
      }
    }

    // Nodes
    function drawNode(pos, value, label, sub, bucket) {
      const intensity = Math.min(Math.abs(value), 1);
      const fill = value >= 0
        ? `rgba(14, 165, 233, ${0.18 + 0.55 * intensity})`
        : `rgba(139, 92, 246, ${0.18 + 0.55 * intensity})`;
      const g = svgEl('g', {});
      const circ = svgEl('circle', {
        cx: pos.x, cy: pos.y, r: nodeR,
        fill, stroke: T.primary, 'stroke-width': 2
      });
      g.appendChild(circ);
      const v = svgEl('text', {
        x: pos.x, y: pos.y + 4, 'text-anchor': 'middle',
        'font-size': 13, 'font-weight': 700,
        'font-family': 'ui-monospace, monospace', fill: T.text
      });
      v.textContent = (value).toFixed(2);
      g.appendChild(v);
      if (label) {
        const lbl = svgEl('text', {
          x: pos.x, y: pos.y - nodeR - 8, 'text-anchor': 'middle',
          'font-size': 11, 'font-weight': 600, fill: T.text
        });
        lbl.textContent = label;
        g.appendChild(lbl);
      }
      if (sub) {
        const s = svgEl('text', {
          x: pos.x, y: pos.y + nodeR + 16, 'text-anchor': 'middle',
          'font-size': 10, fill: T.textMuted
        });
        s.textContent = sub;
        g.appendChild(s);
      }
      svg.appendChild(g);
      nodeRefs[bucket].push({ g, circ });
    }

    for (let i = 0; i < layers[0]; i++) {
      drawNode(inPos[i], inputs[i], 'x' + (i + 1), null, 'in');
    }
    for (let h = 0; h < layers[1]; h++) {
      const v = activations ? activations.a1[h] : 0;
      const z = activations ? activations.z1[h] : 0;
      drawNode(hidPos[h], v, 'h' + (h + 1), 'z=' + z.toFixed(2), 'hid');
    }
    const classLabels = lang === 'ru' ? ['Класс A', 'Класс B'] : ['Class A', 'Class B'];
    for (let o = 0; o < layers[2]; o++) {
      const v = activations ? activations.a2[o] : 0;
      const z = activations ? activations.z2[o] : 0;
      drawNode(outPos[o], v, classLabels[o], 'z=' + z.toFixed(2), 'out');
    }
  }

  // ---- Forward-pass animation: pulse each layer in turn ----
  let animTimers = [];
  function cancelAnim() {
    animTimers.forEach(t => clearTimeout(t));
    animTimers = [];
    nodeRefs.in.concat(nodeRefs.hid, nodeRefs.out).forEach(n => {
      n.circ.removeAttribute('filter');
      n.circ.setAttribute('stroke-width', 2);
    });
  }

  function pulseLayer(bucket) {
    const T = window.Theme;
    nodeRefs[bucket].forEach(n => {
      n.circ.setAttribute('stroke', T.amber);
      n.circ.setAttribute('stroke-width', 5);
    });
    animTimers.push(setTimeout(() => {
      nodeRefs[bucket].forEach(n => {
        n.circ.setAttribute('stroke', T.primary);
        n.circ.setAttribute('stroke-width', 2);
      });
    }, 500));
  }

  function animateForward() {
    cancelAnim();
    const a = forward(inputs);
    drawNetwork(a);
    updateOutputs(a);
    pulseLayer('in');
    animTimers.push(setTimeout(() => pulseLayer('hid'), 700));
    animTimers.push(setTimeout(() => pulseLayer('out'), 1400));
  }

  // ---- Output bars + prediction ----
  function updateOutputs(a) {
    const lang = document.documentElement.getAttribute('data-lang') || 'en';
    const labels = lang === 'ru' ? ['Класс A', 'Класс B'] : ['Class A', 'Class B'];
    outBars.forEach((bar, i) => {
      const pct = (a.a2[i] * 100).toFixed(1);
      bar.style.width = pct + '%';
      bar.textContent = labels[i] + ': ' + pct + '%';
      bar.style.background = i === 0 ? 'var(--accent)' : 'var(--violet)';
    });
    const winner = a.a2[0] >= a.a2[1] ? 0 : 1;
    const conf = (a.a2[winner] * 100).toFixed(1);
    predEl.textContent = (lang === 'ru' ? 'Предсказание: ' : 'Prediction: ') +
                        labels[winner] + ' (' + conf + '%)';
    predEl.style.color = winner === 0 ? 'var(--accent)' : 'var(--violet)';
  }

  // ---- Weight editor popup ----
  let editor = null;
  function closeEditor() {
    if (editor && editor.parentNode) editor.parentNode.removeChild(editor);
    editor = null;
  }
  document.addEventListener('click', e => {
    if (editor && !editor.contains(e.target) && e.target.tagName !== 'line') closeEditor();
  });

  function openWeightEditor(layer, a, b, lineEl) {
    closeEditor();
    const lang = document.documentElement.getAttribute('data-lang') || 'en';
    const rect = lineEl.getBoundingClientRect();
    const w = layer === 1 ? net.W1[a][b] : net.W2[a][b];
    editor = document.createElement('div');
    editor.style.cssText = `position:fixed;top:${rect.top + rect.height / 2 - 30}px;left:${rect.left + rect.width / 2 - 80}px;background:var(--surface);border:1px solid var(--border-strong);border-radius:8px;padding:10px 12px;box-shadow:0 8px 24px rgba(0,0,0,0.18);z-index:1000;font-size:12px;color:var(--text);`;
    const labelText = layer === 1
      ? `W1[h${a + 1}, x${b + 1}]`
      : `W2[o${a + 1}, h${b + 1}]`;
    const valSpan = `<span id="nn-edit-val" style="font-family:ui-monospace,monospace;font-weight:700;color:var(--accent)">${w.toFixed(2)}</span>`;
    editor.innerHTML = `<div style="margin-bottom:6px"><strong>${labelText}</strong> = ${valSpan}</div>
      <input type="range" id="nn-edit-slider" min="-3" max="3" step="0.05" value="${w}" style="width:180px">
      <div style="font-size:10px;color:var(--text-muted);margin-top:4px">${lang === 'ru' ? 'Кликните вне окна, чтобы закрыть' : 'Click outside to close'}</div>`;
    document.body.appendChild(editor);
    const slider = editor.querySelector('#nn-edit-slider');
    const valEl = editor.querySelector('#nn-edit-val');
    slider.addEventListener('input', () => {
      const nv = parseFloat(slider.value);
      if (layer === 1) net.W1[a][b] = nv; else net.W2[a][b] = nv;
      valEl.textContent = nv.toFixed(2);
      render();
    });
  }

  // ---- Helpers ----
  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  function randomize() {
    const rand = () => (Math.random() * 4 - 2);
    net.W1 = net.W1.map(row => row.map(rand));
    net.W2 = net.W2.map(row => row.map(rand));
    net.b1 = net.b1.map(() => Math.random() * 1 - 0.5);
    net.b2 = net.b2.map(() => Math.random() * 1 - 0.5);
    render();
  }

  function reset() {
    net = clone(demo);
    inputs = [1, 0, 0.5];
    inSliders[0].value = '1';
    inSliders[1].value = '0';
    inSliders[2].value = '0.5';
    render();
  }

  // ---- Render ----
  function render() {
    inputs = inSliders.map(s => parseFloat(s.value));
    const a = forward(inputs);
    drawNetwork(a);
    updateOutputs(a);
  }

  // ---- Wire up ----
  buildPositions();
  inSliders.forEach(s => s.addEventListener('input', render));
  actSel.addEventListener('change', render);
  randBtn.addEventListener('click', randomize);
  stepBtn.addEventListener('click', animateForward);
  // Re-purpose any 'reset' button if exposed via data attr; demo reset is double-click on stepBtn
  stepBtn.addEventListener('dblclick', reset);

  document.addEventListener('langchange', render);
  document.addEventListener('themechange', render);

  render();
})();
