import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories';
import { RegisterDto, LoginDto } from '../schemas';
import { UnauthorizedError } from '../errors';
import { JwtPayload, Role } from '../types';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function register(dto: RegisterDto) {
  const existing = await UserRepository.findByEmail(dto.email);
  if (existing) {
    throw new Error('Email already in use');
  }

  const passwordHash = await bcrypt.hash(dto.password, 10);
  const user = await UserRepository.create({
    name: dto.name,
    email: dto.email,
    passwordHash,
    role: Role.USER,
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

  return { token };
}
