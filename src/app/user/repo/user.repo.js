import { User } from "../model/user.model.js";

export async function findUserById(id) {
    return await User.findById(id);
}

export async function updateUserByEmail(email, updatedData){
    return await User.findOneAndUpdate(
        { email: email },
        updatedData,
        { returnDocument: 'after' }
    );
}