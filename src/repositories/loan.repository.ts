import { NotFoundError } from '../errors';
import { Loan } from '../types';
import { loans } from '../storage/loan';

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

export function create(loanData: Loan): Loan {
  const newLoan = {
    ...loanData,
    id: (loans.length + 1).toString(),
  };
  loans.push(newLoan);

  return newLoan;
}
