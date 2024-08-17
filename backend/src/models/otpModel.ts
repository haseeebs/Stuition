import { model, Schema, Document } from "mongoose";

// Define the OTP interface
interface IOTP extends Document {
  email: string;
  otp: string;
  createdAt: Date;
}

// Define the OTP schema
const otpSchema = new Schema<IOTP>({
  email: { type: String, required: true, trim: true },
  otp: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now, expires: 5 * 60 }, // Expires after 5 minutes
});

const OTP = model<IOTP>("OTP", otpSchema);

export default OTP;
