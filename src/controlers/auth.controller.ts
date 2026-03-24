import { Request, Response } from 'express';
import { AuthService } from '../services';
import { RegisterDto, LoginDto } from '../schemas';

type RegisterRequest = Request<{}, {}, RegisterDto>;
type LoginRequest = Request<{}, {}, LoginDto>;

export async function register(req: RegisterRequest, res: Response) {
  const user = await AuthService.register(req.body);
  res.status(201).json(user);
}

export async function login(req: LoginRequest, res: Response) {
  const result = await AuthService.login(req.body);
  res.status(200).json(result);
}
