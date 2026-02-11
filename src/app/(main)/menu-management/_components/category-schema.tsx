import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  code: z.string().min(1, "Code is required"),
  description: z.string().min(1, "Description is required"),
  status: z.string().min(1, "Category name is required"),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
