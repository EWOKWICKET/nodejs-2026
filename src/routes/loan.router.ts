import express from 'express';
import { LoanController } from '../controlers';
import { authenticate, validate } from '../middlewares';
import { createLoanSchema } from '../schemas';

const router = express.Router();

router.get('/', authenticate, LoanController.getLoans);
router.post('/', authenticate, validate(createLoanSchema), LoanController.createLoan);
router.post('/:id/return', authenticate, LoanController.returnLoan);

export default router;
