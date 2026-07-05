import type { ScoreSubmission } from '@init-sudoku-post7/contracts';
import type { Difficulty } from '@init-sudoku-post7/contracts';

/**
 * Result of a validation attempt.
 */
export interface ValidationResult {
  valid: boolean;
  /** Human‑readable error message when valid is false */
  error?: string;
}

/**
 * Validate a ScoreSubmission payload.
 * Ensures required fields are present and of the correct type.
 */
export function validateScoreSubmission(payload: unknown): ValidationResult {
  if (typeof payload !== 'object' || payload === null) {
    return { valid: false, error: 'Payload must be an object' };
  }
  const obj = payload as Record<string, unknown>;

  const playerName = obj.playerName;
  if (typeof playerName !== 'string' || playerName.trim() === '') {
    return { valid: false, error: 'playerName must be a non‑empty string' };
  }

  const difficulty = obj.difficulty as unknown;
  const allowed: readonly Difficulty[] = ['easy', 'medium', 'hard'];
  if (typeof difficulty !== 'string' || !allowed.includes(difficulty as Difficulty)) {
    return { valid: false, error: `difficulty must be one of ${allowed.join(', ')}` };
  }

  const timeToSolveMs = obj.timeToSolveMs;
  if (typeof timeToSolveMs !== 'number' || !Number.isFinite(timeToSolveMs) || timeToSolveMs <= 0) {
    return { valid: false, error: 'timeToSolveMs must be a positive number' };
  }

  return { valid: true };
}
