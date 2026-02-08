import { Book } from '../types';
import { books } from '../storage/book';
import { NotFoundError } from '../errors';

export function getBooks(): Book[] {
  return books;
}

export function getBookById(id: string): Book {
  const book = books.find((book) => book.id === id);
  if (!book) {
    throw new NotFoundError({ message: 'Book not found' });
  }

  return book;
}

export function createBook(createBookDto: Book): Book {
  books.push({ ...createBookDto, id: (books.length + 1).toString() });

  return createBookDto;
}

export function updateBook(id: string, updateBookDto: Book): Book {
  // as no database is used, should use index for data modifying
  const bookIndex = books.findIndex((book) => book.id === id);
  if (bookIndex === -1) {
    throw new NotFoundError({ message: 'Book not found' });
  }

  books[bookIndex] = {
    ...books[bookIndex],
    ...updateBookDto,
  };

  return books[bookIndex];
}

export function deleteBook(id: string): void {
  const bookIndex = books.findIndex((book) => book.id === id);
  if (bookIndex === -1) {
    throw new NotFoundError({ message: 'Book not found' });
  }

  books[bookIndex].isDeleted = true;
}
