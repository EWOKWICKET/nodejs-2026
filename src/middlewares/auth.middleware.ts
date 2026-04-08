import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../errors';
import { JwtPayload } from '../types';

const JWT_SECRET = process.env.JWT_SECRET!;

export function authenticate(req: Request, _res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return next(new UnauthorizedError({ message: 'Missing token' }));
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    if (!payload.userId) {
      return next(new UnauthorizedError({ message: 'Invalid token payload' }));
    }
    (req as unknown as { user: JwtPayload }).user = payload;
    next();
  } catch {
    next(new UnauthorizedError({ message: 'Invalid or expired token' }));
  }
}
