import { ErrorType } from "../types";

class ErrorResponse {
  error: ErrorType;
  constructor(error: ErrorType) {
    this.error = error;
  }
}

export class ErrorResponseFactory {
  create = (message: string, code: number, error?: string[]) => {
    return new ErrorResponse({ message, code, error, status: false });
  };
}
