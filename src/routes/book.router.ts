import express from 'express';
import { BookController } from '../controlers';
import { authenticate, requireRole, validate } from '../middlewares';
import { createBookSchema, updateBookSchema } from '../schemas';
import { Role } from '../types';

const router = express.Router();

router.get('/', BookController.getBooks);

router.get('/:id', BookController.getBookById);

router.post(
  '/',
  authenticate,
  requireRole(Role.ADMIN),
  validate(createBookSchema),
  BookController.createBook,
);

router.put(
  '/:id',
  authenticate,
  requireRole(Role.ADMIN),
  validate(updateBookSchema),
  BookController.updateBook,
);

router.delete('/:id', authenticate, requireRole(Role.ADMIN), BookController.deleteBook);

export default router;
