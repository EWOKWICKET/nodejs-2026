import { Request, Response } from 'express';
import { UserService } from '../services';

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
  const user = await UserService.getUserById(req.user.userId);
  res.status(200).json(omitPasswordHash(user));
}

export async function uploadAvatar(req: Request, res: Response) {
  if (!req.file) {
    res.status(400).json({ message: 'No file uploaded' });

    return;
  }

  const avatarUrl = await UserService.uploadAvatar(req.user.userId, req.file.buffer);
  res.status(200).json({ message: 'Avatar updated successfully.', avatarUrl });
}

export async function deleteAvatar(req: Request, res: Response) {
  await UserService.deleteAvatar(req.user.userId);
  res.status(200).json({ message: 'Avatar deleted successfully.' });
}

function omitPasswordHash<T extends { passwordHash: string }>(user: T): Omit<T, 'passwordHash'> {
  const { passwordHash: _, ...rest } = user;

  return rest;
}
