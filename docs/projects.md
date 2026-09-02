# Project Briefs

Each project should include a project README, architecture note, tests, sample configuration, reproducible commands, results, limitations, and screenshots or terminal evidence. Use only public, licensed, or synthetic data.

## Project 1 — Prompt and Model Behavior Benchmark

**Goal:** evaluate prompt strategies on a stable task instead of selecting them by intuition.

**Build:**

- versioned task dataset;
- configurable prompt templates;
- structured result capture;
- accuracy, latency, and cost comparison;
- failure taxonomy and recommendation.

**Stretch:** compare a local open model with a hosted model while keeping the evaluation set fixed.

## Project 2 — Cited AI Research Assistant

**Goal:** answer technical research questions from an approved public corpus with citations and abstention.

**Build:**

- ingestion and source-provenance pipeline;
- chunking and embedding index;
- retriever with measurable recall;
- answer generation with source citations;
- insufficient-evidence response;
- two safe read-only tools;
- basic web or CLI interface.

**Acceptance criteria:** at least 20 evaluated questions, traceable citations, no answer on the unanswerable test set, and a documented threat model.

## Project 3 — AI Evaluation and Safety Harness

**Goal:** catch quality, reliability, security, and policy regressions before release.

**Build:**

- golden datasets and configurable rubrics;
- deterministic and model-graded checks;
- prompt-injection and unsafe-tool-use tests;
- latency and cost budgets;
- JSON and Markdown reports;
- CI-compatible pass/fail thresholds.

**Acceptance criteria:** an intentionally weakened application fails the gate and the report identifies why.

## Project 4 — Governed AI Service Capstone

**Goal:** deliver a production-shaped AI service with measurable behavior and governance evidence.

**Suggested product:** an AI-governance evidence assistant that reads public control documents, answers with citations, drafts a risk entry, and requires human approval before a simulated registry update.

**Architecture:**

- FastAPI service;
- retrieval and citation layer;
- explicit workflow/tool layer;
- evaluation service or runner;
- structured logging and tracing;
- container image and CI pipeline;
- human approval gate and append-only audit events.

**Governance artifacts:**

- system card and intended-use statement;
- risk register with owners and residual risk;
- data/model provenance record;
- evaluation report and release thresholds;
- change and approval log;
- incident-response and rollback runbook.

**Acceptance criteria:**

- clean local and Docker setup;
- automated unit, integration, evaluation, and security tests;
- citations trace to approved sources;
- unsafe or unauthorized operations fail closed;
- critical evaluation regressions block CI;
- release decision is supported by auditable evidence.

## Capstone demo script

1. Show the approved knowledge sources.
2. Ask an answerable question and inspect its citations.
3. Ask an unanswerable question and show abstention.
4. run a prompt-injection test;
5. request a simulated write and show the approval gate;
6. inspect the audit event and evaluation report;
7. explain one known limitation and the rollback path.

## Resume-ready outcome template

> Built a governed, retrieval-augmented AI service with citation validation, automated evaluation gates, prompt-injection testing, human approval controls, Docker deployment, CI, and auditable release evidence.
