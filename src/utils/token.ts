import { JwtPayload, SignOptions } from "jsonwebtoken"
import { JWTUtils } from "./jwt"
import envConfig from "../config/env"
import { CookieUtils } from "./cookie";
import { Response } from "express";






const getAccessToken = (payload: JwtPayload) => {
    const accessToken = JWTUtils.createToken(payload, envConfig.ACCESS_TOKEN_SECRET, { expiresIn: envConfig.ACCESS_TOKEN_EXPIRES_IN } as SignOptions);
    return accessToken;
}


const getRefreshToken = (payload: JwtPayload) => {
    const refreshToken = JWTUtils.createToken(payload, envConfig.REFRESH_TOKEN_SECRET, { expiresIn: envConfig.REFRESH_TOKEN_EXPIRES_IN } as SignOptions);
    return refreshToken;
}



const setAccessTokenCookie = (res: Response, token: string) => {

    CookieUtils.setCookie(res, 'accessToken', token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        path: '/'
    })

}


const setRefreshTokenCookie = (res:Response, token:string) =>{

    CookieUtils.setCookie(res, 'refreshToken' , token ,{
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        path: '/'

    })
}


const setBetterAuthSessionTokenCookie = (res:Response, token:string) =>{
    CookieUtils.setCookie(res, 'betterAuthSessionToken' , token ,{
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        path: '/'

    })

}

export const TokenUtils = {
    getAccessToken,
    getRefreshToken,
    setAccessTokenCookie,
    setRefreshTokenCookie,
    setBetterAuthSessionTokenCookie
}