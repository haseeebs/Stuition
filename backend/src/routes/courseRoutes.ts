// Node modules
import { Router } from "express";

// Controllers
import { createCourse, deleteCourse, getCourse, updateCourse } from "controllers/courseController";
import upload from "controllers/uploadController";
import { createSection, deleteSection, updateSection } from "controllers/sectionController";
import { createSubSection, updateSubSection, deleteSubSection } from "controllers/subSectionController";

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

// Create a new subsection under a specific section
router.post("/:courseId/sections/:sectionId/subsections", upload.single('video'), createSubSection);

// Update an existing subsection under a specific section
router.patch("/subsections/:subsectionId", upload.single('video'), updateSubSection);

// Delete an existing subsection under a specific section
router.delete("/sections/:sectionId/subsections/:subsectionId", deleteSubSection);

export default router;