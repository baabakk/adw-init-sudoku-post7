import { Request, Response, NextFunction } from 'express';
import { Board } from '@init-sudoku-post7/contracts';

/**
 * Middleware that validates incoming requests for the puzzle-service.
 * - GET /puzzle: requires a valid `difficulty` query parameter ('easy' | 'medium' | 'hard').
 * - POST /validate: requires a `board` field in the JSON body that is a 9x9 array of numbers (0‑9).
 * If validation fails, responds with 400 and an error message.
 */
export function inputValidation(req: Request, res: Response, next: NextFunction): void {
  if (req.method === 'GET' && req.path === '/puzzle') {
    const diff = req.query.difficulty as string | undefined;
    if (!diff) {
      res.status(400).json({ error: 'Missing difficulty query parameter' });
      return;
    }
    if (!isValidDifficulty(diff)) {
      res
        .status(400)
        .json({ error: "Invalid difficulty. Expected one of 'easy', 'medium', 'hard'" });
      return;
    }
    // Attach typed difficulty to request for downstream handlers
    (req as any).validatedDifficulty = diff as 'easy' | 'medium' | 'hard';
    next();
    return;
  }

  if (req.method === 'POST' && req.path === '/validate') {
    const body = req.body as any;
    if (!body || !Array.isArray(body.board)) {
      res.status(400).json({ error: 'Missing board in request body' });
      return;
    }
    const board = body.board as any;
    if (!isValidBoardShape(board)) {
      res.status(400).json({ error: 'Board must be a 9x9 array of numbers (0-9)' });
      return;
    }
    (req as any).validatedBoard = board as Board;
    next();
    return;
  }

  // For any other routes, just continue.
  next();
}

function isValidDifficulty(value: string): boolean {
  return value === 'easy' || value === 'medium' || value === 'hard';
}

function isValidBoardShape(board: any): board is Board {
  if (!Array.isArray(board) || board.length !== 9) return false;
  for (const row of board) {
    if (!Array.isArray(row) || row.length !== 9) return false;
    for (const cell of row) {
      if (typeof cell !== 'number' || cell < 0 || cell > 9) return false;
    }
  }
  return true;
}
