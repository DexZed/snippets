import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 400;

  res.status(statusCode).json({
    message: err.message || 'An unexpected error occurred',
    success: false,
    error: err, // includes full error object, including Mongoose validation error
  });
};

export default errorHandler;
