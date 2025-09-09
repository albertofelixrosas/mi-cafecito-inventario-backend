import { Request } from 'express';
import { UserFromJwt } from '../interfaces/user-from-jwt.interface';

export interface AuthenticatedRequest extends Request {
  user: UserFromJwt;
}
