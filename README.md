# AI Research Lab

A hands-on AI research laboratory for learning how modern AI systems are designed, evaluated, tested, and improved.

This repository is intentionally **experiment-first**. Instead of only reading about AI, you will learn by forming hypotheses, implementing small systems, measuring them, and documenting what happened.

> **Status:** Early-stage learning and research workspace. Experiments should be reproducible, documented, measurable, and clearly separated from production systems.

## What You Will Learn

This lab is organized around six research tracks:

1. **AI Agents** — tool use, planning, memory, orchestration, and agent reliability.
2. **Evaluation & Reliability** — benchmarks, regression tests, hallucination analysis, and failure classification.
3. **AI Infrastructure** — inference systems, containers, observability, scaling, and Kubernetes-oriented AI platforms.
4. **AI Security** — prompt injection, unsafe tool use, isolation, permissions, and adversarial testing.
5. **Multimodal AI** — systems that work across text, images, audio, and other modalities.
6. **AI for Software Engineering** — coding agents, debugging, test generation, incident analysis, and developer tooling.

You do **not** need to master all six tracks at once. Start with agents and evaluation, then expand into infrastructure and security.

---

## Recommended Learning Path

### Phase 1 — Foundations

Learn enough Python and machine-learning vocabulary to understand an experiment.

Focus on:

- Python functions, classes, typing, virtual environments, and testing
- NumPy and basic data manipulation
- probability and descriptive statistics
- train / validation / test splits
- precision, recall, accuracy, F1, latency, and cost
- embeddings, transformers, tokens, context windows, and inference

**Goal:** Be able to explain what an AI experiment is measuring and why.

### Phase 2 — LLM Systems

Build small programs around an LLM or local model.

Learn:

- prompts and structured outputs
- model inputs and outputs
- tool/function calling
- retrieval and embeddings
- context management
- deterministic vs stochastic behavior
- temperature and sampling

**Goal:** Build a small AI system whose behavior can be tested repeatedly.

### Phase 3 — Evaluation

This is where experimentation becomes research.

Learn to create:

- datasets of test cases
- expected outcomes
- baselines
- automated evaluators
- human-review rubrics
- failure categories
- benchmark reports

**Goal:** Stop saying a system “seems better” and start measuring whether it actually is.

### Phase 4 — Agents

Study systems that can make decisions and use tools.

Explore:

- single-agent loops
- planners and executors
- tool selection
- memory
- retries
- agent state machines
- multi-agent systems

**Goal:** Understand where agentic systems fail and how design choices affect reliability.

### Phase 5 — Infrastructure

Turn experiments into measurable systems.

Explore:

- Docker
- model serving
- CPU/GPU inference
- queues and workers
- caching
- tracing
- metrics
- Kubernetes
- load testing

**Goal:** Measure not only whether AI works, but how reliably and efficiently it runs.

### Phase 6 — Original Research

Choose a narrow question whose answer is not obvious.

Examples:

- Does structured tool selection reduce agent failure rates?
- How much does retry strategy improve tool-calling reliability?
- Can execution traces predict an agent failure before the final answer?
- Which context-management strategy gives the best quality/cost tradeoff?
- Can container isolation reduce the blast radius of an autonomous coding agent?

Then create a baseline, hypothesis, experiment, measurements, and conclusion.

---

## Start Here: Experiment 001

Your first recommended experiment is:

### Agent Reliability Under Tool Failure

**Research question**

How do different retry strategies affect the success rate, latency, and cost of an AI agent when tools fail intermittently?

**Why this is a good first experiment**

It teaches several important concepts at once:

- agents
- tool calling
- controlled failure injection
- metrics
- baselines
- reproducibility
- reliability engineering

It also connects AI research directly with platform and production engineering.

### Baseline

Create a simple agent with one tool and **no retry logic**.

Record:

- task success rate
- tool failure rate
- number of model calls
- number of tool calls
- total runtime
- estimated cost

### Variants

Compare the baseline against:

1. fixed retry
2. exponential backoff
3. retry with error context supplied to the model
4. model-directed recovery

### Hypothesis

A recovery strategy that exposes structured tool errors to the agent will achieve a higher task-success rate than blind retries, while requiring fewer unnecessary tool calls.

### Deliverable

Create an experiment directory containing:

```text
experiments/001-agent-tool-reliability/
├── README.md
├── config.yaml
├── run.py
├── scenarios.jsonl
├── results/
└── analysis.ipynb
```

Use `templates/EXPERIMENT.md` to document the experiment.

---

## Repository Structure

```text
ai-research/
├── .github/workflows/   # Continuous integration
├── artifacts/           # Generated reports and experiment outputs
├── data/                # Dataset documentation and local research data
├── docs/                # Architecture and research documentation
├── experiments/         # Reproducible experiments
├── models/              # Model configuration and local model notes
├── notebooks/           # Exploratory analysis only
├── research/            # Research tracks and literature notes
├── src/ai_research/     # Reusable Python research code
├── templates/           # Research and experiment templates
├── tests/               # Automated tests
└── pyproject.toml        # Python project configuration
```

### Important Rule

**Notebooks are for exploration. `src/` and `experiments/` are for reproducible work.**

If something becomes important to an experiment, move the logic out of the notebook and into Python code that can be tested and rerun.

---

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/mergemaven11/ai-research.git
cd ai-research
```

### 2. Create a virtual environment

Windows PowerShell:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

Linux/macOS:

```bash
python -m venv .venv
source .venv/bin/activate
```

### 3. Install the project

```bash
python -m pip install --upgrade pip
pip install -e ".[dev]"
```

### 4. Run the tests

```bash
pytest
```

### 5. Run linting

```bash
ruff check .
```

If both commands pass, the local research environment is ready.

---

## How Every Experiment Should Work

Each serious experiment should answer these questions:

### 1. Research Question

What exactly are we trying to learn?

### 2. Hypothesis

What result do we predict before running the experiment?

### 3. Baseline

What existing or simpler approach are we comparing against?

### 4. Independent Variable

What are we intentionally changing?

### 5. Controlled Variables

What must remain constant so the comparison is fair?

### 6. Metrics

How will the result be measured?

### 7. Procedure

Could another person repeat the experiment from these instructions?

### 8. Results

Record the data even when it contradicts the hypothesis.

### 9. Conclusion

What did we learn, and what remains uncertain?

### 10. Follow-Up

What experiment should happen next?

---

## Research Rules

To keep this repository useful rather than turning it into a pile of demos:

- Record the hypothesis **before** examining final results.
- Keep raw experiment results whenever practical.
- Record model name/version and important parameters.
- Record random seeds when applicable.
- Keep benchmark inputs versioned.
- Separate exploratory notebooks from repeatable experiment code.
- Compare against a baseline.
- Include failed and negative experiments.
- Never commit API keys, credentials, private datasets, or sensitive information.
- Do not claim an improvement unless the selected metrics support it.

Negative results are still research results.

---

## Suggested Weekly Routine

A practical learning cadence:

**Day 1 — Learn**  
Read one concept or paper and write short notes in `research/`.

**Day 2 — Reproduce**  
Implement a small known technique or baseline.

**Day 3 — Experiment**  
Change one variable and run a controlled test.

**Day 4 — Analyze**  
Inspect results, errors, edge cases, and failure modes.

**Day 5 — Document**  
Write the conclusion and decide what the next experiment should test.

One finished experiment teaches more than five abandoned notebooks.

---

## Research Progression

A good progression for this repository is:

```text
001  Agent tool reliability
002  Prompt strategy benchmark
003  Structured output reliability
004  Agent failure taxonomy
005  Retrieval quality benchmark
006  Context-window experiments
007  Agent trace observability
008  Prompt-injection evaluation
009  Containerized coding-agent sandbox
010  Kubernetes AI inference benchmark
```

By Experiment 010, the repository should contain enough reproducible work to demonstrate practical knowledge of AI agents, evaluation, reliability, security, and infrastructure.

---

## What Counts as Success?

The objective is **not** to collect AI buzzwords or produce the largest model.

You are succeeding when you can:

- define a measurable research question
- design a fair experiment
- implement a baseline
- build an evaluation dataset
- measure failures instead of hiding them
- explain why a result occurred
- reproduce previous results
- distinguish a prototype from evidence
- turn findings into the next research question

That is the mindset behind serious applied AI research.

---

## Current Status

The repository currently provides the research scaffold, experiment conventions, Python project structure, CI, testing, and documentation foundation.

The next milestone is **Experiment 001: Agent Reliability Under Tool Failure**.