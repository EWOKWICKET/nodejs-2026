import { Book } from '../types';
import { books } from '../storage/book';

export function getBooks(): Book[] {
  return books;
}

export function getBookById(id: string): Book | null {
  const book = books.find((book) => book.id === id);

  return book ?? null;
}

export function createBook(createBookDto: Book): Book {
  books.push({ ...createBookDto, id: (books.length + 1).toString() });

  return createBookDto;
}

export function updateBook(id: string, updateBookDto: Book): Book | null {
  // as no database is used, should use index for data modifying
  const bookIndex = books.findIndex((book) => book.id === id);
  if (bookIndex === -1) {
    return null;
  }

  books[bookIndex] = {
    ...books[bookIndex],
    ...updateBookDto,
  };

  return books[bookIndex];
}

export function deleteBook(id: string): boolean {
  const bookIndex = books.findIndex((book) => book.id === id);
  if (bookIndex === -1) {
    return false;
  }

  books[bookIndex].isDeleted = true;

  return true;
}
