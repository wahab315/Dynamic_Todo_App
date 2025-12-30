import express, { type Express } from 'express';
import cors from 'cors';
import todoRoutes from './routes/todo.routes';
import { errorMiddleware } from './middlewares/error.middleware';

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use('/api/v1', todoRoutes);
app.use(errorMiddleware);

export default app;

