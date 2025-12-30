import { type Request, type Response, type NextFunction } from 'express';
import mongoose from 'mongoose';

interface ErrorResponse {
  success: boolean;
  message: string;
  error?: string;
}

interface MongoError extends Error {
  code?: number;
  keyValue?: Record<string, unknown>;
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
    const errorMessages = Object.values(err.errors).map((error) => {
      if (error.kind === 'minlength') {
        return `Title must be at least ${(error as mongoose.Error.ValidatorError).properties.minlength} characters long`;
      }
      return error.message;
    });
    message = errorMessages.join(', ');
  } else {
    const mongoError = err as MongoError;
    if (mongoError.code === 11000) {
      statusCode = 409;
      const field = Object.keys(mongoError.keyValue || {})[0];
      message = `Todo with this ${field} already exists`;
    } else if (err.message) {
      message = err.message;
    }
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

