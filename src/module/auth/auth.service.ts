import { auth } from "../../lib/auth";



const register = async (payload :any) =>{

    const { name, email, password} = payload;

    const data = await auth.api.signUpEmail({
        body:{
            name,
            email,
            password,
           
        
        }
    })

    console.log(data);

    if(!data){
        throw new Error("Failed to register user");
    }
    return data;

}


const login = async (payload:any) => {

    const { email, password } = payload;

    const data = await auth.api.signInEmail({
        body:{
            email,
            password,
        }
    })

    if(!data){
        throw new Error("Failed to login user");
    }
    return data;
}

export const authService = {
    register,
    login

}