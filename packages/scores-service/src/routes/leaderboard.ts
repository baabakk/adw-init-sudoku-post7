import { Router, Request, Response, NextFunction } from 'express';
import { getTopLeaderboard } from '../db/database';
import { Difficulty, LeaderboardResponse } from '../../../contracts/src/index';

const router = Router();

/**
 * GET /leaderboard?difficulty=easy|medium|hard
 * Returns the top‑10 scores for the requested difficulty.
 */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const difficulty = req.query.difficulty as string;
    if (!difficulty || !Object.values(Difficulty).includes(difficulty as Difficulty)) {
      res.status(400).json({ error: 'Invalid or missing difficulty' });
      return;
    }
    const entries = await getTopLeaderboard(difficulty);
    const response: LeaderboardResponse = { entries };
    res.json(response);
  } catch (err) {
    next(err);
  }
});

export default router;
