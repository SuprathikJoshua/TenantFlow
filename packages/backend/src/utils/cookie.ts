import { Response } from "express";
import ms, { StringValue } from "ms";

export const setAuthCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string,
) => {
  const isProd = process.env.NODE_ENV === "production";

  const options = {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? ("none" as const) : ("lax" as const),
  };

  res.cookie("accessToken", accessToken, {
    ...options,
    maxAge: ms((process.env.ACCESS_TOKEN_EXPIRY || "15m") as StringValue),
  });

  res.cookie("refreshToken", refreshToken, {
    ...options,
    maxAge: ms((process.env.REFRESH_TOKEN_EXPIRY || "7d") as StringValue),
  });
};

export const clearAuthCookies = (res: Response) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
};
