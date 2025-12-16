import * as z from "zod";

export const menuSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().min(1, "Price must be greater than 0"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  status: z.enum(["active", "inactive"]),
  availability: z.enum(["all", "selected", "none"]),
  seasonal: z.boolean(),
});

export type MenuFormValues = z.infer<typeof menuSchema>;
