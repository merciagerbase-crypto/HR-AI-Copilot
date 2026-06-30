# HR + AI Product Portfolio

Two interactive, browser-based portfolio prototypes designed to demonstrate how AI can support HR decision-making while preserving human accountability.

## Products

1. **People Manager Copilot**  
   A guided assistant for managers preparing for sensitive people conversations. It structures context, asks the right questions, generates a conversation brief and flags when HR, Legal or Compliance review is needed.

2. **Workforce Planning Copilot**  
   An executive decision-support workspace that converts fictional workforce data into a structured workforce recommendation, scenario comparison and action list.

## Why these prototypes exist

Both products were designed around a simple principle:

> AI can improve preparation, consistency and decision quality. It should not autonomously make employment decisions.

They are intentionally narrow, auditable and human-in-the-loop.

## Run locally

No installation or API key is needed.

```bash
cd hr-ai-portfolio
python -m http.server 8080
```

Then open:

- `http://localhost:8080/`
- `http://localhost:8080/people-manager-copilot/`
- `http://localhost:8080/workforce-planning-copilot/`

## Deploy to GitHub Pages

1. Create a new GitHub repository.
2. Upload this folder's contents to the repository root.
3. In **Settings > Pages**, select **Deploy from a branch**.
4. Choose `main` and `/root`.
5. GitHub will publish a URL with the landing page and both products.

## Important note

All people and workforce data in this repository are fictional. The interactive demos use deterministic product logic to demonstrate user experience without requiring an API key. The `docs/` folder includes the intended prompt boundaries, safety rules, metrics and model-integration approach for a production implementation.

For a click-by-click publishing guide, see `DEPLOY.md`.

## Suggested interview framing

> “I built two narrow HR AI products around practical operating problems: preparing managers for difficult conversations and helping HR and Finance prioritize workforce decisions. I deliberately designed both with clear decision boundaries, human review, escalation logic, auditability and synthetic data.”

