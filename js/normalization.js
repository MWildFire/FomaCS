// Normalization step-by-step visualization
(function () {
  const content = document.getElementById('norm-content');
  if (!content) return;

  const STEPS = {
    0: {
      title: {
        en: 'Flat file — anomalies waiting to happen',
        ru: 'Плоский файл — рассадник аномалий'
      },
      body: {
        en: 'One Orders table holds <b>everything</b>: customer details, multiple items per order in a single cell, and product info copied across many rows. Repeating groups violate 1NF; duplicated CustomerName invites update anomalies; CategoryName depends transitively on ProductID, not on the order.',
        ru: 'Одна таблица Orders хранит <b>всё</b>: данные клиента, несколько товаров в одной ячейке, информацию о товаре в каждой строке. Повторяющиеся группы нарушают 1НФ; дублирование CustomerName ведёт к аномалиям обновления; CategoryName транзитивно зависит от ProductID, а не от заказа.'
      },
      tables: [
        {
          name: 'ORDERS', anomalies: true,
          cols: ['OrderID', 'CustomerName', 'Email', 'Items', 'Date'],
          rows: [
            ['O1', 'Anna Ivanova', 'anna@x.io', 'P101 Keyboard, P103 Hub', '2026-11-24'],
            ['O2', 'Mark Petrov', 'mark@x.io', 'P102 Headphones', '2026-11-24'],
            ['O3', 'Anna Ivanova', 'anna@x.io', 'P101 Keyboard, P104 Mouse', '2026-11-26']
          ]
        }
      ],
      issues: {
        en: ['🟥 <b>Repeating group</b> in <code>Items</code> (multiple values in one cell)', '🟥 <b>Update anomaly</b>: Anna\'s email duplicated', '🟥 <b>Product info</b> mixed with order info'],
        ru: ['🟥 <b>Повторяющаяся группа</b> в <code>Items</code> (несколько значений в одной ячейке)', '🟥 <b>Аномалия обновления</b>: email Anna продублирован', '🟥 <b>Данные товара</b> вперемешку с данными заказа']
      }
    },
    1: {
      title: {
        en: '1NF — atomic values, no repeating groups',
        ru: '1НФ — атомарные значения, нет повторяющихся групп'
      },
      body: {
        en: 'Each cell holds a <b>single value</b>. We split repeated items into separate rows, making the composite key (OrderID, ProductID). But CustomerName, Email and ProductName are still duplicated — the table is not yet 2NF.',
        ru: 'В каждой ячейке — <b>одно значение</b>. Разбили повторы на строки, ключ составной (OrderID, ProductID). Но CustomerName, Email и ProductName всё ещё дублируются — это пока не 2НФ.'
      },
      tables: [
        {
          name: 'ORDER_ITEMS (composite PK: OrderID + ProductID)',
          cols: ['OrderID', 'ProductID', 'ProductName', 'CustomerName', 'Email', 'Date'],
          rows: [
            ['O1', 'P101', 'Keyboard', 'Anna Ivanova', 'anna@x.io', '2026-11-24'],
            ['O1', 'P103', 'Hub', 'Anna Ivanova', 'anna@x.io', '2026-11-24'],
            ['O2', 'P102', 'Headphones', 'Mark Petrov', 'mark@x.io', '2026-11-24'],
            ['O3', 'P101', 'Keyboard', 'Anna Ivanova', 'anna@x.io', '2026-11-26'],
            ['O3', 'P104', 'Mouse', 'Anna Ivanova', 'anna@x.io', '2026-11-26']
          ]
        }
      ],
      issues: {
        en: ['🟧 ProductName depends on <b>only ProductID</b>, not the full key (partial dependency)', '🟧 CustomerName depends on <b>only OrderID</b>, not the full key (partial dependency)'],
        ru: ['🟧 ProductName зависит <b>только от ProductID</b>, а не от всего ключа (частичная зависимость)', '🟧 CustomerName зависит <b>только от OrderID</b>, а не от всего ключа (частичная зависимость)']
      }
    },
    2: {
      title: {
        en: '2NF — no partial dependencies',
        ru: '2НФ — нет частичных зависимостей'
      },
      body: {
        en: 'We split attributes that depend on only part of the composite key into their own tables: <b>ORDERS</b> (depends on OrderID), <b>PRODUCTS</b> (depends on ProductID), and a clean <b>ORDER_ITEMS</b> link table. There\'s still a problem inside ORDERS: Email is determined by CustomerName, not directly by OrderID — that\'s a transitive dependency, fixed in 3NF.',
        ru: 'Атрибуты, зависящие от части составного ключа, вынесли в свои таблицы: <b>ORDERS</b> (зависит от OrderID), <b>PRODUCTS</b> (зависит от ProductID), и чистая связующая <b>ORDER_ITEMS</b>. Внутри ORDERS остался косяк: Email определяется через CustomerName, а не напрямую от OrderID — это транзитивная зависимость, чиним в 3НФ.'
      },
      tables: [
        {
          name: 'ORDERS', resolved: true,
          cols: ['OrderID', 'CustomerName', 'Email', 'Date'],
          rows: [
            ['O1', 'Anna Ivanova', 'anna@x.io', '2026-11-24'],
            ['O2', 'Mark Petrov', 'mark@x.io', '2026-11-24'],
            ['O3', 'Anna Ivanova', 'anna@x.io', '2026-11-26']
          ]
        },
        {
          name: 'PRODUCTS', resolved: true,
          cols: ['ProductID', 'ProductName'],
          rows: [
            ['P101', 'Keyboard'],
            ['P102', 'Headphones'],
            ['P103', 'Hub'],
            ['P104', 'Mouse']
          ]
        },
        {
          name: 'ORDER_ITEMS (PK: OrderID + ProductID)', resolved: true,
          cols: ['OrderID', 'ProductID'],
          rows: [['O1', 'P101'], ['O1', 'P103'], ['O2', 'P102'], ['O3', 'P101'], ['O3', 'P104']]
        }
      ],
      issues: {
        en: ['🟨 In ORDERS: Email depends on CustomerName, not on OrderID (transitive dependency)'],
        ru: ['🟨 В ORDERS: Email зависит от CustomerName, а не напрямую от OrderID (транзитивная зависимость)']
      }
    },
    3: {
      title: {
        en: '3NF — no transitive dependencies',
        ru: '3НФ — нет транзитивных зависимостей'
      },
      body: {
        en: 'We pull customer info into its own <b>CUSTOMERS</b> table and reference it from ORDERS with a foreign key. Now every non-key attribute depends on the primary key, the whole key and nothing but the key (Codd\'s famous rule).',
        ru: 'Вынесли данные клиента в свою <b>CUSTOMERS</b> таблицу и сослались на неё через внешний ключ. Теперь каждый неключевой атрибут зависит от первичного ключа, всего ключа и ничего, кроме ключа (правило Кодда).'
      },
      tables: [
        {
          name: 'CUSTOMERS', resolved: true,
          cols: ['CustomerID (PK)', 'CustomerName', 'Email'],
          rows: [['C1', 'Anna Ivanova', 'anna@x.io'], ['C2', 'Mark Petrov', 'mark@x.io']]
        },
        {
          name: 'ORDERS', resolved: true,
          cols: ['OrderID (PK)', 'CustomerID (FK)', 'Date'],
          rows: [['O1', 'C1', '2026-11-24'], ['O2', 'C2', '2026-11-24'], ['O3', 'C1', '2026-11-26']]
        },
        {
          name: 'PRODUCTS', resolved: true,
          cols: ['ProductID (PK)', 'ProductName'],
          rows: [['P101', 'Keyboard'], ['P102', 'Headphones'], ['P103', 'Hub'], ['P104', 'Mouse']]
        },
        {
          name: 'ORDER_ITEMS', resolved: true,
          cols: ['OrderID (FK)', 'ProductID (FK)'],
          rows: [['O1', 'P101'], ['O1', 'P103'], ['O2', 'P102'], ['O3', 'P101'], ['O3', 'P104']]
        }
      ],
      issues: {
        en: ['🟩 No partial dependencies. No transitive dependencies. Anomalies eliminated.'],
        ru: ['🟩 Нет частичных зависимостей. Нет транзитивных. Аномалии устранены.']
      }
    }
  };

  function render(stepIdx) {
    const lang = document.documentElement.getAttribute('data-lang') || 'en';
    const step = STEPS[stepIdx];
    let html = '<div class="norm-step fade-in">';
    html += '<h4>' + step.title[lang] + '</h4>';
    html += '<p>' + step.body[lang] + '</p>';
    step.tables.forEach(t => {
      html += '<div class="dbtable-title">' + t.name + '</div>';
      html += '<table class="dbtable' + (t.anomalies ? ' anomaly-host' : (t.resolved ? '' : '')) + '">';
      html += '<thead><tr>';
      t.cols.forEach(c => html += '<th>' + c + '</th>');
      html += '</tr></thead><tbody>';
      t.rows.forEach(r => {
        html += '<tr' + (t.anomalies ? ' class="anomaly"' : (t.resolved ? ' class="resolved"' : '')) + '>';
        r.forEach(v => html += '<td>' + v + '</td>');
        html += '</tr>';
      });
      html += '</tbody></table>';
    });
    html += '<ul style="margin-top:14px">';
    step.issues[lang].forEach(i => html += '<li>' + i + '</li>');
    html += '</ul>';
    html += '</div>';
    content.innerHTML = html;

    // Highlight active step button
    ['norm-step-0', 'norm-step-1', 'norm-step-2', 'norm-step-3'].forEach((id, i) => {
      const b = document.getElementById(id);
      if (!b) return;
      b.classList.toggle('btn-primary', i === stepIdx);
      b.classList.toggle('btn-ghost', i !== stepIdx);
    });
  }

  let current = 0;
  document.getElementById('norm-step-0').addEventListener('click', () => { current = 0; render(0); });
  document.getElementById('norm-step-1').addEventListener('click', () => { current = 1; render(1); });
  document.getElementById('norm-step-2').addEventListener('click', () => { current = 2; render(2); });
  document.getElementById('norm-step-3').addEventListener('click', () => { current = 3; render(3); });
  document.addEventListener('langchange', () => render(current));
  render(0);
})();
