import { model, Schema } from "mongoose";

const profileSchema = new Schema({
  gender: { type: String, trim: true },
  dateOfBirth: { type: String, trim: true },
  about: { type: String, trim: true },
  contactNumber: { type: Number, trim: true },
});

const Profile = model("Profile", profileSchema);

export default Profile;
