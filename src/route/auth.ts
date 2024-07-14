import { Router } from "express";
import { body } from "express-validator";
import { AuthController } from "../controller";
import { validationResultCheck } from "../middleware";

const router = Router();
const { login } = new AuthController();

router.post(
  "/login",
  body("email").notEmpty().withMessage("email is required"),
  body("email").isString().withMessage("email must be a string"),
  body("email").isEmail().withMessage("provide a valid email"),
  body("password").notEmpty().withMessage("password is required"),
  validationResultCheck,
  login
);

export default router;
