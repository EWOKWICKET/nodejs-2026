import { Book } from '../types';
import { BookRepository } from '../repositories';
import { CreateBookDto } from '../schemas';

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
  BookRepository.softDelete(id);
}

export function isBookAvailable(id: string): boolean {
  const book = getBookByIdOrFail(id);

  return book.available;
}
