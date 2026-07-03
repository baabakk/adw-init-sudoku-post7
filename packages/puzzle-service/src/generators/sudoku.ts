import { Board, Difficulty } from '@init-sudoku-post7/contracts';
import { getRemovalCount } from '../utils/difficulty';

/**
 * Generates a complete, valid Sudoku board using backtracking.
 */
function generateFullBoard(): Board {
  const board: Board = Array.from({ length: 9 }, () => Array(9).fill(0));
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  function shuffle(arr: number[]): number[] {
    const copy = arr.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function isSafe(row: number, col: number, num: number): boolean {
    // Row
    for (let x = 0; x < 9; x++) {
      if (board[row][x] === num) return false;
    }
    // Column
    for (let y = 0; y < 9; y++) {
      if (board[y][col] === num) return false;
    }
    // 3x3 box
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[startRow + i][startCol + j] === num) return false;
      }
    }
    return true;
  }

  function fillCell(): boolean {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          const shuffled = shuffle(numbers);
          for (const num of shuffled) {
            if (isSafe(row, col, num)) {
              board[row][col] = num;
              if (fillCell()) return true;
              board[row][col] = 0;
            }
          }
          return false; // No number fits, backtrack
        }
      }
    }
    // No empty cells left
    return true;
  }

  fillCell();
  return board;
}

/**
 * Counts the number of solutions for a given board using backtracking.
 * Stops counting after reaching two solutions (since we only need to know if unique).
 */
function countSolutions(board: Board, limit = 2): number {
  let count = 0;

  function isSafe(row: number, col: number, num: number): boolean {
    for (let x = 0; x < 9; x++) if (board[row][x] === num) return false;
    for (let y = 0; y < 9; y++) if (board[y][col] === num) return false;
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[startRow + i][startCol + j] === num) return false;
      }
    }
    return true;
  }

  function solve(): void {
    if (count >= limit) return; // early exit
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isSafe(row, col, num)) {
              board[row][col] = num;
              solve();
              board[row][col] = 0;
            }
          }
          return;
        }
      }
    }
    // No empty cells -> found a solution
    count++;
  }

  solve();
  return count;
}

/**
 * Generates a Sudoku puzzle for the given difficulty.
 * The algorithm:
 *   1. Generate a full valid board.
 *   2. Remove cells according to difficulty while ensuring the puzzle has a unique solution.
 */
export function generatePuzzle(difficulty: Difficulty): Board {
  const fullBoard = generateFullBoard();
  const removalCount = getRemovalCount(difficulty);
  const puzzle: Board = fullBoard.map(row => row.slice()); // deep copy

  // Create list of all cell positions
  const positions: Array<[number, number]> = [];
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      positions.push([r, c]);
    }
  }
  // Shuffle positions
  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }

  let removed = 0;
  for (const [row, col] of positions) {
    if (removed >= removalCount) break;
    const backup = puzzle[row][col];
    puzzle[row][col] = 0;
    // Check uniqueness
    const copy = puzzle.map(r => r.slice());
    const solutions = countSolutions(copy, 2);
    if (solutions !== 1) {
      // Revert removal if not unique
      puzzle[row][col] = backup;
    } else {
      removed++;
    }
  }

  return puzzle;
}
