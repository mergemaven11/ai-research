import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';

const modules = [
  { id: 'foundations', title: 'Foundations', range: 'Weeks 1–3', color: '#ffcece', description: 'Experiments, machine learning, transformers, and prompting.' },
  { id: 'systems', title: 'AI Application Systems', range: 'Weeks 4–6', color: '#ffc1c8', description: 'Embeddings, retrieval, RAG, agents, and tool use.' },
  { id: 'quality', title: 'Quality, Reliability & Safety', range: 'Weeks 7–9', color: '#ffe3b0', description: 'Evaluation, observability, red teaming, and release gates.' },
  { id: 'production', title: 'Production & Governance', range: 'Weeks 10–12', color: '#8ed6ff', description: 'Serving, CI/CD, model operations, and responsible AI governance.' }
];

const weeks = [
  {
    week: 1, module: 0, title: 'Reproducible AI Experiments', duration: '6–7 hrs',
    summary: 'Learn how to ask a testable question, control variables, and reproduce an AI experiment from a clean environment.',
    outcomes: ['Turn an idea into a hypothesis', 'Separate train/validation/test data', 'Control seeds and environments', 'Record runs so someone else can repeat them'],
    lessons: [
      { title: 'From question to hypothesis', plain: 'A good experiment changes one thing on purpose and measures what happens.', deep: 'Define the independent variable, dependent metric, baseline, dataset, constraints, and expected direction of change before you run anything.', points: ['Question → hypothesis → test', 'Use a baseline', 'Change one variable at a time'] },
      { title: 'Reproducibility and leakage', plain: 'If you cannot run it twice and get the same story, you do not really know what happened.', deep: 'Fix random seeds, capture package versions, freeze data splits, and prevent train/test leakage. Reproducibility is evidence, not perfection.', points: ['Seed randomness', 'Freeze environments', 'Protect the test set'] },
      { title: 'Experiment evidence', plain: 'A result without the exact command, config, and metrics is just a memory.', deep: 'Store config, run command, software versions, metrics, artifact paths, and a short interpretation next to the code.', points: ['Save config', 'Save exact command', 'Explain the result'] }
    ],
    diagram: `flowchart LR
      Q[Research question] --> H[Hypothesis]
      H --> B[Baseline]
      B --> R[Run experiment]
      R --> M[Measure]
      M --> D{Repeatable?}
      D -- No --> F[Fix seed / env / split]
      F --> R
      D -- Yes --> E[Record evidence]`,
    visual: 'experiment',
    visualCaption: '3D experiment lanes: baseline and treatment stay separate so you can compare one controlled change.',
    quiz: { q: 'Which change best improves reproducibility?', options: ['Changing several parameters together', 'Saving the exact environment, seed, config, and command', 'Looking only at the best run', 'Using the test set during tuning'], correct: 1, explain: 'Reproducibility depends on capturing the conditions needed to repeat the run.' },
    lab: ['Create `experiments/week-01/`', 'Write one hypothesis and one baseline', 'Run the same tiny benchmark twice', 'Save config, exact command, and metrics', 'Explain why the two runs match or differ'],
    homework: ['Write a 5-sentence experiment report', 'Name one leakage risk in your setup', 'Explain what you would change in a second experiment']
  },
  {
    week: 2, module: 0, title: 'Machine Learning Foundations', duration: '7–8 hrs',
    summary: 'Build a mental model for supervised learning, loss, overfitting, class imbalance, and the metrics that reflect real failure cost.',
    outcomes: ['Explain features, labels, and loss', 'Recognize overfitting', 'Read a confusion matrix', 'Choose precision, recall, or F1 for a real scenario'],
    lessons: [
      { title: 'What a model learns', plain: 'A supervised model learns a mapping from examples to labels by reducing error.', deep: 'Features are the representation, labels are the target, the loss turns mistakes into a number, and optimization changes parameters to reduce that loss.', points: ['Features represent input', 'Labels define target', 'Loss guides learning'] },
      { title: 'Generalization vs memorization', plain: 'Training performance is not the goal; performance on unseen data is.', deep: 'Overfitting appears when training error keeps improving while validation performance stalls or degrades. Regularization and simpler models can help.', points: ['Watch validation', 'Prefer simpler baselines', 'Do not tune on test data'] },
      { title: 'Metrics match consequences', plain: 'The best metric is the one that matches what a mistake costs.', deep: 'Precision punishes false positives, recall punishes false negatives, and F1 balances both. Accuracy can hide failure on imbalanced data.', points: ['Precision: trust positives', 'Recall: catch positives', 'F1: balance both'] }
    ],
    diagram: `flowchart LR
      X[Text examples] --> F[Features]
      F --> M[Classifier]
      Y[Labels] --> L[Loss]
      M --> P[Predictions]
      P --> L
      L --> O[Optimization]
      O --> M`,
    visual: 'classifier',
    visualCaption: '3D points show two classes and a simple decision boundary. The goal is generalization, not perfect memorization.',
    quiz: { q: 'If missing a true positive is very costly, which metric deserves special attention?', options: ['Recall', 'Precision', 'Training accuracy', 'Model size'], correct: 0, explain: 'Recall measures how many actual positives you successfully catch.' },
    lab: ['Train a majority baseline', 'Train bag-of-words and TF-IDF classifiers', 'Compare precision, recall, F1, and confusion matrices', 'Choose the metric that best matches failure cost'],
    homework: ['Explain one false-positive cost', 'Explain one false-negative cost', 'Write which model you would ship and why']
  },
  {
    week: 3, module: 0, title: 'Transformers & Prompting', duration: '7–8 hrs',
    summary: 'Understand tokens, embeddings, attention, context windows, inference parameters, structured outputs, and system boundaries.',
    outcomes: ['Explain tokenization and embeddings', 'Describe attention at a useful conceptual level', 'Compare prompt strategies fairly', 'Distinguish model behavior from system behavior'],
    lessons: [
      { title: 'Tokens and embeddings', plain: 'Models do not read words directly. They process token IDs and learned vector representations.', deep: 'Tokenization maps text into discrete units. Embedding layers map those IDs into vectors that carry learned information about usage and relationships.', points: ['Text → tokens', 'Tokens → vectors', 'Vectors feed the model'] },
      { title: 'Attention and context', plain: 'Attention lets each token weigh which other tokens matter for the current computation.', deep: 'Transformers build contextual representations by repeatedly mixing information through attention and feed-forward layers. Context windows bound how much input can be processed at once.', points: ['Attention is weighted relevance', 'Context changes meaning', 'Context length is finite'] },
      { title: 'Prompting as experiment design', plain: 'Prompting is easier to improve when you evaluate it like an experiment instead of guessing.', deep: 'Hold the task set constant, compare prompt versions, track structured outputs, latency, cost, and failure types, and separate prompt quality from downstream system issues.', points: ['Fixed test set', 'Structured outputs', 'Measure failure types'] }
    ],
    diagram: `flowchart LR
      T[Text] --> K[Tokens]
      K --> E[Embeddings]
      E --> A[Attention layers]
      A --> C[Contextual representation]
      C --> O[Next-token probabilities]
      O --> G[Generated output]`,
    visual: 'tokens',
    visualCaption: 'Tokens become vectors, then interact through attention-like links before contributing to the next output.',
    quiz: { q: 'What is the fairest way to compare two prompt strategies?', options: ['Use different examples for each prompt', 'Use the same fixed task set and measure the same metrics', 'Pick the one that sounds more detailed', 'Only compare one successful case'], correct: 1, explain: 'A controlled task set makes the prompt strategy the main variable.' },
    lab: ['Create a 20-example fixed task set', 'Compare zero-shot, few-shot, and structured prompt strategies', 'Record accuracy, latency, and failure type', 'Write a recommendation'],
    homework: ['Explain tokens in plain English', 'Explain one model boundary and one system boundary', 'Describe the most common failure pattern you saw']
  },
  {
    week: 4, module: 1, title: 'Embeddings & Semantic Search', duration: '7–8 hrs',
    summary: 'Turn documents into vectors and learn how chunking, similarity, metadata, and top-k retrieval shape search quality.',
    outcomes: ['Explain vector similarity', 'Choose a chunking strategy', 'Measure retrieval recall', 'Recognize embedding drift and metadata value'],
    lessons: [
      { title: 'Meaning as vectors', plain: 'Embeddings place similar pieces of content near each other in a vector space.', deep: 'A model converts text chunks into dense vectors. Similarity functions such as cosine similarity compare direction rather than exact wording.', points: ['Semantic ≠ keyword only', 'Cosine compares direction', 'Vector quality depends on model'] },
      { title: 'Chunking and metadata', plain: 'Retrieval quality often depends more on how you cut documents than on fancy generation.', deep: 'Chunks should preserve enough context to answer a question without becoming so large that unrelated content dilutes similarity. Metadata lets you filter by source, date, type, or owner.', points: ['Keep useful context', 'Avoid giant chunks', 'Filter with metadata'] },
      { title: 'Top-k and recall', plain: 'Top-k controls how many candidates retrieval hands to the next stage.', deep: 'A small k can miss evidence; a huge k can increase noise and cost. Measure whether the expected source appears in the retrieved set.', points: ['Measure retrieval first', 'Tune k', 'Track expected source'] }
    ],
    diagram: `flowchart LR
      D[Documents] --> C[Chunk]
      C --> E[Embed]
      E --> V[(Vector index)]
      Q[Question] --> QE[Embed query]
      QE --> S[Similarity search]
      V --> S
      S --> K[Top-k chunks]`,
    visual: 'vectors',
    visualCaption: 'Semantic search becomes visible as the query vector moves toward nearby document vectors.',
    quiz: { q: 'What should you measure before blaming the language model for a bad RAG answer?', options: ['Retrieval quality', 'Button color', 'GPU temperature', 'Markdown formatting'], correct: 0, explain: 'If the right evidence was never retrieved, generation cannot reliably use it.' },
    lab: ['Index a small set of public technical docs', 'Try two chunk sizes', 'Try at least two values of top-k', 'Measure expected-source recall'],
    homework: ['Explain why chunk size matters', 'Name one useful metadata field', 'Choose your best retrieval configuration and justify it']
  },
  {
    week: 5, module: 1, title: 'Retrieval-Augmented Generation', duration: '8 hrs',
    summary: 'Build a grounded RAG pipeline with citations, abstention, retrieval tests, and unsupported-answer checks.',
    outcomes: ['Describe the full RAG pipeline', 'Separate retrieval from generation evaluation', 'Require citations', 'Design abstention behavior'],
    lessons: [
      { title: 'RAG pipeline anatomy', plain: 'RAG looks up evidence first, then asks the model to answer from that evidence.', deep: 'Ingestion, parsing, chunking, embedding, indexing, retrieval, optional reranking, prompting, generation, citation formatting, and evaluation are separate stages.', points: ['Retrieve before generate', 'Evaluate each stage', 'Keep source identity'] },
      { title: 'Groundedness and citations', plain: 'An answer is only grounded when its claims are supported by retrieved evidence.', deep: 'Citations should point to the exact source or chunk. Unsupported claims should be detectable, and the system should be able to abstain when evidence is weak or missing.', points: ['Support claims', 'Cite sources', 'Abstain when needed'] },
      { title: 'Freshness and reranking', plain: 'The first search results are not always the best evidence.', deep: 'Rerankers can improve ordering, while freshness metadata helps prevent stale knowledge from outranking newer evidence.', points: ['Rerank candidates', 'Track freshness', 'Test missing evidence'] }
    ],
    diagram: `flowchart LR
      Q[Question] --> R[Retriever]
      D[(Indexed docs)] --> R
      R --> K[Candidate chunks]
      K --> RR[Reranker]
      RR --> P[Prompt with evidence]
      Q --> P
      P --> M[Model]
      M --> A[Answer + citations]
      A --> G{Grounded?}
      G -- No --> X[Abstain / retry]
      G -- Yes --> O[Return answer]`,
    visual: 'rag',
    visualCaption: 'Question, evidence chunks, and answer are separate objects. The answer only becomes valid after evidence reaches the model.',
    quiz: { q: 'What should the system do when the answer is not supported by retrieved evidence?', options: ['Invent a plausible answer', 'Hide the citation', 'Abstain or say evidence is insufficient', 'Increase temperature'], correct: 2, explain: 'Grounded systems should refuse unsupported claims instead of guessing.' },
    lab: ['Create 20 test questions with expected sources', 'Build retrieval + generation + citations', 'Add unsupported-answer checks', 'Add an abstention path'],
    homework: ['List three RAG failure modes', 'Explain retrieval failure vs generation failure', 'Write a policy for when the system should abstain']
  },
  {
    week: 6, module: 1, title: 'Agents & Tool Use', duration: '8 hrs',
    summary: 'Learn when to use workflows vs agents, how tool schemas work, and where approvals, retries, budgets, and state boundaries belong.',
    outcomes: ['Choose workflow vs agent', 'Design a safe tool schema', 'Use idempotent operations', 'Place human approval before risky actions'],
    lessons: [
      { title: 'Workflow or agent?', plain: 'Use a fixed workflow when the steps are known; use an agent when the system must choose among actions.', deep: 'Agent autonomy adds flexibility but also uncertainty. Prefer deterministic orchestration where possible, and constrain agent choices with schemas, budgets, and policy.', points: ['Deterministic when possible', 'Constrain autonomy', 'Measure tool choices'] },
      { title: 'Tools and state', plain: 'A tool is a capability with a strict input and output contract.', deep: 'Schema validation, retry behavior, idempotency, timeouts, state boundaries, and logging make tool calls reliable. Memory should be scoped to what the task actually needs.', points: ['Validate schema', 'Make retries safe', 'Bound memory'] },
      { title: 'Approval and budgets', plain: 'High-impact actions should stop at an approval gate before execution.', deep: 'Read-only operations can often be automatic. Writes, money movement, deletion, external messaging, or irreversible actions should be policy-gated and budget-limited.', points: ['Read vs write', 'Human approval', 'Budget limits'] }
    ],
    diagram: `flowchart LR
      U[User task] --> R[Router]
      R --> P[Planner]
      P --> T1[Read tool]
      P --> T2[Search tool]
      P --> W{Write action?}
      W -- Yes --> H[Human approval]
      H --> T3[Write tool]
      W -- No --> S[Summarize]
      T1 --> S
      T2 --> S
      T3 --> S`,
    visual: 'agent',
    visualCaption: 'The 3D tool graph highlights a guarded write path instead of treating every action as equally safe.',
    quiz: { q: 'Which action most clearly deserves a human approval gate?', options: ['Reading a public document', 'Calculating cosine similarity', 'Deleting a customer record', 'Formatting JSON'], correct: 2, explain: 'Deletion is high-impact and often irreversible, so it should be explicitly approved.' },
    lab: ['Add two read-only tools to a research assistant', 'Validate tool inputs with schemas', 'Add timeout + retry behavior', 'Require approval before a simulated write action'],
    homework: ['Explain workflow vs agent', 'Name one idempotency risk', 'Write a simple approval policy for your agent']
  },
  {
    week: 7, module: 2, title: 'Evaluation Engineering', duration: '7–8 hrs',
    summary: 'Turn expected behavior into measurable tests using golden datasets, rubrics, regression gates, and cost/latency checks.',
    outcomes: ['Build a small golden dataset', 'Use deterministic and model-graded checks', 'Design a rubric', 'Choose which regressions block release'],
    lessons: [
      { title: 'What counts as an eval?', plain: 'An evaluation is a repeatable test of behavior you care about.', deep: 'Strong suites mix deterministic assertions, dataset-based checks, rubric scoring, pairwise comparison, safety tests, and operational metrics.', points: ['Repeatable tests', 'Realistic cases', 'Multiple dimensions'] },
      { title: 'Rubrics and model judges', plain: 'Model graders are useful only when the rubric is specific enough to reduce ambiguity.', deep: 'Define dimensions, anchors, pass thresholds, disagreement handling, and periodic human calibration. Never treat a model judge as unquestionable truth.', points: ['Specific rubric', 'Human calibration', 'Track disagreement'] },
      { title: 'Release gates', plain: 'Some failures should block a release; others should create warnings.', deep: 'Critical safety, citation, refusal, and correctness regressions may block. Small latency or style shifts may warn depending on risk tolerance.', points: ['Block critical regressions', 'Warn on soft regressions', 'Compare to baseline'] }
    ],
    diagram: `flowchart LR
      C[Test cases] --> R[Run system]
      R --> D[Deterministic checks]
      R --> J[Rubric / judge]
      R --> O[Cost + latency]
      D --> G{Release gate}
      J --> G
      O --> G
      G -- Pass --> S[Ship]
      G -- Fail --> F[Fix]`,
    visual: 'eval',
    visualCaption: 'Each evaluation lane feeds a single release gate. A pretty demo cannot bypass failed checks.',
    quiz: { q: 'Which test is most appropriate for a hard release gate?', options: ['A critical citation regression', 'A slight wording preference', 'A new icon', 'A minor color change'], correct: 0, explain: 'Critical correctness and grounding regressions are appropriate reasons to block release.' },
    lab: ['Create a 25-case golden dataset', 'Add deterministic checks', 'Add one rubric-based check', 'Track cost and latency', 'Define block vs warn thresholds'],
    homework: ['Write your release-gate policy', 'Explain one weakness of model-graded evaluation', 'Choose two metrics that should trend over time']
  },
  {
    week: 8, module: 2, title: 'Observability & Reliability', duration: '7–8 hrs',
    summary: 'Instrument AI systems with logs, traces, version metadata, latency percentiles, retries, timeouts, and failure dashboards.',
    outcomes: ['Explain logs vs traces', 'Track model/prompt/version metadata', 'Use p50/p95 latency', 'Design fallback and retry behavior'],
    lessons: [
      { title: 'Logs, traces, metadata', plain: 'Logs tell you what happened; traces show how one request moved through the system.', deep: 'Capture request IDs, prompt version, model version, retrieval metadata, tool calls, errors, and timing without logging secrets or sensitive content unnecessarily.', points: ['Use request IDs', 'Track versions', 'Avoid sensitive logging'] },
      { title: 'Latency and reliability', plain: 'Average latency hides slow requests, so percentiles matter.', deep: 'p50 shows a typical request while p95 and p99 reveal tail behavior. Timeouts, retries, fallbacks, queues, and circuit breakers keep failures bounded.', points: ['Track p95', 'Set timeouts', 'Design fallbacks'] },
      { title: 'From incident to diagnosis', plain: 'Observability is useful when it helps you explain a failure quickly.', deep: 'A good trace connects user input, retrieval, model call, tool call, and output so you can identify which stage actually failed.', points: ['Trace stages', 'Classify failures', 'Measure SLOs'] }
    ],
    diagram: `flowchart LR
      U[Request] --> A[API]
      A --> R[Retrieval span]
      R --> M[Model span]
      M --> T[Tool span]
      T --> O[Response]
      A -. logs .-> L[(Logs)]
      R -. trace .-> X[(Trace)]
      M -. trace .-> X
      T -. trace .-> X`,
    visual: 'trace',
    visualCaption: 'The 3D request path lights up stage by stage so failure location is visible instead of buried in one log line.',
    quiz: { q: 'Why is p95 latency useful?', options: ['It shows only the fastest request', 'It reveals slow-tail behavior that averages can hide', 'It replaces all tracing', 'It measures accuracy'], correct: 1, explain: 'p95 helps you see how slow the experience is for the slower portion of users.' },
    lab: ['Add structured logs and request IDs', 'Record prompt/model versions', 'Measure p50 and p95 latency', 'Create a repeatable load test', 'Summarize top failure causes'],
    homework: ['Explain logs vs traces', 'Define one SLO for your system', 'Describe one safe retry and one unsafe retry']
  },
  {
    week: 9, module: 2, title: 'AI Security & Red Teaming', duration: '8 hrs',
    summary: 'Study prompt injection, indirect injection, data exfiltration, insecure tool use, sensitive-data exposure, and safe red-team methodology.',
    outcomes: ['Recognize prompt injection', 'Separate untrusted content from instructions', 'Design a safe red-team dataset', 'Measure whether a defense actually helps'],
    lessons: [
      { title: 'Prompt injection', plain: 'Untrusted text can contain instructions that try to override the real task.', deep: 'Direct and indirect injection exploit systems that blur the line between data and authority. Treat retrieved/web/user content as untrusted data, not policy.', points: ['Data is not authority', 'Separate instructions', 'Constrain tools'] },
      { title: 'Tool and data risk', plain: 'A model with tools can turn a bad instruction into a real-world action.', deep: 'Least privilege, allowlists, read/write separation, secret isolation, output validation, and approval gates reduce the blast radius.', points: ['Least privilege', 'Protect secrets', 'Validate tool output'] },
      { title: 'Safe red teaming', plain: 'Red teaming is controlled testing designed to expose weaknesses before deployment.', deep: 'Use synthetic secrets and safe test environments. Record attack category, expected behavior, observed behavior, severity, and whether defenses improve the measured result.', points: ['Use synthetic data', 'Record severity', 'Retest defenses'] }
    ],
    diagram: `flowchart LR
      U[Untrusted input] --> F[Input boundary]
      F --> M[Model]
      R[Retrieved content] --> F
      M --> P{Policy check}
      P -- Safe --> T[Allowed tool]
      P -- Risky --> B[Block / approval]
      T --> V[Validate output]`,
    visual: 'security',
    visualCaption: 'Unsafe content stops at boundaries and policy gates before it can reach privileged tools.',
    quiz: { q: 'How should retrieved web content be treated?', options: ['As trusted system instructions', 'As untrusted data that may contain malicious instructions', 'As a secret', 'As automatically safe'], correct: 1, explain: 'Retrieved content can contain indirect prompt injection, so it must remain untrusted.' },
    lab: ['Create a safe red-team dataset', 'Test direct and indirect injection cases', 'Add one boundary or policy defense', 'Run the same cases again and compare'],
    homework: ['Explain indirect prompt injection', 'Name one least-privilege control', 'Write one safe red-team rule']
  },
  {
    week: 10, module: 3, title: 'Serving & Deployment', duration: '7–8 hrs',
    summary: 'Expose an AI system through a FastAPI service, validate requests, containerize it, and add operational controls.',
    outcomes: ['Define an API contract', 'Validate inputs and errors', 'Explain caching, queues, and rate limits', 'Containerize the service'],
    lessons: [
      { title: 'API contracts', plain: 'An API contract defines what callers may send and what they can expect back.', deep: 'Use explicit request/response schemas, validation, status codes, idempotency where appropriate, and structured error responses.', points: ['Schema inputs', 'Schema outputs', 'Handle errors'] },
      { title: 'Async work and protection', plain: 'Slow or expensive work needs limits so one request cannot overwhelm the service.', deep: 'Use timeouts, queues, rate limits, caching, concurrency controls, and health checks according to workload characteristics.', points: ['Rate limits', 'Timeouts', 'Health checks'] },
      { title: 'Containers and configuration', plain: 'A container packages your service so it runs predictably in different environments.', deep: 'Keep secrets out of images, inject configuration through environment variables, pin dependencies, and use a minimal runtime image.', points: ['Pin dependencies', 'Externalize config', 'Never bake secrets'] }
    ],
    diagram: `flowchart LR
      C[Client] --> A[FastAPI]
      A --> V[Validate]
      V --> Q{Fast work?}
      Q -- Yes --> S[AI service]
      Q -- No --> J[Queue / worker]
      J --> S
      S --> R[Response]
      A --> H[Health + metrics]`,
    visual: 'deploy',
    visualCaption: 'Requests move through validation, service logic, and operational controls before a response leaves the system.',
    quiz: { q: 'Where should production secrets live?', options: ['Hard-coded in app.js', 'Inside the Docker image', 'In environment/secret management outside the image', 'In a public README'], correct: 2, explain: 'Secrets should be injected securely at runtime, not baked into source or images.' },
    lab: ['Expose the assistant with FastAPI', 'Add input/output schemas', 'Add health endpoint and timeout handling', 'Containerize it', 'Add unit and integration tests'],
    homework: ['Describe your API contract', 'Explain one place caching helps', 'Explain why secrets should not be baked into images']
  },
  {
    week: 11, module: 3, title: 'CI/CD & Model Operations', duration: '8 hrs',
    summary: 'Automate linting, tests, AI evaluations, container builds, provenance, and rollback so releases are controlled.',
    outcomes: ['Design a CI pipeline', 'Add evaluation gates', 'Explain artifact provenance and SBOMs', 'Plan rollback and canary release'],
    lessons: [
      { title: 'CI for AI systems', plain: 'Every change should automatically prove it still meets engineering and AI quality requirements.', deep: 'Run linting, unit/integration tests, offline evals, security scans, and container builds. Fail the pipeline when critical requirements regress.', points: ['Automate checks', 'Gate regressions', 'Keep artifacts'] },
      { title: 'Version everything that changes behavior', plain: 'Code is not the only thing that can change an AI system.', deep: 'Track prompt, model, data, retrieval index, configuration, and evaluation-set versions so a deployed result can be traced back to its inputs.', points: ['Version prompts', 'Version data/indexes', 'Record model version'] },
      { title: 'Rollback and canaries', plain: 'A safe release has a way back.', deep: 'Canary deployments expose a small share of traffic first. Rollback criteria should be defined before launch and tied to monitored metrics.', points: ['Canary first', 'Predefine rollback', 'Monitor release'] }
    ],
    diagram: `flowchart LR
      C[Commit] --> L[Lint + tests]
      L --> E[Offline AI evals]
      E --> S[Security / SBOM]
      S --> B[Build image]
      B --> K[Canary]
      K --> M{Metrics healthy?}
      M -- Yes --> P[Promote]
      M -- No --> R[Rollback]`,
    visual: 'pipeline',
    visualCaption: 'A deployment moves through visible gates; failing evaluation or release health sends it backward instead of forward.',
    quiz: { q: 'Why version prompts and retrieval indexes in addition to code?', options: ['They cannot affect behavior', 'They can materially change system output even when code is unchanged', 'Only for visual styling', 'To avoid testing'], correct: 1, explain: 'AI behavior depends on more than source code, so those artifacts need traceability too.' },
    lab: ['Create GitHub Actions for lint + tests', 'Add an offline eval job', 'Build the container', 'Make one critical eval fail the pipeline', 'Document rollback criteria'],
    homework: ['List every artifact you need to version', 'Explain a canary release', 'Write your rollback trigger']
  },
  {
    week: 12, module: 3, title: 'Responsible AI Governance', duration: '8 hrs',
    summary: 'Tie the whole course together with intended use, limitations, risk registers, approval workflows, audit evidence, and incident response.',
    outcomes: ['Create a system card', 'Build a risk register', 'Map controls to the NIST AI RMF lifecycle', 'Run a mock incident and approval review'],
    lessons: [
      { title: 'Intended use and limitations', plain: 'Governance starts by clearly stating what the system is for and what it should not be trusted to do.', deep: 'Document users, context, expected benefits, known limitations, prohibited uses, human oversight, and the evidence supporting release decisions.', points: ['Intended use', 'Known limits', 'Human oversight'] },
      { title: 'Risk registers and approval', plain: 'A risk register turns vague concerns into owned, trackable decisions.', deep: 'Record risk, likelihood, impact, affected users, mitigations, residual risk, owner, evidence, review date, and approval status.', points: ['Name the risk', 'Assign an owner', 'Track mitigation evidence'] },
      { title: 'Govern → Map → Measure → Manage', plain: 'Governance is a loop: set rules, understand context, measure behavior, and manage the remaining risk.', deep: 'NIST AI RMF organizes work into Govern, Map, Measure, and Manage. The practical goal is repeatable evidence and accountable decisions across the system lifecycle.', points: ['Govern', 'Map + Measure', 'Manage + improve'] }
    ],
    diagram: `flowchart LR
      G[Govern] --> M1[Map]
      M1 --> M2[Measure]
      M2 --> M3[Manage]
      M3 --> G
      M2 --> R[Risk evidence]
      R --> A{Approval}
      A -- Approve --> S[Release]
      A -- Reject --> M3`,
    visual: 'governance',
    visualCaption: 'Governance appears as a control loop around the system, not as paperwork bolted on after deployment.',
    quiz: { q: 'What makes a risk register useful?', options: ['Only listing scary possibilities', 'Assigning risks, mitigations, owners, evidence, and review status', 'Keeping it private from the team', 'Avoiding residual-risk decisions'], correct: 1, explain: 'A useful register makes risk explicit, owned, measurable, and reviewable.' },
    lab: ['Create a system card', 'Create a risk register', 'Create a release checklist and approval policy', 'Run a mock incident drill', 'Map your controls to Govern, Map, Measure, Manage'],
    homework: ['Write the top three residual risks', 'Explain who can approve release and why', 'Write a 1-page capstone reflection on what changed from Week 1 to Week 12']
  }
];

const state = {
  selectedWeek: Number(localStorage.getItem('ai-course:selectedWeek')) || 1,
  view: location.hash.startsWith('#week-') ? 'lesson' : 'dashboard'
};

const qs = (sel, root = document) => root.querySelector(sel);
const qsa = (sel, root = document) => [...root.querySelectorAll(sel)];
const progressKey = (week, type, index = '') => `ai-course:w${week}:${type}${index}`;

function isLessonDone(week, index) {
  return localStorage.getItem(progressKey(week, 'lesson', index)) === 'done';
}
function quizPassed(week) {
  return localStorage.getItem(progressKey(week, 'quiz')) === 'passed';
}
function labDone(week, index) {
  return localStorage.getItem(progressKey(week, 'lab', index)) === 'done';
}
function homeworkDone(week, index) {
  return localStorage.getItem(progressKey(week, 'homework', index)) === 'done';
}
function weekProgress(w) {
  const lessonDone = w.lessons.filter((_, i) => isLessonDone(w.week, i)).length;
  const labCount = w.lab.filter((_, i) => labDone(w.week, i)).length;
  const hwCount = w.homework.filter((_, i) => homeworkDone(w.week, i)).length;
  const total = w.lessons.length + 1 + w.lab.length + w.homework.length;
  const done = lessonDone + (quizPassed(w.week) ? 1 : 0) + labCount + hwCount;
  return Math.round((done / total) * 100);
}
function courseProgress() {
  const points = weeks.reduce((sum, w) => sum + weekProgress(w), 0);
  return Math.round(points / weeks.length);
}
function moduleFor(w) { return modules[w.module]; }
function accentFor(w) { return moduleFor(w).color; }

mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  securityLevel: 'strict',
  themeVariables: {
    fontFamily: 'Inter, system-ui, sans-serif',
    primaryTextColor: '#172033',
    lineColor: '#465267',
    primaryColor: '#f7f9fc',
    primaryBorderColor: '#9aa8bb',
    clusterBkg: '#ffffff',
    clusterBorder: '#b7c3d3'
  }
});

function renderNavigation() {
  const nav = qs('#week-navigation');
  nav.innerHTML = modules.map((mod, moduleIndex) => {
    const moduleWeeks = weeks.filter(w => w.module === moduleIndex);
    return `
      <section class="module-nav">
        <div class="module-nav-title"><span class="module-dot" style="background:${mod.color}"></span>${mod.title}</div>
        ${moduleWeeks.map(w => `
          <button class="week-link ${state.view === 'lesson' && state.selectedWeek === w.week ? 'active' : ''}" type="button" data-week="${w.week}">
            <span class="week-number">${w.week}</span>
            <span><strong>${w.title}</strong><small>${w.duration}</small></span>
            <span class="week-status ${weekProgress(w) === 100 ? 'complete' : ''}"></span>
          </button>`).join('')}
      </section>`;
  }).join('');
  qsa('.week-link', nav).forEach(btn => btn.addEventListener('click', () => openWeek(Number(btn.dataset.week))));
}

function renderDashboard() {
  state.view = 'dashboard';
  location.hash = 'dashboard';
  qs('#dashboard-view').hidden = false;
  qs('#lesson-view').hidden = true;
  qsa('.dashboard-link').forEach(el => el.classList.add('active'));
  renderNavigation();

  const completedWeeks = weeks.filter(w => weekProgress(w) === 100).length;
  const nextWeek = weeks.find(w => weekProgress(w) < 100) || weeks[weeks.length - 1];

  qs('#dashboard-view').innerHTML = `
    <section class="dashboard-hero">
      <p class="eyebrow">AI Systems Engineering • 12 weeks</p>
      <h1>Learn the concept. See it. Prove you understand it. Then build.</h1>
      <p>This is a full learning path—not a syllabus dump. Every week moves from explanation → visual model → knowledge check → lab → homework, with progress saved in your browser.</p>
      <div class="hero-actions">
        <button class="primary-button" type="button" id="continue-course">Continue Week ${nextWeek.week} →</button>
        <a class="secondary-button" href="docs/lesson-plan.md">Read full syllabus</a>
      </div>
    </section>

    <section class="stats-grid" aria-label="Course overview">
      <article class="stat-card"><strong>12</strong><span>structured weeks</span></article>
      <article class="stat-card"><strong>36</strong><span>core lessons</span></article>
      <article class="stat-card"><strong>${completedWeeks}/12</strong><span>weeks completed</span></article>
      <article class="stat-card"><strong>${courseProgress()}%</strong><span>overall progress</span></article>
    </section>

    <div class="section-heading">
      <div><h2>Four learning modules</h2><p>Each module builds on the one before it.</p></div>
    </div>
    <section class="module-grid">
      ${modules.map((mod, i) => {
        const list = weeks.filter(w => w.module === i);
        const avg = Math.round(list.reduce((s,w)=>s+weekProgress(w),0)/list.length);
        return `<article class="module-card">
          <div class="module-card-head">
            <div>
              <div class="module-label"><span class="module-dot" style="background:${mod.color}"></span>${mod.range}</div>
              <h3>${mod.title}</h3>
            </div>
            <strong>${avg}%</strong>
          </div>
          <p>${mod.description}</p>
          <div class="module-weeks">
            ${list.map(w => `<button class="mini-week" type="button" data-week="${w.week}"><strong>Week ${w.week}</strong>${w.title}</button>`).join('')}
          </div>
        </article>`;
      }).join('')}
    </section>

    <div class="section-heading">
      <div><h2>Full 12-week curriculum</h2><p>Open any week, or follow the sequence from Week 1.</p></div>
    </div>
    <section class="curriculum-table">
      ${weeks.map(w => `<article class="week-row" data-week="${w.week}">
        <div class="week-row-num" style="background:${accentFor(w)}">${w.week}</div>
        <div><h3>${w.title}</h3><p>${w.summary}</p></div>
        <div class="week-row-meta"><span>${w.duration}</span><strong>${weekProgress(w)}%</strong></div>
      </article>`).join('')}
    </section>
  `;

  qs('#continue-course').addEventListener('click', () => openWeek(nextWeek.week));
  qsa('[data-week]', qs('#dashboard-view')).forEach(el => el.addEventListener('click', () => openWeek(Number(el.dataset.week))));
  updateGlobalProgress();
}

function allLessonsDone(w) {
  return w.lessons.every((_, i) => isLessonDone(w.week, i));
}
function labUnlocked(w) {
  return allLessonsDone(w) && quizPassed(w.week);
}

async function openWeek(weekNum) {
  const w = weeks.find(x => x.week === weekNum);
  if (!w) return;
  state.view = 'lesson';
  state.selectedWeek = weekNum;
  localStorage.setItem('ai-course:selectedWeek', String(weekNum));
  history.replaceState(null, '', `#week-${weekNum}`);
  qs('#dashboard-view').hidden = true;
  qs('#lesson-view').hidden = false;
  qsa('.dashboard-link').forEach(el => el.classList.remove('active'));
  renderNavigation();

  const mod = moduleFor(w);
  const progress = weekProgress(w);
  const unlocked = labUnlocked(w);

  qs('#lesson-view').style.setProperty('--accent', mod.color);
  qs('#lesson-view').innerHTML = `
    <div class="lesson-topbar">
      <div class="breadcrumb">Course home / ${mod.title} / Week ${w.week}</div>
      <div class="lesson-progress">
        <div class="header-progress-copy"><span>Week ${w.week} progress</span><strong>${progress}%</strong></div>
        <div class="progress-track"><span style="width:${progress}%"></span></div>
      </div>
    </div>

    <section class="lesson-hero">
      <article class="lesson-title-card">
        <span class="week-chip">Week ${w.week} • ${w.duration}</span>
        <h1>${w.title}</h1>
        <p>${w.summary}</p>
      </article>
      <aside class="outcomes-card">
        <h3>By the end of this week, you can…</h3>
        <ul>${w.outcomes.map(x => `<li>${x}</li>`).join('')}</ul>
      </aside>
    </section>

    <ol class="learning-path" aria-label="Week learning sequence">
      <li class="${allLessonsDone(w) ? 'done' : 'current'}">Learn</li>
      <li class="${allLessonsDone(w) ? (quizPassed(w.week) ? 'done' : 'current') : ''}">Check</li>
      <li class="${unlocked ? (w.lab.every((_,i)=>labDone(w.week,i)) ? 'done' : 'current') : ''}">Lab</li>
      <li class="${unlocked && w.homework.every((_,i)=>homeworkDone(w.week,i)) ? 'done' : (unlocked && w.lab.every((_,i)=>labDone(w.week,i)) ? 'current' : '')}">Homework</li>
    </ol>

    <div class="lesson-layout">
      <div class="lesson-content">
        ${w.lessons.map((lesson, i) => lessonCard(w, lesson, i)).join('')}

        <section class="visual-card" id="visuals">
          <h2>Visual model</h2>
          <p class="visual-caption">Use the diagram for structure, then the 3D model for spatial intuition.</p>
          <div class="visual-grid">
            <div class="mermaid-shell">
              <pre class="mermaid">${w.diagram}</pre>
            </div>
            <div class="three-shell">
              <span class="three-label">Interactive 3D concept</span>
              <canvas id="concept-canvas" aria-label="${w.title} 3D concept visualization"></canvas>
            </div>
          </div>
          <p class="visual-caption">${w.visualCaption}</p>
        </section>

        ${quizCard(w)}

        ${unlocked ? labSection(w) : lockedSection('Lab locked', 'Complete all three lessons and pass the knowledge check first. The lab comes after the learning—not before it.')}

        ${unlocked ? homeworkSection(w) : lockedSection('Homework locked', 'Finish the learning and knowledge check first. Homework is for reinforcing a topic you have already learned.', 'homework-section')}
      </div>

      <aside class="lesson-rail">
        <section class="rail-card">
          <h3>This week’s sequence</h3>
          <div class="rail-nav">
            ${w.lessons.map((l,i)=>`<button type="button" data-scroll="lesson-${i}">${i+1}. ${l.title}</button>`).join('')}
            <button type="button" data-scroll="visuals">Visual model</button>
            <button type="button" data-scroll="knowledge-check">Knowledge check</button>
            <button type="button" data-scroll="lab-section">Lab</button>
            <button type="button" data-scroll="homework-section">Homework</button>
          </div>
        </section>
        <section class="rail-card">
          <h3>How to use this page</h3>
          <ul>
            <li>Read the plain-English explanation first.</li>
            <li>Then read the deeper technical layer.</li>
            <li>Mark each lesson complete only when you can explain it.</li>
            <li>Use the visual model before taking the check.</li>
            <li>Lab and homework unlock after learning.</li>
          </ul>
        </section>
        <section class="rail-card">
          <h3>Navigation</h3>
          <div class="rail-nav">
            ${w.week > 1 ? `<button type="button" data-open-week="${w.week-1}">← Week ${w.week-1}</button>` : ''}
            <button type="button" data-dashboard>Course home</button>
            ${w.week < 12 ? `<button type="button" data-open-week="${w.week+1}">Week ${w.week+1} →</button>` : ''}
          </div>
        </section>
      </aside>
    </div>
  `;

  try {
    await mermaid.run({ querySelector: '#lesson-view .mermaid' });
  } catch (error) {
    console.warn('Mermaid render failed', error);
  }

  initThreeVisual(w);
  bindLessonEvents(w);
  updateGlobalProgress();
  window.scrollTo({ top: 0, behavior: 'auto' });
}

function lessonCard(w, lesson, i) {
  const done = isLessonDone(w.week, i);
  return `<section class="content-card" id="lesson-${i}">
    <p class="eyebrow">Lesson ${i+1} of ${w.lessons.length}</p>
    <h2>${lesson.title}</h2>
    <div class="plain-english"><strong>Plain English:</strong> ${lesson.plain}</div>
    <h3>Go deeper</h3>
    <p>${lesson.deep}</p>
    <div class="key-points">${lesson.points.map(p => `<div class="key-point">${p}</div>`).join('')}</div>
    <div class="hero-actions">
      <button class="text-button lesson-complete" type="button" data-lesson="${i}">${done ? '✓ Lesson complete' : 'Mark lesson complete'}</button>
    </div>
  </section>`;
}

function quizCard(w) {
  const passed = quizPassed(w.week);
  return `<section class="quiz-card" id="knowledge-check">
    <p class="eyebrow">Knowledge check</p>
    <h2>Prove you understand the topic</h2>
    <p>${w.quiz.q}</p>
    <div class="quiz-options">
      ${w.quiz.options.map((o,i)=>`<label class="quiz-option"><input type="radio" name="quiz-${w.week}" value="${i}" ${passed && i === w.quiz.correct ? 'checked' : ''}> <span>${o}</span></label>`).join('')}
    </div>
    <button class="primary-button" type="button" id="check-answer">${passed ? 'Passed ✓' : 'Check answer'}</button>
    <div id="quiz-feedback" ${passed ? '' : 'hidden'} class="quiz-feedback ${passed ? 'good' : ''}">${passed ? `Correct. ${w.quiz.explain}` : ''}</div>
  </section>`;
}

function labSection(w) {
  return `<section class="lab-section" id="lab-section">
    <p class="eyebrow">Hands-on lab • unlocked</p>
    <h2>Now build it</h2>
    <p>You have learned the topic and passed the check. Use the lab to turn understanding into evidence.</p>
    <ul class="task-list">${w.lab.map((t,i)=>`<li><label><input type="checkbox" data-lab="${i}" ${labDone(w.week,i)?'checked':''}><span>${t}</span></label></li>`).join('')}</ul>
  </section>`;
}

function homeworkSection(w) {
  const labFinished = w.lab.every((_,i)=>labDone(w.week,i));
  if (!labFinished) return lockedSection('Homework comes after the lab', 'Finish the hands-on lab first. Then use homework to explain and reinforce what you just built.', 'homework-section');
  return `<section class="homework-section" id="homework-section">
    <p class="eyebrow">Homework • reflection</p>
    <h2>Explain what you learned</h2>
    <p>Homework is intentionally last. These prompts help you consolidate the concept after you have seen it and built it.</p>
    <ul class="task-list">${w.homework.map((t,i)=>`<li><label><input type="checkbox" data-homework="${i}" ${homeworkDone(w.week,i)?'checked':''}><span>${t}</span></label></li>`).join('')}</ul>
  </section>`;
}

function lockedSection(title, message, id = 'lab-section') {
  return `<section class="locked-card" id="${id}">
    <div class="lock-icon">🔒</div>
    <h2>${title}</h2>
    <p>${message}</p>
  </section>`;
}

function bindLessonEvents(w) {
  qsa('.lesson-complete').forEach(btn => btn.addEventListener('click', () => {
    const i = Number(btn.dataset.lesson);
    const key = progressKey(w.week, 'lesson', i);
    if (isLessonDone(w.week, i)) localStorage.removeItem(key); else localStorage.setItem(key, 'done');
    openWeek(w.week);
  }));

  qs('#check-answer')?.addEventListener('click', () => {
    const selected = qs(`input[name="quiz-${w.week}"]:checked`);
    const feedback = qs('#quiz-feedback');
    if (!selected) {
      feedback.hidden = false;
      feedback.className = 'quiz-feedback bad';
      feedback.textContent = 'Choose an answer first.';
      return;
    }
    if (!allLessonsDone(w)) {
      feedback.hidden = false;
      feedback.className = 'quiz-feedback bad';
      feedback.textContent = 'Finish all three lesson sections first. The check comes after learning.';
      return;
    }
    if (Number(selected.value) === w.quiz.correct) {
      localStorage.setItem(progressKey(w.week, 'quiz'), 'passed');
      showToast('Knowledge check passed. Lab unlocked.');
      openWeek(w.week);
    } else {
      feedback.hidden = false;
      feedback.className = 'quiz-feedback bad';
      feedback.textContent = 'Not quite. Review the lesson and visual model, then try again.';
    }
  });

  qsa('[data-lab]').forEach(box => box.addEventListener('change', () => {
    const key = progressKey(w.week, 'lab', box.dataset.lab);
    if (box.checked) localStorage.setItem(key,'done'); else localStorage.removeItem(key);
    openWeek(w.week);
  }));
  qsa('[data-homework]').forEach(box => box.addEventListener('change', () => {
    const key = progressKey(w.week, 'homework', box.dataset.homework);
    if (box.checked) localStorage.setItem(key,'done'); else localStorage.removeItem(key);
    openWeek(w.week);
  }));
  qsa('[data-scroll]').forEach(btn => btn.addEventListener('click', () => {
    document.getElementById(btn.dataset.scroll)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }));
  qsa('[data-open-week]').forEach(btn => btn.addEventListener('click', () => openWeek(Number(btn.dataset.openWeek))));
  qsa('[data-dashboard]').forEach(btn => btn.addEventListener('click', renderDashboard));
}

function updateGlobalProgress() {
  const value = courseProgress();
  qs('#header-progress-label').textContent = `${value}%`;
  qs('#header-progress-bar').style.width = `${value}%`;
}

function showToast(message) {
  const toast = qs('#toast');
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => { toast.hidden = true; }, 2200);
}

let threeCleanup = null;
function initThreeVisual(w) {
  if (threeCleanup) threeCleanup();
  const canvas = qs('#concept-canvas');
  if (!canvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 100);
  camera.position.set(0, 2.8, 8.5);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  scene.add(new THREE.HemisphereLight(0xcfe9ff, 0x101725, 2.3));
  const light = new THREE.DirectionalLight(0xffffff, 2.1);
  light.position.set(4, 6, 5);
  scene.add(light);

  const group = new THREE.Group();
  scene.add(group);
  const accent = new THREE.Color(accentFor(w));

  const mat = (color = accent, emissive = 0.08) => new THREE.MeshStandardMaterial({
    color, roughness: .35, metalness: .08, emissive: color, emissiveIntensity: emissive
  });
  const lineMat = new THREE.LineBasicMaterial({ color: 0xa9c7e8, transparent: true, opacity: .6 });

  function sphere(x,y,z,r=.28,color=accent) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(r,24,24), mat(color));
    m.position.set(x,y,z); group.add(m); return m;
  }
  function box(x,y,z,sx=.6,sy=.6,sz=.6,color=accent) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(sx,sy,sz), mat(color));
    m.position.set(x,y,z); group.add(m); return m;
  }
  function link(a,b) {
    const g = new THREE.BufferGeometry().setFromPoints([a.position.clone(), b.position.clone()]);
    group.add(new THREE.Line(g,lineMat));
  }

  const mode = w.visual;
  if (mode === 'experiment') {
    const a1=box(-2,0,0,.7,.7,.7,0xffcece), a2=box(-.6,0,0,.7,.7,.7,0xffcece);
    const b1=box(.6,0,0,.7,.7,.7,0x8ed6ff), b2=box(2,0,0,.7,.7,.7,0x8ed6ff);
    link(a1,a2); link(b1,b2);
    sphere(-1.3,1.3,0,.22,0xffffff); sphere(1.3,1.3,0,.22,0xffffff);
  } else if (mode === 'classifier') {
    for(let i=0;i<16;i++){ const left=i<8; sphere((left?-1.7:1.7)+(Math.random()-.5)*1.7,(Math.random()-.5)*2.5,(Math.random()-.5)*1.6,.16,left?0xffc1c8:0x8ed6ff); }
    const plane=new THREE.Mesh(new THREE.BoxGeometry(.08,4,3.5),new THREE.MeshStandardMaterial({color:0xffffff,transparent:true,opacity:.35})); group.add(plane);
  } else if (mode === 'tokens') {
    const nodes=[]; for(let i=0;i<6;i++) nodes.push(box((i-2.5)*.78,0,0,.55,.55,.55,[0xffcece,0xffc1c8,0xffe3b0,0x8ed6ff,0xffcece,0x8ed6ff][i]));
    for(let i=0;i<nodes.length;i++) for(let j=i+1;j<nodes.length;j++) if((i+j)%2===0) link(nodes[i],nodes[j]);
  } else if (mode === 'vectors') {
    const query=sphere(0,0,0,.3,0xffffff);
    for(let i=0;i<24;i++){ const p=sphere((Math.random()-.5)*5,(Math.random()-.5)*3,(Math.random()-.5)*3,.13,i%3===0?0xffc1c8:0x8ed6ff); if(p.position.distanceTo(query.position)<1.8) link(query,p); }
  } else if (mode === 'rag') {
    const q=box(-2.8,0,0,.7,.7,.7,0xffcece), r=sphere(-1.1,0,0,.42,0xffc1c8), m=sphere(1.1,0,0,.5,0x8ed6ff), a=box(2.8,0,0,.8,.8,.8,0xffffff);
    link(q,r); link(r,m); link(m,a);
    for(let i=0;i<5;i++){const d=box(-.8+(i*.4),-1.5+(i%2)*.4,-1.4,.3,.3,.3,0xffe3b0);link(d,r);}
  } else if (mode === 'agent') {
    const center=sphere(0,0,0,.5,0x8ed6ff), tools=[sphere(-2,1,0,.34,0xffcece),sphere(-2,-1,0,.34,0xffe3b0),sphere(2,1,0,.34,0xffc1c8),sphere(2,-1,0,.34,0xffffff)];
    tools.forEach(t=>link(center,t));
    const gate=new THREE.Mesh(new THREE.TorusGeometry(.65,.06,12,64),mat(0xffe3b0)); gate.position.set(1,-.5,0); group.add(gate);
  } else if (mode === 'eval') {
    const gate=box(2.6,0,0,.22,3.4,3.2,0xffffff); for(let i=0;i<3;i++){const n=box(-2.3,i-1,0,.65,.45,.45,[0xffcece,0xffe3b0,0x8ed6ff][i]);link(n,gate);}
  } else if (mode === 'trace') {
    let prev=null; for(let i=0;i<6;i++){const n=sphere((i-2.5)*1.0,Math.sin(i)*.55,0,.24,[0xffcece,0xffc1c8,0xffe3b0,0x8ed6ff][i%4]); if(prev)link(prev,n); prev=n;}
  } else if (mode === 'security') {
    const input=box(-2.5,0,0,.7,.7,.7,0xffc1c8), boundary=box(-.8,0,0,.12,3,3,0xffe3b0), model=sphere(.6,0,0,.48,0x8ed6ff), tool=box(2.5,0,0,.7,.7,.7,0xffffff); link(input,boundary); link(boundary,model); link(model,tool);
  } else if (mode === 'deploy' || mode === 'pipeline') {
    let prev=null; const colors=[0xffcece,0xffc1c8,0xffe3b0,0x8ed6ff,0xffffff]; for(let i=0;i<5;i++){const n=box((i-2)*1.15,0,0,.68,.68,.68,colors[i]); if(prev)link(prev,n); prev=n;}
  } else if (mode === 'governance') {
    const core=sphere(0,0,0,.65,0x8ed6ff); const ring=new THREE.Mesh(new THREE.TorusGeometry(2.1,.08,16,90),mat(0xffe3b0)); ring.rotation.x=Math.PI/2; group.add(ring);
    for(let i=0;i<4;i++){const a=i*Math.PI/2;const n=sphere(Math.cos(a)*2.1,0,Math.sin(a)*2.1,.3,[0xffcece,0xffc1c8,0xffe3b0,0x8ed6ff][i]);link(core,n);}
  }

  const grid = new THREE.GridHelper(12, 12, 0x23415e, 0x18304a);
  grid.position.y = -2.1;
  group.add(grid);

  let frame;
  function resize() {
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(1, rect.width);
    const height = 276;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
  resize();
  const onResize = () => resize();
  window.addEventListener('resize', onResize);

  function animate(t) {
    group.rotation.y = t * 0.00018;
    group.rotation.x = Math.sin(t * 0.00035) * 0.04;
    renderer.render(scene,camera);
    frame = requestAnimationFrame(animate);
  }
  frame = requestAnimationFrame(animate);
  threeCleanup = () => {
    cancelAnimationFrame(frame);
    window.removeEventListener('resize', onResize);
    renderer.dispose();
  };
}

qsa('[data-nav="dashboard"]').forEach(el => el.addEventListener('click', e => { e.preventDefault(); renderDashboard(); }));
qs('#mobile-menu-button').addEventListener('click', () => qs('#course-sidebar').classList.toggle('open'));
qs('#course-sidebar').addEventListener('click', e => {
  if (e.target.closest('button,a') && innerWidth <= 820) qs('#course-sidebar').classList.remove('open');
});

const hashWeek = Number(location.hash.replace('#week-',''));
if (location.hash.startsWith('#week-') && weeks.some(w=>w.week===hashWeek)) {
  openWeek(hashWeek);
} else {
  renderDashboard();
}
