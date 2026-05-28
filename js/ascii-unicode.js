// A1.2.2 — Character encoding live encoder: ASCII vs Unicode (UTF-8 / UTF-16)
// Type any text and watch every character broken down into code point + bytes.
(function () {
  const root = document.getElementById('ascii-sim');
  if (!root) return;

  const input = root.querySelector('#ascii-input');
  const output = root.querySelector('#ascii-output');
  const statChars = root.querySelector('#ascii-stats-chars');
  const statUtf8 = root.querySelector('#ascii-stats-utf8');
  const statUtf16 = root.querySelector('#ascii-stats-utf16');
  if (!input || !output || !statChars || !statUtf8 || !statUtf16) return;

  function L() { return document.documentElement.getAttribute('data-lang') === 'ru' ? 'ru' : 'en'; }
  function tr(en, ru) { return L() === 'ru' ? ru : en; }

  // ---- Encoding helpers --------------------------------------------------
  // We iterate with Array.from(str) so surrogate pairs (e.g. 🚀 = U+1F680)
  // are treated as ONE character, not two UTF-16 code units.
  function utf8Bytes(codePoint) {
    if (codePoint <= 0x7F)    return [codePoint];
    if (codePoint <= 0x7FF)   return [0xC0 | (codePoint >> 6),  0x80 | (codePoint & 0x3F)];
    if (codePoint <= 0xFFFF)  return [0xE0 | (codePoint >> 12), 0x80 | ((codePoint >> 6) & 0x3F), 0x80 | (codePoint & 0x3F)];
    return [
      0xF0 | (codePoint >> 18),
      0x80 | ((codePoint >> 12) & 0x3F),
      0x80 | ((codePoint >> 6)  & 0x3F),
      0x80 | (codePoint & 0x3F),
    ];
  }
  function utf16Bytes(codePoint) {
    // Big-endian, like the unicode.org charts.
    if (codePoint <= 0xFFFF) {
      return [(codePoint >> 8) & 0xFF, codePoint & 0xFF];
    }
    const v = codePoint - 0x10000;
    const high = 0xD800 | (v >> 10);
    const low  = 0xDC00 | (v & 0x3FF);
    return [(high >> 8) & 0xFF, high & 0xFF, (low >> 8) & 0xFF, low & 0xFF];
  }
  function asciiOf(codePoint) {
    return codePoint <= 0x7F ? codePoint : null;
  }
  function hex2(n) { return n.toString(16).toUpperCase().padStart(2, '0'); }
  function bin8(n) { return n.toString(2).padStart(8, '0'); }
  function codePointLabel(cp) {
    return 'U+' + cp.toString(16).toUpperCase().padStart(4, '0');
  }

  // Colour each byte of a UTF-8 sequence by its role:
  //   lead byte = accent (blue), continuation bytes = violet
  function utf8ByteColor(i) {
    return i === 0 ? (window.Theme && window.Theme.accent || '#0ea5e9')
                   : (window.Theme && window.Theme.violet || '#8b5cf6');
  }
  function utf16ByteColor(i) {
    return i < 2 ? (window.Theme && window.Theme.green || '#10b981')
                 : (window.Theme && window.Theme.amber || '#f59e0b');
  }

  // For the binary breakdown row: header bits get bold + colour, payload bits muted.
  // 1-byte:  0xxxxxxx
  // 2-byte:  110xxxxx 10xxxxxx
  // 3-byte:  1110xxxx 10xxxxxx 10xxxxxx
  // 4-byte:  11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
  function headerLen(byteIndex, totalBytes) {
    if (totalBytes === 1) return 1;          // leading 0
    if (byteIndex === 0)  return totalBytes + 1; // e.g. 110, 1110, 11110
    return 2;                                 // continuation: 10
  }
  function renderUtf8Binary(bytes) {
    const total = bytes.length;
    const muted = window.Theme && window.Theme.textFaint || '#94a3b8';
    return bytes.map((b, i) => {
      const bits = bin8(b);
      const h = headerLen(i, total);
      const headColor = i === 0
        ? (window.Theme && window.Theme.accent || '#0ea5e9')
        : (window.Theme && window.Theme.violet || '#8b5cf6');
      const head = '<span style="color:' + headColor + ';font-weight:700">' + bits.slice(0, h) + '</span>';
      const tail = '<span style="color:' + muted + '">' + bits.slice(h) + '</span>';
      return head + tail;
    }).join(' ');
  }

  // ---- Row rendering -----------------------------------------------------
  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function renderCharRow(ch, cp, idx) {
    const ascii = asciiOf(cp);
    const u8 = utf8Bytes(cp);
    const u16 = utf16Bytes(cp);
    const naColor = window.Theme && window.Theme.textFaint || '#94a3b8';

    const asciiCell = ascii === null
      ? '<span style="color:' + naColor + '; font-style:italic">' + tr('(N/A — beyond ASCII)', '(нет — за пределами ASCII)') + '</span>'
      : '<b>' + ascii + '</b> <span style="color:var(--text-muted)">= 0x' + hex2(ascii) + '</span>';

    const u8Hex = u8.map((b, i) =>
      '<span style="background:' + utf8ByteColor(i) + '22; color:' + utf8ByteColor(i) +
      '; padding:2px 6px; border-radius:4px; font-family:var(--mono); font-weight:700">0x' + hex2(b) + '</span>'
    ).join(' ');

    const u16Hex = u16.map((b, i) =>
      '<span style="background:' + utf16ByteColor(i) + '22; color:' + utf16ByteColor(i) +
      '; padding:2px 6px; border-radius:4px; font-family:var(--mono); font-weight:700">0x' + hex2(b) + '</span>'
    ).join(' ');

    const bigChar = ch === ' ' ? '␣' : (ch === '\n' ? '↵' : escapeHtml(ch));
    const bigCharColor = (ch === ' ' || ch === '\n')
      ? (window.Theme && window.Theme.textFaint || '#94a3b8') : 'var(--primary)';

    const utf8Len = u8.length;
    const lenLabel = utf8Len + ' ' + (utf8Len === 1 ? tr('byte', 'байт') : tr('bytes', 'байт.'));

    return '' +
      '<div style="display:grid; grid-template-columns: 64px 1fr; gap:14px; padding:12px; ' +
        'border:1px solid var(--border); border-radius:10px; background:var(--surface-2); margin-bottom:8px">' +
        // Big character + index
        '<div style="text-align:center">' +
          '<div style="font-size:2.4rem; line-height:1; color:' + bigCharColor + '">' + bigChar + '</div>' +
          '<div style="font-size:0.7rem; color:var(--text-faint); margin-top:4px">#' + (idx + 1) + '</div>' +
        '</div>' +
        // Right-side breakdown
        '<div style="display:grid; grid-template-columns: 130px 1fr; gap:4px 12px; font-size:0.86rem; align-items:center">' +
          '<div style="color:var(--text-muted); font-weight:600">' + tr('Code point', 'Код-пойнт') + '</div>' +
          '<div style="font-family:var(--mono)"><b>' + codePointLabel(cp) + '</b> <span style="color:var(--text-faint)">(' + cp + ')</span></div>' +

          '<div style="color:var(--text-muted); font-weight:600">ASCII</div>' +
          '<div style="font-family:var(--mono)">' + asciiCell + '</div>' +

          '<div style="color:var(--text-muted); font-weight:600">UTF-8 <span style="color:var(--text-faint); font-weight:400">(' + lenLabel + ')</span></div>' +
          '<div>' + u8Hex + '</div>' +

          '<div style="color:var(--text-muted); font-weight:600">UTF-16</div>' +
          '<div>' + u16Hex + '</div>' +

          '<div style="color:var(--text-muted); font-weight:600">' + tr('Binary (UTF-8)', 'Биты (UTF-8)') + '</div>' +
          '<div style="font-family:var(--mono); font-size:0.82rem; letter-spacing:0.5px">' + renderUtf8Binary(u8) + '</div>' +
        '</div>' +
      '</div>';
  }

  // ---- Main update -------------------------------------------------------
  function render() {
    const text = input.value || '';
    const chars = Array.from(text); // proper code-point iteration

    if (chars.length === 0) {
      output.innerHTML =
        '<div style="padding:24px; text-align:center; color:var(--text-faint); ' +
        'border:1px dashed var(--border); border-radius:10px">' +
        tr('Type something above to see how each character is encoded.',
           'Введите что-нибудь выше, чтобы увидеть, как кодируется каждый символ.') +
        '</div>';
      statChars.textContent = '0';
      statUtf8.textContent = '0';
      statUtf16.textContent = '0';
      renderSummary([], 0, 0);
      return;
    }

    // Cap rendering at 80 chars so a paste of "War and Peace" doesn't freeze the page.
    const MAX = 80;
    const shown = chars.slice(0, MAX);

    let totalU8 = 0, totalU16 = 0;
    for (const c of chars) {
      const cp = c.codePointAt(0);
      totalU8 += utf8Bytes(cp).length;
      totalU16 += utf16Bytes(cp).length;
    }

    let html = '';
    shown.forEach((c, i) => {
      html += renderCharRow(c, c.codePointAt(0), i);
    });
    if (chars.length > MAX) {
      html += '<div style="padding:10px; text-align:center; color:var(--text-faint); font-style:italic">' +
        tr('… ' + (chars.length - MAX) + ' more characters not shown (stats still include them).',
           '… ещё ' + (chars.length - MAX) + ' символов не показаны (но они учтены в статистике).') +
        '</div>';
    }
    output.innerHTML = html;

    statChars.textContent = chars.length;
    statUtf8.textContent = totalU8;
    statUtf16.textContent = totalU16;

    renderSummary(chars, totalU8, totalU16);
  }

  function renderSummary(chars, totalU8, totalU16) {
    const summary = root.querySelector('#ascii-summary');
    if (!summary) return;
    if (chars.length === 0) { summary.innerHTML = ''; return; }

    const allAscii = chars.every(c => c.codePointAt(0) <= 0x7F);
    const savings = totalU16 - totalU8;
    const savingsPct = totalU16 ? Math.round((savings / totalU16) * 100) : 0;

    let msg;
    if (allAscii) {
      msg = tr(
        '<b>All ASCII!</b> UTF-8 uses <b>' + totalU8 + '</b> bytes; UTF-16 uses <b>' + totalU16 + '</b>. ' +
        'UTF-8 saves <b>' + savings + '</b> bytes (' + savingsPct + '%) — because every ASCII char fits in 1 UTF-8 byte but takes 2 in UTF-16. ' +
        'This is the killer feature: English-heavy files cost half as much in UTF-8.',
        '<b>Только ASCII!</b> UTF-8 использует <b>' + totalU8 + '</b> байт; UTF-16 — <b>' + totalU16 + '</b>. ' +
        'UTF-8 экономит <b>' + savings + '</b> байт (' + savingsPct + '%) — потому что каждый ASCII-символ помещается в 1 байт UTF-8, но занимает 2 в UTF-16. ' +
        'Это и есть его убойная фича: тексты на английском в UTF-8 в два раза легче.'
      );
    } else if (totalU8 < totalU16) {
      msg = tr(
        'Mixed scripts: UTF-8 still wins (<b>' + totalU8 + '</b> vs <b>' + totalU16 + '</b> bytes) — the ASCII characters keep dragging the average down.',
        'Смешанные алфавиты: UTF-8 всё равно выигрывает (<b>' + totalU8 + '</b> против <b>' + totalU16 + '</b> байт) — ASCII-символы тянут средний вес вниз.'
      );
    } else if (totalU8 === totalU16) {
      msg = tr(
        'Tie at <b>' + totalU8 + '</b> bytes — your text sits right at the break-even point between UTF-8 and UTF-16.',
        'Ничья: <b>' + totalU8 + '</b> байт — текст ровно в точке безубыточности между UTF-8 и UTF-16.'
      );
    } else {
      msg = tr(
        'CJK / emoji-heavy: here UTF-16 is actually <b>' + (totalU8 - totalU16) + '</b> bytes lighter than UTF-8 — chars in U+0800–U+FFFF cost 3 bytes in UTF-8 but only 2 in UTF-16. ' +
        'UTF-8 still won the web because ASCII compatibility matters more in practice.',
        'Иероглифы / эмодзи: тут UTF-16 на <b>' + (totalU8 - totalU16) + '</b> байт легче UTF-8 — символы U+0800–U+FFFF занимают 3 байта в UTF-8, но всего 2 в UTF-16. ' +
        'UTF-8 всё равно победил в вебе — совместимость с ASCII важнее на практике.'
      );
    }
    summary.innerHTML = msg;
  }

  // ---- Presets -----------------------------------------------------------
  const presets = [
    { label: tr('Hello, World!', 'Hello, World!'),  text: 'Hello, World!',  note: tr('pure ASCII', 'чистый ASCII') },
    { label: 'Привет, мир!',                        text: 'Привет, мир!',   note: tr('Cyrillic = 2 bytes/char in UTF-8', 'кириллица = 2 байта/симв. в UTF-8') },
    { label: 'こんにちは',                           text: 'こんにちは',      note: tr('CJK = 3 bytes/char', 'CJK = 3 байта/симв.') },
    { label: '🚀🎯',                                 text: '🚀🎯',            note: tr('emoji = 4 bytes/char (surrogate pair in UTF-16)', 'эмодзи = 4 байта/симв. (пара суррогатов в UTF-16)') },
    { label: tr('Mixed: A=Ω=🌍', 'Микс: A=Ω=🌍'),    text: 'A=Ω=🌍',          note: tr('1 + 2 + 3 + 4 byte chars side-by-side', 'символы по 1, 2, 3 и 4 байта рядом') },
  ];
  function renderPresets() {
    const box = root.querySelector('#ascii-presets');
    if (!box) return;
    box.innerHTML = presets.map((p, i) =>
      '<button type="button" data-preset="' + i + '" class="btn btn-ghost btn-sm" ' +
      'style="font-family:var(--mono); font-size:0.82rem">' +
      escapeHtml(p.label) +
      ' <span style="color:var(--text-faint); font-weight:400; margin-left:6px">(' + p.note + ')</span>' +
      '</button>'
    ).join(' ');
    box.querySelectorAll('button[data-preset]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-preset'), 10);
        input.value = presets[idx].text;
        render();
      });
    });
  }

  // ---- Explainer ---------------------------------------------------------
  function renderExplainer() {
    const ex = root.querySelector('#ascii-explainer');
    if (!ex) return;
    ex.innerHTML = tr(
      '<b>Why UTF-8 took over the web (~98% of pages today).</b> ' +
      'It is <i>backward-compatible</i> with ASCII: any plain-English text encoded in ASCII is already valid UTF-8, byte-for-byte. ' +
      'It is <i>variable-length</i> (1–4 bytes/char) so common characters stay cheap. ' +
      'The leading bits of each byte tell the decoder how long the sequence is: ' +
      '<code>0xxxxxxx</code> = 1-byte (ASCII), ' +
      '<code>110xxxxx 10xxxxxx</code> = 2-byte, ' +
      '<code>1110xxxx 10…</code> = 3-byte, ' +
      '<code>11110xxx 10… 10… 10…</code> = 4-byte. ' +
      'Continuation bytes always start with <code>10</code>, which makes the stream self-synchronising — if you drop into the middle you can always find the next character boundary.',
      '<b>Почему UTF-8 захватил веб (~98% страниц сегодня).</b> ' +
      'Он <i>обратно совместим</i> с ASCII: любой английский текст в ASCII — это уже валидный UTF-8, байт-в-байт. ' +
      'Он <i>переменной длины</i> (1–4 байта/симв.), поэтому частые символы остаются дешёвыми. ' +
      'Старшие биты каждого байта сообщают декодеру длину последовательности: ' +
      '<code>0xxxxxxx</code> — 1 байт (ASCII), ' +
      '<code>110xxxxx 10xxxxxx</code> — 2 байта, ' +
      '<code>1110xxxx 10…</code> — 3 байта, ' +
      '<code>11110xxx 10… 10… 10…</code> — 4 байта. ' +
      'Байты-продолжения всегда начинаются с <code>10</code>, поэтому поток самосинхронизируется — даже если попасть в середину, легко найти границу следующего символа.'
    );
  }

  // ---- Wire-up -----------------------------------------------------------
  input.addEventListener('input', render);
  document.addEventListener('langchange', () => { renderPresets(); renderExplainer(); render(); });
  document.addEventListener('themechange', render); // re-pull theme colours

  if (!input.value) input.value = presets[0].text;
  renderPresets();
  renderExplainer();
  render();
})();
