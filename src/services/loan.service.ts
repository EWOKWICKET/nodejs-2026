import { Loan, LoanStatus } from '../types';
import { loans } from '../storage/loan';
import { NotFoundError } from '../errors';

export function getLoans(): Loan[] {
  return loans;
}

export function createLoan(createLoanDto: Loan): Loan {
  const newLoan = {
    ...createLoanDto,
    id: (loans.length + 1).toString(),
    loanDate: new Date(),
    status: LoanStatus.ACTIVE,
  };
  loans.push(newLoan);

  return newLoan;
}

export function returnLoan(id: string): Loan {
  const loan = loans.find((loan) => loan.id === id);
  if (!loan) {
    throw new NotFoundError({ message: 'Loan not found' });
  }

  loan.status = LoanStatus.RETURNED;
  loan.returnDate = new Date();

  return loan;
}
