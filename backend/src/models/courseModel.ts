import { model, Schema } from "mongoose";

const courseSchema = new Schema({
  courseName: { type: String, required: true, trim: true },
  courseDescription: { type: String, required: true, trim: true },
  instructor: { type: Schema.Types.ObjectId, ref: "User", required: true },
  whatYouWillLearned: { type: String },
  courseContent: [{ type: Schema.Types.ObjectId, ref: "Section" }],
  ratingAndReviews: [{ type: Schema.Types.ObjectId, ref: "RatingAndReview" }],
  price: { type: Number },
  thumbnail: { type: String },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  studentsEnrolled: [{ type: Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });

const Course = model("Course", courseSchema);

export default Course;
