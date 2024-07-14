import { Request, Response, NextFunction } from "express";
import { createUser } from "../model/user.model";
import { CREATEUSERTYPE, SuccessType } from "../types";
import { errorHandler } from "../util/errorHandler";
import { ErrorResponseFactory } from "../factory/ErrorFactory";
import { SuccessResponseFactory } from "../factory/SuccessFactory";

class Settings {
  createNewUser = async (req: Request, res: Response, next: NextFunction) => {
    const data: CREATEUSERTYPE = req.body;
    try {
      const response = await createUser(data);
      const { create } = new SuccessResponseFactory();
      const { success: successResponse } = create(response, 201);
      res.status(successResponse.code).jsonp(successResponse);
    } catch (error) {
      const { errorMessage, data: { code } = {} } = errorHandler(
        error as any
      );
      const { create } = new ErrorResponseFactory();
      const { error: errorResponse } = create(errorMessage, code as number);
      res.status(errorResponse.code).jsonp(errorResponse);
    }
  };
}

export default Settings;
