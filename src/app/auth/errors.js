
import { AppError } from "../../lib/error/error.js";

export const otpExpired = new AppError("otp expired, resend otp", 404);
export const invaliedCode = new AppError("invalid code", 400);
export const invalidPassword = new AppError("invalid password", 403);
export const userNotExist = new AppError("user not exist", 404);
export const userAlreadyExist = new AppError("User already exists", 409);
export const userNotVerified = new AppError("user Not Verified", 403);
export const userAleardyVerfied = new AppError("user already verified", 400);