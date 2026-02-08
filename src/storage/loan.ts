import { Loan, LoanStatus } from '../types';

export const loans: Loan[] = [
  {
    id: '1',
    userId: '1',
    bookId: '1',
    loanDate: new Date(),
    returnDate: new Date(),
    status: LoanStatus.ACTIVE,
  },
];
