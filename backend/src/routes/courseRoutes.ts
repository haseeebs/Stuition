// Node modules
import { Router } from "express";

// Controllers
import { createCourse } from "controllers/courseController";
import upload from "controllers/uploadController";

const router = Router();

// Create a new course
router.post("/", upload.single('image'), createCourse);

export default router;