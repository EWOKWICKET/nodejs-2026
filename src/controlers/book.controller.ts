import { Request, Response } from 'express';
import { BookService } from '../services';
import { Book } from '../types';

type BookParams = {
  id: string;
};

type GetBookByIdRequest = Request<BookParams>;
type CreateBookRequest = Request<{}, {}, Book>;
type UpdateBookRequest = Request<BookParams, {}, Book>;
type DeleteBookRequest = Request<BookParams>;

export function getBooks(_req: Request, res: Response) {
  const books = BookService.getBooks();

  res.status(200).json(books);
}

export function getBookById(req: GetBookByIdRequest, res: Response) {
  const { id } = req.params;
  const book = BookService.getBookByIdOrFail(id);

  res.status(200).json(book);
}

export function createBook(req: CreateBookRequest, res: Response) {
  const body = req.body;
  const book = BookService.createBook(body);

  res.status(201).json(book);
}

export function updateBook(req: UpdateBookRequest, res: Response) {
  const { id } = req.params;
  const body = req.body;
  const book = BookService.updateBook(id, body);

  res.status(200).json(book);
}

export function deleteBook(req: DeleteBookRequest, res: Response) {
  const { id } = req.params;
  BookService.deleteBook(id);

  res.status(204).send();
}
