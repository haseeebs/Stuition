import { z } from "zod";

// Zod schema for route parameters
export const sectionParamsSchema = z.object({
  courseId: z.string().min(1, "Course ID is required"),
});

export type SectionParamsSchema = z.infer<typeof sectionParamsSchema>;

// Zod schema for request body
export const createSectionSchema = z.object({
  sectionName: z.string().min(1, { message: "Section name is required" }),
});

export type CreateSectionSchema = z.infer<typeof createSectionSchema>;

// Zod schema for update route parameters
export const updateSectionParamsSchema = z.object({
  sectionId: z.string().min(1, "Section ID is required"),
});

export type UpdateSectionParamsSchema = z.infer<typeof sectionParamsSchema>;