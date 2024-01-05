import HttpError from '../HttpError';
import HTTP_STATUS from '../httpStatusCode';

export default class NotFoundError extends HttpError {
  public httpCode: number;
  public name: string;

  constructor(message: string, httpCode = HTTP_STATUS.NotFoundError) {
    super(message);

    this.httpCode = httpCode;
    this.name = 'NotFound';
  }
}
