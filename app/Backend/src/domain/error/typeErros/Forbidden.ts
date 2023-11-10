import HttpError from '../HttpError';
import HTTP_STATUS from '../httpStatusCode';

export default class Forbidden extends HttpError {
  public httpCode: number;
  public name: string;

  constructor(message: string, httpCode = HTTP_STATUS.ForbiddenError) {
    super(message);

    this.httpCode = httpCode;
    this.name = 'Forbidden';
  }
}
