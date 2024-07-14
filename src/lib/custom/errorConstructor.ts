import { ErrorType, SuccessType } from "../../types";

type DataType = ErrorType | SuccessType;

export class CustomError extends Error {
  data?: DataType;
  constructor(message: string, data?: DataType) {
    super(message);
    this.name = "CustomError";
    this.data = data;
    Error.captureStackTrace(this, CustomError);
  }
}
