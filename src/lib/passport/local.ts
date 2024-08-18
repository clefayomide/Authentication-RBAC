import passport from "passport";
import { Strategy } from "passport-local";
import { validateHash } from "../cryptography/index";
import { ErrorResponseFactory } from "../../factory/ErrorFactory";
import { CustomError } from "../custom/errorConstructor";
import { UserService } from "../../services";
import { LoggedInUserI } from "../../types";

passport.serializeUser(function (user, callback) {
  const userToSerialize = user as LoggedInUserI;
  callback(null, userToSerialize.userId);
});

passport.deserializeUser(async function (id: number, callback) {
  const { getUser, setLoggedInUserData } = new UserService();
  try {
    const user = await getUser({ userId: id });
    if (!user) throw new Error("user not found");
    callback(null, setLoggedInUserData(user));
  } catch (error) {
    callback(error, null);
  }
});

async function verify(email: string, password: string, callback: any) {
  const { getUser, setLoggedInUserData } = new UserService();

  try {
    const user = await getUser({ email });
    const { create } = new ErrorResponseFactory();
    const { error } = create("invalid username or password", 400);
    if (!user) {
      return callback(new CustomError(error.message, error), null);
    }
    const isValid = validateHash(password, user.salt, user.password);
    if (!isValid) {
      return callback(new CustomError(error.message, error), null);
    }
    callback(null, setLoggedInUserData(user));
  } catch (error) {
    callback(error, null);
  }
}

const strategy = new Strategy({ usernameField: "email" }, verify);
export default passport.use(strategy);
