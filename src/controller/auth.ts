import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { errorHandler } from "../util/errorHandler";
import { ErrorResponseFactory } from "../factory/ErrorFactory";
import { SuccessResponseFactory } from "../factory/SuccessFactory";

class Auth {
  login = async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      "local",
      (error: any, user: any, info: any, status: any) => {
        if (error) {
          const { errorMessage = "", data: { code } = {} } =
            errorHandler(error);
          const { create } = new ErrorResponseFactory();
          const { error: errorResponse } = create(errorMessage, code as number);
          return res.status(errorResponse.code).jsonp(errorResponse);
        }

        req.logIn(user, () => {
          const { create } = new SuccessResponseFactory();
          const { success: successResponse } = create(
            "Login Successful",
            200,
            req.user
          );
          res.status(successResponse.code).jsonp(successResponse);
        });
      }
    )(req, res, next);
  };
}
export default Auth;
