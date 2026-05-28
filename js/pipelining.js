// A1.1.6 (HL) — Pipelining in multi-core architectures.
// Compares sequential vs pipelined execution of 5 instructions through
// the 5 classic stages: Fetch / Decode / Execute / Memory access / Write-back.
(function () {
  const root = document.getElementById('pipelining-sim');
  if (!root) return;
  const svg = root.querySelector('#pipe-svg');
  const modeBtn = root.querySelector('#pipe-mode');
  const hazardBtn = root.querySelector('#pipe-hazard');
  const stepBtn = root.querySelector('#pipe-step');
  const runBtn = root.querySelector('#pipe-run');
  const resetBtn = root.querySelector('#pipe-reset');
  const speedupEl = root.querySelector('#pipe-speedup');
  const cycleEl = root.querySelector('#pipe-cycle');
  if (!svg || !modeBtn || !hazardBtn || !stepBtn || !runBtn || !resetBtn || !speedupEl || !cycleEl) return;

  const STAGES = [
    { key: 'F', en: 'Fetch',        ru: 'Выборка' },
    { key: 'D', en: 'Decode',       ru: 'Декодирование' },
    { key: 'E', en: 'Execute',      ru: 'Исполнение' },
    { key: 'M', en: 'Memory',       ru: 'Память' },
    { key: 'W', en: 'Write-back',   ru: 'Запись' }
  ];
  const N_INSTR = 5;
  const N_CYCLES = 14; // enough room for hazard mode to finish
  const INSTR_COLORS = ['accent', 'green', 'amber', 'violet', 'red']; // I1..I5

  // mode: 'seq' (no pipeline) or 'pipe'. hazard: boolean (only meaningful in pipe mode).
  let mode = 'seq';
  let hazard = false;
  let cycle = 0; // current cycle to be revealed next; 0 = nothing shown yet
  let autoTimer = null;

  function L() { return document.documentElement.getAttribute('data-lang') === 'ru' ? 'ru' : 'en'; }
  function tr(en, ru) { return L() === 'ru' ? ru : en; }
  function reduceMotion() {
    try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (_) { return false; }
  }

  // For a given (instruction index, mode, hazard), return the cycle at which
  // each pipeline stage runs. Returns array of 5 cycle numbers, one per stage.
  // Sequential: each instruction takes 5 cycles back-to-back.
  //   I1 stages at cycles 1..5, I2 at 6..10, ... → 5*N cycles total.
  // Pipelined: instruction i starts Fetch at cycle (i+1). Stage j of instruction i
  //   runs at cycle (i + 1 + j). With 5 instructions, last write-back at cycle 9.
  // Hazard: introduces a 2-cycle bubble after I2's decode — I3..I5 each shift +2.
  function stageCycles(instrIdx) {
    const cycles = new Array(STAGES.length);
    if (mode === 'seq') {
      const start = instrIdx * STAGES.length + 1;
      for (let j = 0; j < STAGES.length; j++) cycles[j] = start + j;
      return cycles;
    }
    // pipelined
    let bubble = 0;
    if (hazard && instrIdx >= 2) bubble = 2; // I3,I4,I5 stalled
    for (let j = 0; j < STAGES.length; j++) cycles[j] = instrIdx + 1 + j + bubble;
    return cycles;
  }

  function totalCycles() {
    // last cycle = max over instructions/stages
    let max = 0;
    for (let i = 0; i < N_INSTR; i++) {
      const sc = stageCycles(i);
      if (sc[sc.length - 1] > max) max = sc[sc.length - 1];
    }
    return max;
  }

  function maxCyclesShown() {
    // sequential needs 25 columns which is too wide for 1000px — collapse to a scrollable count.
    // Instead, in seq mode we still render N_CYCLES cols and label them, then say "…25 total".
    return Math.max(N_CYCLES, totalCycles());
  }

  function render() {
    const T = window.Theme;
    const W = 1000, H = 400;
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);

    const total = totalCycles();
    // How many cycle columns to draw. We draw enough to show the full pipelined run
    // (and the bubble), but cap sequential view to N_CYCLES with a "…" indicator.
    const nCols = (mode === 'seq') ? N_CYCLES : Math.min(N_CYCLES, total);

    const leftPad = 150;       // room for stage labels
    const topPad = 70;         // room for cycle headers + title
    const rightPad = 30;
    const bottomPad = 90;      // room for instruction legend
    const gridW = W - leftPad - rightPad;
    const gridH = H - topPad - bottomPad;
    const cellW = gridW / nCols;
    const cellH = gridH / STAGES.length;

    let s = '';

    // Title
    s += '<text x="20" y="28" fill="' + T.text + '" font-size="15" font-weight="700">' +
         tr('Pipeline diagram', 'Диаграмма конвейера') + '</text>';
    s += '<text x="20" y="48" fill="' + T.textMuted + '" font-size="12">' +
         (mode === 'pipe'
           ? (hazard ? tr('Pipelined with a data hazard (bubble after I2)', 'Конвейер с конфликтом данных (пузырь после I2)')
                     : tr('Pipelined — instructions overlap', 'Конвейер — инструкции перекрываются'))
           : tr('Sequential — one stage active at a time', 'Последовательно — активна одна стадия за раз')) +
         '</text>';

    // Cycle header
    for (let c = 0; c < nCols; c++) {
      const x = leftPad + c * cellW;
      s += '<text x="' + (x + cellW / 2) + '" y="' + (topPad - 8) +
           '" fill="' + T.textFaint + '" font-size="11" text-anchor="middle">' + (c + 1) + '</text>';
    }
    // ellipsis hint when sequential overflows
    if (mode === 'seq' && total > nCols) {
      s += '<text x="' + (W - rightPad) + '" y="' + (topPad - 8) +
           '" fill="' + T.textFaint + '" font-size="11" text-anchor="end">… ' + total + ' ' + tr('total', 'всего') + '</text>';
    }

    // Stage label gutter background
    s += '<rect x="0" y="' + topPad + '" width="' + leftPad + '" height="' + gridH +
         '" fill="' + T.surface2 + '" stroke="' + T.border + '" rx="6"/>';
    // Stage labels
    for (let i = 0; i < STAGES.length; i++) {
      const y = topPad + i * cellH;
      s += '<text x="' + (leftPad - 12) + '" y="' + (y + cellH / 2 + 5) +
           '" fill="' + T.text + '" font-size="13" font-weight="600" text-anchor="end">' +
           tr(STAGES[i].en, STAGES[i].ru) + '</text>';
      s += '<text x="' + 12 + '" y="' + (y + cellH / 2 + 5) +
           '" fill="' + T.textFaint + '" font-family="ui-monospace" font-size="13">' + STAGES[i].key + '</text>';
    }

    // Grid background cells
    for (let r = 0; r < STAGES.length; r++) {
      for (let c = 0; c < nCols; c++) {
        const x = leftPad + c * cellW;
        const y = topPad + r * cellH;
        s += '<rect x="' + x + '" y="' + y + '" width="' + cellW + '" height="' + cellH +
             '" fill="' + T.surface + '" stroke="' + T.border + '" stroke-width="1"/>';
      }
    }

    // Fill cells with instruction activity, but only up to the current cycle.
    for (let i = 0; i < N_INSTR; i++) {
      const colorKey = INSTR_COLORS[i];
      const color = T[colorKey] || T.accent;
      const sc = stageCycles(i);
      for (let j = 0; j < STAGES.length; j++) {
        const c = sc[j];
        if (c > cycle) continue;            // not revealed yet
        if (c - 1 >= nCols) continue;       // off-screen (only in seq mode after col 14)
        const x = leftPad + (c - 1) * cellW;
        const y = topPad + j * cellH;
        const active = (c === cycle);
        // Filled cell with translucent instruction color, brighter when active
        s += '<rect x="' + (x + 1) + '" y="' + (y + 1) + '" width="' + (cellW - 2) + '" height="' + (cellH - 2) +
             '" fill="' + color + '" fill-opacity="' + (active ? '0.95' : '0.55') +
             '" stroke="' + (active ? T.accent : color) + '" stroke-width="' + (active ? 2.5 : 1) + '"/>';
        // Instruction label inside cell
        s += '<text x="' + (x + cellW / 2) + '" y="' + (y + cellH / 2 + 4) +
             '" fill="#fff" font-size="12" font-weight="700" text-anchor="middle">I' + (i + 1) + STAGES[j].key + '</text>';
      }
    }

    // Bubble cells (only in hazard pipe mode). Bubble occupies the Fetch row
    // at cycles 4 and 5 — the stall before I3 enters Fetch.
    if (mode === 'pipe' && hazard) {
      for (let bc = 4; bc <= 5; bc++) {
        if (bc > cycle) continue;
        if (bc - 1 >= nCols) continue;
        const x = leftPad + (bc - 1) * cellW;
        const y = topPad; // Fetch row
        s += '<rect x="' + (x + 1) + '" y="' + (y + 1) + '" width="' + (cellW - 2) + '" height="' + (cellH - 2) +
             '" fill="' + T.surface2 + '" stroke="' + T.red + '" stroke-dasharray="4 3" stroke-width="2"/>';
        s += '<text x="' + (x + cellW / 2) + '" y="' + (y + cellH / 2 + 4) +
             '" fill="' + T.red + '" font-size="11" font-weight="700" text-anchor="middle">' +
             tr('stall', 'стоп') + '</text>';
      }
    }

    // Active-cycle highlight column outline
    if (cycle >= 1 && cycle <= nCols) {
      const x = leftPad + (cycle - 1) * cellW;
      s += '<rect x="' + x + '" y="' + topPad + '" width="' + cellW + '" height="' + gridH +
           '" fill="none" stroke="' + T.accent + '" stroke-width="2.5" rx="3"/>';
    }

    // Legend at bottom
    const legendY = H - bottomPad + 22;
    s += '<text x="20" y="' + (legendY - 4) + '" fill="' + T.textMuted + '" font-size="12" font-weight="600">' +
         tr('Instructions', 'Инструкции') + '</text>';
    for (let i = 0; i < N_INSTR; i++) {
      const color = T[INSTR_COLORS[i]] || T.accent;
      const lx = 20 + i * 110;
      const ly = legendY + 12;
      s += '<rect x="' + lx + '" y="' + ly + '" width="16" height="16" fill="' + color + '" rx="3"/>';
      s += '<text x="' + (lx + 22) + '" y="' + (ly + 13) + '" fill="' + T.text + '" font-size="12">I' + (i + 1) + '</text>';
    }
    // Done indicators
    const doneAt = stageCycles(N_INSTR - 1)[STAGES.length - 1];
    if (cycle >= doneAt) {
      s += '<text x="' + (W - rightPad) + '" y="' + (legendY + 25) +
           '" text-anchor="end" fill="' + T.green + '" font-size="13" font-weight="700">' +
           tr('All 5 instructions complete', 'Все 5 инструкций завершены') + ' (' + doneAt + ' ' + tr('cycles', 'тактов') + ')</text>';
    }

    svg.innerHTML = s;
    updateReadouts();
  }

  function updateReadouts() {
    const total = totalCycles();
    const seqTotal = N_INSTR * STAGES.length; // 25
    cycleEl.textContent = tr('Cycle: ', 'Такт: ') + cycle + ' / ' + total;
    const speedup = (seqTotal / total);
    speedupEl.innerHTML = tr('Speedup: ', 'Ускорение: ') +
      '<b>' + seqTotal + ' / ' + total + ' = ' + speedup.toFixed(2) + '×</b>';

    // Mode button label reflects what clicking will switch TO
    modeBtn.textContent = (mode === 'seq')
      ? tr('Pipelining: OFF — click to enable', 'Конвейер: ВЫКЛ — нажмите чтобы включить')
      : tr('Pipelining: ON — click to disable', 'Конвейер: ВКЛ — нажмите чтобы выключить');
    modeBtn.setAttribute('aria-pressed', mode === 'pipe' ? 'true' : 'false');

    hazardBtn.textContent = hazard
      ? tr('Hazard: ON', 'Конфликт: ВКЛ')
      : tr('Hazard: OFF', 'Конфликт: ВЫКЛ');
    hazardBtn.disabled = (mode !== 'pipe');
    hazardBtn.style.opacity = (mode !== 'pipe') ? '0.5' : '1';
    hazardBtn.setAttribute('aria-pressed', hazard ? 'true' : 'false');

    runBtn.textContent = autoTimer
      ? tr('⏸ Pause', '⏸ Пауза')
      : tr('⏩ Auto-run', '⏩ Авто');
  }

  function step() {
    const total = totalCycles();
    if (cycle >= total) {
      stopAuto();
      return;
    }
    cycle += 1;
    render();
    if (cycle >= total) stopAuto();
  }

  function reset(keepMode) {
    stopAuto();
    cycle = 0;
    if (!keepMode) { mode = 'seq'; hazard = false; }
    render();
  }

  function stopAuto() {
    if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
    updateReadouts();
  }

  function startAuto() {
    if (autoTimer) return;
    const delay = reduceMotion() ? 1500 : 500;
    autoTimer = setInterval(step, delay);
    updateReadouts();
  }

  modeBtn.addEventListener('click', () => {
    mode = (mode === 'seq') ? 'pipe' : 'seq';
    if (mode === 'seq') hazard = false;
    cycle = 0;
    stopAuto();
    render();
  });
  hazardBtn.addEventListener('click', () => {
    if (mode !== 'pipe') return;
    hazard = !hazard;
    cycle = 0;
    stopAuto();
    render();
  });
  stepBtn.addEventListener('click', step);
  resetBtn.addEventListener('click', () => reset(true));
  runBtn.addEventListener('click', () => { autoTimer ? stopAuto() : startAuto(); });

  document.addEventListener('themechange', render);
  document.addEventListener('langchange', render);

  render();
})();
