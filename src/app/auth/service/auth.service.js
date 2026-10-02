import * as authRepo from "../repo/auth.repo.js";
import * as otpRepo from "../repo/otp.repo.js";
import * as userRepo from "../../user/repo/user.repo.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateOTPCode } from "../../../common/utils/otp.js"; 
import { sendEmail } from "../../../common/email/nodemailer.js";
import { toMs } from "../../../common/utils/time.js"; 
import { logger } from "../../../common/logger/logger.js";
import { hashPassword, comparePassword } from "../utils/hash.js";

import { 
  userNotVerified, 
  userAlreadyExist, 
  userAleardyVerfied, 
  userNotExist, 
  invalidPassword, 
  invaliedCode, 
  otpExpired 
} from "../errors.js";

export async function register(userData) {
    
    const userExist = await authRepo.checkUserExistByEmail(userData.email);
    if (userExist) {
        throw userAlreadyExist;
    }
userData.password = await hashPassword(userData.password);
const createdUser = await authRepo.createUser(userData);

    const code = generateOTPCode();
    logger.info(code);
    await otpRepo.createOTP({
        code: code,
        email: userData.email,
        expiresAt: new Date(Date.now() + toMs(5, 'minutes')) 
    });

    await sendEmail(
        userData.email,
        'Verification Code',
        `<h1>Your verification code is ${code}</h1>`
    );

    return createdUser;
}

export async function verifyAccount({ email, code }) {
    const user = await authRepo.checkUserExistByEmail(email);

    if (!user) throw userNotExist;
    if (user.isVerified === true) throw userAleardyVerfied;

    const otp = await otpRepo.getOtpByEmail(email);
    if (!otp) throw otpExpired;

    if (otp.code !== code) throw invaliedCode;

    const updatedUser = await userRepo.updateUserByEmail(email, { isVerified: true });
    await otpRepo.deleteOTPsByEmail(email);

    return updatedUser;
}

export async function login(email, password) {
    const user = await authRepo.checkUserExistByEmail(email);
    if (!user) throw userNotExist;

    if (user.isVerified === false) throw userNotVerified;
   const match = await comparePassword(password, user['password']);
if (!match) throw invalidPassword;

    return generateToken({ id: user._id, name: user.name }); 
}

export async function sendOtp(email) {
    const user = await authRepo.checkUserExistByEmail(email); 
    if (!user) throw userNotExist;
    
    await otpRepo.deleteOTPsByEmail(email);

    const code = generateOTPCode();
    await otpRepo.createOTP({
        code: code,
        email: email,
        expiresAt: new Date(Date.now() + toMs(3, 'minutes')) 
    });

    await sendEmail(email, 'new otp', `<p> Your otp is ${code} </p>`);
    return true;
}


export async function resetPassword(email, code, newPassword) {
    
    const otp = await otpRepo.getOtpByEmail(email); // {} | null
    if (!otp) throw otpExpired;
    if (otp.code !== code) throw invaliedCode;

    
    const hashedPassword = await hashPassword(newPassword);
    await userRepo.updateUserByEmail(email, { password: hashedPassword });

    
    await otpRepo.deleteOTPsByEmail(email);

    return true;
}