import { ValidationError } from "express-validator";

export const populateValidationError = (error: ValidationError[]) => {
  const errorArray: string[] = [];
  error.forEach((error) => {
    errorArray.push(error.msg);
  });
  return errorArray;
};
