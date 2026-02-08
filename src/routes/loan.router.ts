import express from 'express';
import { LoanController } from '../controlers';

const router = express.Router();

router.get('/', LoanController.getLoans);

router.post('/', LoanController.createLoan);

router.post('/:id/return', LoanController.returnLoan);

export default router;
