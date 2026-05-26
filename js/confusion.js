// Confusion matrix interactive
(function () {
  const svg = document.getElementById('cm-svg');
  if (!svg) return;
  const NS = 'http://www.w3.org/2000/svg';

  const inputs = {
    tp: document.getElementById('cm-tp'),
    fp: document.getElementById('cm-fp'),
    fn: document.getElementById('cm-fn'),
    tn: document.getElementById('cm-tn')
  };
  const vals = {
    tp: document.getElementById('cm-tp-v'),
    fp: document.getElementById('cm-fp-v'),
    fn: document.getElementById('cm-fn-v'),
    tn: document.getElementById('cm-tn-v')
  };

  function render() {
    const TP = parseInt(inputs.tp.value);
    const FP = parseInt(inputs.fp.value);
    const FN = parseInt(inputs.fn.value);
    const TN = parseInt(inputs.tn.value);

    vals.tp.textContent = TP;
    vals.fp.textContent = FP;
    vals.fn.textContent = FN;
    vals.tn.textContent = TN;

    const total = TP + FP + FN + TN;
    const accuracy = total ? (TP + TN) / total : 0;
    const precision = (TP + FP) ? TP / (TP + FP) : 0;
    const recall = (TP + FN) ? TP / (TP + FN) : 0;
    const f1 = (precision + recall) ? 2 * precision * recall / (precision + recall) : 0;

    document.getElementById('cm-acc').textContent = (accuracy * 100).toFixed(1) + '%';
    document.getElementById('cm-prec').textContent = (precision * 100).toFixed(1) + '%';
    document.getElementById('cm-rec').textContent = (recall * 100).toFixed(1) + '%';
    document.getElementById('cm-f1').textContent = f1.toFixed(3);

    // Draw matrix
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    const lang = document.documentElement.getAttribute('data-lang') || 'en';

    const x0 = 220, y0 = 60, cellW = 200, cellH = 100;
    const cells = [
      { x: 0, y: 0, label: 'TP', val: TP, color: '#10b981', sub: lang === 'ru' ? 'Истинно +' : 'True Positive' },
      { x: 1, y: 0, label: 'FN', val: FN, color: '#f59e0b', sub: lang === 'ru' ? 'Ложно −' : 'False Negative' },
      { x: 0, y: 1, label: 'FP', val: FP, color: '#ef4444', sub: lang === 'ru' ? 'Ложно +' : 'False Positive' },
      { x: 1, y: 1, label: 'TN', val: TN, color: '#94a3b8', sub: lang === 'ru' ? 'Истинно −' : 'True Negative' }
    ];

    cells.forEach(c => {
      const r = document.createElementNS(NS, 'rect');
      r.setAttribute('x', x0 + c.x * cellW); r.setAttribute('y', y0 + c.y * cellH);
      r.setAttribute('width', cellW - 4); r.setAttribute('height', cellH - 4);
      r.setAttribute('rx', 8);
      r.setAttribute('fill', c.color);
      r.setAttribute('fill-opacity', 0.15);
      r.setAttribute('stroke', c.color);
      r.setAttribute('stroke-width', 2);
      svg.appendChild(r);

      const lbl = document.createElementNS(NS, 'text');
      lbl.setAttribute('x', x0 + c.x * cellW + cellW / 2 - 2);
      lbl.setAttribute('y', y0 + c.y * cellH + 38);
      lbl.setAttribute('text-anchor', 'middle');
      lbl.setAttribute('font-size', 28);
      lbl.setAttribute('font-weight', 800);
      lbl.setAttribute('fill', c.color);
      lbl.textContent = c.label;
      svg.appendChild(lbl);

      const v = document.createElementNS(NS, 'text');
      v.setAttribute('x', x0 + c.x * cellW + cellW / 2 - 2);
      v.setAttribute('y', y0 + c.y * cellH + 68);
      v.setAttribute('text-anchor', 'middle');
      v.setAttribute('font-size', 22);
      v.setAttribute('font-weight', 700);
      v.setAttribute('fill', '#0f172a');
      v.setAttribute('font-family', 'ui-monospace, monospace');
      v.textContent = c.val;
      svg.appendChild(v);

      const s = document.createElementNS(NS, 'text');
      s.setAttribute('x', x0 + c.x * cellW + cellW / 2 - 2);
      s.setAttribute('y', y0 + c.y * cellH + 88);
      s.setAttribute('text-anchor', 'middle');
      s.setAttribute('font-size', 11);
      s.setAttribute('fill', '#475569');
      s.textContent = c.sub;
      svg.appendChild(s);
    });

    // Headers
    const head = (x, y, t) => {
      const e = document.createElementNS(NS, 'text');
      e.setAttribute('x', x); e.setAttribute('y', y);
      e.setAttribute('text-anchor', 'middle');
      e.setAttribute('font-size', 13);
      e.setAttribute('font-weight', 700);
      e.setAttribute('fill', '#1a3a5e');
      e.textContent = t;
      return e;
    };
    svg.appendChild(head(x0 + cellW * 0.5, y0 - 30, lang === 'ru' ? 'Предсказание +' : 'Predicted +'));
    svg.appendChild(head(x0 + cellW * 1.5, y0 - 30, lang === 'ru' ? 'Предсказание −' : 'Predicted −'));

    const sideLabel = (x, y, t) => {
      const e = document.createElementNS(NS, 'text');
      e.setAttribute('x', x); e.setAttribute('y', y);
      e.setAttribute('text-anchor', 'middle');
      e.setAttribute('font-size', 13);
      e.setAttribute('font-weight', 700);
      e.setAttribute('fill', '#1a3a5e');
      e.setAttribute('transform', 'rotate(-90 ' + x + ' ' + y + ')');
      e.textContent = t;
      return e;
    };
    svg.appendChild(sideLabel(x0 - 60, y0 + cellH * 0.5, lang === 'ru' ? 'Реально +' : 'Actual +'));
    svg.appendChild(sideLabel(x0 - 60, y0 + cellH * 1.5, lang === 'ru' ? 'Реально −' : 'Actual −'));
  }

  Object.values(inputs).forEach(i => i.addEventListener('input', render));
  document.addEventListener('langchange', render);
  render();
})();
