export class ConflictError extends Error {
  constructor({ message }: { message?: string }) {
    super(message ?? 'Conflict');
    this.name = 'ConflictError';
  }
}
