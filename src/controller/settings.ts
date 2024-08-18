import { Request, Response } from "express";
import { UserService } from "../services";
import { CREATEUSERTYPE } from "../types";
import { SuccessResponseFactory } from "../factory/SuccessFactory";
import { errorHandler } from "../util/errorHandler";
import { ErrorResponseFactory } from "../factory/ErrorFactory";

class Settings {
  createNewUser = async (req: Request, res: Response) => {
    const data: CREATEUSERTYPE = req.body;
    const { createUser } = new UserService();
    try {
      const response = await createUser(data);
      const { create } = new SuccessResponseFactory();
      const { success: successResponse } = create(response, 201);
      res.status(successResponse.code).jsonp(successResponse);
    } catch (error) {
      const { errorMessage, data: { code = 500 } = {} } = errorHandler(
        error as any
      );
      const { create } = new ErrorResponseFactory();
      const { error: errorResponse } = create(errorMessage, code);
      res.status(errorResponse.code).jsonp(errorResponse);
    }
  };
}

export default Settings;
