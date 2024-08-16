import { model, Schema } from "mongoose";

const otpSchema = new Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now(), expires: 5*60 },
});

const OTP = model("OTP", otpSchema);

export default OTP;
