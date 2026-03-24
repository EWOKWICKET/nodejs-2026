export class ForbiddenError extends Error {
  constructor({ message }: { message?: string }) {
    super(message ?? 'Forbidden');
    this.name = 'ForbiddenError';
  }
}
