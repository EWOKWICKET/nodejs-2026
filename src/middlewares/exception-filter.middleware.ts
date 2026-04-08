import { Request, NextFunction } from 'express';
import { Response } from 'express-serve-static-core';
import { ZodError } from 'zod';
import {
  BookBorrowedError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from '../errors';

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

  if (err instanceof UnauthorizedError) {
    res.status(401).json({ message: err.message });

    return;
  }

  if (err instanceof ConflictError) {
    res.status(409).json({ message: err.message });

    return;
  }

  if (err instanceof ForbiddenError) {
    res.status(403).json({ message: err.message });

    return;
  }

  if ('code' in err && (err as { code: string }).code === 'P2025') {
    res.status(404).json({ message: 'Record not found' });

    return;
  }

  res.status(500).json({ message: 'Internal server error' });
}
