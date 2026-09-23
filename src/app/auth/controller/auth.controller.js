import * as authService from "../service/auth.service.js";

export async function register(req, res, next) {
    try {
        const createdUser = await authService.register(req.body);

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
}

export async function verifyAccount(req,res,next) {
    try{
const {email ,code }=req.body;
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