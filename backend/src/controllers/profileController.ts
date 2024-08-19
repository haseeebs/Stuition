import Profile from "models/profileModel";

const updateProfile =
    async (req, res, next) => {
        const { about, contactNumber, dateOfBirth, gender } = req.body;
      
        const profileId = req.user?.profile;
    
        const updatedProfile = await Profile.findByIdAndUpdate(profileId, {
            about,
            contactNumber,
            dateOfBirth,
            gender
        }, { new: true, runValidators: true })
    
        return res.status(200).json({
            success: true,
            message: "User profile updated successfully",
            profile: updatedProfile
        });
};

export { updateProfile };