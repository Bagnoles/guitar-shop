import { StatusCodes } from 'http-status-codes';
import { HttpError } from './index.js';

export type ValidationErrorField = {
    property: string;
    value: string;
    messages: string[];
  };

export class ValidationError extends HttpError {
  public details: ValidationErrorField[] = [];

  constructor(message: string, errors: ValidationErrorField[]) {
    super(StatusCodes.BAD_REQUEST, message);
    this.details = errors;
  }
}