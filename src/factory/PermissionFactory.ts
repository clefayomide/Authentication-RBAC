import { PermissionsType } from "../types";

class Permissions {
  permissions: PermissionsType;
  constructor(permissions: PermissionsType) {
    this.permissions = permissions;
  }
}

export class PermissionFactory {
  create = (permissions: number[], userId: number) => {
    const data: PermissionsType = [];
    for (let permission of permissions) {
      data.push({ userId, permissionId: permission });
    }
    return new Permissions(data);
  };
}
