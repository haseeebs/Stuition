import { z } from "zod";

// Create course schema
export const courseSchema = z.object({
  courseName: z.string().min(3, { message: "Course name must be at least 3 characters long" }),
  courseDescription: z.string().min(10, { message: "Description must be at least 10 characters long" }),
  whatYouWillLearn: z.string().optional(), // Optional field
  sections: z.array(z.string()).optional(), // Array of section IDs
  price: z.number().positive({ message: "Price must be a positive number" }),
  category: z.string().min(1, { message: "Category is required" }),
  tags: z.array(z.string()).min(1, { message: "At least one tag is required" }).optional() // Array of tags
});

export type CourseType = z.infer<typeof courseSchema>