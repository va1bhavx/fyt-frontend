import { z } from "zod"

export const CATEGORIES = [
  { key: "development", value: "Development" },
  { key: "design", value: "Design" },
  { key: "marketing", value: "Marketing" },
]

export const MAX_TASK_ATTACHMENTS = 5
export const MAX_ATTACHMENT_SIZE = 10 * 1024 * 1024
export const TASK_ATTACHMENT_ACCEPT = ".pdf,.doc,.docx,image/*"

export const taskAttachmentSchema = z
  .file({ error: "Select a valid file" })
  .max(MAX_ATTACHMENT_SIZE, "Each attachment must be 10 MB or smaller")
  .refine(
    (file) =>
      file.type.startsWith("image/") || /\.(pdf|doc|docx)$/i.test(file.name),
    "Only images, PDF, DOC, and DOCX files are allowed"
  )

export const taskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must contain at least 3 characters")
    .max(100, "Title cannot exceed 100 characters"),
  description: z
    .string()
    .trim()
    .min(10, "Description must contain at least 10 characters")
    .max(2000, "Description cannot exceed 2,000 characters"),
  category: z
    .string()
    .refine(
      (value) => CATEGORIES.some((item) => item.key === value),
      "Choose a valid category"
    ),
  requirements: z
    .string()
    .trim()
    .min(10, "Requirements must contain at least 10 characters"),
  budget: z
    .string()
    .trim()
    .min(1, "Enter a budget")
    .pipe(
      z.coerce
        .number<string>({ error: "Enter a valid number" })
        .min(100, "At least ₹100 budget is required")
    ),
  deadline: z.date({
    error: (issue) =>
      issue.input === undefined ? "Choose a deadline" : "Choose a valid date",
  }),
  // Attachments are optional: an empty array is valid.
  attachments: z
    .array(taskAttachmentSchema)
    .max(MAX_TASK_ATTACHMENTS, "You can attach up to 5 files"),
})

export type TaskFormValues = z.input<typeof taskSchema>
export type TaskSubmitValues = z.output<typeof taskSchema>

// A live preview must also accept the incomplete deadline before selection.
export type TaskDraft = Omit<TaskFormValues, "deadline"> & {
  deadline: Date | undefined
}
