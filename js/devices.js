// A2.1.3 — Network devices ↔ TCP/IP layers matcher
// Click a device card to see which TCP/IP layer it operates at and what addressing it uses.
(function () {
  const root = document.getElementById('dev-sim');
  if (!root) return;

  const grid = root.querySelector('#dev-grid');
  const layersBox = root.querySelector('#dev-layers');
  const detail = root.querySelector('#dev-detail');

  const DEVICES = [
    { id: 'router', emoji: '🛣️', name: { en: 'Router', ru: 'Маршрутизатор' }, layer: 'internet', addressing: 'IP',
      desc: { en: 'Forwards packets <b>between</b> networks by destination IP, using a routing table.',
              ru: 'Передаёт пакеты <b>между</b> сетями по IP получателя, по таблице маршрутизации.' } },
    { id: 'switch', emoji: '🔀', name: { en: 'Switch', ru: 'Коммутатор' }, layer: 'link', addressing: 'MAC',
      desc: { en: 'Forwards frames <b>within one LAN</b> to the port of the destination MAC. Learns MAC→port.',
              ru: 'Передаёт кадры <b>внутри одной LAN</b> на порт нужного MAC. Запоминает MAC↔порт.' } },
    { id: 'hub', emoji: '🌀', name: { en: 'Hub', ru: 'Хаб' }, layer: 'link', addressing: 'none',
      desc: { en: 'Older device — <b>broadcasts</b> every signal to every port, causing collisions. Largely replaced by switches.',
              ru: 'Старое устройство — <b>рассылает</b> сигнал на все порты, вызывая коллизии. Почти полностью вытеснено коммутаторами.' } },
    { id: 'modem', emoji: '📡', name: { en: 'Modem', ru: 'Модем' }, layer: 'link', addressing: 'physical',
      desc: { en: '<b>Mo</b>dulates digital → analogue and <b>dem</b>odulates analogue → digital, bridging your network and the ISP line.',
              ru: '<b>Мо</b>дулирует цифру → аналог и <b>дем</b>одулирует обратно, связывая сеть с линией провайдера.' } },
    { id: 'nic', emoji: '🧩', name: { en: 'NIC', ru: 'Сетевая карта' }, layer: 'link', addressing: 'MAC',
      desc: { en: 'Physically connects a device to the network and holds the unique 48-bit MAC address.',
              ru: 'Физически подключает устройство к сети и хранит уникальный 48-битный MAC.' } },
    { id: 'wap', emoji: '📶', name: { en: 'Wi-Fi access point', ru: 'Wi-Fi точка доступа' }, layer: 'link', addressing: 'MAC',
      desc: { en: 'Lets wireless clients join a wired LAN. Operates at Layer 2 like a switch.',
              ru: 'Подключает беспроводных клиентов к проводной LAN. Работает на 2-м уровне, как коммутатор.' } },
    { id: 'repeater', emoji: '🔁', name: { en: 'Repeater', ru: 'Репитер' }, layer: 'physical', addressing: 'none',
      desc: { en: 'Boosts a signal to cover greater distance — operates at the physical layer.',
              ru: 'Усиливает сигнал для большего радиуса — работает на физическом уровне.' } },
    { id: 'bridge', emoji: '🌉', name: { en: 'Bridge', ru: 'Мост' }, layer: 'link', addressing: 'MAC',
      desc: { en: 'Joins two LAN segments by learning MAC addresses — conceptually a two-port switch.',
              ru: 'Соединяет два сегмента LAN, учит MAC-адреса — по сути двухпортовый коммутатор.' } },
    { id: 'gateway', emoji: '🛡️', name: { en: 'Gateway', ru: 'Шлюз' }, layer: 'internet', addressing: 'protocol',
      desc: { en: 'Bridges two networks that use <b>different protocols</b> (e.g. NAT between a private LAN and the internet).',
              ru: 'Соединяет две сети с <b>разными протоколами</b> (например, NAT между приватной LAN и интернетом).' } },
    { id: 'firewall', emoji: '🧱', name: { en: 'Firewall', ru: 'Файрвол' }, layer: 'multi', addressing: 'rules',
      desc: { en: 'Filters packets against rules. Can operate at multiple layers (IP/port — L3/L4, content — L7).',
              ru: 'Фильтрует пакеты по правилам. Работает на нескольких уровнях (IP/порт — L3/L4, контент — L7).' } }
  ];

  const LAYERS = [
    { id: 'application', name: { en: 'Application', ru: 'Прикладной' }, desc: { en: 'HTTP, DNS, SMTP…', ru: 'HTTP, DNS, SMTP…' }, color: 'var(--violet)' },
    { id: 'transport', name: { en: 'Transport', ru: 'Транспортный' }, desc: { en: 'TCP / UDP — ports', ru: 'TCP / UDP — порты' }, color: 'var(--accent)' },
    { id: 'internet', name: { en: 'Internet / Network', ru: 'Межсетевой' }, desc: { en: 'IP — routing', ru: 'IP — маршрутизация' }, color: 'var(--primary)' },
    { id: 'link', name: { en: 'Network access / Link', ru: 'Канальный (сетевой доступ)' }, desc: { en: 'MAC, Ethernet, Wi-Fi', ru: 'MAC, Ethernet, Wi-Fi' }, color: 'var(--green)' },
    { id: 'physical', name: { en: 'Physical (sub-layer)', ru: 'Физический (под-уровень)' }, desc: { en: 'Signals, cables, radio', ru: 'Сигналы, кабели, радио' }, color: 'var(--amber)' }
  ];

  let selectedId = null;

  function L() { return document.documentElement.getAttribute('data-lang') === 'ru' ? 'ru' : 'en'; }
  function tr(o) { return o[L()] || o.en; }

  function renderGrid() {
    grid.innerHTML = '';
    DEVICES.forEach(d => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'dev-card' + (selectedId === d.id ? ' selected' : '');
      btn.dataset.id = d.id;
      btn.innerHTML = '<span class="dev-emoji">' + d.emoji + '</span>' +
                      '<span class="dev-name">' + tr(d.name) + '</span>';
      btn.addEventListener('click', () => { selectedId = d.id; render(); });
      grid.appendChild(btn);
    });
  }

  function renderLayers() {
    layersBox.innerHTML = '';
    LAYERS.forEach(layer => {
      const matching = DEVICES.filter(d => d.layer === layer.id || (d.layer === 'multi' && layer.id !== 'application'));
      const row = document.createElement('div');
      row.className = 'dev-layer';
      const sel = selectedId ? DEVICES.find(d => d.id === selectedId) : null;
      const highlight = sel && (sel.layer === layer.id || (sel.layer === 'multi' && layer.id !== 'application'));
      if (highlight) row.classList.add('highlight');
      row.style.borderLeftColor = layer.color;
      row.innerHTML =
        '<div class="dev-layer-head">' +
          '<b>' + tr(layer.name) + '</b>' +
          '<span class="muted">' + tr(layer.desc) + '</span>' +
        '</div>' +
        '<div class="dev-layer-body">' +
          matching.map(d => '<span class="dev-chip' + (selectedId === d.id ? ' selected' : '') + '">' + d.emoji + ' ' + tr(d.name) + '</span>').join('') +
        '</div>';
      layersBox.appendChild(row);
    });
  }

  function renderDetail() {
    if (!selectedId) {
      detail.innerHTML = '<p class="muted">' +
        (L() === 'ru'
          ? 'Выберите устройство, чтобы увидеть, на каком уровне TCP/IP оно работает и какую адресацию использует.'
          : 'Pick a device to see which TCP/IP layer it operates at and what addressing it uses.') +
        '</p>';
      return;
    }
    const d = DEVICES.find(x => x.id === selectedId);
    const layer = LAYERS.find(l => l.id === d.layer) || { name: { en: 'Multiple layers', ru: 'Несколько уровней' } };
    detail.innerHTML =
      '<h4>' + d.emoji + ' ' + tr(d.name) + '</h4>' +
      '<p><b>' + (L() === 'ru' ? 'Уровень: ' : 'Layer: ') + '</b>' + tr(layer.name) + '</p>' +
      '<p><b>' + (L() === 'ru' ? 'Адресация: ' : 'Addressing: ') + '</b>' + addressingLabel(d.addressing) + '</p>' +
      '<p>' + tr(d.desc) + '</p>';
  }

  function addressingLabel(a) {
    const map = {
      'IP': 'IP', 'MAC': 'MAC', 'none': L() === 'ru' ? '—' : '—',
      'physical': L() === 'ru' ? 'сигнал (без адресов)' : 'signal (no addressing)',
      'protocol': L() === 'ru' ? 'преобразование протоколов' : 'protocol translation',
      'rules': L() === 'ru' ? 'правила (IP, порт, контент)' : 'rules (IP, port, content)'
    };
    return map[a] || a;
  }

  function render() {
    renderGrid();
    renderLayers();
    renderDetail();
  }

  document.addEventListener('langchange', render);
  document.addEventListener('themechange', render);
  render();
})();
