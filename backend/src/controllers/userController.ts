// Node modules
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import z from "zod";
import otpGenerator from "otp-generator";
import { Schema } from "mongoose";

// Internal models
import OTP from "models/otpModel";
import Profile from "models/profileModel";
import User from "models/userModels";
import Course from "models/courseModel";
import CourseProgress from "models/courseProgressModel";

// Schemas
import { changePasswordSchema, loginSchema, userSchema } from "../schemas/userSchema";

// Utilities
import ExpressError from "utils/ExpressError";
import mailSender from "utils/mailSender";
import wrapAsync from "utils/wrapAsync";


// Send otp for new account verification
// Route: POST /api/v1/auth/verify-otp
// Access Public
const sendOtp = wrapAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  // Check if the email already exists
  const isEmailExist = await User.findOne({ email });

  if (isEmailExist) {
    return res.status(401).json({
      success: false,
      message: "User with this email already exists...",
    });
  };

  // Generate OTP
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  console.log(`OTP generated successfully: ${otp}`);

  // Save OTP to the database
  const savingOtpToDb = await OTP.create({ email, otp });
  console.log(`Response : ${savingOtpToDb}`);

  return res.status(200).json({
    success: true,
    message: "OTP sent successfully",
  });
})


// Register new user
// Route: POST /api/v1/auth/register
// Access: Public
const register = wrapAsync(async (req: Request<{}, {}, z.infer<typeof userSchema>>, res: Response, next: NextFunction) => {
  const validatedData = userSchema.parse(req.body);

  const { firstName, lastName, email, password, accountType, otp: enteredOtp } = validatedData;

  // Check if user already exists
  const existUser = await User.findOne({ email });

  if (existUser) {
    return next(new ExpressError(400, 'User with this email already exists'));
  }

  const latestOTP = await OTP.findOne({ email }).sort({ createdAt: -1 });

  if (!latestOTP || !(await latestOTP.verifyOtp(enteredOtp))) {
    return next(new ExpressError(400, "Invalid or expired OTP"));
  }

  // Create profile
  const profile = await Profile.create({
    user: null,
    about: null,
    dateOfBirth: null,
    gender: null,
    contactNumber: null,
  });

  // Create user
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password,
    accountType,
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


// Auth user
// Route: POST /api/v1/auth/login
// Access Public
const login = wrapAsync(async (req: Request<{}, {}, z.infer<typeof loginSchema>>, res: Response, next: NextFunction) => {
  const validatedData = loginSchema.parse(req.body);

  const { email, password } = validatedData;

  const user = await User.findOne({ email });

  if (!user) {
    return next(new ExpressError(400, 'User not found. Please check your email or register a new account.'));
  }

  const isPasswordValid = await user.matchPasswords(password);

  if (!isPasswordValid) {
    return next(new ExpressError(400, 'Incorrect password'));
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


// Logout user
// Route: POST /api/v1/auth/logout
// Access Private
const logout = wrapAsync(async (req: Request, res: Response) => {
  res.cookie('jwtToken', '', {
    httpOnly: true,
    expires: new Date(0)
  })

  return res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  })
})


// Update user
// Route: POST /api/v1/auth/change-password
// Access: Private
const changePassword = wrapAsync(async (req: Request<{}, {}, z.infer<typeof changePasswordSchema>>, res: Response, next: NextFunction) => {

  if (!req.user) {
    return next(new ExpressError(401, 'Unauthorized'))
  }

  // Validate the request body
  const { oldPassword, newPassword } = changePasswordSchema.parse(req.body);

  const userId = req.user.id;

  let user = await User.findById(userId);

  if (!user) {
    return next(new ExpressError(404, 'User not found'))
  }

  const isPasswordValid = await user.matchPasswords(oldPassword);

  if (!isPasswordValid) {
    return next(new ExpressError(400, 'Old password is incorrect'));
  }

  // Assign the new password (this will trigger the 'pre-save' middleware)
  user.password = newPassword;

  const updatedUser = await user.save();

  // Send mail: To notify the user about the password change
  mailSender(user.email, 'Password Changed', 'Your password was successfully changed.');

  res.status(200).json({
    success: true,
    message: 'Password updated successfully',
    data: {
      _id: updatedUser._id,
      email: updatedUser.email,
      accountType: updatedUser.accountType
    }
  })
});

// Delete user
// Route: DELETE /api/v1/users/:id
// Access: Private
const deleteUser = wrapAsync(
  async (req: Request, res: Response, next: NextFunction) => {

    if (!req.user) {
      return next(new ExpressError(401, "Unauthorized"))
    };

    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return next(new ExpressError(404, "User not found"))
    };

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

  }
)

export { register, sendOtp, changePassword, login, logout, deleteUser };
