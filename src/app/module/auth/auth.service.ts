import { register } from "./services/register.service"
import { login } from "./services/login.service"
import { verifyEmail } from "./services/verifyEmail.service";




export const authService = {
    register,
    login,
    verifyEmail

}