import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../types/types';
import { BAD_REQUEST, UNAUTHORIZED } from '../controllers/htttpStatusCodes';

const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(UNAUTHORIZED).send('Access denied');
  }
  try {
    const decoded = jwt.verify(token, 'secret') as { id: string };
    req.user = decoded;
    next();
  } catch (error) {
    res.status(BAD_REQUEST).send('Invalid token');
  }
};

export default auth;
