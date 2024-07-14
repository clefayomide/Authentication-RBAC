import passport from "passport";
import { Strategy } from "passport-local";
import { validateHash } from "../cryptography/index";
import { getUser } from "../../model/user.model";
import { ErrorResponseFactory } from "../../factory/ErrorFactory";
import { CustomError } from "../custom/errorConstructor";

passport.serializeUser(function (user, callback) {
  // @ts-ignore
  callback(null, user.userId);
});

passport.deserializeUser(async function (id: number, callback) {
  getUser({ userId: id })
    .then((user) => {
      if (!user) throw new Error("user not found");
      const {
        userId,
        email: userEmail,
        isActive,
        createdAt,
        updatedAt,
        mdb_user_permissions,
        mdb_user_role,
      } = user;
      const userData = {
        userId,
        userEmail,
        isActive,
        createdAt,
        updatedAt,
        permission: mdb_user_permissions?.map(
          ({ mdb_all_permissions }: { mdb_all_permissions: any }) => {
            return mdb_all_permissions;
          }
        ),
        role: mdb_user_role?.mdb_all_roles,
      };
      callback(null, userData);
    })
    .catch((error) => {
      callback(error, null);
    });
});

async function verify(email: string, password: string, callback: any) {
  getUser({ email })
    .then((user: any) => {
      const { create } = new ErrorResponseFactory();
      const { error } = create("invalid username or password", 400);
      if (!user) return callback(new CustomError(error.message, error), null);
      const isValid = validateHash(password, user?.salt, user?.password);
      if (!isValid)
        return callback(new CustomError(error.message, error), null);
      const {
        userId,
        email: userEmail,
        isActive,
        createdAt,
        updatedAt,
        mdb_user_permissions,
        mdb_user_role,
      } = user;
      const userData = {
        userId,
        userEmail,
        isActive,
        createdAt,
        updatedAt,
        permission: mdb_user_permissions?.map(
          ({ mdb_all_permissions }: { mdb_all_permissions: any }) => {
            return mdb_all_permissions;
          }
        ),
        role: mdb_user_role?.mdb_all_roles,
      };
      callback(null, userData);
    })
    .catch((error) => {
      callback(error, null);
    });
}

const strategy = new Strategy({ usernameField: "email" }, verify);
export default passport.use(strategy);
