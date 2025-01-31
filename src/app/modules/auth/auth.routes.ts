import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { createUserValidator } from "../user/user.validation";
import { UserController } from "./auth.controller";
const router = express.Router();

router.post(
  "/signup",
  validateRequest(createUserValidator.createUserZodSchema),
  UserController.createUser
);

router.post(
  "/login",
  UserController.loginUser
);

router.post(
  "/refresh-token",
  validateRequest(createUserValidator.refreshTokenSchema),
  UserController.refreshToken
);

export const AuthRoutes = router;
