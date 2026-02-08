import { Book } from '../types';
import { BookRepository } from '../repositories';
import { CreateBookDto } from '../schemas';
import { BookBorrowedError } from '../errors';

export function getBooks(): Book[] {
  return BookRepository.findAll();
}

export function getBookByIdOrFail(id: string): Book {
  return BookRepository.findByIdOrFail(id);
}

export function createBook(createBookDto: CreateBookDto): Book {
  return BookRepository.create(createBookDto);
}

export function updateBook(id: string, updateBookDto: Partial<Book>): Book {
  return BookRepository.update(id, updateBookDto);
}

export function deleteBook(id: string): void {
  const book = getBookByIdOrFail(id);

  if (!book.available) {
    throw new BookBorrowedError({ message: 'Cannot delete a borrowed book' });
  }

  BookRepository.remove(id);
}

export function isBookAvailable(id: string): boolean {
  const book = getBookByIdOrFail(id);

  return book.available;
}
