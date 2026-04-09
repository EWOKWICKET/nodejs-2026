import { Request, Response } from 'express';
import { AuthService } from '../services';
import { RegisterDto, LoginDto, RequestPasswordResetDto, ResetPasswordDto } from '../schemas';

type RegisterRequest = Request<{}, {}, RegisterDto>;
type LoginRequest = Request<{}, {}, LoginDto>;
type RequestPasswordResetRequest = Request<{}, {}, RequestPasswordResetDto>;
type ResetPasswordRequest = Request<{}, {}, ResetPasswordDto>;

export async function register(req: RegisterRequest, res: Response) {
  const user = await AuthService.register(req.body);
  res.status(201).json(user);
}

export async function login(req: LoginRequest, res: Response) {
  const result = await AuthService.login(req.body);
  res.status(200).json(result);
}

export async function requestPasswordReset(req: RequestPasswordResetRequest, res: Response) {
  await AuthService.requestPasswordReset(req.body);
  res.status(200).json({ message: 'The letter with the instructions has been sent.' });
}

export async function resetPassword(req: ResetPasswordRequest, res: Response) {
  await AuthService.resetPassword(req.body);
  res.status(200).json({ message: 'Password changed successfully.' });
}
