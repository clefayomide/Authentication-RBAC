import express, {
  json,
  urlencoded,
  static as static_,
  NextFunction,
  Request,
  Response,
} from "express";
import { appConfig } from "./config";
import createError from "http-errors";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { db } from "./connection";
import passport from "passport";
import { authRouter, settingsRouter } from "./route";

const app = express();
const { port, currentVersion, origin, cookieMaxAge, cookieSecret } = appConfig;

const corsOptions = {
  credentials: true,
  origin: origin,
};

app.use(cors(corsOptions));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(static_(path.join(__dirname, "public")));

app.use(
  expressSession({
    cookie: {
      maxAge: Number(cookieMaxAge),
      httpOnly: true,
      secure: app.settings["env"] !== "development",
    },
    secret: cookieSecret as string,
    resave: false,
    saveUninitialized: false,
    // @ts-ignore
    store: new PrismaSessionStore(db, {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
require("./lib/passport/local");

app.use(`${currentVersion}/settings`, settingsRouter);
app.use(`${currentVersion}/auth`, authRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err: any, req: Request, res: Response, next: NextFunction): void => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(port, () => console.log("Server is running on port:", port));
