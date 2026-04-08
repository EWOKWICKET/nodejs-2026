import { Book } from '../types';
import { BookRepository } from '../repositories';
import { CreateBookDto } from '../schemas';
import { BookBorrowedError } from '../errors';

export async function getBooks(): Promise<Book[]> {
  return BookRepository.findAll();
}

export async function getBookByIdOrFail(id: string): Promise<Book> {
  return BookRepository.findByIdOrFail(id);
}

export async function createBook(createBookDto: CreateBookDto): Promise<Book> {
  return BookRepository.create(createBookDto);
}

export async function updateBook(id: string, updateBookDto: Partial<Book>): Promise<Book> {
  return BookRepository.update(id, updateBookDto);
}

export async function deleteBook(id: string): Promise<void> {
  const book = await getBookByIdOrFail(id);

  if (!book.available) {
    throw new BookBorrowedError({ message: 'Cannot delete a borrowed book' });
  }

  await BookRepository.remove(id);
}
