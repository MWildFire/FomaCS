// SQL Playground — sql.js (SQLite compiled to WASM)
(function () {
  const SEED_SQL = `
CREATE TABLE PATIENT (
  PatientID    VARCHAR(10) NOT NULL PRIMARY KEY,
  FirstName    VARCHAR(30),
  LastName     VARCHAR(30),
  DateOfBirth  DATE
);

CREATE TABLE APPOINTMENT (
  AppointmentID VARCHAR(10) NOT NULL PRIMARY KEY,
  PatientID     VARCHAR(10),
  DoctorName    VARCHAR(40),
  AppointmentDate DATE,
  FOREIGN KEY (PatientID) REFERENCES PATIENT(PatientID)
);

CREATE TABLE PRODUCT (
  ProductID   VARCHAR(10) NOT NULL PRIMARY KEY,
  ProductName VARCHAR(50),
  Category    VARCHAR(30),
  Price       DECIMAL(8,2)
);

CREATE TABLE SALE (
  SaleID       VARCHAR(10) NOT NULL PRIMARY KEY,
  ProductID    VARCHAR(10),
  QuantitySold INT,
  SaleDate     DATE,
  FOREIGN KEY (ProductID) REFERENCES PRODUCT(ProductID)
);

INSERT INTO PATIENT VALUES
  ('P001','Anna','Ivanova','1989-03-12'),
  ('P002','Mark','Petrov','1976-07-21'),
  ('P003','Olga','Smirnova','2002-11-04'),
  ('P004','Daniel','Lee','1995-02-18'),
  ('P005','Sasha','Kim','1968-09-30');

INSERT INTO APPOINTMENT VALUES
  ('A100','P001','Dr. Smith','2026-05-20'),
  ('A101','P002','Dr. Jones','2026-05-21'),
  ('A102','P003','Dr. Smith','2026-05-22'),
  ('A103','P004','Dr. Patel','2026-05-22'),
  ('A104','P005','Dr. Smith','2026-05-24'),
  ('A105','P001','Dr. Patel','2026-06-02');

INSERT INTO PRODUCT VALUES
  ('P101','Mechanical Keyboard','Audio',129.00),
  ('P102','Studio Headphones','Audio',249.00),
  ('P103','USB-C Hub','Accessories',39.50),
  ('P104','Wireless Mouse','Accessories',49.00),
  ('P105','Mic Stand','Audio',25.50),
  ('P106','4K Webcam','Video',189.00);

INSERT INTO SALE VALUES
  ('S001','P101',2,'2026-11-24'),
  ('S002','P102',1,'2026-11-24'),
  ('S003','P103',3,'2026-11-24'),
  ('S004','P101',1,'2026-11-25'),
  ('S005','P104',2,'2026-11-26'),
  ('S006','P101',5,'2026-11-26'),
  ('S007','P106',1,'2026-11-27');
`;

  const EXAMPLES = [
    {
      label: { en: 'JOIN — patients of Dr. Smith', ru: 'JOIN — пациенты Dr. Smith' },
      sql: `SELECT PATIENT.FirstName, PATIENT.LastName
FROM PATIENT
JOIN APPOINTMENT ON PATIENT.PatientID = APPOINTMENT.PatientID
WHERE APPOINTMENT.DoctorName = 'Dr. Smith';`
    },
    {
      label: { en: 'Sales on 2026-11-24', ru: 'Продажи за 2026-11-24' },
      sql: `SELECT PRODUCT.ProductName, SALE.QuantitySold
FROM PRODUCT
JOIN SALE ON PRODUCT.ProductID = SALE.ProductID
WHERE SALE.SaleDate = '2026-11-24';`
    },
    {
      label: { en: 'SUM — total Mechanical Keyboard', ru: 'SUM — клавиатур всего' },
      sql: `SELECT SUM(SALE.QuantitySold) AS TotalSold
FROM SALE
JOIN PRODUCT ON SALE.ProductID = PRODUCT.ProductID
WHERE PRODUCT.ProductName = 'Mechanical Keyboard';`
    },
    {
      label: { en: 'GROUP BY — sales per product', ru: 'GROUP BY — продажи по товарам' },
      sql: `SELECT PRODUCT.ProductName, SUM(SALE.QuantitySold) AS Total
FROM PRODUCT
JOIN SALE ON PRODUCT.ProductID = SALE.ProductID
GROUP BY PRODUCT.ProductName
ORDER BY Total DESC;`
    },
    {
      label: { en: 'UPDATE one product', ru: 'UPDATE одного товара' },
      sql: `UPDATE PRODUCT SET Price = 25.50 WHERE ProductID = 'P105';
SELECT * FROM PRODUCT WHERE ProductID = 'P105';`
    },
    {
      label: { en: 'CREATE VIEW (HL)', ru: 'CREATE VIEW (HL)' },
      sql: `CREATE VIEW AudioView AS
SELECT ProductName, Price FROM PRODUCT WHERE Category = 'Audio';

SELECT * FROM AudioView;`
    },
    {
      label: { en: 'Aggregate AVG price', ru: 'AVG — средняя цена' },
      sql: `SELECT Category, AVG(Price) AS AvgPrice
FROM PRODUCT
GROUP BY Category;`
    }
  ];

  let SQL = null;
  let db = null;
  const queryEl = document.getElementById('sql-query');
  const runBtn = document.getElementById('sql-run');
  const resetDbBtn = document.getElementById('sql-reset-db');
  const schemaBtn = document.getElementById('sql-show-schema');
  const msgEl = document.getElementById('sql-msg');
  const resultEl = document.getElementById('sql-result');
  const examplesEl = document.getElementById('sql-examples');

  function buildExamples() {
    const lang = document.documentElement.getAttribute('data-lang') || 'en';
    examplesEl.innerHTML = '';
    EXAMPLES.forEach(ex => {
      const b = document.createElement('button');
      b.textContent = ex.label[lang];
      b.title = ex.sql;
      b.addEventListener('click', () => { queryEl.value = ex.sql; });
      examplesEl.appendChild(b);
    });
  }

  function freshDb() {
    if (db) db.close();
    db = new SQL.Database();
    db.run(SEED_SQL);
  }

  function showMsg(text, kind) {
    msgEl.innerHTML = '<div class="sql-msg ' + kind + '">' + text + '</div>';
  }
  function showSuccess(text) { showMsg(text, 'success'); }
  function showError(text) { showMsg(text, 'error'); }
  function clearMsg() { msgEl.innerHTML = ''; }

  function escape(s) {
    if (s === null || s === undefined) return '<i style="color:var(--text-faint)">NULL</i>';
    return String(s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
  }

  function renderResult(stmts) {
    if (!stmts.length) {
      resultEl.innerHTML = '';
      const lang = document.documentElement.getAttribute('data-lang') || 'en';
      showSuccess(lang === 'ru' ? 'Запрос выполнен. Строк к показу нет (это INSERT/UPDATE/CREATE).' : 'Query executed. No rows to display (likely an INSERT/UPDATE/CREATE).');
      return;
    }
    let html = '';
    stmts.forEach((res, idx) => {
      html += '<div class="dbtable-title">' + (idx === 0 ? 'Result' : 'Statement ' + (idx + 1)) + '</div>';
      html += '<div class="sql-result-table-wrap"><table class="sql-result-table"><thead><tr>';
      res.columns.forEach(c => html += '<th>' + escape(c) + '</th>');
      html += '</tr></thead><tbody>';
      res.values.forEach(row => {
        html += '<tr>';
        row.forEach(v => html += '<td>' + escape(v) + '</td>');
        html += '</tr>';
      });
      html += '</tbody></table></div>';
    });
    resultEl.innerHTML = html;
    const lang = document.documentElement.getAttribute('data-lang') || 'en';
    showSuccess((lang === 'ru' ? 'Готово: ' : 'OK: ') + stmts.map(s => s.values.length + ' rows').join(', '));
  }

  function runQuery() {
    clearMsg();
    const sql = queryEl.value.trim();
    if (!sql) return;
    try {
      const stmts = db.exec(sql);
      renderResult(stmts);
    } catch (e) {
      resultEl.innerHTML = '';
      showError(escape(e.message));
    }
  }

  function showSchema() {
    queryEl.value = "SELECT name, sql FROM sqlite_master WHERE type IN ('table','view') ORDER BY name;";
    runQuery();
  }

  function init() {
    runBtn.addEventListener('click', runQuery);
    resetDbBtn.addEventListener('click', () => {
      freshDb();
      resultEl.innerHTML = '';
      const lang = document.documentElement.getAttribute('data-lang') || 'en';
      showSuccess(lang === 'ru' ? 'БД восстановлена.' : 'Database has been reset to seed data.');
    });
    schemaBtn.addEventListener('click', showSchema);
    queryEl.addEventListener('keydown', e => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') { e.preventDefault(); runQuery(); }
    });
    document.addEventListener('langchange', buildExamples);
    buildExamples();

    // First run
    runQuery();
  }

  // Load sql.js
  const wait = setInterval(() => {
    if (typeof initSqlJs === 'function') {
      clearInterval(wait);
      initSqlJs({
        locateFile: f => 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/' + f
      }).then(_SQL => {
        SQL = _SQL;
        freshDb();
        document.getElementById('sql-loading').style.display = 'none';
        document.getElementById('sql-app').style.display = 'block';
        init();
      }).catch(err => {
        document.getElementById('sql-loading').innerHTML = '<div class="sql-msg error">Failed to load sql.js: ' + err.message + '</div>';
      });
    }
  }, 100);
})();
