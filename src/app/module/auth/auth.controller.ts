import { Request, Response } from "express";
import { authService } from "./auth.service";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
import { TokenUtils } from "../../utils/token";


const register = catchAsync(async (req: Request, res: Response) => {

    const payload = req.body;
    const data = await authService.register(payload);
    const { accessToken, refreshToken, token, ...rest } = data;
    TokenUtils.setAccessTokenCookie(res, accessToken);
    TokenUtils.setRefreshTokenCookie(res, refreshToken);
    TokenUtils.setBetterAuthSessionCookie(res, token as string);

    console.log(payload);




    sendResponse(res, {
        httpStatusCode: status.CREATED,
        success: true,
        message: "User registered successfully",
        data: {
            accessToken,
            refreshToken,
            token,
            ...rest,
        }
    })
});




const login = catchAsync(async (req: Request, res: Response) => {

    const payload = req.body;
    const data = await authService.login(payload);
    const { accessToken, refreshToken, token, ...rest } = data;




    TokenUtils.setAccessTokenCookie(res, accessToken);
    TokenUtils.setRefreshTokenCookie(res, refreshToken);
    TokenUtils.setBetterAuthSessionCookie(res, token as string);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "User logged in successfully",
        data: {
            accessToken,
            refreshToken,
            token,
            ...rest
        }
    })
})

export default {
    register,
    login
}

