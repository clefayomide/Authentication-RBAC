import "dotenv/config";

export const appConfig = {
  port: process.env.PORT,
  currentVersion: process.env.CURRENT_VERSION,
  origin: process.env.ORIGIN,
  cookieMaxAge: process.env.COOKIE_MAX_AGE,
  cookieSecret: process.env.COOKIE_SECRET,
};
