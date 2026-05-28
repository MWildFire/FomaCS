// A2.3 — IP addressing & subnetting visualizer.
// Punch in an IPv4 + mask (CIDR or custom) and see the binary AND that
// derives the network address, plus broadcast, host range, class, RFC1918, etc.
(function () {
  const root = document.getElementById('subnet-sim');
  if (!root) return;

  const octBox  = root.querySelector('#subnet-octets');
  const maskSel = root.querySelector('#subnet-mask');
  const binBox  = root.querySelector('#subnet-binary');
  const infoBox = root.querySelector('#subnet-info');
  if (!octBox || !maskSel || !binBox || !infoBox) return;

  // Optional bits — present in the richer HTML, but we tolerate their absence.
  const exampleSel = root.querySelector('#subnet-example');
  const customRow  = root.querySelector('#subnet-custom-row');
  const customBox  = root.querySelector('#subnet-custom');

  const L = () => document.documentElement.getAttribute('data-lang') === 'ru' ? 'ru' : 'en';
  const tr = (en, ru) => L() === 'ru' ? ru : en;
  const css = (el, styles) => Object.assign(el.style, styles);
  const mk = (tag, styles) => { const e = document.createElement(tag); if (styles) css(e, styles); return e; };

  // ---------- 32-bit helpers (always treat as unsigned) ----------
  // Build via arithmetic, not shifts — `arr[0] << 24` would flip the sign bit.
  const octetsToInt = a => ((a[0] * 0x1000000) + (a[1] * 0x10000) + (a[2] * 0x100) + a[3]) >>> 0;
  const intToOctets = n => { n = n >>> 0; return [(n >>> 24) & 0xff, (n >>> 16) & 0xff, (n >>> 8) & 0xff, n & 0xff]; };
  function intToBitArray(n) {
    n = n >>> 0;
    const bits = new Array(32);
    for (let i = 31; i >= 0; i--) { bits[i] = n & 1; n = n >>> 1; }
    return bits;
  }
  function prefixToMask(p) {
    if (p <= 0) return 0;
    if (p >= 32) return 0xffffffff >>> 0;
    return ((0xffffffff << (32 - p)) >>> 0);
  }
  function maskToPrefix(m) {
    // Count contiguous leading 1s; -1 if mask is non-contiguous (e.g. 255.0.255.0).
    m = m >>> 0;
    let p = 0, seenZero = false;
    for (let i = 31; i >= 0; i--) {
      const bit = (m >>> i) & 1;
      if (bit === 1) {
        if (seenZero) return -1;
        p++;
      } else seenZero = true;
    }
    return p;
  }

  // ---------- Input plumbing ----------
  const OCTET_INPUT_STYLE = {
    width: '64px', padding: '6px 8px', textAlign: 'center',
    font: '600 1rem var(--mono)', border: '1px solid var(--border)',
    borderRadius: 'var(--radius-sm)', background: 'var(--surface)', color: 'var(--text)'
  };
  function buildOctetRow(container, defaults) {
    container.innerHTML = '';
    css(container, { display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' });
    for (let i = 0; i < 4; i++) {
      const inp = mk('input', OCTET_INPUT_STYLE);
      inp.type = 'number'; inp.min = 0; inp.max = 255; inp.step = 1;
      inp.value = defaults[i];
      inp.dataset.idx = i;
      container.appendChild(inp);
      if (i < 3) {
        const dot = mk('span', { fontWeight: '700', color: 'var(--text-muted)' });
        dot.textContent = '.';
        container.appendChild(dot);
      }
    }
  }
  if (octBox.querySelectorAll('input').length !== 4) buildOctetRow(octBox, [192, 168, 1, 10]);
  if (customBox && customBox.querySelectorAll('input').length !== 4) buildOctetRow(customBox, [255, 255, 255, 0]);

  // ---------- Read current state ----------
  function readOctets(container) {
    const arr = [0, 0, 0, 0];
    container.querySelectorAll('input').forEach((inp, i) => {
      let v = parseInt(inp.value, 10);
      if (isNaN(v) || v < 0) v = 0;
      if (v > 255) v = 255;
      arr[i] = v;
    });
    return arr;
  }
  function readPrefix() {
    if (maskSel.value === 'custom') {
      if (!customBox) return 24;
      return maskToPrefix(octetsToInt(readOctets(customBox))); // -1 if non-contiguous
    }
    return parseInt(maskSel.value, 10);
  }

  // ---------- Render one 32-bit row ----------
  function bitGrid(bits, networkPart, opts) {
    opts = opts || {};
    const wrap = mk('div', {
      display: 'flex', alignItems: 'center', gap: '8px',
      fontFamily: 'var(--mono)', fontSize: '0.95rem'
    });

    if (opts.label) {
      const lab = mk('div', {
        minWidth: '120px', color: 'var(--text-muted)', fontSize: '0.8rem',
        fontFamily: 'inherit', textTransform: 'uppercase',
        letterSpacing: '0.05em', fontWeight: '600'
      });
      lab.textContent = opts.label;
      wrap.appendChild(lab);
    }

    const grid = mk('div', { display: 'flex', gap: '6px', flexWrap: 'wrap' });
    for (let oct = 0; oct < 4; oct++) {
      const octBlock = mk('div', {
        display: 'flex', gap: '1px', background: 'var(--border)',
        padding: '1px', borderRadius: '4px'
      });
      for (let b = 0; b < 8; b++) {
        const pos = oct * 8 + b;
        const on = bits[pos] === 1;
        const inNet = pos < networkPart;
        const cell = mk('div', {
          width: '20px', height: '24px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.85rem', fontWeight: '700'
        });
        cell.textContent = bits[pos];
        if (opts.highlight) {
          // Network/broadcast row — full emphasis, on=accent, off=muted.
          cell.style.background = on ? 'var(--accent)' : 'var(--surface-2)';
          cell.style.color = on ? '#fff' : 'var(--text-muted)';
        } else if (inNet) {
          cell.style.background = on ? 'var(--primary)' : 'var(--surface-2)';
          cell.style.color = on ? '#fff' : 'var(--text-muted)';
        } else {
          cell.style.background = on ? 'var(--text-faint)' : 'var(--surface)';
          cell.style.color = on ? '#fff' : 'var(--text-faint)';
        }
        octBlock.appendChild(cell);
      }
      grid.appendChild(octBlock);
    }
    wrap.appendChild(grid);

    if (opts.value !== undefined) {
      const v = mk('div', {
        fontFamily: 'var(--mono)', fontSize: '0.9rem',
        color: opts.highlight ? 'var(--accent)' : 'var(--text)',
        fontWeight: opts.highlight ? '700' : '500',
        marginLeft: 'auto'
      });
      v.textContent = opts.value;
      wrap.appendChild(v);
    }
    return wrap;
  }

  // ---------- Classification ----------
  function ipClass(firstOctet) {
    if (firstOctet < 128) return { letter: 'A', range: '0–127' };
    if (firstOctet < 192) return { letter: 'B', range: '128–191' };
    if (firstOctet < 224) return { letter: 'C', range: '192–223' };
    if (firstOctet < 240) return { letter: 'D', range: '224–239 (multicast)' };
    return { letter: 'E', range: '240–255 (reserved)' };
  }
  function isPrivate(o) {
    // RFC 1918: 10/8, 172.16/12, 192.168/16. Also call out 127/8, 169.254/16.
    if (o[0] === 10) return { yes: true, label: '10.0.0.0/8 (RFC 1918)' };
    if (o[0] === 172 && o[1] >= 16 && o[1] <= 31) return { yes: true, label: '172.16.0.0/12 (RFC 1918)' };
    if (o[0] === 192 && o[1] === 168) return { yes: true, label: '192.168.0.0/16 (RFC 1918)' };
    if (o[0] === 127) return { yes: false, loopback: true, label: 'Loopback 127.0.0.0/8' };
    if (o[0] === 169 && o[1] === 254) return { yes: false, special: true, label: 'Link-local 169.254/16' };
    return { yes: false, label: tr('Public (routable on the Internet)', 'Публичный (маршрутизируется в Интернет)') };
  }

  // ---------- Results table ----------
  function buildInfo(ipArr, prefix, validMask) {
    infoBox.innerHTML = '';
    if (prefix < 0 || !validMask) {
      const warn = mk('div', {
        padding: '12px 16px', background: 'rgba(239,68,68,0.1)',
        border: '1px solid var(--red)', borderRadius: 'var(--radius)',
        color: 'var(--red)', fontWeight: '600'
      });
      warn.textContent = tr(
        'Invalid subnet mask — bits must be contiguous (a run of 1s followed by a run of 0s).',
        'Неверная маска подсети — биты должны быть подряд (сначала единицы, потом нули).'
      );
      infoBox.appendChild(warn);
      return;
    }

    const ipInt   = octetsToInt(ipArr);
    const maskInt = prefixToMask(prefix);
    const netInt  = (ipInt & maskInt) >>> 0;
    const invMask = (~maskInt) >>> 0;
    const bcastInt = (netInt | invMask) >>> 0;
    const hostBits = 32 - prefix;
    const total = hostBits >= 32 ? 4294967296 : Math.pow(2, hostBits);

    let firstHostInt, lastHostInt, usable;
    if (prefix === 32) {
      firstHostInt = lastHostInt = ipInt;
      usable = 1;
    } else if (prefix === 31) {
      // RFC 3021: both addresses usable on point-to-point links.
      firstHostInt = netInt; lastHostInt = bcastInt; usable = 2;
    } else {
      firstHostInt = (netInt + 1) >>> 0;
      lastHostInt  = (bcastInt - 1) >>> 0;
      usable = total - 2;
    }

    const net = intToOctets(netInt).join('.');
    const bc  = intToOctets(bcastInt).join('.');
    const fh  = intToOctets(firstHostInt).join('.');
    const lh  = intToOctets(lastHostInt).join('.');
    const mk_ = intToOctets(maskInt).join('.');

    const cls = ipClass(ipArr[0]);
    const priv = isPrivate(ipArr);
    const usableSuffix = prefix === 31 ? tr(' (RFC 3021 P2P)', ' (RFC 3021, точка-точка)')
                       : prefix === 32 ? tr(' (single host)', ' (один хост)')
                       : tr(' (total − 2: network & broadcast)', ' (всего − 2: сеть и broadcast)');
    const privPrefix = priv.yes ? tr('Private — ', 'Частный — ')
                     : (priv.loopback || priv.special) ? '' : tr('Public — ', 'Публичный — ');

    const rows = [
      [tr('CIDR notation', 'CIDR-запись'), net + '/' + prefix, true],
      [tr('Subnet mask', 'Маска подсети'), mk_ + '  (/' + prefix + ')', false],
      [tr('Network address', 'Адрес сети'), net, true],
      [tr('Broadcast address', 'Широковещательный адрес'), prefix >= 31 ? '—' : bc, false],
      [tr('First usable host', 'Первый доступный хост'), prefix === 32 ? '—' : fh, false],
      [tr('Last usable host',  'Последний доступный хост'), prefix === 32 ? '—' : lh, false],
      [tr('Total addresses',   'Всего адресов'), total.toLocaleString(), false],
      [tr('Usable hosts',      'Полезных хостов'), usable.toLocaleString() + usableSuffix, false],
      [tr('IP class', 'Класс IP'), tr('Class ', 'Класс ') + cls.letter + ' (' + cls.range + ')', false],
      [tr('Private / Public', 'Частный / Публичный'), privPrefix + priv.label, false]
    ];

    const table = mk('table', { width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' });
    rows.forEach(([label, value, emphasis]) => {
      const tr_ = mk('tr', { borderBottom: '1px solid var(--border)' });
      const th = mk('th', {
        padding: '10px 12px', textAlign: 'left', color: 'var(--text-muted)',
        fontWeight: '500', fontSize: '0.85rem', width: '38%'
      });
      th.textContent = label;
      const td = mk('td', {
        padding: '10px 12px', fontFamily: 'var(--mono)',
        color: emphasis ? 'var(--accent)' : 'var(--text)',
        fontWeight: emphasis ? '700' : '500'
      });
      td.textContent = value;
      tr_.appendChild(th); tr_.appendChild(td);
      table.appendChild(tr_);
    });
    infoBox.appendChild(table);
  }

  // ---------- Binary visualisation ----------
  function buildBinary(ipArr, prefix, validMask) {
    binBox.innerHTML = '';
    if (prefix < 0 || !validMask) return;
    css(binBox, { display: 'flex', flexDirection: 'column', gap: '10px' });

    const ipInt   = octetsToInt(ipArr);
    const maskInt = prefixToMask(prefix);
    const netInt  = (ipInt & maskInt) >>> 0;
    const bcastInt = (netInt | ((~maskInt) >>> 0)) >>> 0;

    binBox.appendChild(bitGrid(intToBitArray(ipInt),   prefix, { label: tr('IP', 'IP'), value: ipArr.join('.') }));
    binBox.appendChild(bitGrid(intToBitArray(maskInt), prefix, { label: tr('Mask (AND)', 'Маска (AND)'), value: intToOctets(maskInt).join('.') }));

    // Divider — emphasise this is the AND operation.
    const divider = mk('div', { borderTop: '2px dashed var(--border-strong)', margin: '4px 0', position: 'relative' });
    const andLabel = mk('span', {
      position: 'absolute', right: '0', top: '-10px',
      background: 'var(--surface)', padding: '0 8px',
      fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '600'
    });
    andLabel.textContent = tr('= bitwise AND →', '= побитовое AND →');
    divider.appendChild(andLabel);
    binBox.appendChild(divider);

    binBox.appendChild(bitGrid(intToBitArray(netInt), prefix, {
      label: tr('Network', 'Сеть'), value: intToOctets(netInt).join('.'), highlight: true
    }));
    binBox.appendChild(bitGrid(intToBitArray(bcastInt), prefix, {
      label: tr('Broadcast', 'Broadcast'),
      value: prefix >= 31 ? '—' : intToOctets(bcastInt).join('.'),
      highlight: true
    }));

    // Legend
    const legend = mk('div', {
      display: 'flex', flexWrap: 'wrap', gap: '14px',
      marginTop: '8px', fontSize: '0.82rem', color: 'var(--text-muted)'
    });
    [
      [tr('Network bits', 'Биты сети'), 'var(--primary)'],
      [tr('Host bits', 'Биты хоста'), 'var(--text-faint)'],
      [tr('AND result', 'Результат AND'), 'var(--accent)']
    ].forEach(([label, color]) => {
      const w = mk('span', { display: 'inline-flex', alignItems: 'center', gap: '5px' });
      w.appendChild(mk('span', { width: '12px', height: '12px', background: color, borderRadius: '2px', display: 'inline-block' }));
      w.appendChild(document.createTextNode(label));
      legend.appendChild(w);
    });
    binBox.appendChild(legend);
  }

  // ---------- Top-level render ----------
  function update() {
    const ipArr = readOctets(octBox);
    const prefix = readPrefix();
    const validMask = prefix >= 0 && prefix <= 32;
    if (customRow) customRow.style.display = maskSel.value === 'custom' ? 'flex' : 'none';
    buildBinary(ipArr, prefix, validMask);
    buildInfo(ipArr, prefix, validMask);
  }

  // ---------- Examples ----------
  const EXAMPLES = {
    home: { ip: [192, 168, 1, 10], mask: '24' },
    corp: { ip: [10, 0, 5, 42],    mask: '16' },
    p2p:  { ip: [203, 0, 113, 1],  mask: '30' },
    loop: { ip: [127, 0, 0, 1],    mask: '8'  }
  };
  function applyExample(key) {
    const ex = EXAMPLES[key];
    if (!ex) return;
    octBox.querySelectorAll('input').forEach((inp, i) => { inp.value = ex.ip[i]; });
    const hasOpt = Array.from(maskSel.options).some(o => o.value === ex.mask);
    maskSel.value = hasOpt ? ex.mask : '24';
    update();
  }

  // ---------- Wire up listeners ----------
  octBox.addEventListener('input', update);
  maskSel.addEventListener('change', update);
  if (customBox) customBox.addEventListener('input', update);
  if (exampleSel) {
    exampleSel.addEventListener('change', () => {
      if (exampleSel.value && exampleSel.value !== 'custom-pick') applyExample(exampleSel.value);
    });
  }
  document.addEventListener('langchange', update);
  document.addEventListener('themechange', update);

  update();
})();
