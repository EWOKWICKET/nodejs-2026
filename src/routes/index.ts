import express from 'express';
import bookRouter from './book.router';
import loanRouter from './loan.router';
import userRouter from './user.router';

const router = express.Router();

router.use('/books', bookRouter);
router.use('/loans', loanRouter);
router.use('/users', userRouter);

export default router;
