// A1.1 — CPU fetch-decode-execute cycle animation.
// Shows registers, memory and the bus traffic for a tiny program.
(function () {
  const root = document.getElementById('fde-sim');
  if (!root) return;
  const svg = root.querySelector('#fde-svg');
  const stepBtn = root.querySelector('#fde-step');
  const runBtn = root.querySelector('#fde-run');
  const resetBtn = root.querySelector('#fde-reset');
  const stageEl = root.querySelector('#fde-stage');
  const noteEl = root.querySelector('#fde-note');

  // Mini program: load 5 → ACC, add 3, store in memory[2], halt.
  // Each instruction is a fixed-format string for display.
  const PROGRAM_TEMPLATE = [
    { addr: 0, asm: 'LOAD 5',  desc: { en: 'Put 5 into the accumulator',         ru: 'Положить 5 в аккумулятор' } },
    { addr: 1, asm: 'ADD 3',   desc: { en: 'Add 3 to the accumulator',           ru: 'Прибавить 3 к аккумулятору' } },
    { addr: 2, asm: 'STORE 4', desc: { en: 'Store accumulator into memory[4]',   ru: 'Сохранить аккумулятор в память[4]' } },
    { addr: 3, asm: 'HALT',    desc: { en: 'Stop',                                ru: 'Стоп' } },
    { addr: 4, asm: '0',       desc: { en: '(data slot)',                         ru: '(ячейка данных)' } }
  ];

  let state, stage = 'idle', autoTimer = null;

  function L() { return document.documentElement.getAttribute('data-lang') === 'ru' ? 'ru' : 'en'; }
  function tr(en, ru) { return L() === 'ru' ? ru : en; }

  function init() {
    state = {
      pc: 0,
      cir: '',
      acc: 0,
      mar: 0,
      mdr: '',
      memory: PROGRAM_TEMPLATE.map(p => ({ addr: p.addr, value: p.asm, desc: p.desc })),
      halted: false,
      highlight: null // 'pc', 'cir', 'acc', 'mar', 'mdr', or memory addr
    };
    stage = 'idle';
    render();
    note(tr('Press Step to fetch the next instruction.', 'Нажмите «Шаг», чтобы выбрать следующую инструкцию.'));
  }

  function note(html) {
    noteEl.innerHTML = html;
  }

  function step() {
    if (state.halted) return;

    if (stage === 'idle' || stage === 'executed') {
      // Fetch
      stage = 'fetch';
      state.mar = state.pc;
      state.cir = state.memory[state.pc].value;
      state.mdr = state.cir;
      state.highlight = 'fetch';
      stageEl.textContent = 'FETCH';
      note(tr(
        '<b>Fetch:</b> PC = ' + state.pc + ', so MAR ← PC and we read memory[' + state.pc + '] = <code>' + state.cir + '</code> into CIR. PC is then incremented.',
        '<b>Выборка:</b> PC = ' + state.pc + ', значит MAR ← PC и читаем память[' + state.pc + '] = <code>' + state.cir + '</code> в CIR. PC увеличивается.'
      ));
      state.pc += 1;
      render();
      return;
    }
    if (stage === 'fetch') {
      stage = 'decode';
      state.highlight = 'cir';
      stageEl.textContent = 'DECODE';
      note(tr(
        '<b>Decode:</b> The CU reads <code>' + state.cir + '</code> and identifies it as the operation <b>' + state.cir.split(' ')[0] + '</b>' + (state.cir.split(' ').length > 1 ? ' with operand <b>' + state.cir.split(' ')[1] + '</b>' : '') + '.',
        '<b>Декодирование:</b> CU читает <code>' + state.cir + '</code> и определяет операцию <b>' + state.cir.split(' ')[0] + '</b>' + (state.cir.split(' ').length > 1 ? ' с операндом <b>' + state.cir.split(' ')[1] + '</b>' : '') + '.'
      ));
      render();
      return;
    }
    if (stage === 'decode') {
      stage = 'execute';
      stageEl.textContent = 'EXECUTE';
      execute();
      state.highlight = 'acc';
      render();
      return;
    }
    if (stage === 'execute') {
      stage = 'executed';
      stageEl.textContent = 'READY';
      state.highlight = null;
      render();
    }
  }

  function execute() {
    const parts = state.cir.split(' ');
    const op = parts[0];
    const operand = parts[1] ? parseInt(parts[1], 10) : null;
    switch (op) {
      case 'LOAD':
        state.acc = operand;
        note(tr(
          '<b>Execute:</b> the ALU loads the literal ' + operand + ' into ACC.',
          '<b>Исполнение:</b> АЛУ загружает значение ' + operand + ' в аккумулятор.'
        ));
        break;
      case 'ADD':
        state.acc += operand;
        note(tr(
          '<b>Execute:</b> ALU computes ACC + ' + operand + ' = <b>' + state.acc + '</b>.',
          '<b>Исполнение:</b> АЛУ считает ACC + ' + operand + ' = <b>' + state.acc + '</b>.'
        ));
        break;
      case 'STORE':
        state.memory[operand].value = state.acc;
        note(tr(
          '<b>Execute:</b> ACC (' + state.acc + ') is written to memory[' + operand + '].',
          '<b>Исполнение:</b> ACC (' + state.acc + ') записывается в память[' + operand + '].'
        ));
        break;
      case 'HALT':
        state.halted = true;
        stage = 'halted';
        stageEl.textContent = 'HALT';
        note(tr(
          '<b>HALT.</b> The CPU stops. Press Reset to start over.',
          '<b>HALT.</b> ЦП останавливается. Нажмите «Сброс», чтобы начать заново.'
        ));
        if (autoTimer) { clearInterval(autoTimer); autoTimer = null; runBtn.textContent = tr('⏩ Auto-run', '⏩ Авто'); }
        return;
    }
  }

  function render() {
    const T = window.Theme;
    const W = 800, H = 380;
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    let s = '';

    // CPU box
    s += rect(20, 20, 380, H - 40, T.surface2, T.border, 'CPU');

    // Registers
    s += register(40, 70, 'PC', state.pc, state.highlight === 'fetch' || state.highlight === 'pc' ? T.accent : null, T);
    s += register(40, 130, 'CIR', state.cir || '—', state.highlight === 'cir' ? T.accent : null, T);
    s += register(40, 190, 'ACC', state.acc, state.highlight === 'acc' ? T.green : null, T);
    s += register(220, 70, 'MAR', state.mar, state.highlight === 'fetch' ? T.accent : null, T);
    s += register(220, 130, 'MDR', state.mdr || '—', state.highlight === 'fetch' ? T.accent : null, T);
    // CU + ALU label
    s += rect(220, 200, 160, 50, T.surface, T.border);
    s += '<text x="300" y="225" fill="' + T.textMuted + '" font-size="13" text-anchor="middle">CU + ALU</text>';
    s += '<text x="300" y="245" fill="' + T.textFaint + '" font-size="11" text-anchor="middle">' +
         (stage === 'execute' || stage === 'decode' ? '⚡ ' + stage.toUpperCase() : '—') + '</text>';

    // Memory box on right
    s += rect(440, 20, 340, H - 40, T.surface2, T.border, tr('Memory', 'Память'));
    state.memory.forEach((m, i) => {
      const y = 60 + i * 50;
      const isActive = state.highlight === 'fetch' && i === state.pc - 1;
      s += rect(460, y, 60, 40, isActive ? T.accent : T.surface, T.border);
      s += '<text x="490" y="' + (y + 25) + '" fill="' + (isActive ? '#fff' : T.text) + '" font-family="ui-monospace" font-size="13" text-anchor="middle">' + m.addr + '</text>';
      s += rect(530, y, 140, 40, isActive ? T.accent : T.surface, T.border);
      s += '<text x="600" y="' + (y + 25) + '" fill="' + (isActive ? '#fff' : T.text) + '" font-family="ui-monospace" font-size="13" text-anchor="middle">' + m.value + '</text>';
      s += '<text x="685" y="' + (y + 25) + '" fill="' + T.textFaint + '" font-size="11">' + (m.desc[L()] || m.desc.en) + '</text>';
    });

    // Bus arrow (animated only on fetch)
    if (state.highlight === 'fetch') {
      s += '<path d="M 460 ' + (60 + (state.pc - 1) * 50 + 20) + ' L 400 ' + (60 + (state.pc - 1) * 50 + 20) + ' L 290 90 L 290 90" stroke="' + T.accent + '" stroke-width="2.5" fill="none" stroke-dasharray="6 4" />';
    }

    svg.innerHTML = s;
  }

  function rect(x, y, w, h, fill, stroke, label) {
    let r = '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="' + fill + '" stroke="' + stroke + '" rx="6" stroke-width="1.5" />';
    if (label) r += '<text x="' + (x + 8) + '" y="' + (y - 6) + '" fill="' + window.Theme.textMuted + '" font-size="11" font-weight="600">' + label + '</text>';
    return r;
  }
  function register(x, y, name, value, highlightColor, T) {
    const stroke = highlightColor || T.border;
    const labelColor = highlightColor || T.textFaint;
    return '<rect x="' + x + '" y="' + y + '" width="160" height="40" fill="' + T.surface + '" stroke="' + stroke + '" rx="6" stroke-width="' + (highlightColor ? 2.5 : 1.5) + '" />' +
           '<text x="' + (x + 8) + '" y="' + (y - 6) + '" fill="' + labelColor + '" font-size="11" font-weight="600">' + name + '</text>' +
           '<text x="' + (x + 80) + '" y="' + (y + 25) + '" fill="' + T.text + '" font-family="ui-monospace" font-size="14" text-anchor="middle">' + value + '</text>';
  }

  stepBtn.addEventListener('click', step);
  resetBtn.addEventListener('click', () => {
    if (autoTimer) { clearInterval(autoTimer); autoTimer = null; runBtn.textContent = tr('⏩ Auto-run', '⏩ Авто'); }
    init();
  });
  runBtn.addEventListener('click', () => {
    if (autoTimer) {
      clearInterval(autoTimer); autoTimer = null;
      runBtn.textContent = tr('⏩ Auto-run', '⏩ Авто');
      return;
    }
    if (state.halted) return; // can't run a halted CPU; user must Reset first
    autoTimer = setInterval(step, 700);
    runBtn.textContent = tr('⏸ Pause', '⏸ Пауза');
  });
  document.addEventListener('themechange', render);
  document.addEventListener('langchange', () => { render(); });

  init();
})();
