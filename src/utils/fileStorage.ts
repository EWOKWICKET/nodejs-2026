import fs from 'fs';
import path from 'path';

export function deleteFileIfExists(urlPath: string): void {
  const absolutePath = path.join(process.cwd(), urlPath);
  if (fs.existsSync(absolutePath)) {
    fs.unlinkSync(absolutePath);
  }
}
