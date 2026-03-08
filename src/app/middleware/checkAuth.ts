import { NextFunction, Request, Response } from "express";
import { Role, UserStatus } from "../../generated/prisma/enums";
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
                const now = new Date();

                const createdAt =new Date(sessionExists.createdAt);
                const expiredAt = new Date(sessionExists.expiresAt);

                const sessionLifeTime = expiredAt.getTime() - createdAt.getTime();
                const timeRemaining = expiredAt.getTime() - now.getTime();
                const percentRemaining = (timeRemaining / sessionLifeTime) * 100;



                

                console.log(sessionLifeTime, "Session lifetime" );
                console.log(timeRemaining, "Time remaining" );
                console.log(percentRemaining, "Percent remaining" );


                if(percentRemaining < 99){
                    res.setHeader("X-Session-Refresh", "true");
                    res.setHeader("X-Session-Expires-At" , expiredAt.toISOString());
                    res.setHeader("X-Session-Percent-Remaining" , timeRemaining.toString());
                    console.log("Session expires soon ");

                }

                if(user.status === UserStatus.BLOCKED || user.status === UserStatus.DELETED || user.status === UserStatus.SUSPENDED){
                    throw new Error("Unauthorized: User account is blocked, deleted, or suspended.");
                }

                


            }









        }




















    } catch (error) {
        next(error);
    }

}