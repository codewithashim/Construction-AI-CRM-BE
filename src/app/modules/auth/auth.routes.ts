import express from 'express';
import validateRequest from '../../../shared/middleware/validation-middleware';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
    '/register',
    validateRequest(AuthValidation.registerUserSchema),
    AuthController.registerUser
);

router.post(
    '/login',
    validateRequest(AuthValidation.loginUserSchema),
    AuthController.loginUser
);

router.post(
    '/refresh-token',
    validateRequest(AuthValidation.refreshTokenSchema),
    AuthController.refreshToken
);

export const AuthRoutes = router;