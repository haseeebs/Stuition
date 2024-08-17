import { model, Schema, Document } from "mongoose";

// Define the User interface
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  accountType: "admin" | "instructor" | "student";
  contactNumber: string;
  profile: Schema.Types.ObjectId;
  courses: Schema.Types.ObjectId[];
  courseProgress: Schema.Types.ObjectId[];
  image: string;
}

// Define the User schema
const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  accountType: { type: String, required: true, enum: [ "admin", "instructor", "student" ] },
  contactNumber: { type: String, required: true, trim: true },
  profile: { type: Schema.Types.ObjectId, ref: "Profile"},
  courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  courseProgress: [{ type: Schema.Types.ObjectId, ref: "CourseProgress" }],
  image: { type: String, required: true },
});

const User = model("User", userSchema);

export default User;
