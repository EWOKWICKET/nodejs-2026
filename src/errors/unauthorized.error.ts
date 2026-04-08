export class UnauthorizedError extends Error {
  constructor({ message }: { message?: string }) {
    super(message ?? 'Unauthorized');
    this.name = 'UnauthorizedError';
  }
}
