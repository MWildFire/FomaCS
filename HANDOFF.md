# Handoff — IB CS Theme A Interactive Study Site

> Drop this into a new Claude session along with the repo to continue work.
> This file is the source of truth for project state, conventions, and gotchas.
> **Last updated:** 2026-05-28 after the "official teacher questions" pass.

## TL;DR

A bilingual (EN/RU) static site teaching **IB Computer Science Theme A** (Computer fundamentals, Networks, Databases, ML) with **14 interactive simulations**, a **77-question self-graded quiz**, and **16 Russian-language deep-dive lesson pages** built from the Oxford 2025 IB DP CS Course Companion + the NLCS Dubai IB CS site. Vanilla HTML/CSS/JS, no build step. Deployed to GitHub Pages.

- **Live site:** https://mwildfire.github.io/FomaCS/
- **Repo:** https://github.com/MWildFire/FomaCS  (public, owned by `MWildFire`)
- **Local path:** `/Users/mvstrike/FomaCS/`
- **Deploy:** `git push` to `main` — Pages rebuilds from repo root in ~30-60 s
- **Local dev:** `python3 -m http.server 7655` (or `.claude/launch.json` server `fomacs`)
- **Cache buster** is currently **`?v=10`** site-wide. Bump it when CSS/JS changes.

## Source material

Three parallel sources feed this site:

1. **Oxford 2025 IB DP Computer Science Course Companion (PDF)** — Bill MacKenty, Lindsey Stephenson, James Abela. ~627 pp. **The canonical source for all 12 RU deep-dive pages.** Lives at `/Users/mvstrike/Downloads/IB DP 2025 Computer Science Oxford.pdf` (gitignored, 57 MB). Page map: A1.1=3-37, A1.2=38-65, A1.3=66-89, A1.4=90-97, A2.1=101-123, A2.2=124-143, A2.3=144-153, A2.4=154-164, A3.1=167-172, A3.2=173-190, A3.3=191-214, A3.4 HL=215-234, A4.1=237-250, A4.2 HL=251-263, A4.3 HL=264-306, A4.4=307-313. Note: PDF reader's `pages` parameter is offset by ~6-9 from printed numbers — read overlapping chunks until you hit the right content.
2. **NLCS Dubai IB CS Google Site** — https://sites.google.com/nlcsdubai.ae/nlcs-dubai-ib-cs/ (requires login as `foma.molchanov@edu.nlcsdubai.ae` for full content). The A1.x pages there are syllabus checkpoints only; the A2.1.3 page is a rich teaching page (used as the template for `setevye-ustroistva.html`). **Cross-origin iframe content blocks scroll wheel + JS access.** Workaround: set `iframe.style.height = '12000px'` AND set heights of `.YMEQtf`, `.WIdY2d`, `.Pe0Cwb`, `.DUndBc` to the same value so the outer page can scroll — anything less aggressive leaves the iframe clipped.
3. **11 teacher Google Docs with official exam questions + mark schemes** — see "Official exam questions" section below. Extracted via Chrome MCP screenshots (Google Docs canvas renderer makes DOM extraction impossible). Saved verbatim to `/tmp/exam-questions/A*.md`.

Original `IB_CS_Theme_A_Exam_Practice_Guide.pdf` (48 pp, gitignored, bilingual) still lives in repo root and seeded the original 77 quiz questions in `js/data.js`.

## File map

```
/
├── index.html                  landing page with 6 topic cards (incl. Lessons hub)
├── lessons.html                hub of all 16 deep-dive RU pages, grouped A1/A2/A3/A4
├── fundamentals.html           A1 — binary, logic, FDE, memory, compiler simulations
├── networks.html               A2 — topology, cloud-edge, devices, TCP/UDP, layers, encryption
├── databases.html              A3 — SQL playground, normalization, M:N ERD, ACID transaction
├── ml.html                     A4 — regression, k-means, KNN, confusion matrix, bias
├── quiz.html                   all 77 questions, two-level filter
├── styles.css                  single shared stylesheet (~1500 lines now)
│
│  ── Russian deep-dive pages (16 total) ──
├── setevye-ustroistva.html     A2.1.3 Network devices (the original template page)
├── a1-1-hardware.html          A1.1 CPU/GPU/memory/FDE/storage/compression/cloud (1845 ln)
├── a1-2-data-logic.html        A1.2 number systems/encoding/logic gates/truth tables (1498)
├── a1-3-os.html                A1.3 OS functions/scheduling/IRQ/control systems (1485)
├── a1-4-translation.html       A1.4 HL compiler/interpreter/JIT/stages (1108)
├── a2-1-fundamentals.html      A2.1 LAN/WAN/cloud/protocols/TCP-IP layers (1690)
├── a2-2-architecture.html      A2.2 topologies/servers HL/client-server vs P2P/VLAN (1424)
├── a2-3-transmissions.html     A2.3 media/IP/packet switching/routing (1282)
├── a2-4-security.html          A2.4 threats/defenses/encryption/MFA/GDPR (1054)
├── a3-1-fundamentals.html      A3.1 DBMS/keys/integrity/roles (1050)
├── a3-2-design.html            A3.2 ERD/M:N junction/normalization 1-3NF/anomalies (1612)
├── a3-3-sql.html               A3.3 DDL/DML/DCL/TCL/JOINs/transactions/ACID (1394)
├── a4-1-ml-fundamentals.html   A4.1 AI vs ML vs DL/supervised vs unsupervised/RL/ASIC (416)
├── a4-2-preprocessing.html     A4.2 HL cleaning/scaling/encoding/CV/leakage (1357)
├── a4-3-approaches.html        A4.3 HL regression/classification/clustering/CNN/RL/GA (476)
├── a4-4-ethics.html            A4.4 bias/surveillance/NLP/false-positive-negative (480)
│
├── README.md                   public README with live URL
├── HANDOFF.md                  this file
├── .gitignore                  excludes the PDFs, .DS_Store, .claude/, node_modules
├── .claude/launch.json         preview server config (port 7655)
│
└── js/
    ├── app.js                  language + theme toggle, Theme.refresh()
    ├── data.js                 QUIZ_DATA (77 items) + NOTES_DATA (per sub-topic)
    ├── notes-render.js         renders NOTES_DATA into bilingual blocks
    ├── quiz.js                 self-grading quiz + two-level filter
    ├── sql-playground.js       sql.js WASM SQLite playground
    │
    │  ── Original 10 simulations ──
    ├── topology.js             star/bus/ring/mesh/hybrid + SPOF detection
    ├── protocols.js            TCP vs UDP packet animation (canvas)
    ├── layers.js               TCP/IP 4-layer encapsulation (SVG)
    ├── normalization.js        1NF → 2NF → 3NF walkthrough
    ├── erd.js                  M:N → junction table animation (SVG)
    ├── regression.js           drag-to-add-point linear regression (canvas)
    ├── kmeans.js               K-means step-by-step (canvas)
    ├── confusion.js            confusion matrix sliders (SVG)
    ├── bias.js                 illustrative training-bias viz (canvas)
    │
    │  ── Round-2 additions (2026-05-26..27) ──
    ├── cloud-edge.js           A2.1.2 cloud / fog / edge tier visualiser
    ├── devices.js              A2.1.3 device → TCP/IP layer matcher
    ├── encryption.js           A2.4 symmetric vs asymmetric pipeline
    ├── acid.js                 A3.3 ACID transaction with crash injection
    ├── knn.js                  A4.3 KNN classifier playground (kbd + touch)
    │
    │  ── A1 simulations (2026-05-27 push) ──
    ├── binary.js               A1.2 bit-flipper 4/8/16-bit + signed mode
    ├── logic-gates.js          A1.2 AND/OR/NOT/NAND/NOR/XOR + truth table
    ├── fetch-execute.js        A1.1 CPU FDE animation w/ mini LOAD/ADD/STORE program
    ├── memory-hierarchy.js     A1.1 8-tier memory pyramid picker
    └── compiler-interp.js      A1.4 HL step-through contrast
```

## Architecture

### Top nav (every page)

`Overview · A1 Fundamentals · A2 Networks · A3 Databases · A4 ML · Quiz`

Sidebar of fundamentals/networks/databases/ml has a **"📚 Подробные уроки (RU)"** section linking to the deep-dive pages for that topic.

`index.html` topic-card grid (5 main + 1 Lessons-hub card + 1 Quiz card).

`lessons.html` is the **deep-dive hub** — 16 colour-coded cards organised by A1/A2/A3/A4 with HL pages border-left tinted red.

### Bilingual content (`fundamentals/networks/databases/ml/quiz/index`)

- Inline elements use class `.lang-en-inline` / `.lang-ru-inline` (display: none by default; one is unhidden by `[data-lang]` on `<html>`).
- Block elements use `.lang-en` / `.lang-ru`.
- Toggle is `<button data-lang-toggle>`; preference persists in `localStorage` under `fomacs-lang`.
- JS that draws to canvas reads `document.documentElement.getAttribute('data-lang')` and writes text accordingly.
- Listen to `document.addEventListener('langchange', fn)` to redraw.

### Single-language Russian (deep-dive + lessons pages)

The 16 deep-dive pages and `lessons.html` are **Russian only** (`<html lang="ru">`). No `.lang-*-inline` markers. English technical terms appear in parens, e.g. "арифметико-логическое устройство (ALU)". This is intentional — these pages target Russian-speaking IB students reading at depth; the bilingual machinery only applies to the main topic pages.

### Theme (light/dark)

- Toggle is `<button data-theme-toggle>`; persists in `localStorage` under `fomacs-theme`.
- Light is default. Dark overrides only CSS variables (in `:root` and `[data-theme="dark"]`).
- **JS canvases MUST use `window.Theme.<color>`** (not hardcoded hex) so dark mode works. The Theme object is refreshed when the user toggles, and a `themechange` event is dispatched. Every drawing function should listen:
  ```js
  document.addEventListener('themechange', draw);
  ```
- `Theme` exposes: `text, textMuted, textFaint, border, borderStrong, surface, surface2, bg, primary, accent, green, red, amber, violet`.
- Dark-mode contrast gotcha: `--accent` becomes bright sky-blue (`#38bdf8`) — `#fff` text on it fails AA. Use `var(--bg)` (dark navy) for text on accent in dark mode.

### Cache busting

Every `<link rel="stylesheet">` and `<script src>` in HTML has `?v=N`. **Bump N when CSS or JS changes** — otherwise visitors stuck on cached versions won't see updates. Currently `v=10`. The site-wide bump pattern is `sed -i '' 's/v=10/v=11/g' /Users/mvstrike/FomaCS/*.html`.

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

The grader (`grade()` in `quiz.js`) detects answer language (Cyrillic regex), uses word-boundary matching (Unicode-aware), and forgives heavily.

### NOTES_DATA shape (also `js/data.js`)

```js
window.NOTES_DATA = {
  a1_1: {
    title: { en: '...', ru: '...' },
    en: { 'A1.1.1 Describe ...': [bullet1, bullet2, ...], ... },
    ru: { 'A1.1.1 Описать ...': [bullet1, bullet2, ...], ... }
  },
  ...
}
```

Keys are now structured by official IB sub-sub-topic numbers (A1.1.1, A1.1.2, ...) following the syllabus-checkpoint format extracted from NLCS Dubai. Rendered by `notes-render.js` into the `<div id="notes-XX-content">` placeholders in the topic pages.

## Deep-dive page conventions (the 16 RU lessons)

Each follows the structure pioneered by `setevye-ustroistva.html`:

1. **Hero** — `.hero-eyebrow` + `<h1>` + `.lede` paragraph.
2. **Official-Qs banner** — green-bordered `.ru-tip` confirming questions come from the teacher's Google Doc (8 pages have official Qs). Pages without official Qs (A1.x, A2.4) get an **amber** banner explaining the agent-generated questions are placeholders.
3. **Summary table or topic map** at the top with sub-topic codes.
4. **`.device-card`** sections for each main concept with:
   - `<h3>` with optional emoji prefix
   - `.label-row` 2-col grid (label / value) for Purpose / Function / Layer
   - `.layer-pill` for TCP/IP layer or HL badge
5. **Inline SVG diagrams** where helpful (topology, ERD, FDE) using `var(--*)` colour vars.
6. **Comparison tables** (`.summary-table`) for "X vs Y" topics.
7. **Practice Qs** — `<details class="question-card">` with `<summary>` and `<div class="answer">` inside. Marks shown via `<span class="marks-tag">N баллов</span>`. Mark-scheme bullets with `[1]` per the official source.
8. **Closing "Что важно запомнить"** with bullet exam-survival tips.
9. **Sim CTAs** linking to relevant interactive simulations.
10. **Cache buster `?v=10`** on `styles.css` and `js/app.js` (the only script referenced).

### Adding a new deep-dive page

1. Copy `setevye-ustroistva.html` as starting template (562 lines, simple).
2. Replace hero + content.
3. Wire up nav links: add to `lessons.html` lesson-grid AND to the parent page's sidebar (fundamentals/networks/databases/ml). Use Python script in commit `8821d74` as reference pattern.
4. Bump `?v=N` on the new page only first; bump site-wide when CSS/JS changes.

### Official exam questions — 11 Google Docs

These are the canonical exam-style questions per topic (replaced agent-generated practice Qs in commit `a340f25`). All require Google login as `foma.molchanov@edu.nlcsdubai.ae` (or any account with view permission). Doc text is rendered via canvas; extract via Chrome screenshots only.

| Sub-topic | Doc URL | File ID |
|---|---|---|
| A2.1 Networks | https://docs.google.com/document/d/1IMKtNh7luz131RiSTpU4q9KfhgpGrq4aoH-LkQUBOps/ | 1IMKtNh7luz... |
| A2.1.3 + A2.3.2 | https://docs.google.com/document/d/1LIXplbgiyShAOdWHVABsQlk63V229dbx1rxKLjMOR_U/ | 1LIXplbgiyS... |
| A2.2 Architecture | https://docs.google.com/document/d/1QTvMTevy7sGQSV0rzSPuKtTgM4djQSKKs8HxZcyq1eA/ | 1QTvMTevy7s... |
| A2.3 Transmissions | https://docs.google.com/document/d/1PTV3KvrV5HtdZI4F2DZ1-9USNDcgxqUgLNv7afJT0GY/ | 1PTV3KvrV5H... |
| A3.1 DB Fundamentals | https://docs.google.com/document/d/147BUHxmHxiy0G56sT9ao6mfXtHqFc-g9b3CGK3tsmoI/ | 147BUHxmHxi... |
| A3.2 DB Design | (none yet — agent guessed) | — |
| A3.3 SQL | https://docs.google.com/document/d/1OaLFM4gY3HMrJ58d1uTKFJ6LVuohx3-FvGKzaEEiDig/ | 1OaLFM4gY3H... |
| A3.3 SQL (medical) | https://docs.google.com/document/d/1j-sCthRYe4KEmPRMd_7dsalXMFbQpMo349JP1-6Riuo/ | 1j-sCthRYe4... |
| A4.1 ML Fundamentals | https://docs.google.com/document/d/16w4xuiuM2UlIJ3cQ3AswKhrAEjhV9LNZ4b-JYcnwF2I/ | 16w4xuiuM2U... |
| A4.2 Preprocessing HL | https://docs.google.com/document/d/1kxWLxXSOUaV4uRiNNuEI9uZ2JZ2_C-YmCrxxu2sc63w/ | 1kxWLxXSOUa... |
| A4.3 Approaches HL | https://docs.google.com/document/d/1J_NvMk-CHoqcoNiLPbmZxPARYbXqvNwZ1km-lSXjBn8/ | 1J_NvMk-CHo... |
| A4.4 Ethics | https://docs.google.com/document/d/1g9nKbPMPtPZuXJ-lvBMjbFUMonfP1YtoN9IiLf_wOKE/ | 1g9nKbPMPtP... |

Extracted markdown lives in `/tmp/exam-questions/A*.md` (regenerate if /tmp is cleared).

**Topics still needing official Qs:** A1.1, A1.2, A1.3, A1.4 (HL), A2.4, A3.2. When the teacher publishes a doc for these, swap the amber banner for green and replace the agent-generated questions.

## Architecture choices & tradeoffs

| Choice | Why | Alternative considered |
| --- | --- | --- |
| Multi-file static HTML | Simple deploy, no build, easy to view-source | SPA with hash routing (rejected: more complex, no benefit) |
| Vanilla JS, no framework | Bundle-free, no build step needed | React + Vite (rejected: too heavy for ~20 pages) |
| sql.js via CDN | Real SQLite in browser, ~700KB WASM only on databases.html | Mock SQL parser (rejected: less educational) |
| Canvas + SVG mix | Canvas for animations, SVG for layouts | All canvas (rejected: harder a11y) |
| Class-toggle bilingual on main pages | Works without JS rebuild, EN/RU both ship | i18n library (rejected: overkill) |
| Russian-only deep-dive pages | Higher info density for the target audience | Bilingual everywhere (rejected: 2x maintenance for 16 pages) |
| Cache-bust query param | Simplest forced refresh | Service worker (rejected: complexity) |
| Parallel sub-agents to build pages | Massive throughput; each agent reads its PDF slice and writes one HTML | Sequential build (rejected: would have taken days of context) |

### Sub-agent workflow that scaled

For the 12 deep-dive pages and the 9 question-replacement passes I dispatched **all agents in parallel in a single message**. Each agent got:
- A precise PDF page range or extracted-markdown path
- The template page to mimic (`setevye-ustroistva.html`)
- A single output path
- A strict instructions list (cache buster, lang attribute, structure, Russian style)

This yielded ~17 000 lines of HTML in ~15 minutes of wall-clock time. The two failure modes seen:
- One agent (A3.2 first attempt) stopped early after only 2 tool calls — I just re-dispatched it with the same prompt and it completed.
- Agents sometimes hallucinate the PDF page-number offset; instruct them to try `pages: "X-Y"` and if it returns wrong content, try `"X+6 to Y+6"`.

## Known gaps / things to consider next

1. **A3.2 has no teacher Google Doc** — the current 5 Qs on the page are agent-generated. When the teacher publishes one, follow the pattern in commit `a340f25`.
2. **A1.x and A2.4** also have no official Qs (5 amber-banner pages). Same plan as above.
3. **Hardcoded inline styles** on hero-eyebrow blocks in topic HTML files (`color:#6d28d9` etc). These have dark-mode overrides via `!important` in styles.css, but moving them to CSS classes would be cleaner.
4. **Mobile canvas readability** — `.sim-canvas-wrap` enforces `min-width: 540px` with horizontal scroll. A responsive coord system per simulation would be nicer but is a substantial refactor.
5. **Quiz grading is keyword-only** — no semantic understanding. A user could write nonsense containing the right words and score full marks. Acceptable for a self-study tool.
6. **Bias viz is hand-wired** — see disclaimer "Illustrative model" at the bottom of the canvas.
7. **`prefers-reduced-motion`** is respected for CSS, but the k-means auto-run, layer encapsulation animation, and TCP/UDP packets still animate. Cloud-edge sim DOES respect it.
8. **No skip-link** for keyboard users to jump past the nav.
9. **The PDF** — gitignored to keep the repo small. If you need to reference page numbers for an agent, just hand them the path and a range.
10. **A4.3 HL practice questions** mention CNNs, RL, genetic algorithms — these aren't covered by any existing simulation (regression / k-means / KNN / confusion / bias only cover a4.1, a4.2 scope). Future addition: small CNN-filter visualisation or RL-grid-world demo.

## Reviews that ran

Multiple sub-agent reviews ran across the project lifetime. Most recent (commit `8821d74`):
- **Code review** of 12 new deep-dive pages — clean, 0 critical, 0 high, 2 NITs (one corrected, one stylistic).

Earlier review pass on the round-2 simulations (cloud-edge, devices, encryption, acid, knn):
- **Correctness:** RAF infinite loop in cloud-edge (fixed with visibility guard + IntersectionObserver), re-entrancy bug in acid.js (fixed with try/finally), XOR-not-self-inverse in encryption.js (fixed via per-position modular shift), auto-run after HALT in fetch-execute.js (fixed with guard).
- **Design/a11y:** dark-mode `.bin-cell.on`/`.fde-stage-pill`/`.mem-level.selected` contrast (all swapped to `color: var(--bg)`), logic-gate wires color-only signal (added stroke-dasharray), KNN keyboard-inaccessible (added tabindex+arrow keys+touch).

## Verification commands

```sh
# Local server
python3 -m http.server 7655
# Or use the preview tool: launch.json server name = "fomacs"

# Confirm live deploy
curl -s https://mwildfire.github.io/FomaCS/ | grep "<title>"
curl -s https://mwildfire.github.io/FomaCS/lessons.html | grep -c "lesson-card"  # should be 16

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

// Toggle theme via API (only on bilingual pages)
App.setTheme('dark')   // 'light' | 'dark'
App.setLang('ru')      // 'en' | 'ru'

// Count question-cards on a deep-dive page
document.querySelectorAll('details.question-card').length

// Inspect a quiz question
document.querySelector('#q-A2.1-Q1A')
```

## Recent commit story (most recent first)

| Commit | What |
| --- | --- |
| `a340f25` | Replace agent-Qs with 11 official teacher Qs from Google Docs; 3 new A4 pages; banners |
| `8821d74` | 13 standalone RU deep-dive lesson pages + hub page lessons.html |
| `39e83a4` | First standalone RU page: setevye-ustroistva.html (A2.1.3 Network devices) |
| `9716624` | Rewrite A1 NOTES_DATA from NLCS syllabus checkpoints |
| `cda7a14` | A1 Computer fundamentals page + 5 A1 simulations + nav wiring |
| `810de6d` | 4 new sims (cloud-edge, devices, encryption, ACID, KNN) + expanded NOTES_DATA |
| `71c0a91` | Initial HANDOFF.md |
| `23bc174` | Address first round of code & design review findings |
| `929ab55` | Add live site URL to README |
| `9fb5c83` | Initial commit: IB CS Theme A interactive study site |

## Git / GitHub context

- gh CLI authenticated as `MWildFire`
- Git config: `user.name=MWildFire`, `user.email=mvstrike17@gmail.com`
- Branch: `main` only (no dev branch)
- Pages enabled: source `main`, path `/`
- Last live commit at handoff time: `a340f25`

## Browser-MCP gotchas (Chrome MCP for NLCS scrape + Google Docs)

- Google Sites pages render content inside a sandbox iframe at `gstatic.com/atari/embeds/{ID}/...`. JS cannot read it (cross-origin). To force-show all content for screenshots: set the iframe's height to 8000-12000 px AND set heights of `.YMEQtf`, `.WIdY2d`, `.Pe0Cwb`, `.DUndBc` containers to the same value. Don't change `overflow` on `.YMEQtf` (it's `position: absolute`; will disappear).
- Google Docs uses canvas rendering — DOM is empty. Only way to read is screenshots. Doc export URLs (`/export?format=txt`) don't work without explicit share access.
- "Request edit access" banner = you have view access only. Page contents still load, screenshots still work.
- Login flow: navigate triggers Google account chooser. Pick the school account for NLCS docs (`foma.molchanov@edu.nlcsdubai.ae` was the working one). Other Gmail accounts won't see the teacher docs.
- Chrome MCP scroll wheel sometimes doesn't reach the iframe. Workaround: `window.scrollTo(0, Y)` via `javascript_tool` for precise positioning.

## Contact / continuity tips

- The user (MVstrike) speaks Russian primarily. Russian responses are welcomed.
- The user values: actually-working simulations, visual polish, bilingual parity on main pages, single-language depth on deep-dive pages, deploy verification, parallel-agent execution where possible.
- When the user says "симуляции это очень важно" they mean — link every concept to an existing simulation OR build a new one. Don't just write static text.
- When the user says "официальные вопросы" they mean — only the questions from teacher Google Docs are "real". Anything I or an agent generates is a placeholder.
- Past sessions: see git log for commit-by-commit story.
