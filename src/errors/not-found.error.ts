export class NotFoundError extends Error {
  constructor({ message }: { message?: string }) {
    super(message ?? 'Resource not found');
    this.name = 'NotFoundError';
  }
}
