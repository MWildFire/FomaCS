// A1.1.4 — CPU cache hit / miss visualiser
// User clicks a memory address (or runs a preset pattern). CPU checks the cache:
// hit → ~1 ns, miss → fetch from RAM (~80 ns) + evict via LRU / FIFO / Random.
// Demonstrates why locality of reference matters.
(function () {
  const root = document.getElementById('cache-sim');
  if (!root) return;

  const svg       = root.querySelector('#cache-svg');
  const patternEl = root.querySelector('#cache-pattern');
  const policyEl  = root.querySelector('#cache-policy');
  const sizeEl    = root.querySelector('#cache-size');
  const stepBtn   = root.querySelector('#cache-step');
  const runBtn    = root.querySelector('#cache-run');
  const resetBtn  = root.querySelector('#cache-reset');
  const hitsEl    = root.querySelector('#cache-hits');
  const missesEl  = root.querySelector('#cache-misses');
  const rateEl    = root.querySelector('#cache-rate');
  const timeEl    = root.querySelector('#cache-time');
  if (!svg || !patternEl || !policyEl || !sizeEl || !stepBtn || !runBtn || !resetBtn) return;
  if (!hitsEl || !missesEl || !rateEl || !timeEl) return;

  const RAM_SIZE  = 32;       // 0x00..0x1F
  const HIT_NS    = 1;
  const MISS_NS   = 80;
  const W = 1000, H = 360;

  // ---- Pre-loaded access patterns ----
  // Sequential walks through RAM in order (great spatial locality).
  // Looped re-reads a tiny working set (great temporal locality).
  // Random hits anything in RAM (poor locality).
  // Thrashing cycles through one more address than fits (worst case for LRU/FIFO).
  const PATTERNS = {
    sequential: () => Array.from({ length: 24 }, (_, i) => i % RAM_SIZE),
    looped:     () => { const a = []; for (let r = 0; r < 6; r++) for (let i = 0; i < 4; i++) a.push(i); return a; },
    random:     () => Array.from({ length: 24 }, () => Math.floor(Math.random() * RAM_SIZE)),
    thrashing:  () => {
      // Cycle through (cacheSize + 1) addrs — every access evicts the one we'll need next.
      const n = parseInt(sizeEl.value, 10) + 1;
      const a = []; for (let r = 0; r < 4; r++) for (let i = 0; i < n; i++) a.push(i);
      return a;
    }
  };

  let cache = [];        // [{ addr, loadedAt, lastUsed }]
  let sequence = [];     // queued addresses
  let cursor = 0;        // next index in sequence to process
  let tick = 0;          // monotonic counter for LRU/FIFO
  let hits = 0, misses = 0, totalNs = 0;
  let lastEvent = null;  // { kind: 'hit'|'miss', addr, slot, evicted }
  let autoTimer = null;

  function L() { return document.documentElement.getAttribute('data-lang') === 'ru' ? 'ru' : 'en'; }
  function tr(en, ru) { return L() === 'ru' ? ru : en; }
  function hex(n) { return '0x' + n.toString(16).toUpperCase().padStart(2, '0'); }

  function resetCache() {
    const sz = parseInt(sizeEl.value, 10);
    cache = Array.from({ length: sz }, () => null);
    tick = 0; hits = 0; misses = 0; totalNs = 0;
    cursor = 0; lastEvent = null;
    sequence = PATTERNS[patternEl.value]();
    updateStats();
    render();
  }

  function updateStats() {
    const total = hits + misses;
    hitsEl.textContent = hits;
    missesEl.textContent = misses;
    rateEl.textContent = total ? ((hits / total) * 100).toFixed(1) + '%' : '—';
    timeEl.textContent = totalNs + ' ns';
  }

  // ---- Core: simulate one access ----
  function access(addr) {
    tick++;
    const slot = cache.findIndex(s => s && s.addr === addr);
    if (slot >= 0) {
      cache[slot].lastUsed = tick;
      hits++; totalNs += HIT_NS;
      lastEvent = { kind: 'hit', addr, slot };
    } else {
      // MISS — fetch from RAM, evict if cache is full
      let target = cache.findIndex(s => s === null);
      let evicted = null;
      if (target < 0) {
        target = pickVictim();
        evicted = cache[target].addr;
      }
      cache[target] = { addr, loadedAt: tick, lastUsed: tick };
      misses++; totalNs += MISS_NS;
      lastEvent = { kind: 'miss', addr, slot: target, evicted };
    }
    updateStats();
    render();
  }

  function pickVictim() {
    const policy = policyEl.value;
    if (policy === 'random') return Math.floor(Math.random() * cache.length);
    // LRU = smallest lastUsed; FIFO = smallest loadedAt
    const key = policy === 'lru' ? 'lastUsed' : 'loadedAt';
    let bestIdx = 0, bestVal = Infinity;
    for (let i = 0; i < cache.length; i++) {
      if (cache[i][key] < bestVal) { bestVal = cache[i][key]; bestIdx = i; }
    }
    return bestIdx;
  }

  function step() {
    if (cursor >= sequence.length) { stopAuto(); return; }
    access(sequence[cursor]);
    cursor++;
    if (cursor >= sequence.length) stopAuto();
  }

  function stopAuto() {
    if (autoTimer) { clearInterval(autoTimer); autoTimer = null; runBtn.textContent = tr('⏩ Run sequence', '⏩ Запустить'); }
  }

  // ---- Rendering ----
  function render() {
    const T = window.Theme;
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);

    let s = '';
    // ---- CPU box (left) ----
    s += panel(20, 20, 200, H - 40, T, tr('CPU', 'ЦП'));
    s += '<text x="120" y="120" fill="' + T.text + '" font-size="34" text-anchor="middle">⚙</text>';
    s += '<text x="120" y="160" fill="' + T.textMuted + '" font-size="13" text-anchor="middle">' + tr('Requesting…', 'Запрос…') + '</text>';
    if (lastEvent) {
      const badgeFill = lastEvent.kind === 'hit' ? T.green : T.red;
      const badgeText = lastEvent.kind === 'hit' ? tr('CACHE HIT', 'ПОПАДАНИЕ') : tr('CACHE MISS', 'ПРОМАХ');
      s += '<rect x="40" y="200" width="160" height="34" rx="6" fill="' + badgeFill + '" />';
      s += '<text x="120" y="222" fill="#fff" font-size="13" font-weight="700" text-anchor="middle">' + badgeText + '</text>';
      s += '<text x="120" y="260" fill="' + T.textMuted + '" font-family="ui-monospace" font-size="14" text-anchor="middle">addr ' + hex(lastEvent.addr) + '</text>';
      const ns = lastEvent.kind === 'hit' ? HIT_NS : MISS_NS;
      s += '<text x="120" y="282" fill="' + T.textFaint + '" font-size="11" text-anchor="middle">' + tr('latency', 'задержка') + ': ' + ns + ' ns</text>';
    }

    // ---- Cache box (middle) ----
    const cacheX = 270, cacheW = 280;
    s += panel(cacheX, 20, cacheW, H - 40, T, tr('L1 Cache', 'Кэш L1') + ' · ' + cache.length + ' ' + tr('slots', 'ячеек'));
    const slotH = Math.min(38, (H - 90) / cache.length);
    const slotY0 = 60;
    for (let i = 0; i < cache.length; i++) {
      const y = slotY0 + i * (slotH + 4);
      const slot = cache[i];
      const isHit  = lastEvent && lastEvent.kind === 'hit'  && lastEvent.slot === i;
      const isMiss = lastEvent && lastEvent.kind === 'miss' && lastEvent.slot === i;
      const fill = isHit ? T.green : isMiss ? T.amber : (slot ? T.surface : T.surface2);
      const stroke = (isHit || isMiss) ? fill : T.border;
      const txt = (isHit || isMiss) ? '#fff' : (slot ? T.text : T.textFaint);
      s += '<rect x="' + (cacheX + 16) + '" y="' + y + '" width="' + (cacheW - 32) + '" height="' + slotH + '" rx="5" fill="' + fill + '" stroke="' + stroke + '" stroke-width="' + (isHit || isMiss ? 2.5 : 1) + '" />';
      s += '<text x="' + (cacheX + 28) + '" y="' + (y + slotH / 2 + 4) + '" fill="' + (isHit || isMiss ? 'rgba(255,255,255,0.85)' : T.textFaint) + '" font-size="10" font-family="ui-monospace">[' + i + ']</text>';
      s += '<text x="' + (cacheX + cacheW / 2) + '" y="' + (y + slotH / 2 + 5) + '" fill="' + txt + '" font-size="13" font-family="ui-monospace" text-anchor="middle">' + (slot ? hex(slot.addr) : tr('(empty)', '(пусто)')) + '</text>';
      if (slot) {
        const meta = policyEl.value === 'fifo' ? 'f=' + slot.loadedAt : 'u=' + slot.lastUsed;
        s += '<text x="' + (cacheX + cacheW - 28) + '" y="' + (y + slotH / 2 + 4) + '" fill="' + (isHit || isMiss ? 'rgba(255,255,255,0.75)' : T.textFaint) + '" font-size="10" font-family="ui-monospace" text-anchor="end">' + meta + '</text>';
      }
    }

    // ---- RAM box (right): 32 addresses in 4x8 grid ----
    const ramX = 600, ramW = W - ramX - 20;
    s += panel(ramX, 20, ramW, H - 40, T, tr('Main memory (RAM)', 'Основная память (RAM)'));
    const cols = 4, rows = RAM_SIZE / cols;
    const cellW = (ramW - 32) / cols, cellH = (H - 90) / rows;
    for (let i = 0; i < RAM_SIZE; i++) {
      const r = Math.floor(i / cols), c = i % cols;
      const x = ramX + 16 + c * cellW, y = 60 + r * cellH;
      const inCache = cache.some(sl => sl && sl.addr === i);
      const isActive = lastEvent && lastEvent.addr === i;
      const fill = isActive && lastEvent.kind === 'miss' ? T.red
                 : isActive ? T.green
                 : inCache ? T.surface
                 : T.surface2;
      const stroke = isActive ? fill : T.border;
      const txt = isActive ? '#fff' : (inCache ? T.text : T.textFaint);
      s += '<rect x="' + (x + 2) + '" y="' + (y + 2) + '" width="' + (cellW - 6) + '" height="' + (cellH - 4) + '" rx="3" fill="' + fill + '" stroke="' + stroke + '" stroke-width="' + (isActive ? 2 : 1) + '" />';
      s += '<text x="' + (x + cellW / 2) + '" y="' + (y + cellH / 2 + 4) + '" fill="' + txt + '" font-size="11" font-family="ui-monospace" text-anchor="middle">' + hex(i) + '</text>';
    }
    // Make every RAM cell clickable
    for (let i = 0; i < RAM_SIZE; i++) {
      const r = Math.floor(i / cols), c = i % cols;
      const x = ramX + 16 + c * cellW, y = 60 + r * cellH;
      s += '<rect class="cache-ram-hit" data-addr="' + i + '" x="' + (x + 2) + '" y="' + (y + 2) + '" width="' + (cellW - 6) + '" height="' + (cellH - 4) + '" fill="transparent" style="cursor:pointer" />';
    }

    // ---- Arrows from CPU → cache, and cache ↔ RAM on miss ----
    if (lastEvent) {
      const color = lastEvent.kind === 'hit' ? T.green : T.red;
      // CPU → cache
      s += '<path d="M 220 175 L 286 175" stroke="' + color + '" stroke-width="2.5" fill="none" marker-end="url(#cache-arrow)" />';
      if (lastEvent.kind === 'miss') {
        // cache → RAM and back
        const r = Math.floor(lastEvent.addr / cols), c = lastEvent.addr % cols;
        const ramCellX = ramX + 16 + c * cellW + cellW / 2;
        const ramCellY = 60 + r * cellH + cellH / 2;
        s += '<path d="M 550 175 Q ' + ((550 + ramCellX) / 2) + ' ' + ramCellY + ' ' + ramCellX + ' ' + ramCellY + '" stroke="' + T.red + '" stroke-width="2" fill="none" stroke-dasharray="5 4" />';
      }
    }

    // ---- Footer: sequence ticker + legend ----
    const footY = H - 18;
    const remaining = sequence.length - cursor;
    s += '<text x="20" y="' + footY + '" fill="' + T.textFaint + '" font-size="11">' +
         tr('Progress', 'Прогресс') + ': ' + cursor + ' / ' + sequence.length +
         '   ·   ' + tr('next', 'след.') + ': ' +
         (remaining > 0 ? sequence.slice(cursor, cursor + 6).map(hex).join(' ') + (remaining > 6 ? ' …' : '') : tr('done', 'готово')) +
         '</text>';
    // Coloured legend dots so light-mode users can read state at a glance
    const legend = [
      { c: T.green,  label: tr('hit',   'попадание') },
      { c: T.amber,  label: tr('loaded into cache', 'загружено в кэш') },
      { c: T.red,    label: tr('miss → RAM', 'промах → RAM') }
    ];
    let lx = 620;
    for (const it of legend) {
      s += '<circle cx="' + lx + '" cy="' + (footY - 4) + '" r="5" fill="' + it.c + '" />';
      s += '<text x="' + (lx + 10) + '" y="' + footY + '" fill="' + T.textMuted + '" font-size="11">' + it.label + '</text>';
      lx += 110;
    }

    // Arrow marker def (must come first so markers resolve)
    s = '<defs><marker id="cache-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="' + (lastEvent && lastEvent.kind === 'hit' ? T.green : T.red) + '" /></marker></defs>' + s;

    svg.innerHTML = s;

    // Wire RAM cell clicks (delegation would survive innerHTML, but explicit is clearer here)
    svg.querySelectorAll('.cache-ram-hit').forEach(el => {
      el.addEventListener('click', () => {
        const a = parseInt(el.getAttribute('data-addr'), 10);
        access(a);
      });
    });
  }

  function panel(x, y, w, h, T, label) {
    let r = '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="8" fill="' + T.surface2 + '" stroke="' + T.border + '" stroke-width="1.5" />';
    if (label) r += '<text x="' + (x + 12) + '" y="' + (y - 6) + '" fill="' + T.textMuted + '" font-size="12" font-weight="600">' + label + '</text>';
    return r;
  }

  // ---- Events ----
  stepBtn.addEventListener('click', step);
  resetBtn.addEventListener('click', () => { stopAuto(); resetCache(); });
  runBtn.addEventListener('click', () => {
    if (autoTimer) { stopAuto(); return; }
    if (cursor >= sequence.length) resetCache();
    autoTimer = setInterval(step, 420);
    runBtn.textContent = tr('⏸ Pause', '⏸ Пауза');
  });
  patternEl.addEventListener('change', () => { stopAuto(); resetCache(); });
  policyEl.addEventListener('change', () => { stopAuto(); resetCache(); });
  sizeEl.addEventListener('change', () => { stopAuto(); resetCache(); });

  document.addEventListener('themechange', render);
  document.addEventListener('langchange', () => {
    runBtn.textContent = autoTimer ? tr('⏸ Pause', '⏸ Пауза') : tr('⏩ Run sequence', '⏩ Запустить');
    render();
  });

  // First paint
  runBtn.textContent = tr('⏩ Run sequence', '⏩ Запустить');
  resetCache();
})();
