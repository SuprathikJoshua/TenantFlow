import prisma from "@/lib/prisma";
import ApiError from "@/utils/ApiError";
import {
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
} from "@/utils/auth.utils";
import crypto from "crypto";
import { sendPasswordResetEmail, sendVerificationEmail } from "./email.service";
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
  const user = await prisma.user.findFirst({
    where: {
      verificationToken: token,
      verificationTokenExpires: { gt: new Date() },
    },
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

/**
 * Forgot Password Service
 */
export const forgotPasswordService = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return;
  }
  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000); // 1hr

  await prisma.user.update({
    where: { id: user.id },
    data: {
      resetToken,
      resetTokenExpires,
    },
  });

  await sendPasswordResetEmail(email, resetToken);
};

/**
 * Reset Password Service
 */
export const resetPasswordService = async (
  token: string,
  newPassword: string,
) => {
  const user = await prisma.user.findFirst({
    where: {
      resetToken: token,
      resetTokenExpires: { gt: new Date() },
    },
  });
  if (!user) {
    throw new ApiError(400, "Invalid or expired token");
  }
  const passHash = await hashPassword(newPassword);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordHash: passHash,
      resetToken: null,
      resetTokenExpires: null,
    },
  });
};
