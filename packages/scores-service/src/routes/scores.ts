import { Router, Request, Response, NextFunction } from 'express';
import { insertScore } from '../database';
import { ScoreRequest, ScoreResponse } from '../../../contracts/src/index';

const router = Router();

/**
 * POST /scores
 * Persist a completed game result.
 */
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { playerName, difficulty, timeToSolve } = req.body as ScoreRequest;
    // Basic validation – ensure required fields are present and of correct type.
    if (
      typeof playerName !== 'string' ||
      typeof difficulty !== 'string' ||
      typeof timeToSolve !== 'number'
    ) {
      res.status(400).json({ error: 'Invalid request payload' });
      return;
    }
    const id = await insertScore({ playerName, difficulty, timeToSolve });
    const response: ScoreResponse = { id };
    res.status(201).json(response);
  } catch (err) {
    next(err);
  }
});

export default router;
