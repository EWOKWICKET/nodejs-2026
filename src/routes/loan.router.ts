import express from 'express';
import { LoanController } from '../controlers';
import { validate } from '../middlewares';
import { createLoanSchema } from '../schemas';

const router = express.Router();

router.get('/', LoanController.getLoans);

router.post('/', validate(createLoanSchema), LoanController.createLoan);

router.post('/:id/return', LoanController.returnLoan);

export default router;
