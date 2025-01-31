import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import {
    ILoginUser,
    ILoginResponse,
    IRefreshTokenResponse,
    IAuthUser,
} from './auth.interface';
import ApiError from '../../../shared/errors/api-error';
import { envConfig } from '../../../shared/config/env-config';
import { User } from '../users/users.models';
import { jwtHelper } from '../../../shared/helpers/jwt-helper';
import { apiResponseMessage } from '../../../shared/constants/api-response-message';

const registerUser = async (payload: IAuthUser): Promise<IAuthUser> => {
    const existingUser = await User.findOne({ email: payload.email });
    if (existingUser) {
        throw new ApiError(
            httpStatus.CONFLICT,
            apiResponseMessage.USERS.EMAIL_EXISTS,
        );
    }

    const user = await User.create(payload);
    return user;
};

const loginUser = async (payload: ILoginUser): Promise<ILoginResponse> => {
    const { email, password } = payload;
    const user = new User();
    const isUserExist = await user.isUserExist(email);

    if (!user) {
        throw new ApiError(
            httpStatus.NOT_FOUND,
            apiResponseMessage.USERS.NOT_FOUND,
        );
    }

    if (
        isUserExist &&
        isUserExist.password &&
        !user.isPasswordMatched(password, isUserExist.password)
    ) {
        throw new ApiError(
            httpStatus.UNAUTHORIZED,
            apiResponseMessage.AUTH.INVALID_CREDENTIALS,
        );
    }

    const tokenPayload = {
        userId: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
    };

    const accessToken = jwtHelper.createToken(
        tokenPayload,
        envConfig.jwt.secret as Secret,
        parseInt(envConfig.jwt.expiresIn, 10),
    );

    const refreshToken = jwtHelper.createToken(
        tokenPayload,
        envConfig.jwt.refreshSecret as Secret,
        parseInt(envConfig.jwt.refreshExpiresIn, 10),
    );

    return {
        accessToken,
        refreshToken,
    };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
    let verifiedToken;

    try {
        verifiedToken = jwtHelper.verifyToken(
            token,
            envConfig.jwt.refreshSecret as Secret,
        );
    } catch (error) {
        throw new ApiError(
            httpStatus.UNAUTHORIZED,
            apiResponseMessage.AUTH.REFRESH_TOKEN_INVALID,
        );
    }

    const { email } = verifiedToken;

    const user = new User();
    const isUserExist = await user.isUserExist(email);
    if (!isUserExist) {
        throw new ApiError(
            httpStatus.NOT_FOUND,
            apiResponseMessage.USERS.NOT_FOUND,
        );
    }

    const newAccessToken = jwtHelper.createToken(
        {
            userId: user._id,
            role: user?.role,
            email: user.email,
            name: user.name,
        },
        envConfig.jwt.secret as Secret,
        parseInt(envConfig.jwt.expiresIn, 10),
    );

    return { accessToken: newAccessToken };
};

export const AuthService = {
    registerUser,
    loginUser,
    refreshToken,
};
