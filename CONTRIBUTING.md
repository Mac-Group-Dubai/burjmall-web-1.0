# Contributing Guide

We follow the `main → feature → release → tag → hotfix` branching strategy.

## Branch Rules
- `main` = stable, production-ready. **No direct commits.**
- `feature/*` = new features or improvements. Create from `main`.
- `bugfix/*` = fixes for issues found in `release/*`.
- `release/*` = code freeze for QA testing.
- `hotfix/*` = urgent fixes from production tags.
- Tags (`vX.Y.Z`) = deployed to production.

## Workflow
1. Create a feature branch:
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/short-name
