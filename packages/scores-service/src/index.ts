import express, { Request, Response } from 'express';
import scoresRouter from './routes/scores';
import leaderboardRouter from './routes/leaderboard';
import { errorHandler } from './middleware/errorHandler';
import { initDatabase } from './db/database';

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Initialize the database (creates tables if needed)
initDatabase();

// Middleware
app.use(express.json());

// Routes
app.use('/scores', scoresRouter);
app.use('/leaderboard', leaderboardRouter);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Scores service listening on port ${PORT}`);
});

export default app;