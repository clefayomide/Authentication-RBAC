-- CreateTable
CREATE TABLE `mdb_all_permissions` (
    `permissionId` INTEGER NOT NULL AUTO_INCREMENT,
    `permissionName` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `permissionName`(`permissionName`),
    PRIMARY KEY (`permissionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mdb_all_roles` (
    `roleId` INTEGER NOT NULL AUTO_INCREMENT,
    `roleName` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `roleName`(`roleName`),
    PRIMARY KEY (`roleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mdb_default_role_permission` (
    `roleId` INTEGER NOT NULL,
    `permissionId` INTEGER NOT NULL,

    INDEX `permissionId`(`permissionId`),
    PRIMARY KEY (`roleId`, `permissionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mdb_user_permissions` (
    `userId` INTEGER NOT NULL,
    `permissionId` INTEGER NOT NULL,

    INDEX `permissionId`(`permissionId`),
    PRIMARY KEY (`userId`, `permissionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mdb_user_role` (
    `userId` INTEGER NOT NULL,
    `roleId` INTEGER NULL,

    INDEX `roleId`(`roleId`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mdb_users` (
    `userId` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(50) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `salt` VARCHAR(255) NOT NULL,
    `isActive` BOOLEAN NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `mdb_default_role_permission` ADD CONSTRAINT `mdb_default_role_permission_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `mdb_all_roles`(`roleId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `mdb_default_role_permission` ADD CONSTRAINT `mdb_default_role_permission_ibfk_2` FOREIGN KEY (`permissionId`) REFERENCES `mdb_all_permissions`(`permissionId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `mdb_user_permissions` ADD CONSTRAINT `mdb_user_permissions_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `mdb_users`(`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `mdb_user_permissions` ADD CONSTRAINT `mdb_user_permissions_ibfk_2` FOREIGN KEY (`permissionId`) REFERENCES `mdb_all_permissions`(`permissionId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `mdb_user_role` ADD CONSTRAINT `mdb_user_role_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `mdb_users`(`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `mdb_user_role` ADD CONSTRAINT `mdb_user_role_ibfk_2` FOREIGN KEY (`roleId`) REFERENCES `mdb_all_roles`(`roleId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

