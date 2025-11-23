import { Request } from 'express';
import { Database } from './database.types';

export type ApiKey = Database['public']['Tables']['api_key']['Row'];

export interface AuthenticatedRequest extends Request {
  scopes?: string[];
}
