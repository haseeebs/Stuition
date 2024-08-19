// Node modules
import { Router } from "express";

// Controllers
import { updateProfile } from "controllers/profileController";

const router = Router();

// Update user profile
router.put("/", updateProfile);

export default router;
