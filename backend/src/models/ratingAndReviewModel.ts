import { model, Schema } from "mongoose";

const ratingAndReviewSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: String, required: true },
  review: { type: String, required: true },
});

const RatingAndReview = model("RatingAndReview", ratingAndReviewSchema);

export default RatingAndReview;
