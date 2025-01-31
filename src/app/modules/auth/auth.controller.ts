import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/utils/catch-async';
import { AuthService } from './auth.service';
import sendResponse from '../../../shared/utils/send-response';
import {
    IAuthUser,
    ILoginResponse,
    IRefreshTokenResponse,
} from './auth.interface';
import { configureAuthCookie } from '../../../shared/utils/auth.utils';
import { apiResponseMessage } from '../../../shared/constants/api-response-message';

const registerUser = catchAsync(async (req: Request, res: Response) => {
    const userData = req.body;
    const result = await AuthService.registerUser(userData);

    sendResponse<IAuthUser>(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: apiResponseMessage.AUTH.REGISTER_SUCCESS,
        data: result,
    });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
    const loginData = req.body;
    console.log("🚀 ~ loginUser ~ loginData:", loginData)
    
    const result = await AuthService.loginUser(loginData);
    console.log("🚀 ~ loginUser ~ result:", result)
    const { refreshToken, ...tokenData } = result;

    if (refreshToken) {
        configureAuthCookie(res, 'refreshToken', refreshToken);
    }

    sendResponse<ILoginResponse>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: apiResponseMessage.AUTH.LOGIN_SUCCESS,
        data: tokenData,
    });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;
    const result = await AuthService.refreshToken(refreshToken);

    configureAuthCookie(res, 'refreshToken', refreshToken);

    sendResponse<IRefreshTokenResponse>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: apiResponseMessage.AUTH.REFRESH_TOKEN_SUCCESS,
        data: result,
    });
});

export const AuthController = {
    registerUser,
    loginUser,
    refreshToken,
};
