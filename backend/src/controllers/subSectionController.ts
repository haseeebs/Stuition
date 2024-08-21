// Configuration
import cloudinary from "config/cloudinaryConfig";

// Internal Models
import Section from "models/sectionModel";
import SubSection from "models/subSectionModel";


const createSubSection =
  async ( req, res, next ) => {
    
    // Validate the body and params
    const { title, description, timeDuration, additionalUrls } = req.body;
    const { sectionId } = req.params;

    let videoUrl;

    try {
      // Upload video to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "sub_section_video",
        resource_type: "video",
        public_id: `${title}-${Date.now()}`,
        overwrite: true,
      });

      videoUrl = result.secure_url;
      } catch (error) {
        console.error(error)
      }

      // Create the new subsection
      const newSubSection = await SubSection.create({
        title,
        description,
        timeDuration,
        videoUrl,
        additionalUrls,
      });

      // Update section with the new subsection
      const updatedSection = await Section.findByIdAndUpdate(sectionId, {
        $push: { subSection: newSubSection._id },
      });

      return res.status(200).json({
        success: true,
        message: "Subsection created successfully",
        data: newSubSection, // Returning the new subsection
      });
    }
);

const updateSubSection =
  async (req, res, next) => {

    const { title, description, timeDuration, additionalUrls } = req.body;

    const { subsectionId } = req.params;
    
    // Check if the subsection exists
    const subsection = await SubSection.findById(subsectionId);

    let videoUrl;

    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "sub_section_video",
          resource_type: "video",
          public_id: `${title}-${Date.now()}`,
          overwrite: true,
        });

        videoUrl = result.secure_url;
      } catch (error) {
        console.error(error);
    }
    }

    // Update subsection in the database
    const updatedSubSection = await SubSection.findByIdAndUpdate(
      subsectionId,
      { 
        $set: {
          title,
          description,
          timeDuration,
          ...(videoUrl && { videoUrl }), // Only update videoUrl if provided
          additionalUrls,
        }
      },
        { new: true }
      );

    return res.status(200).json({
      success: true,
      message: "Subsection updated successfully",
      data: updatedSubSection,
    });
  }

const deleteSubSection =
  async (req, res, next) => {
    const { sectionId, subsectionId } = req.params;

    // Update the section to remove the reference to the deleted subsection
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      { $pull: { subSection: subsectionId } },
      { new: true }
    );

    // Find and delete the subsection
    const deletedSubSection = await SubSection.findByIdAndDelete(subsectionId);

    return res.status(200).json({
      success: true,
      message: "Subsection deleted successfully",
      data: deletedSubSection,
    });
  }

export { createSubSection , updateSubSection, deleteSubSection };