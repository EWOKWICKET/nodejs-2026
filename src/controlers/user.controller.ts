import { Request, Response } from 'express';
import { UserService } from '../services';
import { User } from '../types';

type UserParams = {
  id: string;
};

type GetUserByIdRequest = Request<UserParams>;
type CreateUserRequest = Request<{}, {}, User>;

export const getUsers = (_req: Request, res: Response) => {
  const users = UserService.getUsers();

  res.status(200).json(users);
};

export const getUserById = (req: GetUserByIdRequest, res: Response) => {
  const { id } = req.params;
  const user = UserService.getUserById(id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json(user);
};

export const createUser = (req: CreateUserRequest, res: Response) => {
  const body = req.body;
  const user = UserService.createUser(body);

  res.status(201).json(user);
};
