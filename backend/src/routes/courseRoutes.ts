// Node modules
import { Router } from "express";

// Controllers
import { createCourse, deleteCourse, getCourse, updateCourse } from "controllers/courseController";
import upload from "controllers/uploadController";
import { createSection, deleteSection, updateSection } from "controllers/sectionController";

const router = Router();

// Create a new course
router.post("/", upload.single('image'), createCourse);

// Get course by ID
router.get("/:courseId", getCourse);

// Update course by ID
router.put("/:courseId", upload.single('image'), updateCourse);

// Delete course by ID
router.delete("/:courseId", deleteCourse);


// Create a new section under a specific course
router.post("/:courseId/sections", createSection);

// Update an existing section under a specific course
router.put("/:courseId/sections/:sectionId", updateSection);

// Delete an existing section under a specific course
router.delete("/:courseId/sections/:sectionId", deleteSection);

export default router;