import express from 'express';
import { BookController } from '../controlers';
import { validate } from '../middlewares';
import { createBookSchema, updateBookSchema } from '../schemas';

const router = express.Router();

router.get('/', BookController.getBooks);

router.get('/:id', BookController.getBookById);

router.post('/', validate(createBookSchema), BookController.createBook);

router.put('/:id', validate(updateBookSchema), BookController.updateBook);

router.delete('/:id', BookController.deleteBook);

export default router;
