// Node modules
import { Router } from "express";

// Middleware
import { protect } from "middleware/authMiddleware";

// Controllers
import { updateProfile } from "controllers/profileController";

const router = Router();

// Update user profile
router.put("/", protect, updateProfile);

export default router;
