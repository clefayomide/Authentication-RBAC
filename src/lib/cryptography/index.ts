import crypto from "crypto";

export const validateHash = (
  password: string,
  salt: string,
  storedHash: string
): boolean => {
  const hashResult = crypto
    .pbkdf2Sync(password, salt, 310000, 64, "sha512")
    .toString("hex");
  return storedHash === hashResult;
};

export const generateHash = (password: string) => {
  const salt = crypto.randomBytes(64).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 310000, 64, "sha512")
    .toString("hex");
  return {
    salt,
    hash,
  };
};
