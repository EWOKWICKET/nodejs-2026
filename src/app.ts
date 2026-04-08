import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import routes from './routes';
import { NotFoundError } from './errors';
import { exceptionFilterMiddleware } from './middlewares';

const app = express();

// global middleware for body parsing
app.use(express.json());
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use('/api', routes);

// to handle unregistered routes
app.use((_req: Request, _res: Response, next: NextFunction) => {
  next(new NotFoundError({ message: 'Route not found' }));
});

app.use(exceptionFilterMiddleware);

export default app;
