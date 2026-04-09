import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';

function fileFilter(_req: Request, file: Express.Multer.File, cb: FileFilterCallback) {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG and PNG images are allowed'));
  }
}

export const uploadAvatar = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single('avatar');
