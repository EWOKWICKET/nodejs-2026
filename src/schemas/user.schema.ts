import z, { ZodType } from 'zod';
import { User } from '../types';

export const createUserSchema = z.object({
  name: z
    .string()
    .min(5, 'Name should be at least 5 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z.email('Invalid email address'),
}) satisfies ZodType<Partial<User>>;

export type CreateUserDto = z.infer<typeof createUserSchema>;
