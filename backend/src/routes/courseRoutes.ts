// Node modules
import { Router } from "express";

// Middleware
import { isInstructor, protect } from "middleware/authMiddleware";

// Controllers
import { createCourse, deleteCourse, getAllCourses, getCourse, updateCourse } from "controllers/courseController";
import { createSection, deleteSection, updateSection } from "controllers/sectionController";
import { createSubSection, deleteSubSection, updateSubSection } from "controllers/subSectionController";
import upload from "controllers/uploadController";

const router = Router();

// Create a new course
router.post("/", protect, isInstructor, upload.single('image'), createCourse);

// Get all courses
router.get("/", protect, getAllCourses);

// Get course by ID
router.get("/:courseId", protect, getCourse);

// Update course by ID
router.put("/:courseId", protect, isInstructor, upload.single('image'), updateCourse);

// Delete course by ID
router.delete("/:courseId", protect, isInstructor, deleteCourse);

// Create a new section under a specific course
router.post("/:courseId/sections", protect, isInstructor, createSection);

// Update an existing section under a specific course
router.put("/:courseId/sections/:sectionId", protect, isInstructor, updateSection);

// Delete an existing section under a specific course
router.delete("/:courseId/sections/:sectionId", protect, isInstructor, deleteSection);

// Create a new subsection under a specific section
router.post("/:courseId/sections/:sectionId/subsections", protect, isInstructor, upload.single('video'), createSubSection);

// Update an existing subsection under a specific section
router.patch("/subsections/:subsectionId", protect, isInstructor, upload.single('video'), updateSubSection);

// Delete an existing subsection under a specific section
router.delete("/sections/:sectionId/subsections/:subsectionId", protect, isInstructor, deleteSubSection);

export default router;