// Node modules
import { Router } from "express";

// Middleware
import { protect } from "middleware/authMiddleware";

// Controllers
import { updateProfile, updateProfilePicture } from "controllers/profileController";
import upload from "controllers/uploadController";

const router = Router();

// Update user profile
router.put("/", protect, updateProfile);

// we want to update profilePicture
router.put("/updateProfilePicture", protect, upload.single('profilePicture'), updateProfilePicture);

export default router;
