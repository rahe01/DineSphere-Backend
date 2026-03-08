import { Router } from "express";

import { validateRequest } from "../../middleware/validateRequest";
import { authValidation } from "./auth.validation";
import { authController } from "./auth.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";




const router = Router();


router.post("/registeruser", validateRequest(authValidation.registerUserZodSchema), authController.register);
router.post("/login", checkAuth(Role.USER) , validateRequest(authValidation.loginUserZodSchema), authController.login);
router.post("/verify-email",  authController.verifyEmail);

export const authRoutes = router;