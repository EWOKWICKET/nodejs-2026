import { Request, Response } from 'express';
import { NotFoundError } from '../errors';

export function exceptionFilterMiddleware(err: Error, _req: Request, res: Response): void {
  if (err instanceof NotFoundError) {
    res.status(404).json({ message: err.message });

    return;
  }

  res.status(500).json({ message: 'Internal server error' });
}
