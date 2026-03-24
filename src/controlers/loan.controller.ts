import { Request, Response } from 'express';
import { LoanService } from '../services';
import { CreateLoanDto } from '../schemas';
import { JwtPayload } from '../types';

type LoanParams = { id: string };

type CreateLoanRequest = Request<{}, {}, CreateLoanDto>;
type ReturnLoanRequest = Request<LoanParams>;

export async function getLoans(req: Request, res: Response) {
  const { userId, role } = (req as unknown as { user: JwtPayload }).user;
  const loans = await LoanService.getLoans(userId, role);
  res.status(200).json(loans);
}

export async function createLoan(req: CreateLoanRequest, res: Response) {
  const { userId } = (req as unknown as { user: JwtPayload }).user;
  const loan = await LoanService.createLoan({ ...req.body, userId });
  res.status(201).json(loan);
}

export async function returnLoan(req: ReturnLoanRequest, res: Response) {
  const loan = await LoanService.returnLoan(req.params.id);
  res.status(200).json(loan);
}
