import { Loan, LoanStatus, Role } from '../types';
import { LoanRepository } from '../repositories';
import { CreateLoanDto } from '../schemas';
import * as BookService from './book.service';

export async function getLoans(userId: string, role: Role): Promise<Loan[]> {
  if (role === Role.ADMIN) {
    return LoanRepository.findAll();
  }

  return LoanRepository.findByUserId(userId);
}

export async function createLoan(createLoanDto: CreateLoanDto): Promise<Loan> {
  const book = await BookService.getBookByIdOrFail(createLoanDto.bookId);

  if (!book.available) {
    throw new Error('Book is unavailable');
  }

  const existingLoan = await LoanRepository.findActiveByBookId(createLoanDto.bookId);
  if (existingLoan) {
    throw new Error('Book is already borrowed');
  }

  const newLoan = await LoanRepository.create(createLoanDto);

  await BookService.updateBook(createLoanDto.bookId, { available: false });

  return newLoan;
}

export async function returnLoan(id: string): Promise<Loan> {
  const loan = await LoanRepository.update(id, {
    status: LoanStatus.RETURNED,
    returnDate: new Date(),
  });

  await BookService.updateBook(loan.bookId, { available: true });

  return loan;
}
