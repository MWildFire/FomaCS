// A1.2.4 HL — Karnaugh map simplifier.
// Click cells to toggle 0/1; auto-detects prime implicants (groups of 1, 2, 4, 8 with wraparound)
// and renders the simplified SOP expression. Supports 2, 3, 4 variables.
(function () {
  const root = document.getElementById('karnaugh-sim');
  if (!root) return;

  const varsSel   = root.querySelector('#kmap-vars');
  const svg       = root.querySelector('#kmap-svg');
  const truthBox  = root.querySelector('#kmap-truth');
  const exprEl    = root.querySelector('#kmap-expr');
  const randomBtn = root.querySelector('#kmap-random');
  const clearBtn  = root.querySelector('#kmap-clear');
  const essOnly   = root.querySelector('#kmap-essential');

  if (!varsSel || !svg || !truthBox || !exprEl || !randomBtn || !clearBtn) return;

  const VAR_NAMES = ['A', 'B', 'C', 'D'];
  const GROUP_COLORS = ['#ef4444', '#0ea5e9', '#8b5cf6', '#f59e0b', '#10b981', '#ec4899', '#14b8a6', '#a855f7'];

  let nVars = parseInt(varsSel.value, 10) || 3;
  let outputs = new Array(1 << nVars).fill(0); // index = minterm

  function L() { return document.documentElement.getAttribute('data-lang') === 'ru' ? 'ru' : 'en'; }
  function tr(en, ru) { return L() === 'ru' ? ru : en; }

  // ---- K-map geometry ----
  // Returns { rows: [bitTuples], cols: [bitTuples], rowVars: [...], colVars: [...], mintermAt(r,c) }
  function geometry(n) {
    // Standard Gray-code orderings for K-maps:
    // n=2: rows=A (0,1), cols=B (0,1)            -> minterm = A*2 + B
    // n=3: rows=A (0,1), cols=BC (00,01,11,10)  -> minterm = A*4 + BC
    // n=4: rows=AB (00,01,11,10), cols=CD (00,01,11,10) -> minterm = AB*4 + CD
    if (n === 2) {
      return {
        rowVars: ['A'], colVars: ['B'],
        rowGray: [[0], [1]], colGray: [[0], [1]],
        rowCount: 2, colCount: 2,
        mintermAt(r, c) { return (this.rowGray[r][0] << 1) | this.colGray[c][0]; }
      };
    }
    if (n === 3) {
      return {
        rowVars: ['A'], colVars: ['B', 'C'],
        rowGray: [[0], [1]],
        colGray: [[0, 0], [0, 1], [1, 1], [1, 0]],
        rowCount: 2, colCount: 4,
        mintermAt(r, c) {
          return (this.rowGray[r][0] << 2) | (this.colGray[c][0] << 1) | this.colGray[c][1];
        }
      };
    }
    // n === 4
    return {
      rowVars: ['A', 'B'], colVars: ['C', 'D'],
      rowGray: [[0, 0], [0, 1], [1, 1], [1, 0]],
      colGray: [[0, 0], [0, 1], [1, 1], [1, 0]],
      rowCount: 4, colCount: 4,
      mintermAt(r, c) {
        return (this.rowGray[r][0] << 3) | (this.rowGray[r][1] << 2) |
               (this.colGray[c][0] << 1) | this.colGray[c][1];
      }
    };
  }

  // Map minterm -> (row, col) for current n
  function mintermCells(g) {
    const m = {};
    for (let r = 0; r < g.rowCount; r++)
      for (let c = 0; c < g.colCount; c++)
        m[g.mintermAt(r, c)] = { r, c };
    return m;
  }

  // ---- Quine-style prime-implicant generation via bitmask combining ----
  // A cube is { mask: which bits are "don't care", val: fixed-bit values, mints: set of covered minterms }
  function generatePrimeImplicants(n, outs) {
    const total = 1 << n;
    const ones = [];
    for (let i = 0; i < total; i++) if (outs[i]) ones.push(i);
    if (ones.length === 0) return [];

    // Start with size-1 cubes
    let current = ones.map(m => ({ mask: 0, val: m, mints: new Set([m]) }));
    const primes = [];
    const seen = new Set();

    while (current.length > 0) {
      const used = new Array(current.length).fill(false);
      const next = [];
      const nextKey = new Set();

      for (let i = 0; i < current.length; i++) {
        for (let j = i + 1; j < current.length; j++) {
          const a = current[i], b = current[j];
          if (a.mask !== b.mask) continue;
          const diff = a.val ^ b.val;
          // Combine only if val differs in exactly one fixed bit (not already a don't-care)
          if (popcount(diff) !== 1 || (diff & a.mask) !== 0) continue;
          const newMask = a.mask | diff;
          const newVal = a.val & ~diff; // canonical: zero the freed bit
          const key = newMask + '|' + newVal;
          used[i] = true; used[j] = true;
          if (!nextKey.has(key)) {
            nextKey.add(key);
            const mints = new Set([...a.mints, ...b.mints]);
            next.push({ mask: newMask, val: newVal, mints });
          }
        }
      }

      // Any cube that wasn't combined is a prime implicant
      for (let i = 0; i < current.length; i++) {
        if (!used[i]) {
          const key = current[i].mask + '|' + current[i].val;
          if (!seen.has(key)) {
            seen.add(key);
            primes.push(current[i]);
          }
        }
      }
      current = next;
    }
    return primes;
  }

  function popcount(x) { let c = 0; while (x) { c += x & 1; x >>= 1; } return c; }

  // ---- Cover selection: greedy minimum cover, with essential prime implicants flagged ----
  function selectCover(primes, outs, n) {
    const total = 1 << n;
    const minterms = [];
    for (let i = 0; i < total; i++) if (outs[i]) minterms.push(i);

    // Mark each prime as essential if it uniquely covers any minterm
    const essential = new Set();
    for (const m of minterms) {
      const covering = primes.filter(p => p.mints.has(m));
      if (covering.length === 1) essential.add(covering[0]);
    }

    const chosen = [...essential];
    const covered = new Set();
    for (const p of chosen) for (const m of p.mints) covered.add(m);

    // Greedy: pick prime covering most uncovered minterms until done
    const remaining = primes.filter(p => !essential.has(p));
    while (minterms.some(m => !covered.has(m))) {
      let best = null, bestGain = 0;
      for (const p of remaining) {
        if (chosen.includes(p)) continue;
        let gain = 0;
        for (const m of p.mints) if (!covered.has(m)) gain++;
        if (gain > bestGain) { bestGain = gain; best = p; }
      }
      if (!best) break;
      chosen.push(best);
      for (const m of best.mints) covered.add(m);
    }
    return { chosen, essential };
  }

  // ---- Boolean expression for one cube ----
  function cubeToTerm(cube, n) {
    // Bits are MSB first: bit (n-1) = A, bit (n-2) = B, ...
    // For each fixed bit (mask=0), append variable or its complement.
    let parts = [];
    for (let i = n - 1; i >= 0; i--) {
      const fixed = (cube.mask & (1 << i)) === 0;
      if (fixed) {
        const v = VAR_NAMES[(n - 1) - i];
        const bit = (cube.val >> i) & 1;
        parts.push(bit ? v : (v + "'"));
      }
    }
    if (parts.length === 0) return '1';
    return parts.join('');
  }

  function expressionFor(chosen, n, outs) {
    const total = 1 << n;
    const allOnes = outs.every(b => b === 1);
    const allZero = outs.every(b => b === 0);
    if (allZero) return 'F = 0';
    if (allOnes) return 'F = 1';
    const terms = chosen.map(c => cubeToTerm(c, n));
    return 'F = ' + terms.join(' + ');
  }

  // ---- Rendering ----
  function render() {
    const T = window.Theme;
    const g = geometry(nVars);
    const cells = mintermCells(g);
    const primes = generatePrimeImplicants(nVars, outputs);
    const { chosen, essential } = selectCover(primes, outputs, nVars);
    const useList = (essOnly && essOnly.checked) ? chosen.filter(c => essential.has(c)) : chosen;

    drawSvg(g, cells, useList, T);
    drawTruth(g);
    exprEl.textContent = expressionFor(useList, nVars, outputs);
  }

  function drawSvg(g, cells, cubes, T) {
    const cell = 70, padL = 70, padT = 60;
    const W = padL + g.colCount * cell + 30;
    const H = padT + g.rowCount * cell + 30;
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);

    let s = '';

    // Column header label (variables in top-left corner)
    s += text(padL - 10, padT - 36, g.colVars.join(''), T.textMuted, 13, 'end', 700);
    s += text(padL - 36, padT - 10, g.rowVars.join(''), T.textMuted, 13, 'end', 700);
    // Diagonal slash for top-left header
    s += '<line x1="' + (padL - 50) + '" y1="' + (padT - 50) + '" x2="' + (padL - 4) + '" y2="' + (padT - 4) + '" stroke="' + T.borderStrong + '" stroke-width="1.5"/>';

    // Column headers (Gray code for col vars)
    for (let c = 0; c < g.colCount; c++) {
      const x = padL + c * cell + cell / 2;
      s += text(x, padT - 18, g.colGray[c].join(''), T.textMuted, 14, 'middle', 600);
    }
    // Row headers (Gray code for row vars)
    for (let r = 0; r < g.rowCount; r++) {
      const y = padT + r * cell + cell / 2 + 5;
      s += text(padL - 18, y, g.rowGray[r].join(''), T.textMuted, 14, 'end', 600);
    }

    // Cells
    for (let r = 0; r < g.rowCount; r++) {
      for (let c = 0; c < g.colCount; c++) {
        const m = g.mintermAt(r, c);
        const x = padL + c * cell, y = padT + r * cell;
        const on = outputs[m] === 1;
        const fill = on ? 'rgba(16,185,129,0.22)' : (T.surface || '#fff');
        s += '<rect class="kmap-cell" data-minterm="' + m + '" x="' + x + '" y="' + y + '" width="' + cell + '" height="' + cell + '" fill="' + fill + '" stroke="' + T.borderStrong + '" stroke-width="1.5" style="cursor:pointer"/>';
        // Minterm number, top-left small
        s += text(x + 7, y + 14, 'm' + m, T.textFaint, 10, 'start', 500);
        // Value, big centered
        const valColor = on ? T.green : T.textFaint;
        s += text(x + cell / 2, y + cell / 2 + 9, String(outputs[m]), valColor, 26, 'middle', 800);
      }
    }

    // Groups: draw ovals (rounded rectangles) for each cube. Wraparound = split into 2 or 4 rectangles.
    cubes.forEach((cube, idx) => {
      const color = GROUP_COLORS[idx % GROUP_COLORS.length];
      const rects = cubeToRects(cube, g, cells);
      rects.forEach((rc, i) => {
        const x = padL + rc.c0 * cell + 4;
        const y = padT + rc.r0 * cell + 4;
        const w = rc.span_c * cell - 8;
        const h = rc.span_r * cell - 8;
        // Offset each group slightly to reduce overlap
        const off = idx * 2;
        s += '<rect x="' + (x - off) + '" y="' + (y - off) + '" width="' + (w + off * 2) + '" height="' + (h + off * 2) + '" rx="' + Math.min(w, h) / 2 + '" ry="' + Math.min(w, h) / 2 + '" fill="none" stroke="' + color + '" stroke-width="3" opacity="0.85"/>';
      });
    });

    // Legend (group colours + term)
    if (cubes.length) {
      let ly = padT + g.rowCount * cell + 22;
      cubes.forEach((cube, idx) => {
        const color = GROUP_COLORS[idx % GROUP_COLORS.length];
        const term = cubeToTerm(cube, nVars);
        s += '<rect x="' + (padL) + '" y="' + (ly - 10) + '" width="14" height="14" fill="none" stroke="' + color + '" stroke-width="3" rx="7"/>';
        s += text(padL + 22, ly + 1, term, T.text, 13, 'start', 700);
        ly += 0; // single line; if many groups overflow, do nothing — legend below grid
      });
    }

    svg.innerHTML = s;

    // Click handlers (re-bind after innerHTML)
    svg.querySelectorAll('.kmap-cell').forEach(r => {
      r.addEventListener('click', () => {
        const m = parseInt(r.getAttribute('data-minterm'), 10);
        outputs[m] = outputs[m] ? 0 : 1;
        render();
      });
    });
  }

  // Decompose a cube (mask, val) into rectangles inside the K-map grid, handling wraparound.
  function cubeToRects(cube, g, cells) {
    // Collect (r,c) pairs the cube covers
    const points = [];
    cube.mints.forEach(m => { if (cells[m] !== undefined) points.push(cells[m]); });
    // Group by row, then find contiguous (with wrap) column runs per row group.
    // Easier: find the unique set of rows and cols, then test wrap.
    const rowSet = [...new Set(points.map(p => p.r))].sort((a, b) => a - b);
    const colSet = [...new Set(points.map(p => p.c))].sort((a, b) => a - b);

    // Detect wrap on rows / cols
    const rowWrap = wrapSegments(rowSet, g.rowCount);
    const colWrap = wrapSegments(colSet, g.colCount);

    const rects = [];
    for (const rSeg of rowWrap) for (const cSeg of colWrap) {
      rects.push({ r0: rSeg.start, span_r: rSeg.len, c0: cSeg.start, span_c: cSeg.len });
    }
    return rects;
  }

  // Given a sorted set of indices into [0, N), return contiguous segments allowing wrap from N-1 to 0.
  function wrapSegments(set, N) {
    if (set.length === 0) return [];
    if (set.length === N) return [{ start: 0, len: N }];
    // Contiguous segments
    const segs = [];
    let s = set[0], prev = set[0];
    for (let i = 1; i < set.length; i++) {
      if (set[i] === prev + 1) { prev = set[i]; continue; }
      segs.push({ start: s, len: prev - s + 1 });
      s = set[i]; prev = set[i];
    }
    segs.push({ start: s, len: prev - s + 1 });
    // Merge first/last if wrap (last segment ends at N-1 and first starts at 0)
    if (segs.length > 1 && segs[0].start === 0 && segs[segs.length - 1].start + segs[segs.length - 1].len === N) {
      // Wrap: split into two rectangles (one at end, one at start) — both are drawn.
      // Return them as-is so two rectangles are rendered.
    }
    return segs;
  }

  function text(x, y, str, fill, size, anchor, weight) {
    return '<text x="' + x + '" y="' + y + '" fill="' + fill + '" font-family="ui-monospace,monospace" font-size="' + size + '" text-anchor="' + (anchor || 'start') + '" font-weight="' + (weight || 400) + '">' + str + '</text>';
  }

  function drawTruth(g) {
    const heads = [];
    for (let i = 0; i < nVars; i++) heads.push(VAR_NAMES[i]);
    heads.push('m');
    heads.push(tr('F', 'F'));

    let s = '<table class="truth-table"><thead><tr>';
    for (const h of heads) s += '<th>' + h + '</th>';
    s += '</tr></thead><tbody>';
    const total = 1 << nVars;
    for (let m = 0; m < total; m++) {
      s += '<tr>';
      for (let i = 0; i < nVars; i++) {
        const bit = (m >> (nVars - 1 - i)) & 1;
        s += '<td>' + bit + '</td>';
      }
      s += '<td style="color:var(--text-faint)">' + m + '</td>';
      const v = outputs[m];
      s += '<td class="' + (v ? 't-true' : 't-false') + '" data-minterm="' + m + '" style="cursor:pointer"><b>' + v + '</b></td>';
      s += '</tr>';
    }
    s += '</tbody></table>';
    truthBox.innerHTML = s;

    // Click on the F column to toggle as well
    truthBox.querySelectorAll('td[data-minterm]').forEach(td => {
      td.addEventListener('click', () => {
        const m = parseInt(td.getAttribute('data-minterm'), 10);
        outputs[m] = outputs[m] ? 0 : 1;
        render();
      });
    });
  }

  // ---- Controls ----
  varsSel.addEventListener('change', () => {
    nVars = parseInt(varsSel.value, 10);
    outputs = new Array(1 << nVars).fill(0);
    render();
  });
  randomBtn.addEventListener('click', () => {
    for (let i = 0; i < outputs.length; i++) outputs[i] = Math.random() < 0.5 ? 1 : 0;
    render();
  });
  clearBtn.addEventListener('click', () => {
    outputs = new Array(1 << nVars).fill(0);
    render();
  });
  if (essOnly) essOnly.addEventListener('change', render);

  document.addEventListener('themechange', render);
  document.addEventListener('langchange', render);

  render();
})();
