import { User } from '../types';
import { UserRepository } from '../repositories';

export async function getUsers(): Promise<User[]> {
  return UserRepository.findAll();
}

export async function getUserById(id: string): Promise<User> {
  return UserRepository.findByIdOrFail(id);
}
