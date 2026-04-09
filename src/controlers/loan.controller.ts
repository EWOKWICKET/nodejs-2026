import { Request, Response } from 'express';
import { LoanService } from '../services';
import { CreateLoanDto } from '../schemas';

type LoanParams = {
  id: string;
};

type CreateLoanRequest = Request<{}, {}, CreateLoanDto>;
type ReturnLoanRequest = Request<LoanParams>;

export async function getLoans(req: Request, res: Response) {
  const loans = await LoanService.getLoans(req.user.userId, req.user.role);
  res.status(200).json(loans);
}

export async function createLoan(req: CreateLoanRequest, res: Response) {
  const loan = await LoanService.createLoan({ ...req.body, userId: req.user.userId });
  res.status(201).json(loan);
}

export async function returnLoan(req: ReturnLoanRequest, res: Response) {
  const loan = await LoanService.returnLoan(req.params.id, req.user.userId, req.user.role);
  res.status(200).json(loan);
}
