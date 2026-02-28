import { Request, Response } from "express";
import { authService } from "./auth.service";


const register = (req:Request, res:Response) => {

    const payload = req.body;

    authService.register(payload)
        .then(() => {
            res.status(201).json({ message: "User registered successfully" });
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
}

const login = (req:Request, res:Response) => {

    const payload = req.body;

    authService.login(payload)
        .then((data) => {
            res.status(200).json({ message: "User logged in successfully", data });
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
}

export default {
    register,
    login
}

