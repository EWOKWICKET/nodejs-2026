import { NotFoundError } from '../errors';
import { User } from '../types';
import { users } from '../storage/user';

export function findAll(): User[] {
  return users;
}

export function findByIdOrFail(id: string): User {
  const user = users.find((user) => user.id === id);
  if (!user) {
    throw new NotFoundError({ message: 'User not found' });
  }

  return user;
}

export function create(userData: User): User {
  const newUser = {
    ...userData,
    id: (users.length + 1).toString(),
  };
  users.push(newUser);

  return newUser;
}
