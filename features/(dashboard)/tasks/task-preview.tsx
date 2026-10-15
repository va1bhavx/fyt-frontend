"use client"

import CustomAttachment from "@/components/common/custom-attachment"
import { Badge } from "@/components/ui/badge"
import { CATEGORIES, type TaskDraft } from "@/lib/validations/tasks"

export default function TaskPreview({ task }: { task: TaskDraft }) {
  const category = CATEGORIES.find((item) => item.key === task.category)?.value
  const budgetNumber = Number(task.budget)
  const formattedBudget =
    task.budget.trim() !== "" &&
    Number.isFinite(budgetNumber) &&
    budgetNumber >= 0
      ? new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(
          budgetNumber
        )
      : null

  const formattedDeadline =
    task.deadline instanceof Date && !Number.isNaN(task.deadline.getTime())
      ? task.deadline.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : null

  return (
    <div className="min-w-0 space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="outline">{category ?? "Category"}</Badge>
      </div>

      <div className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <h3
            className={`max-w-lg min-w-0 text-xl font-semibold tracking-tight [overflow-wrap:anywhere] ${task.title.trim() ? "" : "text-muted-foreground"}`}
          >
            {task.title.trim() || "Your task title will appear here"}
          </h3>
          <p className="mt-1 shrink-0 text-2xl font-semibold text-primary">
            ₹{formattedBudget ?? "0"}
          </p>
        </div>

        <p className="text-sm leading-6 [overflow-wrap:anywhere] whitespace-pre-wrap text-muted-foreground">
          {task.description.trim() || "Your task description will appear here."}
        </p>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
          <span className="text-muted-foreground">Deadline:</span>
          <span
            className={
              formattedDeadline ? "font-medium" : "text-muted-foreground"
            }
          >
            {formattedDeadline ?? "Not selected yet"}
          </span>
        </div>
      </div>

      <div className="space-y-3 border-t pt-5">
        <h4 className="text-sm font-semibold">Requirements</h4>
        <p className="text-sm leading-6 [overflow-wrap:anywhere] whitespace-pre-wrap text-muted-foreground">
          {task.requirements.trim() ||
            "Your deliverables, expectations, and acceptance criteria will appear here."}
        </p>
      </div>

      <div className="space-y-3 border-t pt-5">
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-semibold">Attachments</h4>
          <Badge variant="outline">{task.attachments.length}</Badge>
        </div>
        {task.attachments.length ? (
          <div className="grid min-w-0 gap-2">
            {task.attachments.map((file) => (
              <CustomAttachment
                key={`${file.name}-${file.size}-${file.lastModified}-${file.type}`}
                file={file}
                state="idle"
                showPreview
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No attachments added yet.
          </p>
        )}
      </div>
    </div>
  )
}
