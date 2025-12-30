import { type Request, type Response, type NextFunction } from 'express';
import mongoose from 'mongoose';

interface ErrorResponse {
  success: boolean;
  message: string;
  error?: string;
}

export const errorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  let statusCode = 500;
  let message = 'Internal server error';

  if (err instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = 'Invalid ID format';
  } else if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((error) => error.message)
      .join(', ');
  } else if (err.message) {
    message = err.message;
  }

  const errorResponse: ErrorResponse = {
    success: false,
    message,
  };

  if (process.env.NODE_ENV === 'development') {
    errorResponse.error = err.stack;
  }

  res.status(statusCode).json(errorResponse);
};

