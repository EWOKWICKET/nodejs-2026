import { Role } from '../db/generated/prisma/enums';

export { Role };

export type User = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
  avatarUrl: string | null;
};
