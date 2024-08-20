import Course from "models/courseModel";

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

    export { createCourse };