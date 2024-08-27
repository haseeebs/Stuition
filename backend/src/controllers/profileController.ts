// Node modules
import { NextFunction, Request, Response } from "express";

// Internal Models
import Profile from "models/profileModel";

// Schemas
import { profileSchema, ProfileSchemaType } from "schemas/profileSchema";

// Utilities
import ExpressError from "utils/ExpressError";
import wrapAsync from "utils/wrapAsync";


const updateProfile = wrapAsync(
  async (req: Request<{}, {}, ProfileSchemaType>, res: Response, next: NextFunction) => {
    const { about, contactNumber, dateOfBirth, gender } = profileSchema.parse(req.body);
  
    const profileId = req.user?.profile;

    const updatedProfile = await Profile.findByIdAndUpdate(profileId, {
        about,
        contactNumber,
        dateOfBirth,
        gender
    }, { new: true, runValidators: true })

    if(!updatedProfile) {
        return next(new ExpressError(404, "User's Profile not found"));
    };

    return res.status(200).json({
        success: true,
        message: "User profile updated successfully",
        profile: updatedProfile
    });
});

// Profile picture update

// Get iser details

export { updateProfile };