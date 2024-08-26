import { z } from "zod";

// Schema for Subsection body
export const subSectionSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  timeDuration: z.string().min(1, { message: "Time duration is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  additionalUrls: z.array(z.string().url({ message: "Invalid URL format" })).optional(),
});

export type SubsectionSchemaType = z.infer<typeof subSectionSchema>;