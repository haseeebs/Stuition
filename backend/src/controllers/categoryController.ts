// Internal models
import Category from "models/categoryModel";
import Course from "models/courseModel";

const createCategory =
  async ( req, res, next ) => {
    
    const { name, description } = req.body;

    const existingCategory = await Category.findOne({ name });

    const newCategory = await Category.create({ name, description });

    return res.status(200).json({
      success: true,
      message: "Category created successfully",
      newCategory,
    });
  }

const categoryPageDetails =
  async (req, res, next) => {
    const userId = req.user?._id;

    // Fetch popular courses (sorted by number of students enrolled)
    const popularCourses = await Course.find({})
      .sort({ studentsEnrolled: -1 })
      .limit(10);

    // Fetch top-rated courses (sorted by average rating)
    const topRatedCourses = await Course.find({})
      .sort({ avgRating: -1 })
      .limit(10);

    // Combine the results into different sections
    res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      data: {
        popular: popularCourses,
        topRated: topRatedCourses,
      },
    });
  }

export { categoryPageDetails, createCategory };

