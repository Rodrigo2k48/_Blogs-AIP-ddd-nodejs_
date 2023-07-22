import { ErrorRequestHandler } from 'express';
import HttpError from '../../domain/error/HttpError';

export default class HttpErrorMiddleware {
  public static error: ErrorRequestHandler = (err, _req, res) => {
    if (err instanceof HttpError) {
      const { httpCode, message } = err;
      return res.status(httpCode).json({ error: { message } });
    }
    return res.status(500).json({ error: { message: err.message } });
  };
}