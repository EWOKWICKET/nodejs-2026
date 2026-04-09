import { User } from '../types';
import { UserRepository } from '../repositories';
import { NotFoundError } from '../errors';
import { uploadToCloudinary, deleteFromCloudinary } from '../clients/cloudinary.client';
import { withTransaction } from '../db/prisma';

export async function getUsers(): Promise<User[]> {
  return UserRepository.findAll();
}

export async function getUserById(id: string): Promise<User> {
  return UserRepository.findByIdOrFail(id);
}

export async function uploadAvatar(userId: string, buffer: Buffer): Promise<string> {
  const avatarUrl = await uploadToCloudinary(buffer, userId);

  try {
    await UserRepository.update(userId, { avatarUrl });
  } catch (error) {
    await deleteFromCloudinary(userId);
    throw error;
  }

  return avatarUrl;
}

export async function deleteAvatar(userId: string): Promise<void> {
  const user = await UserRepository.findByIdOrFail(userId);

  if (!user.avatarUrl) {
    throw new NotFoundError({ message: 'No avatar to delete' });
  }

  await withTransaction(async (tx) => {
    await UserRepository.update(userId, { avatarUrl: null }, tx);
    await deleteFromCloudinary(userId);
  });
}
