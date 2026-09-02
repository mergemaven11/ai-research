# 12-Week AI Research Lesson Plan

Plan for 6–8 hours per week: about 2 hours of study, 3–4 hours of building, and 1–2 hours of documentation and reflection.

## Phase 1 — Foundations

### Week 1: Reproducible AI experiments

**Learn:** research questions, hypotheses, baselines, variables, train/validation/test splits, data leakage, seeds, environments, and experiment logs.

**Lab:** create an experiment template and run a small text-processing benchmark twice from a clean environment.

**Evidence:** committed configuration, exact run command, saved metrics, and a short result interpretation.

### Week 2: Machine-learning foundations

**Learn:** supervised vs. unsupervised learning, features, labels, loss, optimization, overfitting, precision, recall, F1, confusion matrices, and class imbalance.

**Lab:** train a simple scikit-learn text classifier and compare a majority baseline, bag-of-words model, and TF-IDF model.

**Decision question:** which metric best represents the actual failure cost?

### Week 3: Transformers and prompting

**Learn:** tokens, embeddings, attention, context windows, inference parameters, structured outputs, prompt injection boundaries, and the difference between model and system behavior.

**Lab:** compare three prompt strategies on one fixed task set and record accuracy, latency, and failure types.

**Deliverable:** Project 1 — Prompt and model behavior benchmark.

## Phase 2 — AI application systems

### Week 4: Embeddings and semantic search

**Learn:** vector representations, similarity measures, chunking, metadata, top-k retrieval, recall, and embedding drift.

**Lab:** build a small semantic-search index from public technical documents.

**Decision question:** what chunk size and retrieval depth produce the best evidence recall?

### Week 5: Retrieval-augmented generation

**Learn:** ingestion, parsing, chunking, indexing, retrieval, reranking, citations, groundedness, abstention, and freshness.

**Lab:** create a RAG pipeline that answers only from retrieved evidence and cites its sources.

**Evidence:** at least 20 test questions, expected sources, retrieval metrics, and unsupported-answer checks.

### Week 6: Agents and tool use

**Learn:** workflows vs. agents, tool schemas, routing, state, memory boundaries, retries, idempotency, budgets, and human approval.

**Lab:** add two read-only tools to a research assistant and require approval before any simulated write action.

**Deliverable:** Project 2 — Cited research assistant.

## Phase 3 — Quality, reliability, and safety

### Week 7: Evaluation engineering

**Learn:** golden datasets, deterministic checks, model-graded evaluation, rubric design, pairwise comparison, confidence intervals, and regression gates.

**Lab:** build an evaluation runner covering answer quality, citations, refusal behavior, cost, and latency.

**Decision question:** which checks must block a release, and which should only warn?

### Week 8: Observability and reliability

**Learn:** structured logs, traces, prompt/version metadata, token and cost tracking, latency percentiles, timeouts, retries, fallbacks, and service-level objectives.

**Lab:** instrument the research assistant and produce a failure dashboard or report from a repeatable load test.

### Week 9: AI security and red teaming

**Learn:** prompt injection, indirect injection, data exfiltration, insecure tool use, sensitive-data exposure, supply-chain risk, and abuse cases.

**Lab:** create a red-team dataset and test defenses without using real secrets or private data.

**Deliverable:** Project 3 — Evaluation and safety harness.

## Phase 4 — Production and governance

### Week 10: Serving and deployment

**Learn:** API contracts, validation, async work, caching, queues, rate limits, health checks, containers, configuration, and secrets management.

**Lab:** expose the assistant through a FastAPI service, containerize it, and add unit/integration tests.

### Week 11: CI/CD and model operations

**Learn:** automated tests, evaluation gates, artifact provenance, SBOMs, model/data versioning, rollback, canaries, and monitoring.

**Lab:** add GitHub Actions for linting, tests, container build, and offline evaluation. Prevent merge when critical evaluations regress.

### Week 12: Responsible AI governance

**Learn:** intended use, limitations, risk registers, impact assessments, approval workflows, audit evidence, incident response, and the NIST AI RMF lifecycle: Govern, Map, Measure, Manage.

**Lab:** create a system card, risk register, release checklist, human-approval policy, and incident drill.

**Deliverable:** Project 4 — Governed AI service capstone.

## Weekly rhythm

- **Learn:** take brief notes in the relevant experiment directory.
- **Build:** implement the smallest testable version.
- **Measure:** compare against a baseline.
- **Explain:** write what changed, what failed, and why.
- **Ship:** open a small PR with reproducible evidence.
- **Reflect:** answer the weekly questions in the homework guide.

## Optional extension weeks

- Multimodal systems and vision-language evaluation
- Fine-tuning and parameter-efficient adaptation
- Distributed inference and GPU performance
- Synthetic data quality and contamination
- Causal inference and experiment statistics
- Open-source model deployment and quantization
