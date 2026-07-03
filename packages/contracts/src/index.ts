// Shared contract definitions for Sudoku platform

/**
 * Allowed difficulty levels for puzzles and scores.
 */
export type Difficulty = 'easy' | 'medium' | 'hard';

/**
 * 9x9 Sudoku board. Cells contain numbers 1‑9, or 0 for empty.
 */
export type Board = number[][];

/**
 * Core domain entity representing a generated puzzle.
 */
export interface Puzzle {
  board: Board;
  difficulty: Difficulty;
}

/**
 * Core domain entity representing a player's score.
 */
export interface Score {
  id: string;
  playerName: string;
  difficulty: Difficulty;
  /**
   * Time taken to solve the puzzle, in milliseconds.
   */
  timeToSolve: number;
}

/**
 * Entry shown on a leaderboard.
 */
export interface LeaderboardEntry {
  playerName: string;
  /**
   * Time taken to solve the puzzle, in milliseconds.
   */
  timeToSolve: number;
}

/**
 * Request to fetch a puzzle.
 */
export interface PuzzleRequest {
  difficulty: Difficulty;
}

/**
 * Response containing a puzzle.
 */
export interface PuzzleResponse {
  board: Board;
  difficulty: Difficulty;
}

/**
 * Request to validate a completed board.
 */
export interface ValidateRequest {
  board: Board;
}

/**
 * Response indicating whether the board is a valid solution.
 */
export interface ValidateResponse {
  valid: boolean;
}

/**
 * Request to submit a completed game score.
 */
export interface ScoreRequest {
  playerName: string;
  difficulty: Difficulty;
  timeToSolve: number;
}

/**
 * Response after storing a score.
 */
export interface ScoreResponse {
  id: string;
}

/**
 * Request to retrieve a leaderboard for a specific difficulty.
 */
export interface LeaderboardRequest {
  difficulty: Difficulty;
}

/**
 * Response containing leaderboard entries.
 */
export interface LeaderboardResponse {
  entries: LeaderboardEntry[];
}
