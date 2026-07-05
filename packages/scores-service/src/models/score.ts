import type { Score, Difficulty } from '@init-sudoku-post7/contracts';

/**
 * Local model for a score entry. Mirrors the contract `Score` type.
 * This file exists to allow future extensions (e.g., ORM mapping) without
 * coupling directly to the contract definition.
 */
export interface ScoreModel extends Score {}

/**
 * Helper to create a new ScoreModel instance.
 */
export function createScore(
  playerName: string,
  difficulty: Difficulty,
  timeToSolveMs: number,
): ScoreModel {
  return {
    playerName,
    difficulty,
    timeToSolveMs,
  };
}
