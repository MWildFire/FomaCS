// A1.4 (HL) — Compiler vs Interpreter step-by-step contrast.
// Both "process" the same toy 3-line program; user steps through and sees the difference.
(function () {
  const root = document.getElementById('ci-sim');
  if (!root) return;
  const stepBtn = root.querySelector('#ci-step');
  const resetBtn = root.querySelector('#ci-reset');
  const programEl = root.querySelector('#ci-program');
  const compilerEl = root.querySelector('#ci-compiler');
  const interpreterEl = root.querySelector('#ci-interpreter');
  const noteEl = root.querySelector('#ci-note');

  const PROGRAM = [
    { src: 'x = 5',     ok: true,   compiled: 'MOV x, 5',          executed: 'x = 5' },
    { src: 'y = x + 3', ok: true,   compiled: 'ADD y, x, 3',       executed: 'y = 8' },
    { src: 'print(y)',  ok: true,   compiled: 'CALL print y',      executed: 'output: 8' }
  ];

  let step = 0; // 0 = nothing yet; up to 2 phases × N steps

  function L() { return document.documentElement.getAttribute('data-lang') === 'ru' ? 'ru' : 'en'; }
  function tr(en, ru) { return L() === 'ru' ? ru : en; }

  function reset() {
    step = 0;
    update();
  }

  function update() {
    // Source program
    programEl.innerHTML = PROGRAM.map((p, i) =>
      '<div class="ci-line">' + (i + 1) + '. <code>' + escapeHtml(p.src) + '</code></div>'
    ).join('');

    // Compiler column: shows the full translated output after the whole program is processed
    let compilerHtml = '<div class="ci-phase muted">' + tr('1. Whole program translated', '1. Вся программа переводится') + '</div>';
    if (step >= 1) {
      compilerHtml += '<div class="ci-output">' +
        PROGRAM.map(p => '<div><code>' + escapeHtml(p.compiled) + '</code></div>').join('') +
        '</div>';
      compilerHtml += '<div class="ci-phase muted" style="margin-top:10px">' + tr('2. Compiled program runs (no compiler needed)', '2. Готовая программа исполняется (компилятор больше не нужен)') + '</div>';
      if (step >= 2) {
        compilerHtml += '<div class="ci-output ci-success">' +
          PROGRAM.map(p => '<div>✓ <code>' + escapeHtml(p.executed) + '</code></div>').join('') +
          '</div>';
      }
    }
    compilerEl.innerHTML = compilerHtml;

    // Interpreter column: one line at a time — translate AND execute
    let interpHtml = '<div class="ci-phase muted">' + tr('Line-by-line: translate → run → next line', 'Строка за строкой: перевести → исполнить → следующая') + '</div>';
    interpHtml += '<div class="ci-output">';
    for (let i = 0; i < step && i < PROGRAM.length; i++) {
      interpHtml += '<div>→ <code>' + escapeHtml(PROGRAM[i].src) + '</code></div>' +
                    '<div class="ci-success">✓ <code>' + escapeHtml(PROGRAM[i].executed) + '</code></div>';
    }
    interpHtml += '</div>';
    interpreterEl.innerHTML = interpHtml;

    // Step note
    if (step === 0) {
      note(tr(
        'Press <b>Step</b> to see what each translator does with the same 3-line program.',
        'Нажмите <b>«Шаг»</b>, чтобы увидеть, как каждый транслятор обрабатывает одну и ту же программу из 3 строк.'
      ));
    } else if (step === 1) {
      note(tr(
        '<b>Compiler:</b> translated the whole program at once into machine code — but hasn\'t run it yet. <b>Interpreter:</b> already translated and ran line 1.',
        '<b>Компилятор:</b> перевёл всю программу в машинный код, но ещё не запустил. <b>Интерпретатор:</b> уже перевёл и выполнил строку 1.'
      ));
    } else if (step === 2) {
      note(tr(
        '<b>Compiler:</b> executable runs and produces all output. <b>Interpreter:</b> has done two lines and translated the third.',
        '<b>Компилятор:</b> exe запускается и выдаёт весь вывод. <b>Интерпретатор:</b> сделал две строки и перевёл третью.'
      ));
    } else {
      note(tr(
        '<b>Done.</b> Trade-off: a compiler does heavy work once → fast at runtime, errors caught all together up front; an interpreter does light work many times → easy to test interactively, slower at runtime, errors surface as you hit them.',
        '<b>Готово.</b> Компромисс: компилятор делает тяжёлую работу один раз → быстро при запуске, ошибки находятся все сразу; интерпретатор делает лёгкую работу многократно → удобно тестировать интерактивно, медленнее, ошибки всплывают по ходу.'
      ));
    }
  }

  function note(html) { noteEl.innerHTML = html; }
  function escapeHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  stepBtn.addEventListener('click', () => {
    if (step < PROGRAM.length) step += 1;
    update();
  });
  resetBtn.addEventListener('click', reset);
  document.addEventListener('langchange', update);
  document.addEventListener('themechange', update);

  reset();
})();
