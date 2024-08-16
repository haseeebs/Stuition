import { model, Schema } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  password: { type: String, required: true },
  accountType: { type: String, required: true, enum: ["student", "teacher", "instructor"]},
  contactNumber: { type: Number, required: true, trim: true },
  profile: { type: Schema.Types.ObjectId, ref: "Profile", required: true },
  courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  courseProgress: { type: Schema.Types.ObjectId, ref: 'CourseProgress' },
  image: { type: String, required: true },
});

const User = model("User", userSchema);

export default User;
