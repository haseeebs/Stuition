// Configurations
import cloudinary from "config/cloudinaryConfig";
import { NextFunction } from "express";

// Internal models
import Course from "models/courseModel";
import RatingAndReview from "models/ratingAndReviewModel";
import Section from "models/sectionModel";
import SubSection from "models/subSectionModel";
import User from "models/userModels";

const getCourse =
    async (req, res, next) => {
      const { courseId } = req.params;
  
      // We can also populate related fields like instructor and sections
      const course = await Course.findById(courseId)
        .populate({
          path: "instructor",
          select: "image firstName email",
          populate: {
            path: "profile",
            select: "about contactNumber"
          }
        })
        .populate("category")
        .populate({
          path: "sections",
          select: "sectionName",
          populate: {
            path: "subSection",
            select: "title timeDuration description"
          }
        })
        .populate({
          path: "ratingAndReviews",
          populate: {
            "path": "user",
            "select": "firstName"
          }
        })
        .populate({
          path: 'studentsEnrolled',
          select: 'name',
          populate: {
            path: 'profile',
            select: 'about contactNumber'
          }
        }).exec();
  
      return res.status(200).json({
        success: true,
        message: "Course fetched successfully",
        data: course,
      });
    }

const createCourse =
    async (req, res, next) => {

        // Validate request body using Zod schema
        const validatedData = req.body;

        const { courseName, courseDescription, price, category, tags, whatYouWillLearn } = validatedData;

        const thumbnail = req.file?.path;

        // Upload thumbnail to Cloudinary
        const result = await cloudinary.uploader.upload(thumbnail, {
            folder: "course_thumbnails",
            resource_type: "image",
            public_id: `${courseName}-${Date.now()}`,
            overwrite: true
        });

        // Create a new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: req.user?._id,
            whatYouWillLearn,
            price,
            thumbnail: result.secure_url,
            category,
            tags
        });

        // Send response
        res.status(200).json({
            success: true,
            message: "Course created successfully...",
            courseId: newCourse._id
        });
    };


const updateCourse =
    async (req, res, next) => {

        const { courseName, courseDescription, price, category, tags, whatYouWillLearn } = req.body;
        const { courseId } = req.params;

        const course = await Course.findById(courseId);

        let thumbnail;

        if (req.file) {
            try {
                const result = await cloudinary.uploader.upload(req.file.path, {
                    folder: "course_thumbnails",
                    resource_type: "image",
                    public_id: `${courseName}-${Date.now()}`,
                    overwrite: true
                });

                thumbnail = result.secure_url;
            } catch (error) {
                return next(new ExpressError(500, "Failed to upload image"));
            }
        }

        // Update course document
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                $set: {
                    courseName,
                    courseDescription,
                    whatYouWillLearn,
                    price,
                    ...(thumbnail && { thumbnail }), // Only update thumbnail if provided
                    category,
                    tags
                }
            },
            { new: true, runValidators: true } // Ensure updated data is validated
        );

        return res.status(200).json({
            success: true,
            message: "Course updated successfully",
            data: updatedCourse,
        });
    }

const deleteCourse =
    async (req, res, next) => {
        const { courseId } = req.params;

        // Find the course by ID
        const course = await Course.findById(courseId);

        const sections = await Section.find({ _id: { $in: course.sections } });

        // Collect all subsection IDs in one array
        const allSubsectionIds = sections.flatMap(section => section.subSections);

        // Delete related subsesction
        await SubSection.deleteMany({ _id: { $in: allSubsectionIds } })

        // Delete related sections
        await Section.deleteMany({ _id: { $in: course.sections } })

        // Delete related ratings and reviews
        await RatingAndReview.deleteMany({ _id: { $in: course.ratingAndReviews } });

        // Remove course from students' enrolled courses
        await User.updateMany(
            { _id: { $in: course.studentsEnrolled } },
            { $pull: { courses: course._id } }
        );

        // Delete the course
        await Course.findByIdAndDelete(courseId);

        res.status(200).json({
            success: true,
            message: "Course and it's related data deleted successfully.",
        });
    }

export { getCourse, createCourse, updateCourse, deleteCourse };