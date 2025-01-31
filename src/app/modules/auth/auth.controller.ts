import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { UserService } from "./auth.service";
import { ILoginUserResponse, IRefreshTokenResponse, IUser } from "../user/user.interface";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import config from "../../../config";


const createUser = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body;
  const result = await UserService.createUser(userData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "user created successfully!",
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await UserService.userLogin(loginData);
  const { refreshToken, ...others } = result;

  const cookieOpction = {
    secure: config.env === "production" ? true : false,
    httpOnly: true,
  };
  res.cookie("refreshToken", refreshToken, cookieOpction);

  if ("refreshToken" in result) {
    delete result.refreshToken;
  }

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Login Successful",
    data: others,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await UserService.refreshToken(refreshToken);

  const cookieOpction = {
    secure: config.env === "production" ? true : false,
    httpOnly: true,
  };
  res.cookie("refreshToken", refreshToken, cookieOpction);

  if ("refreshToken" in result) {
    delete result.refreshToken;
  }

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Refresh Token Successful",
    data: result,
  });
});

export const UserController = {
  createUser,
  loginUser,
  refreshToken,
};
