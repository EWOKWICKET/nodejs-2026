export class BookBorrowedError extends Error {
  constructor({ message }: { message?: string }) {
    super(message ?? 'Book is currently borrowed');
    this.name = 'BookBorrowedError';
  }
}
