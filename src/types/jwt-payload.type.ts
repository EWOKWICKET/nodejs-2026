import { Role } from './user.type';

export type JwtPayload = {
  userId: string;
  email: string;
  role: Role;
};
