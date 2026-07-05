import { Request, Response, NextFunction } from 'express';

/**
 * Generic error handling middleware.
 * Sends a JSON response with status 500 for unexpected errors.
 */
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
): void {
  console.error('Unhandled error:', err);
  if (res.headersSent) {
    // If the response has already been sent, delegate to the default Express handler.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (res as any).end();
    return;
  }
  res.status(500).json({ error: 'Internal Server Error' });
}
