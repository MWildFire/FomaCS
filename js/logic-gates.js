// A1.2 — Logic gates: pick a gate, toggle inputs, see output + truth table.
(function () {
  const root = document.getElementById('logic-sim');
  if (!root) return;

  const gateSel = root.querySelector('#logic-gate');
  const inAEl = root.querySelector('#logic-a');
  const inBEl = root.querySelector('#logic-b');
  const inBWrap = root.querySelector('#logic-b-wrap');
  const svg = root.querySelector('#logic-svg');
  const outEl = root.querySelector('#logic-out');
  const truthBox = root.querySelector('#logic-truth');
  const exprEl = root.querySelector('#logic-expr');

  const GATES = {
    AND:  { binary: true,  fn: (a, b) => a & b,        expr: 'A · B', label: 'AND' },
    OR:   { binary: true,  fn: (a, b) => a | b,        expr: 'A + B', label: 'OR' },
    NOT:  { binary: false, fn: (a)     => a ? 0 : 1,    expr: 'NOT A', label: 'NOT (inverter)' },
    NAND: { binary: true,  fn: (a, b) => (a & b) ? 0 : 1, expr: 'NOT(A · B)', label: 'NAND' },
    NOR:  { binary: true,  fn: (a, b) => (a | b) ? 0 : 1, expr: 'NOT(A + B)', label: 'NOR' },
    XOR:  { binary: true,  fn: (a, b) => a ^ b,        expr: 'A ⊕ B', label: 'XOR' }
  };

  function L() { return document.documentElement.getAttribute('data-lang') === 'ru' ? 'ru' : 'en'; }

  function gate() { return GATES[gateSel.value]; }
  function inA() { return inAEl.checked ? 1 : 0; }
  function inB() { return inBEl.checked ? 1 : 0; }
  function compute() {
    const g = gate();
    return g.binary ? g.fn(inA(), inB()) : g.fn(inA());
  }

  function renderControls() {
    const binary = gate().binary;
    inBWrap.style.display = binary ? '' : 'none';
  }

  function renderSvg() {
    const T = window.Theme;
    const a = inA(), b = inB();
    const out = compute();
    const binary = gate().binary;
    const onColor = T.green, offColor = T.textFaint;

    const W = 500, H = 220;
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    let s = '';

    // Input wires
    s += '<text x="20" y="65" fill="' + T.text + '" font-family="ui-monospace" font-size="14">A=' + a + '</text>';
    s += line(60, 60, 200, 60, a ? onColor : offColor, a);
    if (binary) {
      s += '<text x="20" y="165" fill="' + T.text + '" font-family="ui-monospace" font-size="14">B=' + b + '</text>';
      s += line(60, 160, 200, 160, b ? onColor : offColor, b);
    }

    // Gate body (rendered specific to type)
    s += gateShape(gateSel.value, 200, binary ? 110 : 60, binary, T);

    // Output wire
    const outY = binary ? 110 : 60;
    s += line(330, outY, 460, outY, out ? onColor : offColor, out);
    s += '<text x="470" y="' + (outY + 5) + '" fill="' + T.text + '" font-family="ui-monospace" font-size="14">' + out + '</text>';

    // Output indicator lamp (digit inside + colour) — colour is not the only signal
    s += '<circle cx="445" cy="' + outY + '" r="11" fill="' + (out ? onColor : T.surface2) + '" stroke="' + T.border + '" stroke-width="2"/>';
    s += '<text x="445" y="' + (outY + 4) + '" fill="' + (out ? '#fff' : T.textMuted) + '" font-family="ui-monospace" font-size="11" font-weight="700" text-anchor="middle">' + out + '</text>';

    svg.innerHTML = s;
  }

  function line(x1, y1, x2, y2, color, on) {
    // Solid for "on" signal, dashed thinner for "off" — colour is not the only signal.
    const dash = on ? '' : ' stroke-dasharray="6 5"';
    const w = on ? 3.5 : 2;
    return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + color + '" stroke-width="' + w + '"' + dash + ' />';
  }

  function gateShape(type, x, cy, binary, T) {
    // x = left edge of gate body, cy = vertical centre
    const stroke = 'stroke="' + T.text + '" stroke-width="2"';
    const fill = 'fill="' + T.surface + '"';
    switch (type) {
      case 'AND':
      case 'NAND': {
        const path = 'M ' + x + ' ' + (cy - 50) + ' L ' + (x + 50) + ' ' + (cy - 50) +
                     ' A 50 50 0 0 1 ' + (x + 50) + ' ' + (cy + 50) +
                     ' L ' + x + ' ' + (cy + 50) + ' Z';
        let r = '<path d="' + path + '" ' + fill + ' ' + stroke + ' />';
        if (type === 'NAND') r += '<circle cx="' + (x + 110) + '" cy="' + cy + '" r="6" ' + fill + ' ' + stroke + ' />';
        r += '<text x="' + (x + 25) + '" y="' + (cy + 5) + '" fill="' + T.textMuted + '" font-size="14" text-anchor="middle">' + type + '</text>';
        return r;
      }
      case 'OR':
      case 'NOR': {
        const path = 'M ' + x + ' ' + (cy - 50) +
                     ' Q ' + (x + 30) + ' ' + cy + ' ' + x + ' ' + (cy + 50) +
                     ' Q ' + (x + 60) + ' ' + (cy + 50) + ' ' + (x + 100) + ' ' + cy +
                     ' Q ' + (x + 60) + ' ' + (cy - 50) + ' ' + x + ' ' + (cy - 50) + ' Z';
        let r = '<path d="' + path + '" ' + fill + ' ' + stroke + ' />';
        if (type === 'NOR') r += '<circle cx="' + (x + 110) + '" cy="' + cy + '" r="6" ' + fill + ' ' + stroke + ' />';
        r += '<text x="' + (x + 50) + '" y="' + (cy + 5) + '" fill="' + T.textMuted + '" font-size="14" text-anchor="middle">' + type + '</text>';
        return r;
      }
      case 'NOT': {
        // Triangle pointing right + bubble
        const path = 'M ' + x + ' ' + (cy - 40) + ' L ' + (x + 100) + ' ' + cy + ' L ' + x + ' ' + (cy + 40) + ' Z';
        let r = '<path d="' + path + '" ' + fill + ' ' + stroke + ' />';
        r += '<circle cx="' + (x + 110) + '" cy="' + cy + '" r="6" ' + fill + ' ' + stroke + ' />';
        r += '<text x="' + (x + 40) + '" y="' + (cy + 5) + '" fill="' + T.textMuted + '" font-size="14" text-anchor="middle">NOT</text>';
        return r;
      }
      case 'XOR': {
        const path = 'M ' + (x + 5) + ' ' + (cy - 50) +
                     ' Q ' + (x + 35) + ' ' + cy + ' ' + (x + 5) + ' ' + (cy + 50) +
                     ' Q ' + (x + 65) + ' ' + (cy + 50) + ' ' + (x + 105) + ' ' + cy +
                     ' Q ' + (x + 65) + ' ' + (cy - 50) + ' ' + (x + 5) + ' ' + (cy - 50) + ' Z';
        let r = '<path d="' + path + '" ' + fill + ' ' + stroke + ' />';
        // extra inner arc for XOR
        const arc = 'M ' + (x - 8) + ' ' + (cy - 50) + ' Q ' + (x + 22) + ' ' + cy + ' ' + (x - 8) + ' ' + (cy + 50);
        r += '<path d="' + arc + '" fill="none" ' + stroke + ' />';
        r += '<text x="' + (x + 55) + '" y="' + (cy + 5) + '" fill="' + T.textMuted + '" font-size="14" text-anchor="middle">XOR</text>';
        return r;
      }
    }
    return '';
  }

  function renderTruthTable() {
    const g = gate();
    const a = inA(), b = inB();
    let s = '<table class="truth-table"><thead><tr><th>A</th>' +
            (g.binary ? '<th>B</th>' : '') +
            '<th>' + (L() === 'ru' ? 'Выход' : 'Out') + '</th></tr></thead><tbody>';
    if (g.binary) {
      for (const ax of [0, 1]) for (const bx of [0, 1]) {
        const out = g.fn(ax, bx);
        const current = (ax === a && bx === b);
        s += '<tr' + (current ? ' class="current"' : '') + '><td>' + ax + '</td><td>' + bx + '</td><td><b>' + out + '</b></td></tr>';
      }
    } else {
      for (const ax of [0, 1]) {
        const out = g.fn(ax);
        const current = ax === a;
        s += '<tr' + (current ? ' class="current"' : '') + '><td>' + ax + '</td><td><b>' + out + '</b></td></tr>';
      }
    }
    s += '</tbody></table>';
    truthBox.innerHTML = s;
  }

  function update() {
    renderControls();
    renderSvg();
    renderTruthTable();
    outEl.textContent = compute();
    exprEl.textContent = gate().expr;
  }

  gateSel.addEventListener('change', update);
  inAEl.addEventListener('change', update);
  inBEl.addEventListener('change', update);
  document.addEventListener('themechange', update);
  document.addEventListener('langchange', update);

  update();
})();
