// A2.4 — Symmetric vs Asymmetric encryption visualiser
// Type a message; pick a key/mode; watch encrypt, transmit, decrypt — and the eavesdropper.
(function () {
  const root = document.getElementById('encryption-sim');
  if (!root) return;

  const modeSel = root.querySelector('#enc-mode');
  const msgInput = root.querySelector('#enc-msg');
  const keyInput = root.querySelector('#enc-key');
  const keyLabel = root.querySelector('#enc-key-label');
  const runBtn = root.querySelector('#enc-run');
  const stagesEl = root.querySelector('#enc-stages');
  const eveLine = root.querySelector('#enc-eve');
  const noteEl = root.querySelector('#enc-note');

  // Simple "encryption" — Caesar-shift for symmetric, XOR-with-keystream for asymmetric demo.
  // NOT secure! These are visual analogues to convey the concept only.
  function caesar(text, shift) {
    let out = '';
    for (const ch of text) {
      const c = ch.codePointAt(0);
      // shift printable ASCII; leave others
      if (c >= 32 && c <= 126) {
        out += String.fromCodePoint(32 + ((c - 32 + shift) % 95 + 95) % 95);
      } else {
        out += ch;
      }
    }
    return out;
  }
  // Hash-ish: derive a pseudo-keystream from a string key (for demo only)
  function streamFor(key, len) {
    let h = 2166136261 >>> 0;
    const stream = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      const k = key.charCodeAt(i % key.length) || 1;
      h = ((h ^ (k + i)) * 16777619) >>> 0;
      stream[i] = h & 0xff;
    }
    return stream;
  }
  // Per-position modular shift — visually random, mathematically reversible
  // on the printable-ASCII subset [32, 126]. `dir = +1` encrypts, `-1` decrypts.
  function streamShift(text, key, dir) {
    const s = streamFor(key, text.length);
    let out = '';
    for (let i = 0; i < text.length; i++) {
      const c = text.charCodeAt(i);
      if (c >= 32 && c <= 126) {
        const shift = (s[i] % 95) * dir;
        const code = 32 + (((c - 32 + shift) % 95 + 95) % 95);
        out += String.fromCharCode(code);
      } else {
        out += text[i];
      }
    }
    return out;
  }

  function L() { return document.documentElement.getAttribute('data-lang') === 'ru' ? 'ru' : 'en'; }
  function tr(en, ru) { return L() === 'ru' ? ru : en; }

  function updateKeyLabel() {
    if (modeSel.value === 'symmetric') {
      keyLabel.textContent = tr('Shared secret key (both sides know it):', 'Общий секретный ключ (известен обеим сторонам):');
    } else {
      keyLabel.textContent = tr('Receiver\'s public key (anyone may know):', 'Открытый ключ получателя (его может знать кто угодно):');
    }
    updateNote();
  }

  function updateNote() {
    if (modeSel.value === 'symmetric') {
      noteEl.innerHTML = tr(
        '<b>Symmetric:</b> one shared key encrypts and decrypts — fast, but how do you exchange the key in the first place without an attacker grabbing it?',
        '<b>Симметричное:</b> один общий ключ и шифрует, и расшифровывает — быстро, но как обменяться ключом, чтобы атакующий его не перехватил?'
      );
    } else {
      noteEl.innerHTML = tr(
        '<b>Asymmetric:</b> the <b>public key</b> may be published; only the matching <b>private key</b> (kept secret by the receiver) can decrypt. Solves key exchange — at the cost of speed. HTTPS uses asymmetric to exchange a fresh symmetric key, then encrypts the bulk data symmetrically.',
        '<b>Асимметричное:</b> <b>открытый ключ</b> можно публиковать; расшифровать может только парный <b>закрытый ключ</b> (хранится у получателя). Решает проблему обмена — ценой скорости. HTTPS использует асимметричное для передачи нового симметричного ключа, а основную нагрузку шифрует симметрично.'
      );
    }
  }

  function run() {
    const mode = modeSel.value;
    const msg = msgInput.value || '';
    const key = keyInput.value || 'demo';

    let cipher, plain;
    if (mode === 'symmetric') {
      // shift by sum of key char codes mod 95 (1..94)
      const shift = ([...key].reduce((s, c) => s + c.charCodeAt(0), 0) % 94) + 1;
      cipher = caesar(msg, shift);
      plain = caesar(cipher, -shift);
    } else {
      // Encrypt with the public-key-derived stream, decrypt by reversing the shift
      const k = 'PUB-' + key;
      cipher = streamShift(msg, k, +1);
      plain = streamShift(cipher, k, -1);
    }

    // Render the pipeline
    stagesEl.innerHTML =
      stage('1', '👤 ' + tr('Sender (Alice)', 'Отправитель (Алиса)'),
            tr('Plaintext:', 'Открытый текст:'), msg, 'plain') +
      stage('2', tr('🔒 Encrypt with ', '🔒 Зашифровать ') + (mode === 'symmetric' ? tr('shared key', 'общим ключом') : tr('public key', 'открытым ключом')),
            tr('Ciphertext:', 'Шифртекст:'), cipher, 'cipher') +
      stage('3', '🌐 ' + tr('Travels over the internet…', 'Идёт через интернет…'),
            tr('On the wire (what an eavesdropper sees):', 'На проводе (что видит перехватчик):'), cipher, 'wire') +
      stage('4', tr('🔓 Decrypt with ', '🔓 Расшифровать ') + (mode === 'symmetric' ? tr('the same shared key', 'тем же общим ключом') : tr('private key', 'закрытым ключом')),
            tr('Plaintext again:', 'Снова открытый текст:'), plain, 'plain') +
      stage('5', '👤 ' + tr('Receiver (Bob) reads it', 'Получатель (Боб) читает'),
            tr('Plain message recovered:', 'Открытое сообщение восстановлено:'), plain, 'final');

    eveLine.innerHTML = '<b>🕵️ ' + tr('Eve sees only', 'Ева видит только') + ':</b> <code>' + escapeHtml(cipher) + '</code> — ' +
      tr('without the right key it stays gibberish.', 'без нужного ключа это так и остаётся бессмыслицей.');
  }

  function stage(n, title, label, value, cls) {
    return '<div class="enc-stage enc-stage-' + cls + '">' +
      '<div class="enc-stage-head"><span class="enc-num">' + n + '</span>' + title + '</div>' +
      (label ? '<div class="enc-stage-body"><span class="muted">' + label + '</span><code>' + escapeHtml(value) + '</code></div>' : '') +
      '</div>';
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  modeSel.addEventListener('change', () => { updateKeyLabel(); run(); });
  msgInput.addEventListener('input', run);
  keyInput.addEventListener('input', run);
  runBtn.addEventListener('click', run);
  document.addEventListener('langchange', () => { updateKeyLabel(); run(); });
  document.addEventListener('themechange', () => { /* CSS handles colours */ });

  updateKeyLabel();
  run();
})();
