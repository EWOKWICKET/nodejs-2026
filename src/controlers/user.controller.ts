import { Request, Response } from 'express';
import { UserService } from '../services';
import { CreateUserDto } from '../schemas';

type UserParams = {
  id: string;
};

type GetUserByIdRequest = Request<UserParams>;
type CreateUserRequest = Request<{}, {}, CreateUserDto>;

export function getUsers(_req: Request, res: Response) {
  const users = UserService.getUsers();

  res.status(200).json(users);
}

export function getUserById(req: GetUserByIdRequest, res: Response) {
  const { id } = req.params;
  const user = UserService.getUserById(id);

  res.status(200).json(user);
}

export function createUser(req: CreateUserRequest, res: Response) {
  const body = req.body;
  const user = UserService.createUser(body);

  res.status(201).json(user);
}
