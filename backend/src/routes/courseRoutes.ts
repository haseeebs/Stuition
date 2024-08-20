// Node modules
import { Router } from "express";

// Controllers
import { createCourse, deleteCourse, getCourse, updateCourse } from "controllers/courseController";
import upload from "controllers/uploadController";

const router = Router();

// Create a new course
router.post("/", upload.single('image'), createCourse);

// Get course by ID
router.get("/:courseId", getCourse);

// Update course by ID
router.put("/:courseId", upload.single('image'), updateCourse);

// Delete course by ID
router.delete("/:courseId", deleteCourse);

export default router;