import { prisma, TransactionClient } from '../db/prisma';
import { NotFoundError } from '../errors';
import { Book } from '../types';
import { CreateBookDto } from '../schemas';

export async function findAll(): Promise<Book[]> {
  return prisma.book.findMany();
}

export async function findByIdOrFail(id: string): Promise<Book> {
  const book = await prisma.book.findUnique({ where: { id } });
  if (!book) {
    throw new NotFoundError({ message: 'Book not found' });
  }

  return book;
}

export async function create(bookData: CreateBookDto): Promise<Book> {
  return prisma.book.create({
    data: { ...bookData, available: true },
  });
}

export async function update(
  id: string,
  data: Partial<Book>,
  tx?: TransactionClient,
): Promise<Book> {
  return (tx ?? prisma).book.update({ where: { id }, data });
}

export async function remove(id: string): Promise<void> {
  await prisma.book.delete({ where: { id } });
}
