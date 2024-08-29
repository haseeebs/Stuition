import { model, Schema, Document } from "mongoose";
import mailSender from "utils/mailSender";

// Define the OTP interface
interface IOTP extends Document {
  email: string;
  otp: string;
  createdAt: Date;
  verifyOtp: (enteredOtp: string) => Promise<boolean>
}

// Define the OTP schema
const otpSchema = new Schema<IOTP>({
  email: { type: String, required: true, trim: true },
  otp: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now, expires: 5 * 60 }, // Expires after 5 minutes
});

const sendVerificationEmail = async (email: string, otp: string) => {
  try {
    await mailSender(email, 'Verification Email from Stuition', otp);
  } catch (error) {
    console.error(`Error occurred while sending emali: ${error}`);
    throw error;
  }
};

otpSchema.pre('save', async function (next) {
  const otpDoc = this as IOTP
  await sendVerificationEmail(otpDoc.email, otpDoc.otp);
  next();
});

otpSchema.methods.verifyOtp = async function (enteredOtp: string): Promise<boolean> {
  const isMatch = this.otp === enteredOtp;
  return isMatch;
}

const OTP = model<IOTP>("OTP", otpSchema);

export default OTP;
