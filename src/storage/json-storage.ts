import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { dirname } from 'path';

// created on server init. Updated on every request. Stored in data folder in project root
export function createJsonStorage<T>(filePath: string): { items: T[]; flush: () => void } {
  const dir = dirname(filePath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  let items: T[];

  if (existsSync(filePath)) {
    const raw = readFileSync(filePath, 'utf-8');
    items = JSON.parse(raw);
  } else {
    items = [];
    writeFileSync(filePath, JSON.stringify(items, null, 2));
  }

  const flush = () => {
    writeFileSync(filePath, JSON.stringify(items, null, 2));
  };

  return { items, flush };
}
