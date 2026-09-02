# AI Research Lab Architecture

## Repository layers

- `research/` — durable notes and research tracks
- `experiments/` — isolated, reproducible studies
- `src/ai_research/` — reusable experiment utilities
- `notebooks/` — exploratory analysis; promote stable logic into `src/`
- `data/` — dataset manifests and small derived samples
- `models/` — model metadata/configuration, not large weights
- `artifacts/` — generated outputs excluded from Git
- `tests/` — tests for reusable research utilities
- `templates/` — experiment/report templates

## Reproducibility rules

1. Pin dataset/model versions where possible.
2. Record random seeds and environment details.
3. Define metrics before collecting results.
4. Keep baseline and treatment configurations together.
5. Never commit secrets, private data, model credentials, or restricted datasets.
6. Keep large generated files outside Git and document how to regenerate them.
7. Separate exploratory notebook code from reusable library code.

## Suggested experiment lifecycle

`question -> hypothesis -> baseline -> experiment -> metrics -> analysis -> conclusion -> follow-up`
