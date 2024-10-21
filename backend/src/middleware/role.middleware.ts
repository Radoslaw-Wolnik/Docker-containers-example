import { Response, NextFunction } from 'express';
import { ForbiddenError } from '../utils/custom-errors.util';

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user.role !== 'admin') {
    return next(new ForbiddenError('Admin access required'));
  }
  next();
};