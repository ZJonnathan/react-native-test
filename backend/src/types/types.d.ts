import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

export type MongoError = Error & { code?: number };