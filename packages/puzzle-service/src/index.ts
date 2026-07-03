import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import puzzleRouter from './routes/puzzle';
import validateRouter from './routes/validate';
import { inputValidation } from './middleware/inputValidation';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(inputValidation);

// Routes
app.use(puzzleRouter);
app.use(validateRouter);

// Fallback for unknown routes
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' });
});

// Global error handler (optional)
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Puzzle service listening on port ${PORT}`);
});

export default app;
