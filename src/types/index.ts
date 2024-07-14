export type PermissionsType = Array<{ userId: number; permissionId: number }>;

export interface USERI {
  userId: number;
  email: string;
  password: string;
  salt: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  permission: Array<{ permissionId: number; permissionName: string }>;
  role: { roleId: number; roleName: string };
  [key: string]: any;
}

export type CREATEUSERTYPE = {
  email: string;
  password: string;
  roleId: number;
  permission: number[];
};

interface RequestResponseI {
  status: boolean;
  code: number;
  message: string;
}

export interface ErrorType extends RequestResponseI {
  error?: string[];
}

export interface SuccessType extends RequestResponseI {
  data?: any;
}
