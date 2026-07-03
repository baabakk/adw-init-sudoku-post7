import { Board } from '@init-sudoku-post7/contracts';

/**
 * Checks whether a completed Sudoku board is a valid solution.
 * Returns true if every row, column, and 3x3 sub‑grid contains the numbers 1‑9 exactly once.
 */
export function isValidSolution(board: Board): boolean {
  // Helper to check an array of 9 numbers contains 1-9 exactly once
  const isValidGroup = (group: number[]): boolean => {
    const seen = new Set<number>();
    for (const n of group) {
      if (n < 1 || n > 9) return false;
      if (seen.has(n)) return false;
      seen.add(n);
    }
    return seen.size === 9;
  };

  // Check rows
  for (let r = 0; r < 9; r++) {
    if (!isValidGroup(board[r])) return false;
  }

  // Check columns
  for (let c = 0; c < 9; c++) {
    const col: number[] = [];
    for (let r = 0; r < 9; r++) col.push(board[r][c]);
    if (!isValidGroup(col)) return false;
  }

  // Check 3x3 boxes
  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      const box: number[] = [];
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          box.push(board[boxRow * 3 + r][boxCol * 3 + c]);
        }
      }
      if (!isValidGroup(box)) return false;
    }
  }

  return true;
}
