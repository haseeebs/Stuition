// Node modules
import { NextFunction, Request, Response } from "express";
import { hash } from "bcrypt";
import crypto from "crypto";

// Internal Models
import User from "models/userModels";

// Templates
import { passwordResetEmailBody } from "templates/emailTemplates";

// Utilities
import ExpressError from "utils/ExpressError";
import mailSender from "utils/mailSender";
import wrapAsync from "utils/wrapAsync";


// Generate and send password reset token
// POST /api/auth//reset-password
// Public
const resetPasswordToken = wrapAsync(
  async (req: Request, res: Response, next: NextFunction) => {

    // Validate email
    const { email } = req.body;
    if (!email) {
      return next(new ExpressError(400, "Email is required"));
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ExpressError(404, "User with this email does not exist"));
    }

    // Save token and expiry to user
    const resetToken = user.generatePasswordResetToken();

    // Save to database
    await user.save();

    // const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
    const resetLink = `http://localhost:5001/api/auth/reset-password/${resetToken}`; // To check in while developing backend

    const emailBody = passwordResetEmailBody(resetLink);

    // Send email
    await mailSender(user.email, "Password reset request", emailBody);

    res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    });
  }
);


// Reset User Password
// POST /api/auth/reset-password/:token
// Public
const resetPassword = wrapAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.params;
    const { newPassword, confirmNewPassword } = req.body;

    // Validate that the passwords match
    if (newPassword !== confirmNewPassword) {
      return next(new ExpressError(400, "Passwords do not match"));
    }

    // Hash the token to compare it with the stored hashed token
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // Find the user with the matching token and valid expiry
    const user = await User.findOne({
      forgotPasswordToken: hashedToken,
      forgotPasswordExpiry: { $gt: Date.now() }, // Token should be valid and not expired
    });
    
    if (!user) {
      return next(new ExpressError(400, "Invalid or expired token"));
    }

    // Hash the new password
    user.password = await hash(newPassword, 10);
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password has been reset successfully",
    });
  }
);

export { resetPassword, resetPasswordToken };
