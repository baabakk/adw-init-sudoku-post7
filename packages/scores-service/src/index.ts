import express, { Request, Response, NextFunction } from 'express';
import { initDatabase } from './database';
import scoresRouter from './routes/scores';
import leaderboardRouter from './routes/leaderboard';
import errorHandler from './middleware/errorHandler';

const app = express();

// Middleware
app.use(express.json());

// Initialise DB (fire‑and‑forget; errors will be caught by the error handler)
initDatabase().catch((err) => {
  console.error('Failed to initialise database:', err);
});

// Routes
app.use('/scores', scoresRouter);
app.use('/leaderboard', leaderboardRouter);

// Health check endpoint (optional)
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// Error handling – must be after all routes
app.use(errorHandler);

// Start server if this module is executed directly
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Scores service listening on port ${PORT}`);
  });
}

export default app;
