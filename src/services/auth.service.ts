import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories';
import { RegisterDto, LoginDto } from '../schemas';
import { UnauthorizedError, ConflictError, BadRequestError } from '../errors';
import { JwtPayload, Role } from '../types';
import { RequestPasswordResetDto, ResetPasswordDto } from '../schemas';
import { sendPasswordResetEmail } from '../utils/sendMail';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function register(dto: RegisterDto) {
  const existing = await UserRepository.findByEmail(dto.email);
  if (existing) {
    throw new ConflictError({ message: 'Email already in use' });
  }

  const passwordHash = await bcrypt.hash(dto.password, 10);
  const user = await UserRepository.create({
    name: dto.name,
    email: dto.email,
    passwordHash,
    role: Role.USER,
    avatarUrl: null,
  });

  const { passwordHash: _, ...rest } = user;

  return rest;
}

export async function login(dto: LoginDto) {
  const user = await UserRepository.findByEmail(dto.email);
  if (!user) {
    throw new UnauthorizedError({ message: 'Invalid credentials' });
  }

  const valid = await bcrypt.compare(dto.password, user.passwordHash);
  if (!valid) {
    throw new UnauthorizedError({ message: 'Invalid credentials' });
  }

  const payload: JwtPayload = { userId: user.id, email: user.email, role: user.role };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

  const { passwordHash: _, ...userPublic } = user;

  return { token, user: userPublic };
}

export async function requestPasswordReset(dto: RequestPasswordResetDto): Promise<void> {
  const user = await UserRepository.findByEmail(dto.email);
  // Always return silently — do not reveal whether email exists
  if (!user) return;

  const resetToken = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '10m' });
  await sendPasswordResetEmail(user.email, resetToken);
}

export async function resetPassword(dto: ResetPasswordDto): Promise<void> {
  let email: string;
  try {
    const payload = jwt.verify(dto.token, JWT_SECRET) as { email: string };
    email = payload.email;
  } catch {
    throw new BadRequestError({ message: 'Invalid or expired token' });
  }

  const user = await UserRepository.findByEmail(email);
  if (!user) {
    throw new BadRequestError({ message: 'Invalid or expired token' });
  }

  const passwordHash = await bcrypt.hash(dto.password, 10);
  await UserRepository.update(user.id, { passwordHash });
}
