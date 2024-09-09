import { HttpError } from '../../libs/rest/errors/index.js';

export class AuthException extends HttpError {
  constructor(httpStatusCode: number, message: string) {
    super(httpStatusCode, message);
  }
}