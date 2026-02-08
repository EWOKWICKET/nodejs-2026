import express from 'express';
import routes from './routes';

const app = express();

// global middleware for body parsing
app.use(express.json());

app.use('/api', routes);

export default app;
