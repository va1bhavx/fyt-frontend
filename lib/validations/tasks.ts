import { z } from "zod"

const CATEGORY = ["development", "design", "marketing"]

export const taskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must contain 3 characters.")
    .max(60, "Title shouldn't be bigger than 60 characters"),
  description: z
    .string()
    .trim()
    .min(20, "Description must contain 3 characters.")
    .max(180, "Description shouldn't be bigger than 60 characters"),
  category: z
    .string()
    .refine((value) => CATEGORY.includes(value), "Choose a valid category"),
  budget: z
    .string()
    .trim()
    .min(1, "Enter a budget")
    .pipe(
      z.coerce
        .number<string>({ error: "Enter a valid number" })
        .min(100, "At least ₹100 budget is required")
    ),

  requirements: z
    .string()
    .trim()
    .min(10, "Requirements must contain at least 10 characters")
    .max(1000, "Requirements shouldn't be bigger than 1000 characters"),
})

export type TaskFormValues = z.input<typeof taskSchema>
export type TaskSubmitValues = z.output<typeof taskSchema>
