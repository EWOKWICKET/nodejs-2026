import { prisma, TransactionClient } from '../db/prisma';
import { NotFoundError } from '../errors';
import { User } from '../types';

export async function findAll(): Promise<User[]> {
  return prisma.user.findMany();
}

export async function findByIdOrFail(id: string): Promise<User> {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    throw new NotFoundError({ message: 'User not found' });
  }

  return user;
}

export async function findByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { email } });
}

export async function create(data: Omit<User, 'id'>): Promise<User> {
  return prisma.user.create({ data });
}

export async function update(
  id: string,
  data: Partial<Omit<User, 'id'>>,
  tx?: TransactionClient,
): Promise<User> {
  return (tx ?? prisma).user.update({ where: { id }, data });
}
