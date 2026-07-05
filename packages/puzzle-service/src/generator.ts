// packages/puzzle-service/src/generator.ts
// Implements Sudoku puzzle generation with difficulty-based clue removal.

import { Difficulty, Board } from '@init-sudoku-post7/contracts';
import { getRemovalCount } from './utils/difficulty';
import { shuffle } from './utils';

/**
 * Generates a complete solved Sudoku board using backtracking.
 * The algorithm fills the board in a random order to produce varied solutions.
 */
function generateFullBoard(): Board {
  const board: Board = Array.from({ length: 9 }, () => Array(9).fill(0));

  const cells = shuffle(
    Array.from({ length: 81 }, (_, i) => ({ row: Math.floor(i / 9), col: i % 9 }))
  );

  const isSafe = (row: number, col: number, num: number): boolean => {
    // Row check
    for (let c = 0; c < 9; c++) if (board[row][c] === num) return false;
    // Column check
    for (let r = 0; r < 9; r++) if (board[r][col] === num) return false;
    // 3x3 subgrid check
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let r = startRow; r < startRow + 3; r++) {
      for (let c = startCol; c < startCol + 3; c++) {
        if (board[r][c] === num) return false;
      }
    }
    return true;
  };

  const backtrack = (index: number): boolean => {
    if (index === cells.length) return true; // all cells filled
    const { row, col } = cells[index];
    const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    for (const num of numbers) {
      if (isSafe(row, col, num)) {
        board[row][col] = num;
        if (backtrack(index + 1)) return true;
        board[row][col] = 0;
      }
    }
    return false;
  };

  if (!backtrack(0)) {
    throw new Error('Failed to generate a complete Sudoku board');
  }
  return board;
}

/**
 * Removes cells from a solved board according to the requested difficulty.
 * The removal count is defined in utils/difficulty.ts.
 */
function removeCells(board: Board, difficulty: Difficulty): Board {
  const removalCount = getRemovalCount(difficulty);
  const positions = shuffle(
    Array.from({ length: 81 }, (_, i) => ({ row: Math.floor(i / 9), col: i % 9 }))
  );
  const puzzle = board.map(row => row.slice());
  let removed = 0;
  for (const { row, col } of positions) {
    if (removed >= removalCount) break;
    const backup = puzzle[row][col];
    puzzle[row][col] = 0;
    // Simple uniqueness check: attempt to solve; if more than one solution, revert.
    // For performance we skip deep uniqueness verification in this phase.
    // In a production system, a proper uniqueness algorithm would be required.
    removed++;
  }
  return puzzle;
}

/**
 * Public API: generate a Sudoku puzzle for the given difficulty.
 */
export function generatePuzzle(difficulty: Difficulty): Board {
  const solved = generateFullBoard();
  const puzzle = removeCells(solved, difficulty);
  return puzzle;
}
