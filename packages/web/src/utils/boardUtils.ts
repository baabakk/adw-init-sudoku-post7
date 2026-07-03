/**
 * Utility functions for Sudoku board manipulation and validation.
 */
import type { Board } from '@init-sudoku-post7/contracts';

/**
 * Deep clone a Sudoku board.
 */
export function cloneBoard(board: Board): Board {
  return board.map(row => [...row]);
}

/**
 * Check if a completed board satisfies Sudoku rules.
 * Returns true if every row, column, and 3x3 subgrid contains numbers 1-9 exactly once.
 */
export function isBoardValid(board: Board): boolean {
  const size = 9;
  const digits = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  // Helper to check a collection of 9 cells
  const checkGroup = (cells: number[]): boolean => {
    const set = new Set(cells);
    if (set.size !== size) return false;
    for (const d of digits) {
      if (!set.has(d)) return false;
    }
    return true;
  };

  // Rows
  for (let r = 0; r < size; r++) {
    if (!checkGroup(board[r])) return false;
  }

  // Columns
  for (let c = 0; c < size; c++) {
    const col = [] as number[];
    for (let r = 0; r < size; r++) col.push(board[r][c]);
    if (!checkGroup(col)) return false;
  }

  // Subgrids (3x3)
  for (let br = 0; br < 3; br++) {
    for (let bc = 0; bc < 3; bc++) {
      const cells: number[] = [];
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          cells.push(board[br * 3 + r][bc * 3 + c]);
        }
      }
      if (!checkGroup(cells)) return false;
    }
  }

  return true;
}
