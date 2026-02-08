import { join } from 'path';
import { Book } from '../types';
import { createJsonStorage } from './json-storage';

const storage = createJsonStorage<Book>(join(__dirname, '../../data/books.json'));

export const books = storage.items;
export const flushBooks = storage.flush;
