// Render study-notes blocks from NOTES_DATA
function renderNotes(containerId, key) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const note = window.NOTES_DATA[key];
  if (!note) return;

  function build(lang) {
    let html = '<div class="notes-block ' + (lang === 'ru' ? 'ru' : '') + '">';
    html += '<span class="badge">' + (lang === 'ru' ? 'RU — Конспект' : 'EN — Study notes') + '</span>';
    const sections = note[lang];
    for (const title in sections) {
      html += '<h3>' + title + '</h3><ul>';
      sections[title].forEach(item => { html += '<li>' + item + '</li>'; });
      html += '</ul>';
    }
    html += '</div>';
    return html;
  }

  container.innerHTML =
    '<div class="lang-en">' + build('en') + '</div>' +
    '<div class="lang-ru">' + build('ru') + '</div>';
}
