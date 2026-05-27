# Handoff — IB CS Theme A Interactive Study Site

> Drop this into a new Claude session along with the repo to continue work.
> This file is the source of truth for project state, conventions, and gotchas.

## TL;DR

A bilingual (EN/RU) static site teaching **IB Computer Science Theme A** (Networks, Databases, ML) with **10 interactive simulations** and a **77-question self-graded quiz**. Built with vanilla HTML/CSS/JS, no build step. Deployed to GitHub Pages.

- **Live site:** https://mwildfire.github.io/FomaCS/
- **Repo:** https://github.com/MWildFire/FomaCS  (public, owned by `MWildFire`)
- **Local path:** `/Users/mvstrike/FomaCS/`
- **Deploy:** `git push` to `main` — Pages rebuilds from repo root
- **Local dev:** `python3 -m http.server 7655` (or `.claude/launch.json` server `fomacs`)

## Source material

`IB_CS_Theme_A_Exam_Practice_Guide.pdf` (48 pages, gitignored) — bilingual study guide
covering A2 Networks, A3 Databases, A4 Machine Learning. 82 exam-style questions with mark
schemes. Adapted from the Oxford IB Diploma Programme Computer Science course book and
NLCS Dubai quizzes. All page content (notes + 77 questions) was extracted from this PDF
into `js/data.js`.

## File map

```
/
├── index.html              landing page with topic cards
├── networks.html           A2 — topology + TCP/UDP + TCP/IP layers
├── databases.html          A3 — SQL playground + normalization + M:N ERD
├── ml.html                 A4 — regression + k-means + confusion matrix + bias
├── quiz.html               all 77 questions, two-level filter
├── styles.css              single shared stylesheet (~1000 lines)
├── README.md               public README with live URL
├── HANDOFF.md              this file
├── .gitignore              excludes the PDF, .DS_Store, .claude/, node_modules
├── .claude/launch.json     preview server config (port 7655)
└── js/
    ├── app.js              language + theme toggle, Theme.refresh()
    ├── data.js             QUIZ_DATA (77 items) + NOTES_DATA (per sub-topic)
    ├── notes-render.js     renders NOTES_DATA into bilingual blocks
    ├── quiz.js             self-grading quiz + two-level filter
    ├── sql-playground.js   sql.js WASM SQLite playground
    ├── topology.js         star/bus/ring/mesh/hybrid + SPOF detection
    ├── protocols.js        TCP vs UDP packet animation (canvas)
    ├── layers.js           TCP/IP 4-layer encapsulation (SVG)
    ├── normalization.js    1NF → 2NF → 3NF walkthrough
    ├── erd.js              M:N → junction table animation (SVG)
    ├── regression.js       drag-to-add-point linear regression (canvas)
    ├── kmeans.js           K-means step-by-step (canvas)
    ├── confusion.js        confusion matrix sliders (SVG)
    └── bias.js             illustrative training-bias viz (canvas)
```

## Key conventions

### Bilingual content
- Inline elements use class `.lang-en-inline` / `.lang-ru-inline` (display: none by default; one is unhidden by `[data-lang]` on `<html>`).
- Block elements use `.lang-en` / `.lang-ru`.
- Toggle is `<button data-lang-toggle>`; preference persists in `localStorage` under `fomacs-lang`.
- JS that draws to canvas reads `document.documentElement.getAttribute('data-lang')` and writes text accordingly.
- Listen to `document.addEventListener('langchange', fn)` to redraw.

### Theme (light/dark)
- Toggle is `<button data-theme-toggle>`; persists in `localStorage` under `fomacs-theme`.
- Light is default. Dark overrides only CSS variables (in `:root` and `[data-theme="dark"]`).
- **JS canvases MUST use `window.Theme.<color>`** (not hardcoded hex) so dark mode works. The Theme object is refreshed when the user toggles, and a `themechange` event is dispatched. Every drawing function should listen:
  ```js
  document.addEventListener('themechange', draw);
  ```
- `Theme` exposes: `text, textMuted, textFaint, border, borderStrong, surface, surface2, bg, primary, accent, green, red, amber, violet`.

### Cache busting
Every `<link rel="stylesheet">` and `<script src>` in HTML has `?v=N`. **Bump N when CSS or JS changes** — otherwise visitors stuck on cached versions won't see updates. There are also extra dark-mode CSS rules in styles.css that depend on these.

### Quiz data shape (`js/data.js`)
```js
{
  id: 'A2.1-Q1A',            // unique
  topic: 'A2.1',             // for filter (A2 / A2.1 / A2.1.4 — see SUB_TOPICS in quiz.js)
  marks: 1,                  // exam marks
  command: 'Define',         // IB command term
  hl: true,                  // (optional) Higher Level only
  title: { en, ru },
  q: { en, ru },             // question text
  keywords: [...],           // English mark-scheme keywords
  keywordsRu: [...],         // Russian equivalents
  model: { en: [bullets], ru: [bullets] }  // model answer + explanation
}
```
The grader (`grade()` in `quiz.js`) detects answer language (Cyrillic regex), uses word-boundary matching (Unicode-aware), and forgives heavily — any keyword hit ≥ 1 mark; ≥50% coverage = full marks.

### Adding a new question
1. Append to `window.QUIZ_DATA` in `js/data.js` with the shape above.
2. If it's in a new sub-topic, add to `SUB_TOPICS` in `js/quiz.js`.
3. Update the question count in `quiz.html` footer (`77 questions` → next number) and in `index.html` hero.
4. Bump `?v=` in any HTML that loads `data.js` / `quiz.js`.

### Adding a new simulation
1. New `js/<name>.js` IIFE that grabs DOM elements and draws.
2. Use `window.Theme.<color>` for everything. Listen to `themechange` and `langchange`.
3. Add canvas/SVG with `role="img"` and `aria-label="…"` for a11y.
4. Add script tag in the relevant page HTML (with `?v=`).

## Architecture choices & tradeoffs

| Choice | Why | Alternative considered |
| --- | --- | --- |
| Multi-file static HTML | Simple deploy, no build, easy to view-source | SPA with hash routing (rejected: more complex, no benefit) |
| Vanilla JS, no framework | Bundle-free, no build step needed | React + Vite (rejected: too heavy for 5 pages) |
| sql.js via CDN | Real SQLite in browser, ~700KB WASM only on databases.html | Mock SQL parser (rejected: less educational) |
| Canvas + SVG mix | Canvas for animations, SVG for layouts | All canvas (rejected: harder a11y) |
| Class-toggle bilingual | Works without JS rebuild, EN/RU both ship | i18n library (rejected: overkill) |
| Cache-bust query param | Simplest forced refresh | Service worker (rejected: complexity) |

## Known gaps / things to consider next

1. **Hardcoded inline styles** on hero-eyebrow blocks in topic HTML files (`color:#6d28d9` etc). These have dark-mode overrides via `!important` in styles.css, but moving them to CSS classes would be cleaner.
2. **Mobile canvas readability** — currently use `min-width: 540px` and horizontal scroll. A responsive coord system per simulation would be nicer but is a substantial refactor.
3. **Quiz grading is keyword-only** — no semantic understanding. A user could write nonsense containing the right words and score full marks. Acceptable for a self-study tool.
4. **Bias viz is hand-wired** — the threshold is shifted by training share via a formula, not by actually training a model. Disclaimer "Illustrative model" is shown at the bottom of the canvas; expand to a learned model if interest grows.
5. **No skip-link** for keyboard users to jump past the nav.
6. **`prefers-reduced-motion`** is respected for CSS, but the k-means auto-run, layer encapsulation animation, and TCP/UDP packets still animate. Could pause those.
7. **TCP/IP layer animation** — currently uses `setInterval(800ms)` to advance stages. Switching to requestAnimationFrame with state tracking would feel smoother.
8. **The PDF source** — gitignored to keep the repo small. Re-add if it should be a download link.

## Reviews already applied

Two sub-agent reviews ran on commit `929ab55`:
1. **Code review** (`a9ca18812b83c4819`) — found infinite loop at 100% packet loss, dead code in protocols.js, misleading TCP "re-ordering" label, substring keyword matching false positives, k-means empty cluster issue, busy-wait in sql-playground, dead vars in topology, etc.
2. **Design review** (`ab1d0a189ff84cdb4`) — flagged broken dark mode in canvas/SVG (hardcoded hex), no focus indicators, no ARIA on simulations, no cache busting, 17 quiz filter chips, mobile breakpoints, code-block bg in dark mode.

All critical and important findings are addressed in commit `23bc174`. Minor "nice-to-have" items (e.g. some refactoring in protocols.js) deferred.

## Verification commands

```sh
# Local server
python3 -m http.server 7655

# Or use the preview tool: launch.json server name = "fomacs"

# Confirm live deploy
curl -s https://mwildfire.github.io/FomaCS/ | grep "<title>"
curl -s https://mwildfire.github.io/FomaCS/js/quiz.js?v=2 | grep "kwMatches"

# Check Pages build status
gh api repos/MWildFire/FomaCS/pages/builds/latest \
  | python3 -c "import json,sys;print(json.load(sys.stdin).get('status'))"
```

## How to redeploy after edits

```sh
git add -A
git commit -m "..."   # use HEREDOC for multiline; sign Co-Authored-By if pairing
git push              # main branch → Pages auto-rebuilds in ~30-60s
# Bump ?v= in HTML files if you changed CSS/JS, or users will see stale cache.
```

## Useful selectors for testing in the browser console

```js
// Force CSS reload (during local dev, to bust local cache)
document.querySelectorAll('link[rel="stylesheet"]').forEach(l => l.href = l.href.split('?')[0] + '?v=' + Date.now())

// Toggle theme via API
App.setTheme('dark')   // 'light' | 'dark'
App.setLang('ru')      // 'en' | 'ru'

// Inspect a quiz question
document.querySelector('#q-A2.1-Q1A')
```

## Git / GitHub context

- gh CLI authenticated as `MWildFire`
- Git config: `user.name=MWildFire`, `user.email=mvstrike17@gmail.com`
- Branch: `main` only (no dev branch)
- Pages enabled: source `main`, path `/`
- Last live commit at handoff time: `23bc174`

## Contact / continuity tips

- The user (MVstrike) speaks Russian primarily. Russian responses are welcomed.
- The user values: actually-working simulations, visual polish, bilingual parity, deploy verification.
- Past sessions: see git log for commit-by-commit story.
