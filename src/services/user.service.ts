import { User } from '../types';
import { UserRepository } from '../repositories';
import { NotFoundError } from '../errors';
import { deleteFileIfExists } from '../utils/fileStorage';

export async function getUsers(): Promise<User[]> {
  return UserRepository.findAll();
}

export async function getUserById(id: string): Promise<User> {
  return UserRepository.findByIdOrFail(id);
}

export async function uploadAvatar(userId: string, filePath: string): Promise<string> {
  const user = await UserRepository.findByIdOrFail(userId);

  if (user.avatarUrl) {
    deleteFileIfExists(user.avatarUrl);
  }

  // Store path relative to server root, prefixed with /
  const avatarUrl = `/${filePath.replace(/\\/g, '/')}`;
  await UserRepository.update(userId, { avatarUrl });

  return avatarUrl;
}

export async function deleteAvatar(userId: string): Promise<void> {
  const user = await UserRepository.findByIdOrFail(userId);

  if (!user.avatarUrl) {
    throw new NotFoundError({ message: 'No avatar to delete' });
  }

  deleteFileIfExists(user.avatarUrl);
  await UserRepository.update(userId, { avatarUrl: null });
}
