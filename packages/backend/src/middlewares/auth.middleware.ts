import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/ApiError";
import asyncHandler from "../utils/asyncHandler";
import { verifyAccessToken } from "../utils/auth.utils";
import prisma from "../lib/prisma";

export const verifyJWT = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) throw new ApiError(401, "Unauthorized request");

    const decodedToken = verifyAccessToken(token);

    const user = await prisma.user.findUnique({
      where: { id: decodedToken.userId },
      omit: { passwordHash: true },
    });

    if (!user)
      throw new ApiError(401, "Unauthorized request || User not found");

    req.user = user;
    next();
  },
);
