import z, { ZodType } from 'zod';
import { Loan } from '../types';

export const createLoanSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  bookId: z.string().min(1, 'Book ID is required'),
}) satisfies ZodType<Partial<Loan>>;

export type CreateLoanDto = z.infer<typeof createLoanSchema>;
