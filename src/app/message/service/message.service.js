import {Router} from "express";
import * as userRepository from "../../user/repo/user.repo.js";
import { userNotExist } from "../../user/errors.js";
import * as messageRepository from "../repo/message.repo.js";

export async function sendMessage(content, receiver, sender) {
   
    const user = await userRepository.findUserById(receiver);
    if (!user) throw userNotExist;

   
    return await messageRepository.createMessage(content, receiver, sender);
}