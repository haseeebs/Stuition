import { model, Schema, Document } from "mongoose";

// Define the CourseProgress interface
interface ICourseProgress extends Document {
  courseId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  completedVideos: Schema.Types.ObjectId[];
}

// Define the CourseProgress schema
const courseProgressSchema = new Schema<ICourseProgress>({
  courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  completedVideos: [{ type: Schema.Types.ObjectId, ref: "SubSection", required: true }],
});

const CourseProgress = model<ICourseProgress>("CourseProgress", courseProgressSchema);

export default CourseProgress;
