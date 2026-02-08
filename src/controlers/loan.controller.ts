import { Request, Response } from 'express';
import { LoanService } from '../services';
import { Loan } from '../types';

type LoanParams = {
  id: string;
};

type CreateLoanRequest = Request<{}, {}, Loan>;
type ReturnLoanRequest = Request<LoanParams>;

export function getLoans(_req: Request, res: Response) {
  const loans = LoanService.getLoans();

  res.status(200).json(loans);
}

export function createLoan(req: CreateLoanRequest, res: Response) {
  const body = req.body;
  const loan = LoanService.createLoan(body);

  res.status(201).json(loan);
}

export function returnLoan(req: ReturnLoanRequest, res: Response) {
  const { id } = req.params;
  const loan = LoanService.returnLoan(id);

  res.status(200).json(loan);
}
