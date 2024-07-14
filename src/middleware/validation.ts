import { NextFunction, Request, Response } from "express";
import { validationResult as expressValidationResult } from "express-validator";
import { populateValidationError } from "../util/errorpopulator";
import { ErrorResponseFactory } from "../factory/ErrorFactory";

const validationResult = (req: Request, res: Response, next: NextFunction) => {
  const result = expressValidationResult(req);
  if (!result.isEmpty()) {
    const validationMessage = populateValidationError(result.array());
    const { create } = new ErrorResponseFactory();
    const { error } = create("Validation error", 400, validationMessage);
    return res.status(error.code).jsonp(error);
  }
  next();
};

export default validationResult;
