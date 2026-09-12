# AI Research Lab

A hands-on, visual learning and research repository for AI systems, retrieval, agents, evaluation, reliability, infrastructure, safety, and governance.

## 🌌 Start with the immersive visual curriculum

This repo now includes an interactive learning experience built for **hands-on, visual learning**.

It uses:

- **Three.js** for a full-screen 3D curriculum world;
- **Mermaid.js** for live technical diagrams;
- scroll-driven movement through the AI learning path;
- clickable 3D curriculum landmarks;
- the learning loop **See → Build → Break → Fix → Explain**;
- browser-saved Week 1 progress checkboxes;
- reduced-motion support and a skip-to-content path.

The four curriculum phases use one consistent color language:

```css
.first-color  { background: #ffcece; } /* Foundations */
.second-color { background: #ffc1c8; } /* AI Systems */
.third-color  { background: #ffe3b0; } /* Quality + Safety */
.fourth-color { background: #8ed6ff; } /* Production + Governance */
```

### Run the visual experience

Because Three.js and Mermaid.js are loaded as browser modules, serve the repo over HTTP instead of double-clicking `index.html`.

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

The visual UI lives in:

```text
index.html
styles.css
app.js
```

## Learning goals

By completing this lab, you will be able to:

- explain how modern AI applications work from model input through production delivery;
- design reproducible experiments and evaluate results with evidence;
- build retrieval-augmented generation and tool-using agent prototypes;
- add observability, safety controls, approval gates, and audit trails;
- deploy an AI service with Docker and CI;
- communicate research findings through experiment reports and model/system cards.

## Curriculum

| Phase | Weeks | Focus | Main deliverable |
| --- | ---: | --- | --- |
| Foundations | 1–3 | Python, ML, transformers, prompting | Baseline text classifier |
| AI systems | 4–6 | Embeddings, RAG, agents | Cited research assistant |
| Quality and safety | 7–9 | Evaluation, observability, threats | Evaluation and red-team suite |
| Production and governance | 10–12 | APIs, containers, CI, risk controls | Governed AI service |

Use the immersive page as your visual map. For deeper reading, continue with the [12-week lesson plan](docs/lesson-plan.md), [homework](docs/homework.md), [project briefs](docs/projects.md), and [progress tracker](docs/progress-tracker.md).

## Repository structure

```text
ai-research/
├── index.html         # Immersive visual curriculum
├── styles.css         # Color system + responsive UI
├── app.js             # Three.js world + Mermaid.js setup
├── docs/
│   ├── lesson-plan.md
│   ├── homework.md
│   ├── projects.md
│   └── progress-tracker.md
├── experiments/       # One directory per reproducible experiment
├── notebooks/         # Exploration only; move reusable logic into src/
├── src/               # Reusable application and evaluation code
├── tests/             # Unit, integration, and evaluation tests
├── data/
│   ├── raw/           # Never commit private or restricted data
│   └── processed/
└── reports/           # Findings, system cards, and evaluation reports
```

Create empty working directories as you begin each project; Git does not preserve empty directories.

## Experiment standard

Every experiment should record:

1. question or hypothesis;
2. dataset and license/provenance;
3. model and configuration;
4. baseline;
5. evaluation metrics;
6. results and limitations;
7. reproduction command;
8. next decision.

Use fixed seeds where practical. Never commit API keys, proprietary work data, personal data, or confidential prompts. Prefer public or synthetic datasets.

## Definition of done

A lesson is complete when its homework passes the stated acceptance criteria. A project is complete when it has working code, tests, a reproducible run command, an evaluation report, and a short demo in its README.

## Suggested Python workflow

```bash
python -m venv .venv
# Windows: .venv\Scripts\activate
# macOS/Linux: source .venv/bin/activate
python -m pip install --upgrade pip
pytest
```

Add dependencies only when a lesson or project needs them, and pin versions before declaring a project reproducible.

## Portfolio outcome

The final capstone demonstrates more than an AI demo: it shows experiment design, RAG, evaluation, safety testing, Docker, CI, observability, governance controls, and responsible technical communication.
