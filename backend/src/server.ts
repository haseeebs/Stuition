// Node modules
import express from "express";
import "dotenv/config";

// Configurations
import connectDb from "./config/db";

// Models
import Profile from "models/profileModel";
import User from "models/userModels";
import { Schema } from "mongoose";

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

app.listen(PORT, () => {
    console.log(`Running on Port http://localhost:${PORT}`);
});