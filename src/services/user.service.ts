import { User } from '../types';
import { UserRepository } from '../repositories';

export function getUsers(): User[] {
  return UserRepository.findAll();
}

export function getUserById(id: string): User {
  return UserRepository.findByIdOrFail(id);
}

export function createUser(createUserDto: User): User {
  return UserRepository.create(createUserDto);
}
