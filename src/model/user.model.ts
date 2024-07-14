import { Prisma } from "@prisma/client";
import { db } from "../connection";
import { PermissionFactory } from "../factory/PermissionFactory";
import { generateHash } from "../lib/cryptography";
import { CustomError } from "../lib/custom/errorConstructor";
import { CREATEUSERTYPE, USERI } from "../types";
import { ErrorResponseFactory } from "../factory/ErrorFactory";

export async function getUser(
  data: Pick<USERI, "email"> | Pick<USERI, "userId">
) {
  let suppliedEmail: string | undefined;
  let suppliedUserId: number | undefined;
  if ("email" in data) {
    const { email } = data;
    suppliedEmail = email;
  }
  if ("userId" in data) {
    const { userId } = data;
    suppliedUserId = userId;
  }

  try {
    const user = await db.mdb_users.findFirst({
      relationLoadStrategy: "join",
      where: {
        OR: [
          {
            email: suppliedEmail,
          },
          { userId: suppliedUserId },
        ],
      },
      include: {
        mdb_user_permissions: {
          include: {
            mdb_all_permissions: true,
          },
        },
        mdb_user_role: {
          include: {
            mdb_all_roles: true,
          },
        },
      },
    });
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const create = async (
  instance: Prisma.TransactionClient,
  email: string,
  hash: string,
  salt: string
) => {
  try {
    const { userId } = await instance.mdb_users.create({
      data: {
        email,
        password: hash,
        salt,
        isActive: false,
      },
      select: {
        userId: true,
      },
    });
    return userId;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export async function createUserRole(
  instance: Prisma.TransactionClient,
  userId: number,
  roleId: number
) {
  try {
    await instance.mdb_user_role.create({
      data: {
        userId,
        roleId,
      },
    });
    return;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createUserPermission(
  instance: Prisma.TransactionClient,
  permission: number[],
  userId: number
) {
  try {
    const { create } = new PermissionFactory();
    const { permissions: permissionfactory } = create(permission, userId);
    await instance.mdb_user_permissions.createMany({
      data: permissionfactory,
    });
    return;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createUser(data: CREATEUSERTYPE) {
  const { email, password, roleId, permission } = data;
  try {
    const user = await getUser({ email });
    if (user) {
      const { create: createError } = new ErrorResponseFactory();
      const { error } = createError("user with email exist", 409);
      throw new CustomError(error.message, error);
    }
    const { hash, salt } = generateHash(password);
    return db.$transaction(async (transaction) => {
      const userId = await create(transaction, email, hash, salt);
      await createUserRole(transaction, userId, roleId);
      await createUserPermission(transaction, permission, userId);
      return "user created";
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
