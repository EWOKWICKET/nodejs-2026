import express from 'express';
import { BookController } from '../controlers';

const router = express.Router();

router.get('/', BookController.getBooks);

router.get('/:id', BookController.getBookById);

router.post('/', BookController.createBook);

router.put('/:id', BookController.updateBook);

router.delete('/:id', BookController.deleteBook);

export default router;
