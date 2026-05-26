# IB CS · Theme A — Interactive Study Site

A bilingual (English / Russian) interactive revision site for the **IB Diploma Computer Science** course, covering Theme A of the 2024 syllabus:

- **A2 Networks** — LAN/WAN/VPN, TCP/IP, topologies, security
- **A3 Databases** — relational model, normalization, SQL
- **A4 Machine Learning** — supervised/unsupervised, neural nets, ethics

## What's inside

**Interactive simulations** (all client-side, no backend):

- 🌐 Network topology playground — click nodes to fail them, see how mesh reroutes while star collapses
- 📦 TCP vs UDP packet animation with adjustable loss rate
- 🧱 TCP/IP encapsulation layer-by-layer
- 💾 Live SQL playground (SQLite compiled to WebAssembly via sql.js)
- 📐 Step-by-step database normalization (flat file → 1NF → 2NF → 3NF)
- 🔗 M:N relationship resolver via junction table
- 📈 Drag-the-points linear regression with live line of best fit, slope, intercept, R²
- 🎯 K-means clustering step-by-step
- 📊 Confusion matrix calculator
- ⚖️ Training-data bias visualization

**77 self-graded exam-style questions** — type your answer, the grader scores you against the mark-scheme keywords. Filter by sub-topic, shuffle, persist progress across visits.

## Tech

Pure HTML + CSS + vanilla JavaScript. No build step. Hosted on GitHub Pages.

- `sql.js` from CDN for the SQL playground
- Canvas + SVG for simulations
- `localStorage` for language preference, theme, quiz progress

## Local development

```sh
python3 -m http.server 8000
# Open http://localhost:8000
```

## Source material

Notes adapted from the Oxford IB Diploma Programme Computer Science course book. Questions modelled on NLCS Dubai IB CS Learning Site quizzes. Bilingual: English / Русский.
