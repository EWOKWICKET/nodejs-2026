import { Loan, LoanStatus, Role } from '../types';
import { LoanRepository, BookRepository } from '../repositories';
import { CreateLoanDto } from '../schemas';
import { BookBorrowedError, ForbiddenError } from '../errors';
import { withTransaction } from '../db/prisma';

export async function getLoans(userId: string, role: Role): Promise<Loan[]> {
  if (role === Role.ADMIN) {
    return LoanRepository.findAll();
  }

  return LoanRepository.findByUserId(userId);
}

export async function createLoan(createLoanDto: CreateLoanDto): Promise<Loan> {
  const book = await BookRepository.findByIdOrFail(createLoanDto.bookId);

  if (!book.available) {
    throw new BookBorrowedError({ message: 'Book is unavailable' });
  }

  const existingLoan = await LoanRepository.findActiveByBookId(createLoanDto.bookId);
  if (existingLoan) {
    throw new BookBorrowedError({ message: 'Book is already borrowed' });
  }

  return withTransaction(async (tx) => {
    const loan = await LoanRepository.create(createLoanDto, tx);
    await BookRepository.update(createLoanDto.bookId, { available: false }, tx);

    return loan;
  });
}

export async function returnLoan(id: string, userId: string, role: Role): Promise<Loan> {
  const loan = await LoanRepository.findByIdOrFail(id);

  if (role !== Role.ADMIN && loan.userId !== userId) {
    throw new ForbiddenError({ message: 'You can only return your own loans' });
  }

  return withTransaction(async (tx) => {
    const updated = await LoanRepository.update(
      id,
      {
        status: LoanStatus.RETURNED,
        returnDate: new Date(),
      },
      tx,
    );
    await BookRepository.update(updated.bookId, { available: true }, tx);

    return updated;
  });
}
