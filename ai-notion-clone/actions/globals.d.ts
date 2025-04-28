import { User } from '../types/types.ts';

declare global {
    interface CustomJwtSessionClaims  extends User{}
} 