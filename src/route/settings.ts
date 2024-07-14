import { Router } from "express";
import { SettingsController } from "../controller";
import { body } from "express-validator";
import { isInteger } from "../util/isInteger";
import { isArrayOfNumber } from "../util/isArrayOfNumber";
import {
  IsAuthorized,
  userAuthenticationCheck,
  validationResultCheck,
} from "../middleware";

const router = Router();
const { createNewUser } = new SettingsController();
const { checkCreateUserPermission } = new IsAuthorized();

router.post(
  "/create-user",
  body("email").notEmpty().withMessage("email is required"),
  body("email").isString().withMessage("email must be a string"),
  body("email").isEmail().withMessage("provide a valid email"),
  body("password").notEmpty().withMessage("password is required"),
  body("password").isString().withMessage("password must be a string"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("password must be of 8 length"),
  body("roleId").custom(isInteger).withMessage("role id must be a number"),
  body("permission")
    .custom(isArrayOfNumber)
    .withMessage("permission must be an array of number"),
  validationResultCheck,
  userAuthenticationCheck,
  checkCreateUserPermission,
  createNewUser
);

export default router;
