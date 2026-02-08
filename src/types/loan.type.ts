import { SoftDelete } from './soft-delete';

export enum LoanStatus {
  ACTIVE = 'ACTIVE',
  RETURNED = 'RETURNED',
}

export type Loan = SoftDelete & {
  id: string;
  userId: string;
  bookId: string;
  loanDate: Date;
  returnDate?: Date | null;
  status: LoanStatus;
};
