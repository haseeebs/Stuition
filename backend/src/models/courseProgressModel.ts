import { model, Schema } from "mongoose";

const courseProgressSchema = new Schema({
  courseId: { type: Schema.Types.ObjectId, ref: "Course" },
  completedVideos: [{ type: Schema.Types.ObjectId, ref: "SubSection" }],
});

const courseProgress = model("CourseProgress", courseProgressSchema);

export default courseProgress;
