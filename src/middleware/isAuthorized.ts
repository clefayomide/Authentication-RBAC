import { NextFunction, Request, Response } from "express";
import { ErrorResponseFactory } from "../factory/ErrorFactory";
import { USERI } from "../types";

class IsAuthorized {
  checkCreateUserPermission = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (req.user) {
      const { permission } = req.user;
      if (!permission.some(({ permissionId }) => permissionId === 1)) {
        const { create } = new ErrorResponseFactory();
        const { error } = create("insufficient priviledges", 403);
        return res.status(error.code).jsonp(error);
      }
      return next();
    }
    next();
  };
}

export default IsAuthorized;
