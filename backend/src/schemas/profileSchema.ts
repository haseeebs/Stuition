import { z } from "zod";

// Define the Profile schema using Zod
export const profileSchema = z.object({
  gender: z.enum(["Male", "Female", "Other"]),
  dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),
  about: z.string().min(1, { message: "About is required" }),
  contactNumber: z.string().min(1, { message: "Contact number is required" }),
});

export type ProfileSchemaType = z.infer<typeof profileSchema>;
