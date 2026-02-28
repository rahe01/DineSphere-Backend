import { auth } from "../../lib/auth";
import { TokenUtils } from "../../utils/token";



const register = async (payload: any) => {

    const { name, email, password } = payload;

    const data = await auth.api.signUpEmail({
        body: {
            name,
            email,
            password,


        }
    })

    const newAccessToken = TokenUtils.getAccessToken({
        userId: data.user.id,
        email: data.user.email,
        name: data.user.name,
        role: data.user.role,
        status: data.user.status,
        isDeleted: data.user.isDeleted,
        emailVerified: data.user.emailVerified,

    })

    const newRefreshToken = TokenUtils.getRefreshToken({
        userId: data.user.id,
        email: data.user.email,
        name: data.user.name,
        role: data.user.role,
        status: data.user.status,
        isDeleted: data.user.isDeleted,
        emailVerified: data.user.emailVerified,

    })

    if (!data) {
        throw new Error("Failed to register user");
    }
    return {
        ...data,
        accessToken: newAccessToken,
    refreshToken: newRefreshToken

    };

}


const login = async (payload: any) => {

    const { email, password } = payload;

    const data = await auth.api.signInEmail({
        body: {
            email,
            password,
        }
    })

    if (!data) {
        throw new Error("Failed to login user");
    }


    const newAccessToken = TokenUtils.getAccessToken({
        userId: data.user.id,
        email: data.user.email,
        name: data.user.name,
        role: data.user.role,
        status: data.user.status,
        isDeleted: data.user.isDeleted,
        emailVerified: data.user.emailVerified,

    })

    const newRefreshToken = TokenUtils.getRefreshToken({
        userId: data.user.id,
        email: data.user.email,
        name: data.user.name,
        role: data.user.role,
        status: data.user.status,
        isDeleted: data.user.isDeleted,
        emailVerified: data.user.emailVerified,

    })

    return {
        ...data,
        accessToken: newAccessToken,
        refreshToken: newRefreshToken

    };

}

export const authService = {
    register,
    login

}