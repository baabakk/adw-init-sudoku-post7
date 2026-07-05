/**
 * Shared contracts for the Sudoku platform.
 * All cross‑team types are defined here so that each service can import a single source of truth.
 * The file is compiled with "strict": true.
 */

/**
 * Difficulty levels supported by the puzzle generator and scoring system.
 */
export enum Difficulty {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
}

/**
 * A single Sudoku cell. Numbers 1‑9 are valid values; `null` represents an empty cell.
 * Updated to also accept `0` as an empty cell for compatibility with existing services.
 */
export type Cell = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | null;

/**
 * A 9×9 Sudoku board. The type is a two‑dimensional array of `Cell` values.
 * Runtime validation should ensure the array is exactly 9×9.
 */
export type Board = Cell[][];

/**
 * A puzzle is simply a board that may be partially filled. The same type is used for
 * generation, validation and transport.
 */
export type Puzzle = Board;

/**
 * Representation of a completed game that will be stored by the Scores service.
 */
export interface Score {
  /** Player's display name */
  playerName: string;
  /** Difficulty of the puzzle that was solved */
  difficulty: Difficulty;
  /** Time taken to solve the puzzle, expressed in milliseconds */
  timeToSolveMs: number;
  /** ISO‑8601 timestamp when the puzzle was completed */
  completedAt: string;
}

/**
 * The leaderboard is a list of the best scores for a particular difficulty.
 * The Scores service returns at most the top 10 entries.
 */
export type Leaderboard = Score[];

/**
 * Request payload for GET /puzzle. The difficulty is supplied as a query parameter
 * but is modelled here as a request object for type safety.
 */
export interface GetPuzzleRequest {
  difficulty: Difficulty;
}

/**
 * Response payload for GET /puzzle.
 */
export interface GetPuzzleResponse {
  /** The generated Sudoku board */
  board: Board;
}

/**
 * Request payload for POST /validate.
 */
export interface ValidatePuzzleRequest {
  /** The board to validate – may be a fully solved board or a partially filled one */
  board: Board;
}

/**
 * Response payload for POST /validate.
 */
export interface ValidatePuzzleResponse {
  /** True when the supplied board satisfies Sudoku rules */
  valid: boolean;
}

/**
 * Request payload for POST /scores.
 */
export interface SubmitScoreRequest {
  /** The score to store */
  score: Score;
}

/**
 * Response payload for POST /scores.
 */
export interface SubmitScoreResponse {
  /** Indicates whether the score was successfully persisted */
  success: boolean;
  /** Optional human‑readable message, e.g. error details */
  message?: string;
}

/**
 * Request payload for GET /leaderboard.
 */
export interface GetLeaderboardRequest {
  difficulty: Difficulty;
}

/**
 * Response payload for GET /leaderboard.
 */
export interface GetLeaderboardResponse {
  /** Ordered list of the best scores for the requested difficulty */
  leaderboard: Leaderboard;
}
