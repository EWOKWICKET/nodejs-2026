import { prisma } from '../db/prisma';
import { NotFoundError } from '../errors';
import { Loan, LoanStatus } from '../types';
import { CreateLoanDto } from '../schemas';

export async function findAll(): Promise<Loan[]> {
  return prisma.loan.findMany();
}

export async function findByUserId(userId: string): Promise<Loan[]> {
  return prisma.loan.findMany({ where: { userId } });
}

export async function findByIdOrFail(id: string): Promise<Loan> {
  const loan = await prisma.loan.findUnique({ where: { id } });
  if (!loan) {
    throw new NotFoundError({ message: 'Loan not found' });
  }

  return loan;
}

export async function findActiveByBookId(bookId: string): Promise<Loan | null> {
  return prisma.loan.findFirst({ where: { bookId, status: LoanStatus.ACTIVE } });
}

export async function create(loanData: CreateLoanDto): Promise<Loan> {
  return prisma.loan.create({
    data: { ...loanData, loanDate: new Date(), status: LoanStatus.ACTIVE },
  });
}

export async function update(id: string, data: Partial<Loan>): Promise<Loan> {
  return prisma.loan.update({ where: { id }, data });
}
