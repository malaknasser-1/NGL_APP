import * as authRepo from "../repo/auth.repo.js";
import * as otpRepo from "../repo/otp.repo.js";
import * as userRepo from "../../user/repo/user.repo.js"
import bcrypt from "bcrypt";
import crypto from "node:crypto";
import jwt from "jsonwebtoken"
import { sendEmail } from "../../../common/email/nodemailer.js";
import { error } from "node:console";
import { invalidPassword, userAleardyVerfied, userNotExist } from "../errors.js";


  function toMs(time,unit){
    switch(unit){
        case'seconds':
        return time *1000;
        case'minutes':
        return time *60*1000;
        case'hours':
        return time *60*60*1000;
       default:
        return time ;
        
    }
}
export async function register(userData) {
    const userExist = await authRepo.checkUserExistByEmail(userData.email);
    if (userExist) throw userAleardyExist

    userData.password = await bcrypt.hash(userData.password, 10);

    const createdUser = await authRepo.createUser(userData);

    const otp = crypto.randomInt(100000, 999999).toString();
    await otpRepo.createOTP({
        code: otp,
        email: userData.email,
        expiresAt: new Date(Date.now() + toMs(5,'minutes')) 
    });

    
    await sendEmail(
        userData.email,
        'Verification Code',
        `<h1>Your verification code is ${otp}</h1>`
    );

    return createdUser;
}

export async function verifyAccount({ email, code }) {
    
    const user = await authRepo.checkUserExistByEmail(email);

    
    if (!user) throw userNotExist
    if (user.isVerified === true) throw userAleardyVerfied

   
    const otp = await otpRepo.getOtpByEmail(email);
    if (!otp) throw otpExpired

    if (otp.code !== code) throw invaliedCode

    
    const updatedUser = await userRepo.updateUserByEmail(email, { isVerified: true });
    await otpRepo.deleteOTP(email);

    return updatedUser;
}

export async function login(email,password){
    const user = await authRepo.checkUserExistByEmail(email)
    if (!user) throw userNotExist

    if (user.isVerified === false) throw userNotVerified;

const match = await bcrypt.compare(password, user.password);
if (!match) throw invalidPassword;


const token =jwt.sign(
    {id:user._id  , email:user.email , name : user.name},
    "process.env.JWT_SECRET",
    {expiresIn:toMs(1,'hours')})
}
