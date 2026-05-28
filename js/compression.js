// A1.1.8 — Compression: Run-Length Encoding (RLE) live demo.
// Type a string OR paint a 16x16 pixel grid; watch RLE encode it, then decode back to prove
// it's lossless. Side-by-side bars visualise each "run". Includes best/worst-case presets.
(function () {
  const root = document.getElementById('compression-sim');
  if (!root) return;

  const inputEl = root.querySelector('#comp-input');
  const modeSel = root.querySelector('#comp-mode');
  const gridEl = root.querySelector('#comp-grid');
  const encodedEl = root.querySelector('#comp-encoded');
  const origStatsEl = root.querySelector('#comp-stats-orig');
  const compStatsEl = root.querySelector('#comp-stats-comp');
  const ratioEl = root.querySelector('#comp-stats-ratio');
  const decodeBtn = root.querySelector('#comp-decode');

  if (!inputEl || !modeSel || !gridEl || !encodedEl || !origStatsEl || !compStatsEl || !ratioEl || !decodeBtn) {
    return; // Bail if any required hook is missing — keeps the page safe to ship.
  }

  // Optional containers — populated if present, ignored otherwise.
  const decodedEl = root.querySelector('#comp-decoded');
  const barsOrigEl = root.querySelector('#comp-bars-orig');
  const barsCompEl = root.querySelector('#comp-bars-comp');
  const presetsEl = root.querySelector('#comp-presets');
  const explainerEl = root.querySelector('#comp-explainer');

  const GRID_N = 16;            // 16x16 pixel grid
  const PIXEL_COLORS = ['K', 'W', 'R']; // (K)black, (W)white, (R)red — 3 colours = 2 bits raw
  const PIXEL_BITS_PER_CELL = 2;
  const TEXT_BITS_PER_CHAR = 8;

  let pixelGrid = new Array(GRID_N * GRID_N).fill('W'); // start all-white
  let activePaint = 'K';

  function L() { return document.documentElement.getAttribute('data-lang') === 'ru' ? 'ru' : 'en'; }
  function tr(en, ru) { return L() === 'ru' ? ru : en; }

  // ---- RLE: encode any string of single-char tokens into [(count,char), ...] ----
  function rleEncode(seq) {
    const runs = [];
    if (!seq || seq.length === 0) return runs;
    let cur = seq[0], n = 1;
    for (let i = 1; i < seq.length; i++) {
      if (seq[i] === cur) { n++; } else { runs.push([n, cur]); cur = seq[i]; n = 1; }
    }
    runs.push([n, cur]);
    return runs;
  }
  function rleDecode(runs) {
    let out = '';
    for (const [n, c] of runs) out += c.repeat(n);
    return out;
  }
  function rleToText(runs) {
    return runs.map(([n, c]) => n + c).join(' ');
  }

  // ---- Bit-cost models ----
  // Text mode: each original char = 8 bits; each encoded run = run-count (8 bits) + char (8 bits) = 16 bits.
  // Pixel mode: each pixel = 2 bits; each encoded run = count (8 bits) + colour (2 bits) = 10 bits.
  function costs(runs, mode, origLen) {
    if (mode === 'text') {
      return {
        origBits: origLen * TEXT_BITS_PER_CHAR,
        compBits: runs.length * (TEXT_BITS_PER_CHAR + TEXT_BITS_PER_CHAR),
      };
    }
    return {
      origBits: origLen * PIXEL_BITS_PER_CELL,
      compBits: runs.length * (TEXT_BITS_PER_CHAR + PIXEL_BITS_PER_CELL),
    };
  }

  function fmtBits(b) {
    const bytes = (b / 8).toFixed(b % 8 === 0 ? 0 : 2);
    return b + ' ' + tr('bits', 'бит') + ' (' + bytes + ' ' + tr('bytes', 'байт') + ')';
  }

  // ---- Colour palette for visualised runs ----
  function colorFor(token) {
    const T = window.Theme || {};
    if (modeSel.value === 'pixel') {
      if (token === 'K') return '#0f172a';
      if (token === 'W') return '#f8fafc';
      if (token === 'R') return T.red || '#ef4444';
    }
    // Text mode: hash-derived stable colour so same char keeps same bar colour
    const palette = [T.accent, T.green, T.amber, T.violet, T.red, T.primary];
    let h = 0;
    for (let i = 0; i < token.length; i++) h = (h * 31 + token.charCodeAt(i)) >>> 0;
    return palette[h % palette.length] || '#0ea5e9';
  }

  // ---- Renderers ----
  function renderGrid() {
    gridEl.innerHTML = '';
    gridEl.style.display = 'grid';
    gridEl.style.gridTemplateColumns = 'repeat(' + GRID_N + ', 1fr)';
    gridEl.style.gap = '1px';
    gridEl.style.background = (window.Theme && window.Theme.border) || '#e2e8f0';
    gridEl.style.padding = '1px';
    gridEl.style.borderRadius = '6px';
    gridEl.style.maxWidth = '320px';
    gridEl.style.aspectRatio = '1 / 1';

    for (let i = 0; i < pixelGrid.length; i++) {
      const cell = document.createElement('button');
      cell.type = 'button';
      cell.setAttribute('aria-label', tr('Pixel ' + (i + 1), 'Пиксель ' + (i + 1)));
      cell.style.border = '0';
      cell.style.padding = '0';
      cell.style.cursor = 'crosshair';
      cell.style.background = ({K: '#0f172a', W: '#f8fafc', R: '#ef4444'})[pixelGrid[i]];
      cell.addEventListener('click', () => { pixelGrid[i] = activePaint; update(); });
      gridEl.appendChild(cell);
    }
  }

  function renderBars(container, runs, label) {
    if (!container) return;
    const total = runs.reduce((s, r) => s + r[0], 0) || 1;
    let html = '<div style="font-size:0.8rem;color:var(--text-muted);margin-bottom:4px">' + label + '</div>';
    html += '<div style="display:flex;height:18px;border-radius:4px;overflow:hidden;border:1px solid var(--border)">';
    for (const [n, c] of runs) {
      const pct = (n / total) * 100;
      const col = colorFor(c);
      const textCol = (c === 'W') ? '#0f172a' : '#fff';
      html += '<div title="' + n + '×' + c + '" style="width:' + pct + '%;background:' + col + ';color:' + textCol +
              ';font-size:0.7rem;display:flex;align-items:center;justify-content:center;font-weight:600">' +
              (pct > 6 ? (n + (modeSel.value === 'text' ? c : '')) : '') + '</div>';
    }
    html += '</div>';
    container.innerHTML = html;
  }

  function renderEncoded(runs) {
    if (!runs.length) { encodedEl.innerHTML = '<span class="muted">' + tr('(empty)', '(пусто)') + '</span>'; return; }
    encodedEl.innerHTML = runs.map(([n, c]) =>
      '<span style="display:inline-block;margin:2px 4px 2px 0;padding:3px 8px;border-radius:4px;background:' +
      colorFor(c) + '22;border:1px solid ' + colorFor(c) + ';font-family:ui-monospace,Menlo,monospace;font-size:0.85rem">' +
      '<b>' + n + '</b>' + (modeSel.value === 'pixel' ? colorBadge(c) : c) +
      '</span>'
    ).join('');
  }
  function colorBadge(c) {
    const col = ({K: '#0f172a', W: '#f8fafc', R: '#ef4444'})[c];
    return '<span style="display:inline-block;width:10px;height:10px;border:1px solid #999;background:' + col + ';vertical-align:middle;margin-left:4px;border-radius:2px"></span>';
  }

  // ---- Current sequence (string of one-char tokens) for whichever mode is active ----
  function currentSequence() {
    if (modeSel.value === 'pixel') return pixelGrid.join('');
    return inputEl.value || '';
  }

  // ---- Main update loop ----
  function update() {
    const mode = modeSel.value;
    // Toggle which input is visible
    inputEl.style.display = mode === 'text' ? '' : 'none';
    gridEl.style.display  = mode === 'pixel' ? 'grid' : 'none';
    if (presetsEl) presetsEl.style.display = mode === 'text' ? '' : 'none';

    if (mode === 'pixel') renderGrid();

    const seq = currentSequence();
    const runs = rleEncode(seq);
    const { origBits, compBits } = costs(runs, mode, seq.length);
    const ratio = origBits > 0 ? Math.round((compBits / origBits) * 100) : 0;
    const saved = origBits - compBits;

    renderEncoded(runs);
    renderBars(barsOrigEl, seq ? [[seq.length, seq[0] || '?']].concat([]) : [], tr('Original (raw)', 'Оригинал (необработанный)'));
    // Original bars: one cell per char so the "no runs" worst case looks visually fragmented
    if (barsOrigEl) {
      const perChar = seq ? Array.from(seq).map(c => [1, c]) : [];
      renderBars(barsOrigEl, perChar, tr('Original (each cell = one symbol)', 'Оригинал (каждая ячейка = один символ)'));
    }
    renderBars(barsCompEl, runs, tr('After RLE (each cell = one run)', 'После RLE (каждая ячейка = один прогон)'));

    origStatsEl.innerHTML = '<b>' + tr('Original', 'Оригинал') + ':</b> ' +
      seq.length + ' ' + (mode === 'text' ? tr('chars', 'симв.') : tr('pixels', 'пикс.')) +
      ' → ' + fmtBits(origBits);
    compStatsEl.innerHTML = '<b>' + tr('Encoded', 'Закодировано') + ':</b> ' +
      runs.length + ' ' + tr('runs', 'прогонов') + ' → ' + fmtBits(compBits);

    let verdict;
    if (origBits === 0) verdict = tr('—', '—');
    else if (compBits < origBits) verdict = tr(' (saved ' + saved + ' bits — RLE wins)', ' (сэкономлено ' + saved + ' бит — RLE выигрывает)');
    else if (compBits === origBits) verdict = tr(' (no change)', ' (без изменений)');
    else verdict = tr(' (grew by ' + (-saved) + ' bits — RLE loses on this input)', ' (выросло на ' + (-saved) + ' бит — RLE проигрывает на этих данных)');

    ratioEl.innerHTML = '<b>' + tr('Compression ratio', 'Коэффициент сжатия') + ':</b> ' +
      '<span style="color:' + (compBits < origBits ? (window.Theme.green || '#10b981') : (window.Theme.red || '#ef4444')) +
      ';font-weight:700">' + ratio + '%</span>' + '<span class="muted">' + verdict + '</span>';

    if (decodedEl) decodedEl.innerHTML = '';
  }

  function decodeAndShow() {
    const runs = rleEncode(currentSequence());
    const decoded = rleDecode(runs);
    if (decodedEl) {
      decodedEl.innerHTML = '<div style="margin-top:8px;padding:8px 10px;border-radius:6px;background:var(--surface-2);font-family:ui-monospace,Menlo,monospace;font-size:0.88rem">' +
        '<b>' + tr('Decoded back:', 'Расшифровано обратно:') + '</b> ' +
        '<code>' + escapeHtml(decoded.length > 200 ? decoded.slice(0, 200) + '…' : decoded) + '</code>' +
        '<div class="muted" style="margin-top:4px;font-size:0.8rem">' +
        (decoded === currentSequence()
          ? tr('Identical to the original — RLE is lossless.', 'Идентично оригиналу — RLE без потерь.')
          : tr('Mismatch (shouldn\'t happen!)', 'Несовпадение (не должно случиться!)')) +
        '</div></div>';
    }
  }

  // ---- Presets (text mode) ----
  const PRESETS = [
    { id: 'default', en: 'Mixed runs',  ru: 'Смешанные прогоны', val: 'AAAAABBBCCDAAAAAAAA' },
    { id: 'best',    en: 'Best case',   ru: 'Лучший случай',     val: 'AAAAAAAAAAAAAAAA' },
    { id: 'worst',   en: 'Worst case',  ru: 'Худший случай',     val: 'ABCDEFGHIJKLMNOP' },
    { id: 'real',    en: 'Real text',   ru: 'Обычный текст',     val: 'Hello world' },
  ];
  function renderPresets() {
    if (!presetsEl) return;
    presetsEl.innerHTML = '<span class="muted" style="margin-right:6px">' + tr('Try:', 'Попробуйте:') + '</span>' +
      PRESETS.map(p =>
        '<button type="button" class="btn btn-sm btn-secondary" data-preset="' + p.id + '" style="margin-right:6px;margin-bottom:4px">' +
        tr(p.en, p.ru) + '</button>'
      ).join('');
    presetsEl.querySelectorAll('button[data-preset]').forEach(btn => {
      btn.addEventListener('click', () => {
        const p = PRESETS.find(x => x.id === btn.getAttribute('data-preset'));
        if (p) { inputEl.value = p.val; update(); }
      });
    });
  }

  // ---- Explainer block (lossy vs lossless) ----
  function renderExplainer() {
    if (!explainerEl) return;
    explainerEl.innerHTML = tr(
      '<p><b>Lossless</b> compression (RLE, PNG, ZIP, FLAC) recovers the original bit-for-bit. ' +
      'RLE shines on data with long repeated stretches — line-art, fax pages, monochrome icons — ' +
      'and <em>grows</em> data with no repeats (worst case above).</p>' +
      '<p><b>Lossy</b> compression (JPEG photos, MP3 audio, H.264 video) throws away detail the eye/ear ' +
      'mostly won\'t miss, achieving far higher ratios than lossless ever can — but the original is gone forever. ' +
      'See the <a href="a1-1-hardware.html#a1-1-8-compression">A1.1.8 deep-dive</a> for the full comparison.</p>',
      '<p><b>Без потерь</b> (RLE, PNG, ZIP, FLAC) — восстанавливает оригинал бит-в-бит. ' +
      'RLE отлично работает на данных с длинными повторами — штриховой графике, факсах, иконках — ' +
      'и <em>увеличивает</em> объём, если повторов нет (худший случай выше).</p>' +
      '<p><b>С потерями</b> (JPEG, MP3, H.264) — выбрасывает детали, которые глаз/ухо почти не замечают, ' +
      'достигая куда более высоких коэффициентов сжатия — но оригинал утрачен навсегда. ' +
      'Подробности — в <a href="a1-1-hardware.html#a1-1-8-compression">разделе A1.1.8</a>.</p>'
    );
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  // ---- Wire events ----
  if (!inputEl.value) inputEl.value = 'AAAAABBBCCDAAAAAAAA';
  inputEl.addEventListener('input', update);
  modeSel.addEventListener('change', update);
  decodeBtn.addEventListener('click', decodeAndShow);
  document.addEventListener('langchange', () => { renderPresets(); renderExplainer(); update(); });
  document.addEventListener('themechange', update);

  renderPresets();
  renderExplainer();
  update();
})();
