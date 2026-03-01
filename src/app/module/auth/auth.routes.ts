import { Router } from "express";
import authController from "./auth.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { authValidation } from "./auth.validation";




const router = Router();


router.post("/registeruser", validateRequest(authValidation.registerUserZodSchema), authController.register);
router.post("/login", validateRequest(authValidation.loginUserZodSchema), authController.login);

export const authRoutes = router;