import { Router, Request, Response, NextFunction } from 'express';
import { insertScore } from '../db/database';
import { ScoreSubmission, ScoreResponse } from '@init-sudoku-post7/contracts';
import { validateScoreSubmission } from '../utils/validators';

const router = Router();

/**
 * POST /scores
 * Persist a completed game result.
 */
router.post(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validation = validateScoreSubmission(req.body);
      if (!validation.valid) {
        res.status(400).json({ error: validation.error });
        return;
      }
      const score: ScoreSubmission = req.body as ScoreSubmission;
      // Insert the score into the database (synchronous API wrapped in async for consistency)
      insertScore(score);
      const response: ScoreResponse = { confirmed: true };
      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  },
);

export default router;
