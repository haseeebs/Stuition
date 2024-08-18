// Node modules
import express from "express";
import { Schema } from "mongoose";
import jwt from 'jsonwebtoken';
import "dotenv/config";

// Configurations
import connectDb from "./config/db";

// Models
import Profile from "models/profileModel";
import User from "models/userModels";
import Course from "models/courseModel";
import CourseProgress from "models/courseProgressModel";

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDb();

app.get('/', async (req, res) => {
    res.send(`<h1>Hi there, Haseeb here...</h1>`);
});

app.get('/api/v1/auth/register', async (req, res, next) => {

    const { firstName, lastName, email, password, accountType, contactNumber, otp: enteredOtp } = req.body;

    // Check if user already exists
    const existUser = await User.findOne({ email });

    if (!existUser) {
        return res.status(404).json({
            success: false,
            message: "User does not found."
        })
    }

    // Create profile
    const profile = await Profile.create({
        user: null,
        about: null,
        dateOfBirth: null,
        gender: null,
        contactNumber: contactNumber,
    });

    // Create user
    const newUser = await User.create({
        firstName,
        lastName,
        email,
        password,
        accountType,
        contactNumber,
        profile: profile._id,
        image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    // Update profile with user reference
    profile.user = newUser._id as Schema.Types.ObjectId;
    await profile.save();

    return res.status(200).json({
        success: true,
        message: "User registered successfully",
        newUser,
    });
});

app.get('/api/v1/auth/login', async (req, res, next) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User does not found."
        });
    }

    if (!process.env.JWT_SECRET_KEY) throw new Error('JWT_SECRET_KEY is not defined in the environment variables')

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '30d' });

    res.cookie('jwtToken', token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 Days
    })

    return res.status(200).json({
        success: true,
        message: "Login successfully",
        data: {
            _id: user._id,
            email: user.email,
            accountType: user.accountType
        },
    });

})

app.post('api/v1/auth/logout', async (req, res) => {
    res.cookie('jwtToken', '', {
        httpOnly: true,
        expires: new Date(0)
    })

    return res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    })
})

app.post('api/v1/auth/change-password', async (req, res, next) => {

    // Validate the request body
    const { oldPassword, newPassword } = req.body;

    const userId = req.user.id;

    let user = await User.findById(userId);

    // Assign the new password (this will trigger the 'pre-save' middleware)
    user.password = newPassword;

    const updatedUser = await user.save();

    res.status(200).json({
        success: true,
        message: 'Password updated successfully',
        data: {
            _id: updatedUser._id,
            email: updatedUser.email,
            accountType: updatedUser.accountType
        }
    })
})

app.post('api/v1/auth/change-password', async (req, res, next) => {

    const userId = req.user.id;

    const user = await User.findById(userId);

    await Profile.findOneAndDelete({ user: userId });

    // Delete all courses where the user is enrolled
    if (user.courses.length > 0) {
        await Course.updateMany(
            { studentsEnrolled: userId },
            { $pull: { studentsEnrolled: userId } }
        );
    }

    // Remove user course progress entries
    await CourseProgress.deleteMany({ userId: userId });

    // Delete the user
    await user.deleteOne();

    return res.status(200).json({
        success: true,
        message: "User and related data deleted successfully"
    });
});

app.listen(PORT, () => {
    console.log(`Running on Port http://localhost:${PORT}`);
});