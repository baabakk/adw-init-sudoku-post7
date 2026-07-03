import express, { Request, Response, NextFunction } from 'express';
import scoresRouter from './routes/scores';
import leaderboardRouter from './routes/leaderboard';
import errorHandler from './middleware/errorHandler';
import { initDatabase } from './db/database';

const app = express();
app.use(express.json());

// Initialize DB before handling requests
initDatabase().catch((err) => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});

app.use('/scores', scoresRouter);
app.use('/leaderboard', leaderboardRouter);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Scores service listening on port ${PORT}`);
  });
}

export default app;
