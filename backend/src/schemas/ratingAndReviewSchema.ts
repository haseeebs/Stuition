import { z } from "zod";

// Schema for RatingAndReview
export const ratingAndReviewSchema = z.object({
  rating: z.number().min(1, { message: "Rating must be at least 1" }).max(5, { message: "Rating must be at most 5" }),
  review: z.string().min(1, { message: "Review is required" }).trim(),
});

export type RatingAndReviewSchemaType = z.infer<typeof ratingAndReviewSchema>;
