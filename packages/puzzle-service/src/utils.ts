// packages/puzzle-service/src/utils.ts
// General utility functions used across the puzzle-service package.

/**
 * Returns a new array with the elements of the input array shuffled using the Fisher‑Yates algorithm.
 * The original array is not mutated.
 */
export function shuffle<T>(array: T[]): T[] {
  const result = array.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Deep copies a 2‑dimensional number array (e.g., a Sudoku board).
 */
export function deepCopyBoard(board: number[][]): number[][] {
  return board.map(row => row.slice());
}
