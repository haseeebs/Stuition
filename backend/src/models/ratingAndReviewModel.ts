import { model, Schema, Document } from "mongoose";

// RatingAndReview interface
interface IRatingAndReview extends Document {
  user: Schema.Types.ObjectId;
  course: Schema.Types.ObjectId;
  rating: number;
  review: string;
}

// RatingAndReview schema
const ratingAndReviewSchema = new Schema<IRatingAndReview>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  review: { type: String, required: true, trim: true },
});

const RatingAndReview = model<IRatingAndReview>("RatingAndReview", ratingAndReviewSchema);

export default RatingAndReview;
