import { User } from "../../user/model/user.model.js"; // تأكد من اسم الـ Model والمسار الصحيح

export async function checkUserExistByEmail(email) {
   return await User.findOne({ email });
}

export async function createUser(userData) {
    return await User.create(userData);
}

export async function createOTP(otpData) {
 }