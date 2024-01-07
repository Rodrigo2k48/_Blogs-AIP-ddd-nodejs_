/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import HttpError from '../../domain/error/HttpError';
import { ZodError } from 'zod';
import HTTP_STATUS from '../../domain/error/httpStatusCode';

export default class HttpErrorMiddleware {
  public static error: ErrorRequestHandler = (err, _req, res, _next) => {
    if (err instanceof HttpError) {
      const { httpCode, message } = err;
      return res.status(httpCode).json({ message });
    }
    if (err instanceof ZodError) {
      return res.status(HTTP_STATUS.InternalServerError).json({ message: err.issues[0].message });
    }
    return res.status(HTTP_STATUS.InternalServerError).json({ message: err.message });
  };
}
