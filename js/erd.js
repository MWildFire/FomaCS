// ERD M:N resolver animation
(function () {
  const svg = document.getElementById('erd-svg');
  if (!svg) return;
  const toggleBtn = document.getElementById('erd-toggle');
  const resetBtn = document.getElementById('erd-reset');
  const NS = 'http://www.w3.org/2000/svg';

  let resolved = false;

  function rect(x, y, w, h, fill, stroke = '#1a3a5e') {
    const r = document.createElementNS(NS, 'rect');
    r.setAttribute('x', x); r.setAttribute('y', y);
    r.setAttribute('width', w); r.setAttribute('height', h);
    r.setAttribute('rx', 6);
    r.setAttribute('fill', fill);
    r.setAttribute('stroke', stroke);
    r.setAttribute('stroke-width', 2);
    return r;
  }
  function text(x, y, t, opts = {}) {
    const el = document.createElementNS(NS, 'text');
    el.setAttribute('x', x); el.setAttribute('y', y);
    el.setAttribute('text-anchor', opts.anchor || 'middle');
    el.setAttribute('font-size', opts.size || 12);
    el.setAttribute('font-weight', opts.weight || 400);
    el.setAttribute('fill', opts.fill || '#0f172a');
    if (opts.mono) el.setAttribute('font-family', 'ui-monospace, monospace');
    el.textContent = t;
    return el;
  }
  function line(x1, y1, x2, y2, stroke = '#475569', sw = 2) {
    const l = document.createElementNS(NS, 'line');
    l.setAttribute('x1', x1); l.setAttribute('y1', y1);
    l.setAttribute('x2', x2); l.setAttribute('y2', y2);
    l.setAttribute('stroke', stroke);
    l.setAttribute('stroke-width', sw);
    return l;
  }

  function entityBox(x, y, name, attrs, color = '#dbeafe') {
    const g = document.createElementNS(NS, 'g');
    g.appendChild(rect(x, y, 200, 30, color));
    g.appendChild(text(x + 100, y + 20, name, { weight: 700, size: 14 }));
    g.appendChild(rect(x, y + 30, 200, attrs.length * 22 + 10, '#fff'));
    attrs.forEach((a, i) => {
      g.appendChild(text(x + 12, y + 50 + i * 22, a.text, { anchor: 'start', size: 12, mono: true, fill: a.pk ? '#8b5cf6' : (a.fk ? '#0ea5e9' : '#0f172a'), weight: a.pk || a.fk ? 700 : 400 }));
    });
    return g;
  }

  function render() {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    const lang = document.documentElement.getAttribute('data-lang') || 'en';

    if (!resolved) {
      // M:N: Student ↔ Course
      svg.appendChild(entityBox(80, 60,
        lang === 'ru' ? 'STUDENT (Студент)' : 'STUDENT',
        [{ text: 'StudentID', pk: true }, { text: 'Name' }, { text: 'Email' }]));
      svg.appendChild(entityBox(520, 60,
        lang === 'ru' ? 'COURSE (Курс)' : 'COURSE',
        [{ text: 'CourseID', pk: true }, { text: 'Title' }, { text: 'Credits' }]));

      // Relationship line
      svg.appendChild(line(280, 120, 520, 120, '#ef4444', 3));
      svg.appendChild(text(380, 110, 'enrols in', { weight: 700, fill: '#ef4444' }));
      // Cardinality labels
      svg.appendChild(text(290, 115, 'M', { fill: '#ef4444', weight: 700 }));
      svg.appendChild(text(510, 115, 'N', { fill: '#ef4444', weight: 700 }));

      svg.appendChild(text(400, 230,
        lang === 'ru' ? 'M:N — нельзя реализовать напрямую в реляционной БД' : 'M:N — cannot be implemented directly in a relational DB',
        { fill: '#ef4444', size: 13, weight: 600 }));
    } else {
      // Resolved into junction table
      svg.appendChild(entityBox(40, 80,
        lang === 'ru' ? 'STUDENT (Студент)' : 'STUDENT',
        [{ text: 'StudentID', pk: true }, { text: 'Name' }, { text: 'Email' }],
        '#dbeafe'));

      svg.appendChild(entityBox(300, 80,
        lang === 'ru' ? 'ENROLMENT (Запись)' : 'ENROLMENT',
        [{ text: 'StudentID', fk: true }, { text: 'CourseID', fk: true }, { text: 'EnrolDate' }],
        '#fef3c7'));

      svg.appendChild(entityBox(560, 80,
        lang === 'ru' ? 'COURSE (Курс)' : 'COURSE',
        [{ text: 'CourseID', pk: true }, { text: 'Title' }, { text: 'Credits' }],
        '#dbeafe'));

      // Two 1:M lines
      svg.appendChild(line(240, 140, 300, 140, '#10b981', 3));
      svg.appendChild(text(250, 132, '1', { fill: '#10b981', weight: 700 }));
      svg.appendChild(text(290, 132, 'M', { fill: '#10b981', weight: 700 }));

      svg.appendChild(line(500, 140, 560, 140, '#10b981', 3));
      svg.appendChild(text(510, 132, 'M', { fill: '#10b981', weight: 700 }));
      svg.appendChild(text(550, 132, '1', { fill: '#10b981', weight: 700 }));

      svg.appendChild(text(400, 50,
        lang === 'ru' ? 'M:N разрешена через связующую таблицу — две связи 1:M' : 'M:N resolved via junction table — two 1:M relationships',
        { fill: '#10b981', size: 13, weight: 600 }));
    }
  }

  toggleBtn.addEventListener('click', () => {
    resolved = true;
    render();
    toggleBtn.disabled = true;
    resetBtn.disabled = false;
  });
  resetBtn.addEventListener('click', () => {
    resolved = false;
    render();
    toggleBtn.disabled = false;
    resetBtn.disabled = true;
  });
  document.addEventListener('langchange', render);
  resetBtn.disabled = true;
  render();
})();
