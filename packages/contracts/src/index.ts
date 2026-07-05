// Shared contract types for Sudoku platform

/**
 * Difficulty levels supported by the puzzle generator.
 */
export type Difficulty = 'easy' | 'medium' | 'hard';

/**
 * A row in a Sudoku board – exactly nine numbers (0 represents an empty cell).
 */
export type Row = [number, number, number, number, number, number, number, number, number];

/**
 * A full Sudoku board – exactly nine rows.
 *
 * NOTE: Historically this was a tuple of nine `Row` tuples, which was too
 * restrictive for implementations that construct the board dynamically (e.g.
 * using `Array.from`). The contract is now relaxed to a two‑dimensional array
 * of numbers. Runtime validation should still enforce a 9×9 grid.
 */
export type Board = number[][];

/**
 * Request parameters for GET /puzzle.
 */
export interface PuzzleRequest {
  /** Desired difficulty level */
  difficulty: Difficulty;
}

/**
 * Response payload for GET /puzzle.
 */
export interface PuzzleResponse {
  /** The generated Sudoku board */
  board: Board;
}

/**
 * Request payload for POST /validate.
 */
export interface ValidateRequest {
  /** The board to validate */
  board: Board;
}

/**
 * Response payload for POST /validate.
 */
export interface ValidateResponse {
  /** True when the board satisfies Sudoku rules */
  valid: boolean;
}

/**
 * A score entry stored by the Scores service.
 */
export interface Score {
  /** Player's display name */
  playerName: string;
  /** Difficulty of the puzzle that was solved */
  difficulty: Difficulty;
  /** Time taken to solve the puzzle, in milliseconds */
  timeToSolveMs: number;
}

/**
 * Request payload for POST /scores.
 */
export type ScoreSubmission = Score;

/**
 * Response payload for POST /scores.
 */
export interface ScoreResponse {
  /** Confirmation that the score was recorded */
  confirmed: true;
}

/**
 * Request parameters for GET /leaderboard.
 */
export interface LeaderboardRequest {
  /** Difficulty for which to retrieve the top scores */
  difficulty: Difficulty;
}

/**
 * Response payload for GET /leaderboard.
 */
export interface LeaderboardResponse {
  /** Array of the top ten scores for the requested difficulty */
  scores: Score[];
}
