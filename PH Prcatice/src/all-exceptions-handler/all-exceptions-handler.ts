import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Error as MongooseError } from 'mongoose';

@Catch()
export class CatchEverythingFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string|{} = 'Internal server error' ;

    if (exception instanceof HttpException) {
      httpStatus = exception.getStatus();
      message = exception.getResponse();
    }

    // Mongoose Validation Error
    else if (exception instanceof MongooseError.ValidationError) {
      httpStatus = HttpStatus.BAD_REQUEST;
      message = Object.values(exception.errors).map(err => err.message).join(', ');
    }

    // Mongoose Cast Error (e.g., bad ObjectId)
    else if (exception instanceof MongooseError.CastError) {
      httpStatus = HttpStatus.BAD_REQUEST;
      message = `Invalid value for ${exception.path}: ${exception.value}`;
    }

    // MongoServerError (e.g., duplicate key)
    else if (
      'code' in (exception as any) &&
      (exception as any).code === 11000
    ) {
      httpStatus = HttpStatus.CONFLICT;
      const duplicatedField = Object.keys((exception as any).keyValue).join(', ');
      message = `Duplicate key error: ${duplicatedField}`;
    }

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
