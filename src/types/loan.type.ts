import { LoanStatus } from '../db/generated/prisma/enums';

export { LoanStatus };

export type Loan = {
  id: string;
  userId: string;
  bookId: string;
  loanDate: Date;
  returnDate?: Date | null;
  status: LoanStatus;
};
