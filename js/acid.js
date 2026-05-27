// A3.3 — ACID transaction (HL): bank transfer simulator
// Step through the transaction. The Crash button injects a failure between debit and credit
// so the student can see why ROLLBACK preserves atomicity.
(function () {
  const root = document.getElementById('acid-sim');
  if (!root) return;

  const balAEl = root.querySelector('#acid-a-bal');
  const balBEl = root.querySelector('#acid-b-bal');
  const runBtn = root.querySelector('#acid-run');
  const crashBtn = root.querySelector('#acid-crash');
  const resetBtn = root.querySelector('#acid-reset');
  const logEl = root.querySelector('#acid-log');
  const noteEl = root.querySelector('#acid-note');

  const INITIAL_A = 500, INITIAL_B = 200, AMOUNT = 100;
  let balA = INITIAL_A, balB = INITIAL_B;
  let running = false;

  function L() { return document.documentElement.getAttribute('data-lang') === 'ru' ? 'ru' : 'en'; }
  function tr(en, ru) { return L() === 'ru' ? ru : en; }

  function fmt(n) { return '$' + n; }

  function paint() {
    balAEl.textContent = fmt(balA);
    balBEl.textContent = fmt(balB);
  }

  function addStep(label, code, cls) {
    const div = document.createElement('div');
    div.className = 'enc-stage enc-stage-' + cls;
    div.innerHTML =
      '<div class="enc-stage-head">' + label + '</div>' +
      (code ? '<div class="enc-stage-body"><code>' + code + '</code></div>' : '');
    logEl.appendChild(div);
  }

  function wait(ms) { return new Promise(r => setTimeout(r, ms)); }

  async function transfer(crashAfterDebit) {
    running = true;
    runBtn.disabled = crashBtn.disabled = resetBtn.disabled = true;
    try {
      addStep(tr('1. BEGIN TRANSACTION', '1. BEGIN TRANSACTION'), 'BEGIN TRANSACTION;', 'plain');
      await wait(500);

      addStep(tr('2. Debit Alice', '2. Списать с Алисы'),
        "UPDATE accounts SET balance = balance - 100 WHERE name = 'Alice';", 'cipher');
      balA -= AMOUNT; paint();
      await wait(700);

      if (crashAfterDebit) {
        addStep('💥 ' + tr('CRASH! Server lost power before crediting Bob.', 'СБОЙ! Сервер упал до зачисления Бобу.'), '', 'wire');
        await wait(600);
        addStep(tr('3. Recovery → ROLLBACK', '3. Восстановление → ROLLBACK'),
          'ROLLBACK;', 'cipher');
        // restore atomically
        balA += AMOUNT; paint();
        addStep(tr('4. Database is back to its pre-transaction state', '4. БД вернулась в состояние до транзакции'),
          tr('Atomicity preserved — no money disappeared.', 'Атомарность сохранена — деньги не исчезли.'), 'plain');
        noteEl.innerHTML = tr(
          '<b>This is why ACID matters.</b> Without atomicity, $100 would have vanished. ROLLBACK rewinds every change since the last COMMIT.',
          '<b>Вот почему нужен ACID.</b> Без атомарности $100 бы исчезли. ROLLBACK откатывает всё, что произошло после последнего COMMIT.'
        );
      } else {
        addStep(tr('3. Credit Bob', '3. Зачислить Бобу'),
          "UPDATE accounts SET balance = balance + 100 WHERE name = 'Bob';", 'cipher');
        balB += AMOUNT; paint();
        await wait(700);
        addStep(tr('4. COMMIT', '4. COMMIT'), 'COMMIT;', 'final');
        addStep('✓ ' + tr('Transaction durable: changes survive crashes', 'Транзакция durable: изменения переживут сбой'),
          tr('Total money in system is unchanged.', 'Сумма денег в системе не изменилась.'), 'plain');
        noteEl.innerHTML = tr(
          '<b>Successful path.</b> All four ACID properties applied: Atomic (all steps succeed together), Consistent (constraints respected), Isolated (other transactions don\'t see partial state), Durable (committed → permanent).',
          '<b>Успешный сценарий.</b> Все четыре свойства ACID: Атомарность (все шаги выполнены вместе), Согласованность (соблюдены ограничения), Изолированность (другие транзакции не видят промежуточного состояния), Устойчивость (после COMMIT — навсегда).'
        );
      }
    } finally {
      runBtn.disabled = crashBtn.disabled = resetBtn.disabled = false;
      running = false;
    }
  }

  function reset() {
    balA = INITIAL_A; balB = INITIAL_B; paint();
    logEl.innerHTML = '';
    noteEl.innerHTML = tr(
      'Press <b>Run transaction</b> for the happy path, or <b>Crash</b> to inject a failure between debit and credit.',
      'Нажмите <b>Выполнить транзакцию</b> для штатного сценария или <b>Сбой</b>, чтобы внести сбой между списанием и зачислением.'
    );
  }

  // Reject re-entrant clicks so an in-flight transaction can't be wiped by reset()
  runBtn.addEventListener('click', () => { if (running) return; reset(); transfer(false); });
  crashBtn.addEventListener('click', () => { if (running) return; reset(); transfer(true); });
  resetBtn.addEventListener('click', () => { if (running) return; reset(); });
  document.addEventListener('langchange', () => { if (!running) reset(); });

  reset();
})();
