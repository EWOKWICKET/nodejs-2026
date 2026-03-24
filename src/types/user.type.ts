export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export type User = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
};
