# init-sudoku-post7 — shared foundation

Generated deterministically by DevOps from the approved project-decomposition.

**Stack:** TypeScript (npm workspaces)
- install: `npm install`
- build: `npm run build`
- test: `npm test`

## Subsystems (one feature team each)
- **web-client** — Web Client: Browser SPA that renders an interactive Sudoku board, allows difficulty selection, fetches puzzles from Puzzle Service, submits completed boards for validation, and displays leaderboard from Scores Service. Handles network errors gracefully.
  - owns: packages/web
  - dependsOn: puzzle-service, scores-service
- **puzzle-service** — Puzzle Service: Generates valid, uniquely-solvable Sudoku puzzles per difficulty and validates submitted boards. Provides GET /puzzle and POST /validate endpoints. Stateless, no database.
  - owns: packages/puzzle-service
  - dependsOn: none
- **scores-service** — Scores Service: Persists completed-game results and serves per-difficulty top-10 leaderboard. Provides POST /scores and GET /leaderboard endpoints. Uses its own database (e.g., SQLite).
  - owns: packages/scores-service
  - dependsOn: none
- **shared-contracts** — Shared Contracts: Defines all HTTP request and response types used by the client and services. Single source of truth for inter-service communication payloads. Must be stable before services and client can be developed.
  - owns: packages/contracts
  - dependsOn: none

## Shared contracts
- packages/contracts
