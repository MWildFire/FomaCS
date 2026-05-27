// A1.1 — Memory hierarchy: pick a level, see its size/speed/cost relative to others.
(function () {
  const root = document.getElementById('mem-sim');
  if (!root) return;

  const grid = root.querySelector('#mem-grid');
  const detail = root.querySelector('#mem-detail');

  const LEVELS = [
    { id: 'reg',   name: { en: 'Registers',     ru: 'Регистры' },        size: '~256 B',      latency: '~0.3 ns',  cost: '$$$$$',
      desc: { en: 'On-chip locations inside the CPU. A handful per core, accessed in a fraction of a clock cycle.',
              ru: 'Места внутри ЦП. Несколько штук на ядро, доступ за долю такта.' } },
    { id: 'l1',    name: { en: 'L1 cache',      ru: 'Кэш L1' },           size: '32–128 KB',    latency: '~1 ns',    cost: '$$$$',
      desc: { en: 'Per-core small fast cache; split into instruction (L1i) and data (L1d) caches.',
              ru: 'Маленький быстрый кэш в каждом ядре; разделён на инструкции (L1i) и данные (L1d).' } },
    { id: 'l2',    name: { en: 'L2 cache',      ru: 'Кэш L2' },           size: '256 KB–1 MB',  latency: '~3 ns',    cost: '$$$',
      desc: { en: 'Larger, slightly slower; often per-core.',
              ru: 'Больше, чуть медленнее; обычно тоже на ядро.' } },
    { id: 'l3',    name: { en: 'L3 cache',      ru: 'Кэш L3' },           size: '4–64 MB',      latency: '~10 ns',   cost: '$$$',
      desc: { en: 'Shared across cores; final cache before main memory.',
              ru: 'Общий для всех ядер; последний кэш перед основной памятью.' } },
    { id: 'ram',   name: { en: 'RAM (DRAM)',    ru: 'RAM (DRAM)' },        size: '8–128 GB',    latency: '~80 ns',   cost: '$$',
      desc: { en: 'Main memory. Volatile — contents lost when power is removed. Holds the OS and running programs.',
              ru: 'Основная память. Энергозависима — теряется при отключении питания. Хранит ОС и работающие программы.' } },
    { id: 'ssd',   name: { en: 'SSD',           ru: 'SSD' },               size: '256 GB–8 TB',  latency: '~50 µs',   cost: '$',
      desc: { en: 'Non-volatile flash storage. Random access; no moving parts.',
              ru: 'Не энергозависимая флеш-память. Случайный доступ, нет движущихся частей.' } },
    { id: 'hdd',   name: { en: 'HDD',           ru: 'HDD' },               size: '1–20 TB',      latency: '~5 ms',    cost: '¢¢',
      desc: { en: 'Spinning magnetic disk. Cheap per GB; much slower than SSD due to seek time.',
              ru: 'Вращающийся магнитный диск. Дёшево за ГБ; намного медленнее SSD из-за времени поиска.' } },
    { id: 'tape',  name: { en: 'Tape / cloud archive', ru: 'Лента / облачный архив' }, size: 'TB–EB', latency: 'seconds–minutes', cost: '¢',
      desc: { en: 'Long-term archive. Sequential access only; cheapest per GB.',
              ru: 'Долгосрочный архив. Только последовательный доступ; самый дешёвый за ГБ.' } }
  ];

  let selectedId = LEVELS[0].id;

  function L() { return document.documentElement.getAttribute('data-lang') === 'ru' ? 'ru' : 'en'; }
  function tr(en, ru) { return L() === 'ru' ? ru : en; }

  function render() {
    grid.innerHTML = '';
    LEVELS.forEach((lvl, i) => {
      const pct = 100 - (i * 11); // wider at top, narrower at bottom
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'mem-level' + (selectedId === lvl.id ? ' selected' : '');
      card.style.width = pct + '%';
      card.setAttribute('aria-pressed', selectedId === lvl.id ? 'true' : 'false');
      card.innerHTML = '<span class="mem-name">' + lvl.name[L()] + '</span>' +
                      '<span class="mem-stats">' + lvl.size + ' · ' + lvl.latency + ' · ' + lvl.cost + '</span>';
      card.addEventListener('click', () => { selectedId = lvl.id; render(); });
      grid.appendChild(card);
    });

    const lvl = LEVELS.find(l => l.id === selectedId);
    detail.innerHTML =
      '<h4>' + lvl.name[L()] + '</h4>' +
      '<p><b>' + tr('Typical size:', 'Типовой размер:') + '</b> ' + lvl.size + '</p>' +
      '<p><b>' + tr('Access latency:', 'Задержка доступа:') + '</b> ' + lvl.latency + '</p>' +
      '<p><b>' + tr('Cost (per GB):', 'Стоимость (за ГБ):') + '</b> ' + lvl.cost + '</p>' +
      '<p>' + lvl.desc[L()] + '</p>';
  }

  document.addEventListener('langchange', render);
  document.addEventListener('themechange', render);
  render();
})();
