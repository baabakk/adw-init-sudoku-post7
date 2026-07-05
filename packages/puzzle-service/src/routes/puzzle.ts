import { Request, Response, Router } from 'express';
import { PuzzleResponse, Difficulty } from '@init-sudoku-post7/contracts';
import { generatePuzzle } from '../generator';

const router = Router();

router.get('/puzzle', (req: Request, res: Response) => {
  // validatedDifficulty is set by inputValidation middleware
  const difficulty: Difficulty = (req as any).validatedDifficulty;
  const board = generatePuzzle(difficulty);
  const response: PuzzleResponse = { board };
  res.json(response);
});

export default router;
