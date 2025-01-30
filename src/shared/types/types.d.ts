import { JwtPayload as DefaultJwtPayload } from 'jsonwebtoken';

interface CustomJwtPayload extends DefaultJwtPayload {
  userId: string;
  username: string;
  role: string; 
}

declare global {
  namespace Express {
    interface Request {
      user: CustomJwtPayload | null;
    }
  }
}