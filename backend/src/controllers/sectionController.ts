// Node modules
import { NextFunction, Request, Response } from "express";

// Internal Models
import Course from "models/courseModel";
import Section from "models/sectionModel";
import SubSection from "models/subSectionModel";

// Schemas
import { createSectionSchema, updateSectionParamsSchema } from "schemas/sectionSchema";

const createSection =
  async (req, res, next) => {
    
    // Validate request body and params
    const { sectionName } = req.body;
    const { courseId } = req.params;
    
    // Create a new section
    const newSection = await Section.create({ sectionName });

    const result = await Course.findByIdAndUpdate(courseId, {
      $push: { sections: newSection._id } // Add the new section's ID to the course's content array
    }, { new: true });

    res.status(200).json({
      success: true,
      message: "Section created successfully",
      sectionId: newSection._id
    });
  }

const updateSection =
  async (req, res, next) => {
    
    // Validating the incoming parameters
    const { sectionId } = updateSectionParamsSchema.parse(req.params);
    // Validating the incoming request body
    const { sectionName } = createSectionSchema.partial().parse(req.body); // .partial() allows partial updates

    // Finding and updating the section
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Section updated successfully",
      section: updatedSection,
    });
  }

const deleteSection = 
  async (req: Request, res: Response, next: NextFunction) => {

    const { sectionId } = updateSectionParamsSchema.parse(req.params);

    const section = await Section.findById(sectionId);
    
    // Delete all subsections that belong to this section
    await SubSection.deleteMany({_id: { $in: section.subSections }})

    // Removing the section reference from the course
    const course = await Course.findOneAndUpdate(
      { sections: sectionId },
      { $pull: { sections: sectionId } },
      { new: true }
    );

    // Deleting the section
    await Section.findByIdAndDelete(sectionId);

    res.status(200).json({
      success: true,
      message: "Section and references deleted successfully",
    });
  }

export { createSection, deleteSection, updateSection };
