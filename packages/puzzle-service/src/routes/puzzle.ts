import { Request, Response, Router } from 'express';
import { PuzzleResponse, Difficulty } from '@init-sudoku-post7/contracts';
import { generatePuzzle } from '../generators/sudoku';

const router = Router();

router.get('/puzzle', (req: Request, res: Response) => {
  // The inputValidation middleware attaches validatedDifficulty
  const difficulty: Difficulty = (req as any).validatedDifficulty;
  const board = generatePuzzle(difficulty);
  const response: PuzzleResponse = { board, difficulty };
  res.json(response);
});

export default router;
