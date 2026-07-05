import { Router, Request, Response, NextFunction } from 'express';
import { getTopLeaderboard } from '../db/database';
import { Difficulty, LeaderboardResponse } from '@init-sudoku-post7/contracts';

const router = Router();

/**
 * GET /leaderboard?difficulty=easy|medium|hard
 * Returns the top‑10 scores for the requested difficulty.
 */
router.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const difficulty = req.query.difficulty as string;
      if (!difficulty || !['easy', 'medium', 'hard'].includes(difficulty)) {
        res.status(400).json({ error: 'Invalid or missing difficulty' });
        return;
      }
      const scores = getTopLeaderboard(difficulty as Difficulty);
      const response: LeaderboardResponse = { scores };
      res.json(response);
    } catch (err) {
      next(err);
    }
  },
);

export default router;
