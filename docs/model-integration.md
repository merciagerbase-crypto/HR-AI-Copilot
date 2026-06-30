# Intended production model integration

The browser demos use deterministic product logic so they can be inspected without an API key. A production implementation would keep the same user experience but call an approved enterprise LLM through a server-side orchestration layer.

## Architecture

1. User enters structured context.
2. Backend redacts or blocks restricted fields.
3. Retrieval retrieves approved HR policy, process guidance and case-specific structured data.
4. LLM produces a structured JSON response, not unrestricted prose.
5. Policy engine checks for sensitive cases, prohibited recommendations and required escalations.
6. UI presents the answer with source citations and a clear human-review requirement.
7. Audit trail stores input, output, model version, policy checks and final decision.

## Examples of blocked behavior

- Ranking candidates or employees based on protected characteristics
- Recommending termination, promotion, compensation or disciplinary action as an autonomous final decision
- Inferring health status, disability, religion, ethnicity, pregnancy, union activity or political views
- Using unverified free-text content as a factual source
