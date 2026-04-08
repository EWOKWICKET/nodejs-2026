import { Request, Response } from 'express';
import { BookService } from '../services';
import { CreateBookDto, UpdateBookDto } from '../schemas';

type BookParams = {
  id: string;
};

type GetBookByIdRequest = Request<BookParams>;
type CreateBookRequest = Request<{}, {}, CreateBookDto>;
type UpdateBookRequest = Request<BookParams, {}, UpdateBookDto>;
type DeleteBookRequest = Request<BookParams>;

export async function getBooks(_req: Request, res: Response) {
  const books = await BookService.getBooks();

  res.status(200).json(books);
}

export async function getBookById(req: GetBookByIdRequest, res: Response) {
  const book = await BookService.getBookByIdOrFail(req.params.id);

  res.status(200).json(book);
}

export async function createBook(req: CreateBookRequest, res: Response) {
  const book = await BookService.createBook(req.body);

  res.status(201).json(book);
}

export async function updateBook(req: UpdateBookRequest, res: Response) {
  const book = await BookService.updateBook(req.params.id, req.body);

  res.status(200).json(book);
}

export async function deleteBook(req: DeleteBookRequest, res: Response) {
  await BookService.deleteBook(req.params.id);

  res.status(204).send();
}
