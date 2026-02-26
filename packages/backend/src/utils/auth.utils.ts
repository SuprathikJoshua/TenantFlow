import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const saltRounds = 10;

/**
 * Password Utils
 */
export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

export const comparePassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

/**
 * Tokens Generation
 */
export interface AccessTokenPayload {
  userId: string;
  organizationId?: string;
  role?: string;
}

export interface RefreshTokenPayload {
  userId: string;
}

export const generateAccessToken = (payload: AccessTokenPayload): string => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: "15m" as jwt.SignOptions["expiresIn"],
  });
};
export const generateRefreshToken = (payload: RefreshTokenPayload): string => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, {
    expiresIn: "7d" as jwt.SignOptions["expiresIn"],
  });
};

/**
 * Token Verification
 */
export const verifyAccessToken = (token: string): AccessTokenPayload => {
  return jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
  ) as AccessTokenPayload;
};

export const verifyRefreshToken = (token: string): RefreshTokenPayload => {
  return jwt.verify(
    token,
    process.env.REFRESH_TOKEN_SECRET as string,
  ) as RefreshTokenPayload;
};
