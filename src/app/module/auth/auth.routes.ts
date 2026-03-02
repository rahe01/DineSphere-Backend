import { Router } from "express";

import { validateRequest } from "../../middleware/validateRequest";
import { authValidation } from "./auth.validation";
import { authController } from "./auth.controller";




const router = Router();


router.post("/registeruser", validateRequest(authValidation.registerUserZodSchema), authController.register);
router.post("/login", validateRequest(authValidation.loginUserZodSchema), authController.login);
router.post("/verify-email",  authController.verifyEmail);

export const authRoutes = router;