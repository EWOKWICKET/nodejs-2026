import { SoftDelete } from './soft-delete';

export type Book = SoftDelete & {
  id: string;
  title: string;
  author: string;
  year: number;
  isbn: string;
  available: boolean;
};
