// packages/puzzle-service/src/errors.ts
// Custom error classes and a global error handling middleware for Express.
// NetworkError is used for anticipated client‑side errors (e.g., validation failures).
// The errorHandler converts any thrown error into a JSON response with an appropriate HTTP status.

import { Request, Response, NextFunction } from 'express';

/**
 * Represents an error that should be exposed to the client with a specific HTTP status code.
 */
export class NetworkError extends Error {
  public readonly statusCode: number;
  constructor(message: string, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    // Set the prototype explicitly to maintain instanceof checks after transpilation.
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Express error‑handling middleware.
 * It catches both synchronous and asynchronous errors, formats them as JSON, and sends the appropriate status.
 */
export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof NetworkError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }
  // For unexpected errors, log and return a generic 500 response.
  console.error('Unexpected error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
}
