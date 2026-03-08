import { NextFunction, Request, Response } from "express";
import { Role } from "../../generated/prisma/enums";
import { CookieUtils } from "../utils/cookie";
import { prisma } from "../lib/prisma";






export const checkAuth = (...authRole: Role[]) => async (req: Request, res: Response, next: NextFunction) => {

    try {

        // session token check

        const sessionToken = CookieUtils.getCookie(req, "better-auth.dinesphere_session_token");

        if (!sessionToken) {
            throw new Error("Unauthorized: No session token provided");
        }

        if (sessionToken) {
            const sessionExists = await prisma.session.findUnique({
                where: {
                    token: sessionToken,
                    expiresAt: {
                        gt: new Date()
                    }
                },
                include:{
                    user: true
                }
            })

            if (!sessionExists) {
                throw new Error("Unauthorized: Invalid or expired session token in Database");
            }

            if(sessionExists && sessionExists.user){
                
                const user = sessionExists.user;
                console.log(user);
            }









        }




















    } catch (error) {
        next(error);
    }

}