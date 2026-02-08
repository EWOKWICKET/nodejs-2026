import { NotFoundError } from '../errors';
import { Book } from '../types';
import { books } from '../storage/book';

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

export function create(bookData: Book): Book {
  const newBook = {
    ...bookData,
    id: (books.length + 1).toString(),
    available: true,
  };
  books.push(newBook);

  return newBook;
}

export function update(id: string, data: Partial<Book>): Book {
  const index = findIndexByIdOrFail(id);
  books[index] = {
    ...books[index],
    ...data,
  };

  return books[index];
}

export function softDelete(id: string): void {
  const index = findIndexByIdOrFail(id);
  books[index].isDeleted = true;
}

function findIndexByIdOrFail(id: string): number {
  const bookIndex = books.findIndex((book) => book.id === id);
  if (bookIndex === -1) {
    throw new NotFoundError({ message: 'Book not found' });
  }

  return bookIndex;
}
