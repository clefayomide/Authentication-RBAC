import { USERI } from ".";
declare global {
  namespace Express {
    interface User {
      userId: number;
      userEmail: string;
      isActive: boolean;
      createdAt: string;
      updatedAt: string;
      permission: Array<{ permissionId: number; permissionName: string }>;
      role: { roleId: number; roleName: string };
      //   [key: string]: any;
    }
  }
}
