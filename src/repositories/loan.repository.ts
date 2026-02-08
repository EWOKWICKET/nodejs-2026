import { NotFoundError } from '../errors';
import { Loan, LoanStatus } from '../types';
import { loans, flushLoans } from '../storage/loan';
import { CreateLoanDto } from '../schemas';

export function findAll(): Loan[] {
  return loans;
}

export function findByIdOrFail(id: string): Loan {
  const loan = loans.find((loan) => loan.id === id);
  if (!loan) {
    throw new NotFoundError({ message: 'Loan not found' });
  }

  return loan;
}

export function findByBookId(bookId: string): Loan | null {
  const loan = loans.find((loan) => loan.bookId === bookId);

  return loan ?? null;
}

export function create(loanData: CreateLoanDto): Loan {
  const newLoan: Loan = {
    ...loanData,
    id: (loans.length + 1).toString(),
    loanDate: new Date(),
    status: LoanStatus.ACTIVE,
  };
  loans.push(newLoan);
  flushLoans();

  return newLoan;
}
