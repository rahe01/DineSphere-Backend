import { Router } from "express";
import authController from "./auth.controller";




const router = Router();


router.post("/registeruser", authController.register);
router.post("/login", authController.login);

export const authRoutes = router;