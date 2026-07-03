import { Request, Response, Router } from 'express';
import { ValidateResponse } from '@init-sudoku-post7/contracts';
import { isValidSolution } from '../validators/board';

const router = Router();

router.post('/validate', (req: Request, res: Response) => {
  const board = (req as any).validatedBoard;
  const valid = isValidSolution(board);
  const response: ValidateResponse = { valid };
  res.json(response);
});

export default router;
