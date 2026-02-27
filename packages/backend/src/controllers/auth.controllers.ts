import { Request, Response } from "express";
import ApiError from "@/utils/ApiError";
import ApiResponse from "@/utils/ApiResponse";
import asyncHandler from "@/utils/asyncHandler";
import {
  loginUserService,
  registerUserService,
  verifyEmailService,
} from "@/services/auth.service";
import { setAuthCookies } from "@/utils/cookie";

/**
 * Signup user controller
 */
export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password, username } = req.body;
    if (!name || !email || !password || !username) {
      throw new ApiError(401, "All fields are required!");
    }

    const { user, accessToken, refreshToken } = await registerUserService(
      name,
      email,
      password,
      username,
    );

    setAuthCookies(res, accessToken, refreshToken);
    res
      .status(201)
      .json(
        new ApiResponse(
          201,
          user,
          "Registration successfull! Please verify your email.",
        ),
      );
  },
);

/**
 * Login User Controller
 */
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(407, "All fields are required!");
  }
  const { accessToken, refreshToken } = await loginUserService(email, password);

  setAuthCookies(res, accessToken, refreshToken);
  res.status(200).json(new ApiResponse(200, "User login successfully"));
});

/**
 *Verify Email
 */
export const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
  const { token } = req.query;
  if (!token) {
    throw new ApiError(400, "Token is required");
  }
  const message = await verifyEmailService(token as string);
  res
    .status(200)
    .json(new ApiResponse(200, null, "Email verified successfully"));
});
