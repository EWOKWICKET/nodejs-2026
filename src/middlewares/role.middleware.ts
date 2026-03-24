import { Request, Response, NextFunction } from 'express';
import { ForbiddenError } from '../errors';
import { JwtPayload, Role } from '../types';

export function requireRole(...roles: Role[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { role } = req.user as JwtPayload;

    if (!roles.includes(role)) {
      return next(new ForbiddenError({ message: 'Insufficient permissions' }));
    }

    next();
  };
}
