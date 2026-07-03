import { Difficulty } from '@init-sudoku-post7/contracts';

/**
 * Returns the number of cells to remove for a given difficulty.
 * The numbers are chosen to provide typical Sudoku difficulty levels.
 */
export function getRemovalCount(difficulty: Difficulty): number {
  switch (difficulty) {
    case Difficulty.Easy:
      return 30; // 81 - 30 = 51 filled cells
    case Difficulty.Medium:
      return 40; // 41 filled cells
    case Difficulty.Hard:
      return 50; // 31 filled cells
    default:
      // Fallback to medium if unknown (should never happen due to validation)
      return 40;
  }
}
