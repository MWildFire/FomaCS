// Quiz logic with keyword-based self-grading
(function () {
  const STORAGE = 'fomacs-quiz-progress';
  const STORAGE_FILTER = 'fomacs-quiz-filter';

  // Two-level filter: top row is broad area; second row is sub-topics for the selected area.
  const TOP_LEVEL = [
    { id: 'ALL', label: { en: 'All',          ru: 'Все' } },
    { id: 'A2',  label: { en: 'A2 Networks',  ru: 'A2 Сети' } },
    { id: 'A3',  label: { en: 'A3 Databases', ru: 'A3 Базы данных' } },
    { id: 'A4',  label: { en: 'A4 ML',        ru: 'A4 ML' } }
  ];
  const SUB_TOPICS = {
    A2: [
      { id: 'A2.1',   label: { en: 'A2.1 Fundamentals',  ru: 'A2.1 Основы' } },
      { id: 'A2.2',   label: { en: 'A2.2 Architecture',  ru: 'A2.2 Архитектура' } },
      { id: 'A2.3',   label: { en: 'A2.3 Topologies',    ru: 'A2.3 Топологии' } },
      { id: 'A2.1.4', label: { en: 'A2.1.4 Protocols',   ru: 'A2.1.4 Протоколы' } },
      { id: 'A2.1.5', label: { en: 'A2.1.5 Mastery',     ru: 'A2.1.5 Мастерство' } }
    ],
    A3: [
      { id: 'A3.1', label: { en: 'A3.1 Fundamentals',     ru: 'A3.1 Основы' } },
      { id: 'A3.2', label: { en: 'A3.2 Design',           ru: 'A3.2 Проект' } },
      { id: 'A3.3', label: { en: 'A3.3 SQL',              ru: 'A3.3 SQL' } },
      { id: 'A3.4', label: { en: 'A3.4 NoSQL & DW (HL)',  ru: 'A3.4 NoSQL и DW (HL)' } }
    ],
    A4: [
      { id: 'A4.1', label: { en: 'A4.1 Fundamentals',  ru: 'A4.1 Основы' } },
      { id: 'A4.2', label: { en: 'A4.2 Preprocessing', ru: 'A4.2 Предобработка' } },
      { id: 'A4.3', label: { en: 'A4.3 Approaches',    ru: 'A4.3 Подходы' } },
      { id: 'A4.4', label: { en: 'A4.4 Ethics & NLP',  ru: 'A4.4 Этика и NLP' } }
    ]
  };

  const filterEl = document.getElementById('quiz-filter');
  const listEl = document.getElementById('quiz-list');
  const countEl = document.getElementById('quiz-count');

  const params = new URLSearchParams(window.location.search);
  const initialTopic = params.get('topic') || localStorage.getItem(STORAGE_FILTER) || 'ALL';
  let activeTopic = initialTopic;
  let shuffled = false;
  let shuffledOrder = null;

  function loadProgress() {
    try { return JSON.parse(localStorage.getItem(STORAGE) || '{}'); } catch { return {}; }
  }
  function saveProgress(p) {
    localStorage.setItem(STORAGE, JSON.stringify(p));
  }

  // Active top-level (ALL / A2 / A3 / A4) — derived from activeTopic
  function rootOf(id) {
    if (id === 'ALL') return 'ALL';
    return id.split('.')[0]; // 'A2.1.4' -> 'A2'
  }

  function renderFilter() {
    const lang = document.documentElement.getAttribute('data-lang') || 'en';
    filterEl.innerHTML = '';

    // Row 1: top-level
    const row1 = document.createElement('div');
    row1.className = 'quiz-filter-row';
    TOP_LEVEL.forEach(t => {
      const b = document.createElement('button');
      b.textContent = t.label[lang];
      b.setAttribute('aria-pressed', rootOf(activeTopic) === t.id ? 'true' : 'false');
      if (rootOf(activeTopic) === t.id) b.classList.add('active');
      b.addEventListener('click', () => {
        activeTopic = t.id;
        localStorage.setItem(STORAGE_FILTER, t.id);
        renderFilter();
        renderList();
      });
      row1.appendChild(b);
    });
    filterEl.appendChild(row1);

    // Row 2: sub-topics for the active root
    const root = rootOf(activeTopic);
    if (root !== 'ALL' && SUB_TOPICS[root]) {
      const row2 = document.createElement('div');
      row2.className = 'quiz-filter-row sub';
      // Pseudo "all of A2" chip
      const allChip = document.createElement('button');
      allChip.textContent = lang === 'ru' ? `Все ${root}` : `All of ${root}`;
      allChip.setAttribute('aria-pressed', activeTopic === root ? 'true' : 'false');
      if (activeTopic === root) allChip.classList.add('active');
      allChip.addEventListener('click', () => {
        activeTopic = root;
        localStorage.setItem(STORAGE_FILTER, root);
        renderFilter();
        renderList();
      });
      row2.appendChild(allChip);
      SUB_TOPICS[root].forEach(t => {
        const b = document.createElement('button');
        b.textContent = t.label[lang];
        b.setAttribute('aria-pressed', t.id === activeTopic ? 'true' : 'false');
        if (t.id === activeTopic) b.classList.add('active');
        b.addEventListener('click', () => {
          activeTopic = t.id;
          localStorage.setItem(STORAGE_FILTER, t.id);
          renderFilter();
          renderList();
        });
        row2.appendChild(b);
      });
      filterEl.appendChild(row2);
    }
  }

  function filtered() {
    let arr;
    if (activeTopic === 'ALL') arr = window.QUIZ_DATA.slice();
    else if (activeTopic.split('.').length === 1) arr = window.QUIZ_DATA.filter(q => q.topic.startsWith(activeTopic));
    else arr = window.QUIZ_DATA.filter(q => q.topic === activeTopic);
    if (shuffled && shuffledOrder) arr.sort((a, b) => shuffledOrder.indexOf(a.id) - shuffledOrder.indexOf(b.id));
    return arr;
  }

  function escape(s) {
    return String(s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
  }

  // Word-boundary match: treats "key" as a separate word, not a hit on "monkey".
  // Falls back to substring for keywords containing a space or punctuation.
  function kwMatches(text, kw) {
    const k = kw.toLowerCase();
    if (/[\s\-/]/.test(k)) return text.includes(k);
    // Build a unicode-aware word-boundary regex. Cyrillic chars don't play with \b in JS,
    // so we match around non-letter or string edges.
    const escaped = k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp('(^|[^\\p{L}\\p{N}])' + escaped + '($|[^\\p{L}\\p{N}])', 'iu');
    return re.test(text);
  }

  function grade(answer, q) {
    if (!answer || !answer.trim()) return null;
    const text = answer.toLowerCase();
    const isCyrillic = /[а-яё]/i.test(text);
    // Pick keyword set by language of the answer, fall back to the other set if empty.
    let kws = isCyrillic ? (q.keywordsRu || []) : (q.keywords || []);
    if (!kws.length) kws = isCyrillic ? (q.keywords || []) : (q.keywordsRu || []);
    const hits = [];
    const misses = [];
    kws.forEach(k => {
      if (kwMatches(text, k)) hits.push(k);
      else misses.push(k);
    });
    const coverage = kws.length ? hits.length / kws.length : 0;
    // Forgiving score: any keyword = at least 1 mark; >=50% coverage = full marks.
    let score;
    if (hits.length === 0) score = 0;
    else if (q.marks === 1) score = 1;
    else if (coverage >= 0.5) score = q.marks;
    else score = Math.max(1, Math.round(coverage * q.marks));
    return { hits, misses, coverage, score, lang: isCyrillic ? 'ru' : 'en' };
  }

  function renderQuestion(q) {
    const lang = document.documentElement.getAttribute('data-lang') || 'en';
    const prog = loadProgress();
    const saved = prog[q.id] || {};

    const card = document.createElement('div');
    card.className = 'quiz-card fade-in';
    card.id = 'q-' + q.id;

    const header = document.createElement('div');
    header.className = 'quiz-header';
    header.innerHTML =
      '<div><span class="quiz-id">' + q.id + ' · ' + q.command + (q.hl ? ' · <span style="color:var(--violet)">HL</span>' : '') + '</span></div>' +
      '<span class="quiz-marks">' + q.marks + ' marks</span>';
    card.appendChild(header);

    const title = document.createElement('h3');
    title.style.cssText = 'margin:6px 0 12px; color:var(--primary); font-size:1.1rem';
    title.innerHTML =
      '<span class="lang-en-inline">' + escape(q.title.en) + '</span>' +
      '<span class="lang-ru-inline">' + escape(q.title.ru) + '</span>';
    card.appendChild(title);

    const qEn = document.createElement('p');
    qEn.className = 'quiz-question lang-en';
    qEn.innerHTML = escape(q.q.en);
    card.appendChild(qEn);
    const qRu = document.createElement('p');
    qRu.className = 'quiz-question lang-ru';
    qRu.innerHTML = escape(q.q.ru);
    card.appendChild(qRu);

    // The "translation" of the question to the other lang, in italics
    const trEn = document.createElement('p');
    trEn.className = 'quiz-question-tr lang-en';
    trEn.textContent = q.q.ru;
    card.appendChild(trEn);
    const trRu = document.createElement('p');
    trRu.className = 'quiz-question-tr lang-ru';
    trRu.textContent = q.q.en;
    card.appendChild(trRu);

    const ta = document.createElement('textarea');
    ta.placeholder = lang === 'ru'
      ? 'Введите ответ (по-русски или по-английски)…'
      : 'Type your answer (English or Russian)…';
    ta.value = saved.answer || '';
    ta.addEventListener('input', () => {
      const cur = loadProgress();
      cur[q.id] = cur[q.id] || {};
      cur[q.id].answer = ta.value;
      saveProgress(cur);
    });
    card.appendChild(ta);

    const actions = document.createElement('div');
    actions.className = 'quiz-actions';

    const checkBtn = document.createElement('button');
    checkBtn.className = 'btn btn-primary btn-sm';
    checkBtn.innerHTML = '<span class="lang-en-inline">✓ Check my answer</span><span class="lang-ru-inline">✓ Проверить</span>';
    actions.appendChild(checkBtn);

    const modelBtn = document.createElement('button');
    modelBtn.className = 'btn btn-secondary btn-sm';
    modelBtn.innerHTML = '<span class="lang-en-inline">Show model answer</span><span class="lang-ru-inline">Идеальный ответ</span>';
    actions.appendChild(modelBtn);

    const clearBtn = document.createElement('button');
    clearBtn.className = 'btn btn-ghost btn-sm';
    clearBtn.innerHTML = '<span class="lang-en-inline">Clear</span><span class="lang-ru-inline">Очистить</span>';
    actions.appendChild(clearBtn);

    card.appendChild(actions);

    const feedback = document.createElement('div');
    feedback.style.display = 'none';
    card.appendChild(feedback);

    function showCheck() {
      const result = grade(ta.value, q);
      if (!result) {
        feedback.style.display = 'block';
        feedback.innerHTML = '<div class="quiz-feedback"><h4>' + (lang === 'ru' ? 'Подсказка' : 'Hint') +
          '</h4><p style="margin:0">' + (lang === 'ru' ? 'Введите ответ, и проверим по схеме оценивания.' : 'Type an answer and we will compare it to the mark scheme.') + '</p></div>';
        return;
      }
      let html = '<div class="quiz-feedback"><h4>' + (lang === 'ru' ? 'Оценка по ключевым словам' : 'Keyword score') + '</h4>';
      html += '<div class="muted" style="font-size:0.9rem">' +
        (lang === 'ru' ? 'Найдено ' + result.hits.length + ' из ' + (result.hits.length + result.misses.length) + ' ключевых слов · оценка ≈ ' : 'Hit ' + result.hits.length + ' of ' + (result.hits.length + result.misses.length) + ' keywords · estimated ') +
        '<b>' + result.score + ' / ' + q.marks + '</b></div>';
      html += '<div class="quiz-score-bar"><div class="fill" style="width:' + Math.round(result.coverage * 100) + '%"></div></div>';
      html += '<div class="keywords"><div style="font-size:0.8rem; color:var(--text-faint); text-transform:uppercase; letter-spacing:0.06em; margin:8px 0 4px">' + (lang === 'ru' ? 'Зачтено' : 'Hits') + '</div>';
      result.hits.forEach(k => { html += '<span class="kw">✓ ' + escape(k) + '</span>'; });
      if (!result.hits.length) html += '<span class="muted">—</span>';
      html += '<div style="font-size:0.8rem; color:var(--text-faint); text-transform:uppercase; letter-spacing:0.06em; margin:10px 0 4px">' + (lang === 'ru' ? 'Пропущено' : 'Missed') + '</div>';
      result.misses.forEach(k => { html += '<span class="kw missed">✗ ' + escape(k) + '</span>'; });
      if (!result.misses.length) html += '<span class="muted">' + (lang === 'ru' ? 'Все ключевые слова найдены 🎉' : 'All keywords matched 🎉') + '</span>';
      html += '</div></div>';
      feedback.style.display = 'block';
      feedback.innerHTML = html;

      // Save best score
      const cur = loadProgress();
      cur[q.id] = cur[q.id] || {};
      cur[q.id].lastScore = result.score;
      cur[q.id].lastTotal = q.marks;
      cur[q.id].checkedAt = Date.now();
      saveProgress(cur);
    }

    function showModel() {
      const model = q.model[lang] || q.model.en;
      let html = '<div class="quiz-feedback"><h4>' + (lang === 'ru' ? 'Идеальный ответ' : 'Model answer') + '</h4><ul>';
      model.forEach(b => { html += '<li>' + b + '</li>'; });
      html += '</ul></div>';
      feedback.style.display = 'block';
      feedback.innerHTML = html;
    }

    checkBtn.addEventListener('click', showCheck);
    modelBtn.addEventListener('click', showModel);
    clearBtn.addEventListener('click', () => {
      ta.value = '';
      const cur = loadProgress(); delete cur[q.id]; saveProgress(cur);
      feedback.style.display = 'none';
    });

    return card;
  }

  function renderList() {
    const lang = document.documentElement.getAttribute('data-lang') || 'en';
    const list = filtered();
    listEl.innerHTML = '';
    list.forEach(q => listEl.appendChild(renderQuestion(q)));

    // count
    const prog = loadProgress();
    const answered = list.filter(q => prog[q.id] && prog[q.id].answer && prog[q.id].answer.trim()).length;
    countEl.innerHTML = (lang === 'ru'
      ? 'Показано <b>' + list.length + '</b> вопросов · отвечено <b>' + answered + '</b>'
      : '<b>' + list.length + '</b> questions shown · <b>' + answered + '</b> answered');
  }

  document.getElementById('quiz-shuffle').addEventListener('click', () => {
    shuffled = true;
    const all = window.QUIZ_DATA.map(q => q.id);
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [all[i], all[j]] = [all[j], all[i]];
    }
    shuffledOrder = all;
    renderList();
  });
  document.getElementById('quiz-clear-progress').addEventListener('click', () => {
    const lang = document.documentElement.getAttribute('data-lang') || 'en';
    if (confirm(lang === 'ru' ? 'Удалить все ответы и оценки?' : 'Clear all saved answers and scores?')) {
      localStorage.removeItem(STORAGE);
      renderList();
    }
  });

  document.addEventListener('langchange', () => { renderFilter(); renderList(); });
  renderFilter();
  renderList();
})();
