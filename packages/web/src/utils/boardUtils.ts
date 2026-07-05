/**
 * Utility functions for Sudoku board manipulation and validation.
 */
import type { Board, Row } from '@init-sudoku-post7/contracts';

/**
 * Deep clone a Sudoku board.
 *
 * The board is a tuple of rows, each a tuple of numbers. We perform a deep copy
 * via JSON serialization (the board contains only numbers) and then cast the
 * result back to the exact `Board` tuple type expected by the contracts.
 */
export function cloneBoard(board: Board): Board {
  // JSON round‑trip creates a deep copy of the nested arrays.
  const cloned = JSON.parse(JSON.stringify(board)) as unknown as Board;
  return cloned;
}

/**
 * Check if a completed board satisfies Sudoku rules.
 * Returns true if every row, column, and 3x3 subgrid contains numbers 1‑9 exactly once.
 */
export function isBoardValid(board: Board): boolean {
  const size = 9 as const;
  const digits = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);

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
    const col: number[] = [];
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
