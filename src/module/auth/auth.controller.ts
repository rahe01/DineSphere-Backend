import { Request, Response } from "express";
import { authService } from "./auth.service";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";


const register =  catchAsync(async (req:Request, res:Response) => {

    const payload = req.body;
    const data = await authService.register(payload);

   sendResponse(res,{
    httpStatusCode:status.CREATED,
    success:true,
    message:"User registered successfully",
    data
   })
});




const login = catchAsync(async (req:Request, res:Response) => {
    
    const payload = req.body;
    const data = await authService.login(payload);
    sendResponse(res,{
        httpStatusCode:status.OK,
        success:true,
        message:"User logged in successfully",
        data
    })
})

export default {
    register,
    login
}

