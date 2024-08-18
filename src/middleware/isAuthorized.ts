import { NextFunction, Request, Response } from "express";
import { ErrorResponseFactory } from "../factory/ErrorFactory";
import { LoggedInUserI } from "../types";

class IsAuthorized {
  checkCreateUserPermission = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (req.user) {
      const { permission, isActive } = req.user as LoggedInUserI;
      if (
        !isActive ||
        !permission.some(
          ({ permissionId }: { permissionId: number }) => permissionId === 1
        )
      ) {
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
