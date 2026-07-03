// Shared contracts for Sudoku platform

/**
 * Difficulty levels supported by the Sudoku game.
 */
export enum Difficulty {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
}

/**
 * 9x9 Sudoku board. Each inner array represents a row.
 * The value `0` denotes an empty cell; values 1‑9 denote filled cells.
 */
export type Board = number[][];

/**
 * Core domain entity representing a generated puzzle.
 */
export interface Puzzle {
  /** The Sudoku board for the puzzle. */
  board: Board;
  /** Difficulty level of the puzzle. */
  difficulty: Difficulty;
}

/**
 * Request shape for fetching a new puzzle.
 * Used as the query parameters of GET /puzzle.
 */
export interface PuzzleRequest {
  /** Desired difficulty level. */
  difficulty: Difficulty;
}

/**
 * Response shape for fetching a puzzle.
 */
export interface PuzzleResponse {
  /** The generated board. */
  board: Board;
  /** Difficulty level of the returned puzzle. */
  difficulty: Difficulty;
}

/**
 * Request shape for validating a completed board.
 */
export interface ValidateRequest {
  /** The board to validate. */
  board: Board;
}

/**
 * Response shape indicating whether the submitted board is a valid solution.
 */
export interface ValidateResponse {
  /** True if the board satisfies Sudoku rules. */
  valid: boolean;
}

/**
 * Core domain entity representing a stored score.
 */
export interface Score {
  /** Unique identifier for the score record. */
  id: string;
  /** Player's display name. */
  playerName: string;
  /** Difficulty of the puzzle that was solved. */
  difficulty: Difficulty;
  /** Time taken to solve the puzzle, in seconds. */
  timeToSolve: number;
}

/**
 * Request shape for submitting a completed game result.
 */
export interface ScoreRequest {
  /** Player's display name. */
  playerName: string;
  /** Difficulty of the solved puzzle. */
  difficulty: Difficulty;
  /** Time taken to solve the puzzle, in seconds. */
  timeToSolve: number;
}

/**
 * Response shape after a score has been persisted.
 */
export interface ScoreResponse {
  /** Identifier of the newly created score record. */
  id: string;
}

/**
 * Domain type for a single entry on the leaderboard.
 * Mirrors the Score entity without the internal identifier.
 */
export interface LeaderboardEntry {
  /** Player's display name. */
  playerName: string;
  /** Time taken to solve the puzzle, in seconds. */
  timeToSolve: number;
}

/**
 * Request shape for retrieving the leaderboard for a specific difficulty.
 */
export interface LeaderboardRequest {
  /** Desired difficulty level. */
  difficulty: Difficulty;
}

/**
 * Response shape containing the top entries for a difficulty.
 */
export interface LeaderboardResponse {
  /** Ordered list of leaderboard entries (best times first). */
  entries: LeaderboardEntry[];
}
