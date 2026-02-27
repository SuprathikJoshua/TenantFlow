import prisma from "@/lib/prisma";
import ApiError from "@/utils/ApiError";
import {
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
} from "@/utils/auth.utils";
import crypto from "crypto";
import { sendVerificationEmail } from "./email.service";
/**
 * Register User Service
 */
export const registerUserService = async (
  name: string,
  email: string,
  password: string,
  username: string,
) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new ApiError(409, "User already exists!");
  }
  const passwordHash = await hashPassword(password);
  const verificationToken = crypto.randomBytes(32).toString("hex");
  const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24hrs
  const user = await prisma.user.create({
    data: {
      email,
      name,
      passwordHash,
      username,
      verificationToken,
      verificationTokenExpires,
    },
    omit: {
      passwordHash: true,
    },
  });
  await sendVerificationEmail(email, verificationToken);
  const accessToken = await generateAccessToken({ userId: user.id });
  const refreshToken = await generateRefreshToken({ userId: user.id });

  return { user, accessToken, refreshToken };
};

/**
 * Login User Service
 */
export const loginUserService = async (email: string, password: string) => {
  const user = await prisma.user.findFirst({ where: { email } });

  if (!user) {
    throw new ApiError(401, "Invalid credentials!!");
  }

  const isPasswordValid = await comparePassword(password, user.passwordHash);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  if (!user.emailVerified) {
    throw new ApiError(403, "Please verify your email first");
  }
  const accessToken = await generateAccessToken({ userId: user.id });
  const refreshToken = await generateRefreshToken({ userId: user.id });

  return { accessToken, refreshToken };
};

/**
 *Verify Email
 */

export const verifyEmailService = async (token: string) => {
  // const user = await prisma.user.findFirst({
  //   where: {
  //     verificationToken: token,
  //     verificationTokenExpires: { gt: new Date() },
  //   },
  // });
  const user = await prisma.user
    .findFirst({
      where: {
        verificationToken: token,
        verificationTokenExpires: { gt: new Date() },
      },
    })
    .catch((e) => {
      console.error("FULL ERROR:", JSON.stringify(e, null, 2));
      throw e;
    });
  if (!user) {
    throw new ApiError(400, "Invalid or expired token");
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      emailVerified: true,
      verificationToken: null,
      verificationTokenExpires: null,
    },
  });

  return { message: "Email verification successfull" };
};
