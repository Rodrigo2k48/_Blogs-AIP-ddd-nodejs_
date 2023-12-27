import HttpError from '../HttpError';
import HTTP_STATUS from '../httpStatusCode';

export default class Conflict extends HttpError {
  public httpCode: number;
  public name: string;

  constructor(message: string, httpCode = HTTP_STATUS.ConflictError) {
    super(message);

    this.httpCode = httpCode;
    this.name = 'Conflict';
  }
}
