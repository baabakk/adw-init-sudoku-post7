/**
 * Utility functions for Sudoku board manipulation.
 */
import type { Board } from '@init-sudoku-post7/contracts';

/**
 * Deep‑clone a 2‑dimensional board array.
 * Guarantees that mutating the returned board does not affect the original.
 */
export function cloneBoard(board: Board): Board {
  return board.map(row => [...row]);
}

/**
 * Determine whether a cell is editable based on the initial puzzle board.
 * Cells that were non‑zero in the original puzzle are fixed.
 */
export function isCellEditable(initial: Board, row: number, col: number): boolean {
  return initial[row][col] === 0;
}
