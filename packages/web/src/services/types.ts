import type {
  PuzzleRequest,
  PuzzleResponse,
  ValidateRequest,
  ValidateResponse,
  Difficulty,
} from '@init-sudoku-post7/contracts';

// Re-export the contract types for convenient imports within the web client.
export type {
  PuzzleRequest,
  PuzzleResponse,
  ValidateRequest,
  ValidateResponse,
  Difficulty,
};

// Backward‑compatible aliases for any legacy imports that may still reference the old names.
export type GetPuzzleResponse = PuzzleResponse;
export type ValidatePuzzleRequest = ValidateRequest;
export type ValidatePuzzleResponse = ValidateResponse;
