import prisma from "@/lib/prisma";
import ApiError from "@/utils/ApiError";
import {
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
} from "@/utils/auth.utils";
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

  const user = await prisma.user.create({
    data: { email, name, passwordHash, username },
    omit: {
      passwordHash: true,
    },
  });

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

  const accessToken = await generateAccessToken({ userId: user.id });
  const refreshToken = await generateRefreshToken({ userId: user.id });

  return { accessToken, refreshToken };
};
