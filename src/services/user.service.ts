import fs from 'fs';
import path from 'path';
import { User } from '../types';
import { UserRepository } from '../repositories';
import { NotFoundError } from '../errors';

export async function getUsers(): Promise<User[]> {
  return UserRepository.findAll();
}

export async function getUserById(id: string): Promise<User> {
  return UserRepository.findByIdOrFail(id);
}

export async function uploadAvatar(userId: string, filePath: string): Promise<string> {
  const user = await UserRepository.findByIdOrFail(userId);

  // Delete old avatar file if it exists
  if (user.avatarUrl) {
    const oldPath = path.join(process.cwd(), user.avatarUrl);
    if (fs.existsSync(oldPath)) {
      fs.unlinkSync(oldPath);
    }
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

  const filePath = path.join(process.cwd(), user.avatarUrl);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  await UserRepository.update(userId, { avatarUrl: null });
}
