// packages/puzzle-service/src/index.ts
// Main entry point: sets up Express server, registers routes, validation and error handling, and starts listening.

import express, { Request, Response, NextFunction } from 'express';
import puzzleRouter from './routes/puzzle';
import validateRouter from './routes/validate';
import { inputValidation } from './middleware/inputValidation';
import { errorHandler } from './errors';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(inputValidation);

// Routes
app.use(puzzleRouter);
app.use(validateRouter);

// 404 handler for unknown routes
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found' });
});

// Global error handler (network errors, unexpected exceptions)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Puzzle service listening on port ${PORT}`);
});

export default app;
