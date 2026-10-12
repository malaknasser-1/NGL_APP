import { error } from "node:console";
import * as authService from "../service/auth.service.js";
import { validateBody } from "../../../lib/validation/validation.js";
import { verifyAccountDTO, registerDTO, sendDTO, resetPasswordDTO } from "../dto/auth.dto.js";


export async function register(req, res, next) {
    try {
        const data = validateBody(registerDTO, req.body);
        const createdUser = await authService.register(data);

        return res.status(201).json({
            message: 'User Created Successfully',
            success: true,
            data: createdUser,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            stack: error.stack
        });
    }
          next(error)}
    



export async function verifyAccount(req,res,next) {
    try{

        const data = validateBody(verifyAccountDto , req.body)
        const {email ,code } =data;

        const updatedUser=await authService.verifyAccount({email,code})
res.json({
    message:'user verfied successfully',
    success:true,
    data:updatedUser,
})
    }
    catch(error){
        next(error)
    }
}
export async function login (req,res,next){
    try {
        const data = validateBody(loginDTO , req.body)
        const { email, password } = req.body;
        const token = await authService.login(email, password);
        
        res.cookie('access_token', token, {
            httpOnly: true, 
            maxAge: toMs(1, 'hours'), 
        });

        res.json({
            message: 'User Login Successfully',
            success: true,
        });
    }catch(error){
        next(error)
    }
}


export async function sendOtp(req , res, next){
try{
    const data = validateBody(sendDTO , req.body)
     
    const {email}=data;
    await authService.sendOtp(email);
    res.json({message : 'new otp sent ,check user email',success:true})

}
catch(err) 
{ 
next(err)
}}

export async function resetPassword(req, res, next) {
    try {
        const data = validateBody(resetPasswordDTO , req.body)
        const { email, code, newPassword } = data;
        await authService.resetPassword(email, code, newPassword);
        res.json({
            message :"password reset successfully"
            ,success :true,
        })
    } catch (error) {
        next(error);
    }
}

export async function loginWithGoogle (req,res,next){
    try{
      const token = await  authService.loginWithGoogle(req.body.idToken)
        res.cookie ('access_token',token,{
            httpOnly:true , maxAge:(1,'hours'),
        })
        res.json({message:"user login successfully", succes:true})
    }
    catch(err){
        next(err)
    }

}