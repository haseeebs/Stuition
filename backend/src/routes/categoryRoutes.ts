// Node modules
import { Router } from "express";

// Controllers
import { createCategory, categoryPageDetails } from "controllers/categoryController";

const router = Router();

router.route('/')
    .get(categoryPageDetails) //  Get category page details 
    .post(createCategory); // Create a new category 

export default router;
