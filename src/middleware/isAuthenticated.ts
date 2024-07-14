import { NextFunction, Request, Response } from "express";
import { ErrorResponseFactory } from "../factory/ErrorFactory";

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  // check if user is authenticated
  if (!req.isAuthenticated()) {
    const { create } = new ErrorResponseFactory();
    const { error: errorResponse } = create("user not authenticated", 401);
    return res.status(errorResponse.code).jsonp(errorResponse);
  }

  // check if the id supplied in request body corresponds with the id of the currently logged in user
  // this is to prevent querying the db if there's no match
  if (req.user.hasOwnProperty("userId") && req.body.hasOwnProperty("userId")) {
    const id = req.body.userId;
    const { userId } = req.user as { userId: number };
    if (id != userId) {
      const { create } = new ErrorResponseFactory();
      const { error: errorResponse } = create("bad request", 400);
      return res.status(errorResponse.code).jsonp(errorResponse);
    }
  }
  next();
};

export default isAuthenticated;
