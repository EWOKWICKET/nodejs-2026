import { Loan, LoanStatus } from '../types';
import { LoanRepository } from '../repositories';
import { CreateLoanDto } from '../schemas';
import * as BookService from './book.service';
import { flushLoans } from '../storage/loan';

export function getLoans(): Loan[] {
  return LoanRepository.findAll();
}

export function createLoan(createLoanDto: CreateLoanDto): Loan {
  if (!BookService.isBookAvailable(createLoanDto.bookId)) {
    throw new Error('Book is unavailable');
  }

  const existingLoan = LoanRepository.findByBookId(createLoanDto.bookId);
  if (existingLoan) {
    throw new Error('Book is already borrowed');
  }

  const newLoan = LoanRepository.create(createLoanDto);

  BookService.updateBook(createLoanDto.bookId, { available: false });

  return newLoan;
}

export function returnLoan(id: string): Loan {
  const loan = LoanRepository.findByIdOrFail(id);

  loan.status = LoanStatus.RETURNED;
  loan.returnDate = new Date();
  flushLoans();

  BookService.updateBook(loan.bookId, { available: true });

  return loan;
}
