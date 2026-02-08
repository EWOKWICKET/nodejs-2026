import { User } from '../types';
import { users } from '../storage/user';

export function getUsers(): User[] {
  return users;
}

export function getUserById(id: string): User | null {
  const user = users.find((user) => user.id === id);

  return user ?? null;
}

export function createUser(createUserDto: User): User {
  users.push({ ...createUserDto, id: (users.length + 1).toString() });

  return createUserDto;
}
