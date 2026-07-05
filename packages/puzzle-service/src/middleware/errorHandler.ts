import { Request, Response, NextFunction } from 'express';

/**
 * Represents an error that should be exposed to the client with a specific HTTP status code.
 */
export class NetworkError extends Error {
  public readonly statusCode: number;
  constructor(message: string, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    // Ensure instanceof works after transpilation
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Global Express error‑handling middleware.
 * Converts thrown errors into JSON responses with appropriate status codes.
 */
export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof NetworkError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }
  console.error('Unexpected error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
}
