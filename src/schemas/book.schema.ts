import z, { ZodType } from 'zod';
import { Book } from '../types';

export const createBookSchema = z.object({
  title: z
    .string()
    .min(5, 'Title should be at least 5 characters')
    .max(100, 'Title must be less than 100 characters'),
  author: z
    .string()
    .min(5, 'Author should be at least 5 characters')
    .max(100, 'Author must be less than 100 characters'),
  year: z.number().int().min(0).max(new Date().getFullYear()),
  isbn: z.string().min(1, 'ISBN is required'),
}) satisfies ZodType<Partial<Book>>;

export const updateBookSchema = z.object({
  title: z
    .string()
    .min(5, 'Title should be at least 5 characters')
    .max(100, 'Title must be less than 100 characters')
    .optional(),
  author: z
    .string()
    .min(5, 'Author should be at least 5 characters')
    .max(100, 'Author must be less than 100 characters')
    .optional(),
  year: z.number().int().min(0).max(new Date().getFullYear()).optional(),
  isbn: z.string().min(1, 'ISBN is required').optional(),
}) satisfies ZodType<Partial<Book>>;

export type CreateBookDto = z.infer<typeof createBookSchema>;
export type UpdateBookDto = z.infer<typeof updateBookSchema>;
