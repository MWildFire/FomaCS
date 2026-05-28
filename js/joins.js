// A3.3 — SQL JOINs interactive: Venn diagram + live result table + SQL preview.
// Lets the student switch between INNER / LEFT / RIGHT / FULL OUTER / CROSS,
// edit base-table rows, and watch the result + Venn highlight rebuild live.
(function () {
  const root = document.getElementById('joins-sim');
  if (!root) return;

  const typeEl = document.getElementById('joins-type');
  const venn = document.getElementById('joins-venn');
  const tableAEl = document.getElementById('joins-table-a');
  const tableBEl = document.getElementById('joins-table-b');
  const resultEl = document.getElementById('joins-result');
  const sqlEl = document.getElementById('joins-sql');
  const editBtn = document.getElementById('joins-edit');
  if (!typeEl || !venn || !tableAEl || !tableBEl || !resultEl || !sqlEl || !editBtn) return;

  const NS = 'http://www.w3.org/2000/svg';

  // ---------- State ----------
  // Seed: 5 students, 5 enrolments. Two students with no enrolment, two enrolments
  // pointing to non-existent students — gives every JOIN type visible difference.
  let students = [
    { id: 1, name: 'Anna' },
    { id: 2, name: 'Mark' },
    { id: 3, name: 'Olga' },
    { id: 4, name: 'Daniel' },
    { id: 5, name: 'Sasha' }
  ];
  let enrolments = [
    { student_id: 1, course: 'CS' },
    { student_id: 1, course: 'Math' },
    { student_id: 2, course: 'CS' },
    { student_id: 4, course: 'Bio' },
    { student_id: 7, course: 'Art' }
  ];
  let editMode = false;
  let joinType = 'INNER';

  // ---------- i18n ----------
  function L() { return document.documentElement.getAttribute('data-lang') === 'ru' ? 'ru' : 'en'; }
  function tr(en, ru) { return L() === 'ru' ? ru : en; }

  // ---------- Helpers ----------
  function svgEl(tag, attrs) {
    const el = document.createElementNS(NS, tag);
    if (attrs) for (const k in attrs) el.setAttribute(k, attrs[k]);
    return el;
  }
  function svgText(x, y, t, opts) {
    opts = opts || {};
    const el = svgEl('text', {
      x: x, y: y,
      'text-anchor': opts.anchor || 'middle',
      'font-size': opts.size || 13,
      'font-weight': opts.weight || 400,
      fill: opts.fill || (window.Theme && window.Theme.text) || '#0f172a'
    });
    if (opts.mono) el.setAttribute('font-family', 'ui-monospace, monospace');
    el.textContent = t;
    return el;
  }
  function escapeHtml(s) {
    if (s === null || s === undefined) return '';
    return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  // ---------- JOIN engine ----------
  // Returns { columns: [...], rows: [[v,v,v,v], ...] } where v may be null.
  function compute(type) {
    const cols = ['STUDENT.id', 'STUDENT.name', 'ENROLLMENT.student_id', 'ENROLLMENT.course'];
    const rows = [];
    if (type === 'CROSS') {
      students.forEach(s => enrolments.forEach(e => rows.push([s.id, s.name, e.student_id, e.course])));
      return { columns: cols, rows };
    }
    // For the other four: build inner pairs first.
    const inner = [];
    const matchedLeft = new Set();
    const matchedRight = new Set();
    students.forEach((s, si) => {
      enrolments.forEach((e, ei) => {
        if (s.id === e.student_id) {
          inner.push([s.id, s.name, e.student_id, e.course]);
          matchedLeft.add(si);
          matchedRight.add(ei);
        }
      });
    });
    if (type === 'INNER') return { columns: cols, rows: inner };

    if (type === 'LEFT' || type === 'FULL') {
      // Inner pairs + left-only (unmatched students with NULLs on right side)
      rows.push.apply(rows, inner);
      students.forEach((s, si) => {
        if (!matchedLeft.has(si)) rows.push([s.id, s.name, null, null]);
      });
      if (type === 'LEFT') return { columns: cols, rows };
    }
    if (type === 'RIGHT') {
      rows.push.apply(rows, inner);
      enrolments.forEach((e, ei) => {
        if (!matchedRight.has(ei)) rows.push([null, null, e.student_id, e.course]);
      });
      return { columns: cols, rows };
    }
    // FULL: add right-only too
    enrolments.forEach((e, ei) => {
      if (!matchedRight.has(ei)) rows.push([null, null, e.student_id, e.course]);
    });
    return { columns: cols, rows };
  }

  // ---------- Venn rendering ----------
  // The Venn uses one overlay path per region (Left-only, Intersection, Right-only)
  // so we can independently colour them per JOIN type.
  function renderVenn() {
    const T = (window.Theme) || {};
    const W = 360, H = 220;
    venn.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    while (venn.firstChild) venn.removeChild(venn.firstChild);

    const cx1 = 140, cx2 = 220, cy = 110, r = 75;
    const accent = T.accent || '#0ea5e9';
    const green = T.green || '#10b981';
    const amber = T.amber || '#f59e0b';
    const text = T.text || '#0f172a';
    const muted = T.textMuted || '#475569';
    const surface = T.surface || '#fff';

    // Highlight flags
    const hi = { L: false, I: false, R: false };
    if (joinType === 'INNER') hi.I = true;
    else if (joinType === 'LEFT') { hi.L = true; hi.I = true; }
    else if (joinType === 'RIGHT') { hi.I = true; hi.R = true; }
    else if (joinType === 'FULL') { hi.L = true; hi.I = true; hi.R = true; }
    else if (joinType === 'CROSS') { hi.L = true; hi.I = true; hi.R = true; }

    // Region paths via clip-paths. We draw the two circle bodies first (light tint),
    // then overlay solid amber on the highlighted regions using SVG <mask> elements.
    const defs = svgEl('defs');
    // mask for left-only (left circle minus right)
    defs.innerHTML =
      '<mask id="m-left">' +
      '  <rect x="0" y="0" width="' + W + '" height="' + H + '" fill="black"/>' +
      '  <circle cx="' + cx1 + '" cy="' + cy + '" r="' + r + '" fill="white"/>' +
      '  <circle cx="' + cx2 + '" cy="' + cy + '" r="' + r + '" fill="black"/>' +
      '</mask>' +
      '<mask id="m-right">' +
      '  <rect x="0" y="0" width="' + W + '" height="' + H + '" fill="black"/>' +
      '  <circle cx="' + cx2 + '" cy="' + cy + '" r="' + r + '" fill="white"/>' +
      '  <circle cx="' + cx1 + '" cy="' + cy + '" r="' + r + '" fill="black"/>' +
      '</mask>' +
      '<mask id="m-inter">' +
      '  <rect x="0" y="0" width="' + W + '" height="' + H + '" fill="black"/>' +
      '  <circle cx="' + cx1 + '" cy="' + cy + '" r="' + r + '" fill="white"/>' +
      '  <circle cx="' + cx2 + '" cy="' + cy + '" r="' + r + '" fill="white" style="mix-blend-mode:multiply"/>' +
      '</mask>';
    venn.appendChild(defs);

    // Light tinted backgrounds — always visible so circles never disappear in dark mode.
    venn.appendChild(svgEl('circle', { cx: cx1, cy: cy, r: r, fill: accent, 'fill-opacity': 0.18, stroke: accent, 'stroke-width': 2 }));
    venn.appendChild(svgEl('circle', { cx: cx2, cy: cy, r: r, fill: green, 'fill-opacity': 0.18, stroke: green, 'stroke-width': 2 }));

    // Amber highlight overlays per region.
    if (hi.L) venn.appendChild(svgEl('rect', { x: 0, y: 0, width: W, height: H, fill: amber, 'fill-opacity': 0.55, mask: 'url(#m-left)' }));
    if (hi.R) venn.appendChild(svgEl('rect', { x: 0, y: 0, width: W, height: H, fill: amber, 'fill-opacity': 0.55, mask: 'url(#m-right)' }));
    if (hi.I) {
      // Intersection — draw a clipped band using the right circle clipped by the left.
      const clipId = 'clip-left-' + Math.random().toString(36).slice(2, 7);
      const cp = svgEl('clipPath', { id: clipId });
      cp.appendChild(svgEl('circle', { cx: cx1, cy: cy, r: r }));
      defs.appendChild(cp);
      venn.appendChild(svgEl('circle', {
        cx: cx2, cy: cy, r: r,
        fill: amber, 'fill-opacity': 0.7, 'clip-path': 'url(#' + clipId + ')'
      }));
    }

    // Re-stroke circle borders so they sit above the amber fills.
    venn.appendChild(svgEl('circle', { cx: cx1, cy: cy, r: r, fill: 'none', stroke: accent, 'stroke-width': 2 }));
    venn.appendChild(svgEl('circle', { cx: cx2, cy: cy, r: r, fill: 'none', stroke: green, 'stroke-width': 2 }));

    // Labels
    venn.appendChild(svgText(cx1 - 28, 26, tr('STUDENT (A)', 'СТУДЕНТ (A)'), { weight: 700, fill: accent, size: 13 }));
    venn.appendChild(svgText(cx2 + 28, 26, tr('ENROLLMENT (B)', 'ЗАПИСИ (B)'), { weight: 700, fill: green, size: 13 }));

    // Counts in each region for the current data — handy for teaching what the JOIN actually returns.
    const matchedLeft = new Set();
    const matchedRight = new Set();
    students.forEach((s, si) => enrolments.forEach((e, ei) => { if (s.id === e.student_id) { matchedLeft.add(si); matchedRight.add(ei); } }));
    const onlyL = students.length - matchedLeft.size;
    const onlyR = enrolments.length - matchedRight.size;
    let inter = 0;
    students.forEach(s => enrolments.forEach(e => { if (s.id === e.student_id) inter++; }));

    venn.appendChild(svgText(cx1 - 30, cy + 5, String(onlyL), { weight: 700, size: 22, fill: hi.L ? text : muted, mono: true }));
    venn.appendChild(svgText((cx1 + cx2) / 2, cy + 5, String(inter), { weight: 700, size: 22, fill: hi.I ? text : muted, mono: true }));
    venn.appendChild(svgText(cx2 + 30, cy + 5, String(onlyR), { weight: 700, size: 22, fill: hi.R ? text : muted, mono: true }));

    // Tiny tag bottom-centre
    const tag = joinType === 'CROSS'
      ? tr('Every A row × Every B row', 'Каждая строка A × каждая B')
      : (joinType === 'INNER' ? tr('Only matching rows', 'Только совпадения')
        : joinType === 'LEFT' ? tr('All A + matches (NULLs for missing B)', 'Все A + совпадения (NULL для B)')
          : joinType === 'RIGHT' ? tr('All B + matches (NULLs for missing A)', 'Все B + совпадения (NULL для A)')
            : tr('All A ∪ all B (NULLs both sides)', 'Все A ∪ все B (NULL с обеих сторон)'));
    venn.appendChild(svgText(W / 2, H - 12, tag, { fill: muted, size: 12 }));
  }

  // ---------- Table rendering ----------
  function renderBase(tbody, rows, headers, fkCol) {
    const lang = L();
    let html = '<thead><tr>';
    headers.forEach(h => { html += '<th>' + escapeHtml(h) + '</th>'; });
    if (editMode) html += '<th style="width:48px">&nbsp;</th>';
    html += '</tr></thead><tbody>';
    rows.forEach((r, i) => {
      html += '<tr data-idx="' + i + '">';
      r.values.forEach((v, ci) => {
        if (editMode) {
          html += '<td><input data-row="' + i + '" data-col="' + ci + '" value="' + escapeHtml(v) + '" /></td>';
        } else {
          const isFk = (ci === fkCol);
          html += '<td' + (isFk ? ' style="color:var(--accent); font-family:var(--mono)"' : '') + '>' + escapeHtml(v) + '</td>';
        }
      });
      if (editMode) {
        html += '<td><button class="btn btn-ghost btn-sm" data-del="' + i + '" title="' +
          tr('Delete row', 'Удалить строку') + '">×</button></td>';
      }
      html += '</tr>';
    });
    html += '</tbody>';
    if (editMode) {
      html += '<tfoot><tr><td colspan="' + (headers.length + 1) + '" style="text-align:right">' +
        '<button class="btn btn-ghost btn-sm" data-add>+ ' + tr('Add row', 'Добавить строку') + '</button></td></tr></tfoot>';
    }
    tbody.innerHTML = html;
  }

  function renderTables() {
    renderBase(
      tableAEl,
      students.map(s => ({ values: [s.id, s.name] })),
      [tr('id (PK)', 'id (PK)'), tr('name', 'имя')],
      -1
    );
    renderBase(
      tableBEl,
      enrolments.map(e => ({ values: [e.student_id, e.course] })),
      [tr('student_id (FK)', 'student_id (FK)'), tr('course', 'курс')],
      0
    );
  }

  function renderResult() {
    const res = compute(joinType);
    const muted = 'color:var(--text-muted); font-style:italic; font-family:var(--mono)';
    let html = '<table class="dbtable joins-result"><thead><tr>';
    res.columns.forEach(c => { html += '<th>' + escapeHtml(c) + '</th>'; });
    html += '</tr></thead><tbody>';
    if (!res.rows.length) {
      html += '<tr><td colspan="' + res.columns.length + '" style="text-align:center;color:var(--text-muted);padding:18px">' +
        tr('(no rows)', '(нет строк)') + '</td></tr>';
    } else {
      res.rows.forEach(row => {
        html += '<tr>';
        row.forEach(v => {
          if (v === null || v === undefined) html += '<td style="' + muted + '">—</td>';
          else html += '<td>' + escapeHtml(v) + '</td>';
        });
        html += '</tr>';
      });
    }
    html += '</tbody></table>';
    html += '<div style="margin-top:6px;font-size:0.85rem;color:var(--text-muted)">' +
      tr('Rows: ', 'Строк: ') + '<b>' + res.rows.length + '</b></div>';
    resultEl.innerHTML = html;
  }

  function renderSql() {
    const sqlMap = {
      INNER: 'SELECT *\nFROM STUDENT\nINNER JOIN ENROLLMENT\n  ON STUDENT.id = ENROLLMENT.student_id;',
      LEFT: 'SELECT *\nFROM STUDENT\nLEFT JOIN ENROLLMENT\n  ON STUDENT.id = ENROLLMENT.student_id;',
      RIGHT: 'SELECT *\nFROM STUDENT\nRIGHT JOIN ENROLLMENT\n  ON STUDENT.id = ENROLLMENT.student_id;',
      FULL: 'SELECT *\nFROM STUDENT\nFULL OUTER JOIN ENROLLMENT\n  ON STUDENT.id = ENROLLMENT.student_id;',
      CROSS: 'SELECT *\nFROM STUDENT\nCROSS JOIN ENROLLMENT;'
    };
    sqlEl.textContent = sqlMap[joinType];
  }

  function renderAll() {
    renderVenn();
    renderTables();
    renderResult();
    renderSql();
    editBtn.textContent = editMode
      ? tr('✓ Done editing', '✓ Готово')
      : tr('✎ Edit rows', '✎ Редактировать');
    editBtn.classList.toggle('btn-primary', editMode);
    editBtn.classList.toggle('btn-ghost', !editMode);
  }

  // ---------- Edit handlers ----------
  // Delegated input/click handlers so they survive table re-renders.
  function bindEdits(el, target, intCol) {
    el.addEventListener('input', e => {
      const inp = e.target;
      if (inp.tagName !== 'INPUT') return;
      const r = parseInt(inp.dataset.row, 10);
      const c = parseInt(inp.dataset.col, 10);
      if (Number.isNaN(r) || Number.isNaN(c)) return;
      const val = inp.value;
      const row = target[r];
      if (!row) return;
      const keys = Object.keys(row);
      const key = keys[c];
      // Coerce numeric columns so the join still matches on numbers.
      if (c === intCol) {
        const n = parseInt(val, 10);
        row[key] = Number.isNaN(n) ? val : n;
      } else {
        row[key] = val;
      }
      // Lightweight update — avoid stomping the focused input.
      renderVenn();
      renderResult();
    });
    el.addEventListener('click', e => {
      const btn = e.target.closest('button');
      if (!btn) return;
      if (btn.dataset.del !== undefined) {
        const i = parseInt(btn.dataset.del, 10);
        target.splice(i, 1);
        renderAll();
      } else if (btn.hasAttribute('data-add')) {
        if (target === students) {
          const nextId = students.length ? Math.max.apply(null, students.map(s => Number(s.id) || 0)) + 1 : 1;
          students.push({ id: nextId, name: tr('New', 'Новый') });
        } else {
          enrolments.push({ student_id: 1, course: tr('Course', 'Курс') });
        }
        renderAll();
      }
    });
  }
  bindEdits(tableAEl, students, 0);
  bindEdits(tableBEl, enrolments, 0);

  // ---------- Top-level wiring ----------
  typeEl.addEventListener('change', () => {
    joinType = typeEl.value;
    renderAll();
  });
  editBtn.addEventListener('click', () => {
    editMode = !editMode;
    renderAll();
  });
  document.addEventListener('langchange', renderAll);
  document.addEventListener('themechange', renderVenn);

  // Initialise the type selector if it has no value yet.
  if (!typeEl.value) typeEl.value = joinType;
  else joinType = typeEl.value;
  renderAll();
})();
