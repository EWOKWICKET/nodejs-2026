import { Request, Response } from 'express';
import { UserService } from '../services';
import { JwtPayload } from '../types';

type UserParams = { id: string };
type GetUserByIdRequest = Request<UserParams>;

export async function getUsers(_req: Request, res: Response) {
  const users = await UserService.getUsers();
  res.status(200).json(users.map(omitPasswordHash));
}

export async function getUserById(req: GetUserByIdRequest, res: Response) {
  const user = await UserService.getUserById(req.params.id);
  res.status(200).json(omitPasswordHash(user));
}

export async function getMe(req: Request, res: Response) {
  const { userId } = (req as unknown as { user: JwtPayload }).user;
  const user = await UserService.getUserById(userId);
  res.status(200).json(omitPasswordHash(user));
}

export async function uploadAvatar(req: Request, res: Response) {
  const { userId } = (req as unknown as { user: JwtPayload }).user;

  if (!req.file) {
    res.status(400).json({ message: 'No file uploaded' });
    return;
  }

  const avatarUrl = await UserService.uploadAvatar(userId, req.file.path);
  res.status(200).json({ message: 'Аватарку успішно оновлено.', avatarUrl });
}

export async function deleteAvatar(req: Request, res: Response) {
  const { userId } = (req as unknown as { user: JwtPayload }).user;
  await UserService.deleteAvatar(userId);
  res.status(200).json({ message: 'Аватарку видалено.' });
}

function omitPasswordHash<T extends { passwordHash: string }>(user: T): Omit<T, 'passwordHash'> {
  const { passwordHash: _, ...rest } = user;

  return rest;
}
