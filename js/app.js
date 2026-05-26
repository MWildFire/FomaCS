// Shared app behaviour: language toggle, theme, nav highlighting

(function () {
  const root = document.documentElement;

  // ---- Language ----
  const STORAGE_LANG = 'fomacs-lang';
  const getLang = () => localStorage.getItem(STORAGE_LANG) || 'en';
  const setLang = (l) => {
    localStorage.setItem(STORAGE_LANG, l);
    root.setAttribute('data-lang', l);
    document.querySelectorAll('[data-lang-toggle]').forEach((el) => {
      el.textContent = l === 'en' ? 'RU' : 'EN';
    });
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: l } }));
  };
  root.setAttribute('data-lang', getLang());

  // ---- Theme ----
  const STORAGE_THEME = 'fomacs-theme';
  const getTheme = () => localStorage.getItem(STORAGE_THEME) || 'light';
  const setTheme = (t) => {
    localStorage.setItem(STORAGE_THEME, t);
    root.setAttribute('data-theme', t);
    document.querySelectorAll('[data-theme-toggle]').forEach((el) => {
      el.textContent = t === 'light' ? '☽' : '☀';
    });
  };
  root.setAttribute('data-theme', getTheme());

  // ---- DOM ready ----
  document.addEventListener('DOMContentLoaded', () => {
    // Sync toggle labels now that DOM is loaded
    setLang(getLang());
    setTheme(getTheme());

    document.querySelectorAll('[data-lang-toggle]').forEach((btn) => {
      btn.addEventListener('click', () => {
        setLang(getLang() === 'en' ? 'ru' : 'en');
      });
    });
    document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
      btn.addEventListener('click', () => {
        setTheme(getTheme() === 'light' ? 'dark' : 'light');
      });
    });

    // Highlight active nav link
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach((a) => {
      const href = a.getAttribute('href');
      if (href === path || (path === '' && href === 'index.html')) {
        a.classList.add('active');
      }
    });

    // Sidebar smooth-scroll active state
    const sidebarLinks = document.querySelectorAll('.sidebar a[href^="#"]');
    if (sidebarLinks.length) {
      const sectionMap = new Map();
      sidebarLinks.forEach((a) => {
        const id = a.getAttribute('href').slice(1);
        const sec = document.getElementById(id);
        if (sec) sectionMap.set(sec, a);
      });
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              sidebarLinks.forEach((l) => l.classList.remove('active'));
              const link = sectionMap.get(e.target);
              if (link) link.classList.add('active');
            }
          });
        },
        { rootMargin: '-30% 0px -60% 0px' }
      );
      sectionMap.forEach((_, sec) => obs.observe(sec));
    }
  });

  // Expose for other scripts
  window.App = {
    getLang,
    setLang,
    getTheme,
    setTheme,
  };
})();
