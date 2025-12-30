import { type Request, type Response, type NextFunction } from 'express';
import Todo from '../models/todo.model';

interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

export const createTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title } = req.body;

    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      res.status(400).json({
        success: false,
        message: 'Title is required and must be a non-empty string',
      });
      return;
    }

    const todo = await Todo.create({ title: title.trim() });

    const response: ApiResponse = {
      success: true,
      message: 'Todo created successfully',
      data: todo,
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export const getAllTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });

    const response: ApiResponse = {
      success: true,
      message: 'Todos retrieved successfully',
      data: todos,
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const updateTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    const updateData: { title?: string; completed?: boolean } = {};

    if (title !== undefined) {
      if (typeof title !== 'string' || title.trim().length === 0) {
        res.status(400).json({
          success: false,
          message: 'Title must be a non-empty string',
        });
        return;
      }
      updateData.title = title.trim();
    }

    if (completed !== undefined) {
      if (typeof completed !== 'boolean') {
        res.status(400).json({
          success: false,
          message: 'Completed must be a boolean',
        });
        return;
      }
      updateData.completed = completed;
    }

    const todo = await Todo.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!todo) {
      res.status(404).json({
        success: false,
        message: 'Todo not found',
      });
      return;
    }

    const response: ApiResponse = {
      success: true,
      message: 'Todo updated successfully',
      data: todo,
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      res.status(404).json({
        success: false,
        message: 'Todo not found',
      });
      return;
    }

    const response: ApiResponse = {
      success: true,
      message: 'Todo deleted successfully',
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

