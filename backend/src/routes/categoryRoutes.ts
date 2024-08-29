// Node modules
import { Router } from "express";

// Middleware
import { protect, isAdmin } from "middleware/authMiddleware";

// Controllers
import { createCategory, categoryPageDetails } from "controllers/categoryController";

const router = Router();

router.route('/')
    .get(protect, categoryPageDetails) //  Get category page details 
    .post(protect, isAdmin, createCategory); // Create a new category 

export default router;
