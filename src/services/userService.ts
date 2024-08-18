import { createUser, getUser } from "../model/user.model";
import { CREATEUSERTYPE, USERI } from "../types";

export class User {
  createUser = async (data: CREATEUSERTYPE) => {
    try {
      const createdUser = await createUser(data);
      return createdUser;
    } catch (error) {
      throw error;
    }
  };

  getUser = async (data: Pick<USERI, "email"> | Pick<USERI, "userId">) => {
    try {
      const user = await getUser(data);
      return user;
    } catch (error) {
      throw error;
    }
  };

  setLoggedInUserData = (user: any) => {
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
    return userData;
  };
}
