import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { BookBorrowedError, NotFoundError } from '../errors';

export function exceptionFilterMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof NotFoundError) {
    res.status(404).json({ message: err.message });

    return;
  }

  if (err instanceof BookBorrowedError) {
    res.status(400).json({ message: err.message });

    return;
  }

  if (err instanceof ZodError) {
    res.status(400).json({ message: 'Validation error', errors: err.issues });

    return;
  }

  res.status(500).json({ message: 'Internal server error' });
}
