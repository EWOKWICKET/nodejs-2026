import { join } from 'path';
import { Loan } from '../types';
import { createJsonStorage } from './json-storage';

const storage = createJsonStorage<Loan>(join(__dirname, '../../data/loans.json'));

export const loans = storage.items;
export const flushLoans = storage.flush;
