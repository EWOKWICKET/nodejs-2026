import { User } from '../types';
import { users } from '../storage/user';
import { NotFoundError } from '../errors';

export function getUsers(): User[] {
  return users;
}

export function getUserById(id: string): User {
  const user = users.find((user) => user.id === id);
  if (!user) {
    throw new NotFoundError({ message: 'User not found' });
  }

  return user;
}

export function createUser(createUserDto: User): User {
  users.push({ ...createUserDto, id: (users.length + 1).toString() });

  return createUserDto;
}
