// A1.2 — Number system converter: binary / denary / hex with bit-flip toy.
// Click any of the 8 bits to flip it and watch all three bases update.
(function () {
  const root = document.getElementById('binary-sim');
  if (!root) return;

  const bitsBox = root.querySelector('#bin-bits');
  const denInput = root.querySelector('#bin-den');
  const hexInput = root.querySelector('#bin-hex');
  const binText = root.querySelector('#bin-bin');
  const widthSel = root.querySelector('#bin-width');
  const signedChk = root.querySelector('#bin-signed');
  const valEl = root.querySelector('#bin-val');
  const explainEl = root.querySelector('#bin-explain');

  let width = parseInt(widthSel.value, 10); // 4, 8, 16
  let bits = new Array(width).fill(0); // bits[0] = MSB

  function L() { return document.documentElement.getAttribute('data-lang') === 'ru' ? 'ru' : 'en'; }
  function tr(en, ru) { return L() === 'ru' ? ru : en; }

  function bitsToUnsigned() {
    let n = 0;
    for (let i = 0; i < width; i++) n = (n << 1) | bits[i];
    return n;
  }
  function bitsToSigned() {
    // Two's complement: if top bit is set, value is negative
    const u = bitsToUnsigned();
    if (bits[0] === 1) return u - (1 << width);
    return u;
  }
  function unsignedToBits(n) {
    n = Math.max(0, Math.min(n, (1 << width) - 1));
    for (let i = width - 1; i >= 0; i--) {
      bits[i] = n & 1;
      n >>= 1;
    }
  }
  function signedToBits(n) {
    const lo = -(1 << (width - 1)), hi = (1 << (width - 1)) - 1;
    n = Math.max(lo, Math.min(n, hi));
    if (n < 0) n = n + (1 << width); // two's complement
    unsignedToBits(n);
  }

  function renderBits() {
    bitsBox.innerHTML = '';
    for (let i = 0; i < width; i++) {
      const place = 1 << (width - 1 - i);
      const cell = document.createElement('button');
      cell.type = 'button';
      cell.className = 'bin-cell' + (bits[i] === 1 ? ' on' : '');
      cell.setAttribute('aria-pressed', bits[i] === 1 ? 'true' : 'false');
      cell.setAttribute('aria-label',
        tr('Bit, place value ' + place + ', currently ' + bits[i],
           'Бит, разряд ' + place + ', сейчас ' + bits[i]));
      cell.innerHTML = '<div class="bin-place">' + place + '</div>' +
                       '<div class="bin-bit">' + bits[i] + '</div>';
      cell.addEventListener('click', () => { bits[i] = bits[i] ? 0 : 1; update(); });
      bitsBox.appendChild(cell);
    }
  }

  function update() {
    renderBits();
    const u = bitsToUnsigned();
    const signed = signedChk.checked;
    const v = signed ? bitsToSigned() : u;
    // Don't rewrite a field the user is actively typing into — it would scramble the caret.
    if (document.activeElement !== denInput) denInput.value = v;
    if (document.activeElement !== hexInput) {
      hexInput.value = u.toString(16).toUpperCase().padStart(Math.ceil(width / 4), '0');
    }
    binText.textContent = bits.join('').replace(/(.{4})/g, '$1 ').trim();
    valEl.textContent = v;

    // Explain step-by-step (denary breakdown of set bits)
    const setBits = [];
    for (let i = 0; i < width; i++) {
      if (bits[i] === 1) setBits.push(1 << (width - 1 - i));
    }
    if (setBits.length === 0) {
      explainEl.textContent = tr('All bits are 0 → value is 0.', 'Все биты 0 → значение 0.');
    } else if (signed && bits[0] === 1) {
      // signed negative explanation
      const u2 = bitsToUnsigned();
      explainEl.innerHTML = tr(
        'Signed: top bit is 1 → negative. Unsigned interpretation would be <b>' + u + '</b>. As two\'s complement: <b>' + u + ' − 2<sup>' + width + '</sup> = ' + v + '</b>.',
        'Знаковый: старший бит 1 → отрицательное. Беззнаковая трактовка — <b>' + u + '</b>. В дополнительном коде: <b>' + u + ' − 2<sup>' + width + '</sup> = ' + v + '</b>.'
      );
    } else {
      explainEl.innerHTML = tr(
        'Sum of place values: ', 'Сумма разрядов: ') + '<b>' + setBits.join(' + ') + ' = ' + v + '</b>';
    }
  }

  denInput.addEventListener('input', () => {
    const n = parseInt(denInput.value, 10);
    if (isNaN(n)) return;
    if (signedChk.checked) signedToBits(n); else unsignedToBits(n);
    update();
  });
  hexInput.addEventListener('input', () => {
    const n = parseInt(hexInput.value, 16);
    if (isNaN(n)) return;
    unsignedToBits(n);
    update();
  });
  widthSel.addEventListener('change', () => {
    const newW = parseInt(widthSel.value, 10);
    const u = bitsToUnsigned();
    const maxNew = (1 << newW) - 1;
    width = newW;
    bits = new Array(width).fill(0);
    if (u > maxNew) {
      // Narrowing would silently lose the high bits → clamp to max so the user
      // sees an explicit "ceiling" rather than a surprise zero.
      unsignedToBits(maxNew);
    } else {
      // Widening: preserve the value exactly (zero-extend).
      unsignedToBits(u);
    }
    update();
  });
  signedChk.addEventListener('change', update);
  document.addEventListener('langchange', update);

  // Init with 0
  update();
})();
