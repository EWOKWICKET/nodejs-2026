import { join } from 'path';
import { User } from '../types';
import { createJsonStorage } from './json-storage';

const storage = createJsonStorage<User>(join(__dirname, '../../data/users.json'));

export const users = storage.items;
export const flushUsers = storage.flush;
