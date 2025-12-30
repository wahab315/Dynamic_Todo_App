import { Router } from 'express';
import {
  createTodo,
  getAllTodos,
  updateTodo,
  deleteTodo,
} from '../controllers/todo.controller';

const router = Router();

router.post('/todos', createTodo);
router.get('/todos', getAllTodos);
router.put('/todos/:id', updateTodo);
router.delete('/todos/:id', deleteTodo);

export default router;

