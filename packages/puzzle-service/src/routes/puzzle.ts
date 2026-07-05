import { Router, Request, Response, NextFunction } from 'express';
import { generatePuzzle } from '../generator';
import { PuzzleResponse, Difficulty } from '../types';

const router = Router();

/**
 * GET /puzzle
 * Query param: difficulty=easy|medium|hard
 * Returns a generated Sudoku puzzle.
 */
router.get(
  '/',
  (req: Request, res: Response<any>, next: NextFunction) => {
    try {
      const diff = req.query.difficulty as string | undefined;
      if (!diff) {
        res.status(400).json({ error: 'Missing difficulty query parameter' });
        return;
      }
      if (!isValidDifficulty(diff)) {
        res.status(400).json({ error: "Invalid difficulty. Expected one of 'easy', 'medium', 'hard'" });
        return;
      }
      const difficulty = diff as Difficulty;
      const board = generatePuzzle(difficulty);
      const response: PuzzleResponse = { board };
      res.json(response);
    } catch (err) {
      next(err);
    }
  }
);

function isValidDifficulty(value: string): boolean {
  return value === 'easy' || value === 'medium' || value === 'hard';
}

export default router;
