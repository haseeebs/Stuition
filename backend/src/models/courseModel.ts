import { model, Schema, Document } from "mongoose";

// Course interface
export interface ICourse extends Document {
  courseName: string;
  courseDescription: string;
  instructor: Schema.Types.ObjectId;
  whatYouWillLearn: string;
  sections: Schema.Types.ObjectId[];
  ratingAndReviews: Schema.Types.ObjectId[];
  avgRating: Number;
  price: number;
  thumbnail: string;
  category: Schema.Types.ObjectId;
  studentsEnrolled: Schema.Types.ObjectId[];
  tags: string[];
  instructions: string[];
  status: "draft" | "published";
}

// Course schema
const courseSchema = new Schema<ICourse>({
  courseName: { type: String, required: true, trim: true },
  courseDescription: { type: String, required: true, trim: true },
  instructor: { type: Schema.Types.ObjectId, ref: "User", required: true },
  whatYouWillLearn: { type: String },
  sections: [{ type: Schema.Types.ObjectId, ref: "Section" }],
  ratingAndReviews: [{ type: Schema.Types.ObjectId, ref: "RatingAndReview", default: [] }], // Default empty array
  avgRating: { type: Number, default: 0 },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  studentsEnrolled: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }], // Default empty array
  tags: [{ type: String }],
  instructions: [{ type: String }],
  status: { type: String, enum: ["draft", "published"] }
}, { timestamps: true });

const Course = model<ICourse>("Course", courseSchema);

export default Course;