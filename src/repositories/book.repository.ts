import { NotFoundError } from '../errors';
import { Book } from '../types';
import { books, flushBooks } from '../storage/book';
import { CreateBookDto } from '../schemas';

export function findAll(): Book[] {
  return books;
}

export function findByIdOrFail(id: string): Book {
  const book = books.find((book) => book.id === id);
  if (!book) {
    throw new NotFoundError({ message: 'Book not found' });
  }

  return book;
}

export function create(bookData: CreateBookDto): Book {
  const newBook = {
    ...bookData,
    id: (books.length + 1).toString(),
    available: true,
  };
  books.push(newBook);
  flushBooks();

  return newBook;
}

export function update(id: string, data: Partial<Book>): Book {
  const index = findIndexByIdOrFail(id);
  books[index] = {
    ...books[index],
    ...data,
  };
  flushBooks();

  return books[index];
}

export function remove(id: string): void {
  const index = findIndexByIdOrFail(id);
  books.splice(index, 1);
  flushBooks();
}

function findIndexByIdOrFail(id: string): number {
  const bookIndex = books.findIndex((book) => book.id === id);
  if (bookIndex === -1) {
    throw new NotFoundError({ message: 'Book not found' });
  }

  return bookIndex;
}
