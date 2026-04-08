import { Loan, LoanStatus, Role } from '../types';
import { LoanRepository } from '../repositories';
import { CreateLoanDto } from '../schemas';
import * as BookService from './book.service';
import { BookBorrowedError, ForbiddenError } from '../errors';

export async function getLoans(userId: string, role: Role): Promise<Loan[]> {
  if (role === Role.ADMIN) {
    return LoanRepository.findAll();
  }

  return LoanRepository.findByUserId(userId);
}

export async function createLoan(createLoanDto: CreateLoanDto): Promise<Loan> {
  const book = await BookService.getBookByIdOrFail(createLoanDto.bookId);

  if (!book.available) {
    throw new BookBorrowedError({ message: 'Book is unavailable' });
  }

  const existingLoan = await LoanRepository.findActiveByBookId(createLoanDto.bookId);
  if (existingLoan) {
    throw new BookBorrowedError({ message: 'Book is already borrowed' });
  }

  const newLoan = await LoanRepository.create(createLoanDto);

  await BookService.updateBook(createLoanDto.bookId, { available: false });

  return newLoan;
}

export async function returnLoan(id: string, userId: string, role: Role): Promise<Loan> {
  const loan = await LoanRepository.findByIdOrFail(id);

  if (role !== Role.ADMIN && loan.userId !== userId) {
    throw new ForbiddenError({ message: 'You can only return your own loans' });
  }

  const updated = await LoanRepository.update(id, {
    status: LoanStatus.RETURNED,
    returnDate: new Date(),
  });

  await BookService.updateBook(updated.bookId, { available: true });

  return updated;
}
