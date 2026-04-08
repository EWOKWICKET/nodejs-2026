import { User } from '../types';
import { UserRepository } from '../repositories';
import { NotFoundError } from '../errors';
import { uploadToCloudinary, deleteFromCloudinary } from '../storage/cloudinary';

export async function getUsers(): Promise<User[]> {
  return UserRepository.findAll();
}

export async function getUserById(id: string): Promise<User> {
  return UserRepository.findByIdOrFail(id);
}

export async function uploadAvatar(userId: string, buffer: Buffer): Promise<string> {
  const avatarUrl = await uploadToCloudinary(buffer, userId);
  await UserRepository.update(userId, { avatarUrl });

  return avatarUrl;
}

export async function deleteAvatar(userId: string): Promise<void> {
  const user = await UserRepository.findByIdOrFail(userId);

  if (!user.avatarUrl) {
    throw new NotFoundError({ message: 'No avatar to delete' });
  }

  await deleteFromCloudinary(userId);
  await UserRepository.update(userId, { avatarUrl: null });
}
