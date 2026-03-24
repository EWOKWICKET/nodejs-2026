import express from 'express';
import authRouter from './auth.router';
import bookRouter from './book.router';
import loanRouter from './loan.router';
import userRouter from './user.router';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/books', bookRouter);
router.use('/loans', loanRouter);
router.use('/users', userRouter);

export default router;
