import { z } from "zod";

// Schema for Category
export const categorySchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().optional()
});

// Infer the TypeScript type from the Zod schema
export type CategorySchemaType = z.infer<typeof categorySchema>;