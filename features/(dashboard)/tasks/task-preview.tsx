import { Badge } from "@/components/ui/badge"
import { CATEGORIES, TaskDraft } from "./create-task-sidesheet"

export default function TaskPreview({ task }: { task: TaskDraft }) {
  const category = CATEGORIES.find((item) => item.key === task.category)?.value

  const budgetNumber = Number(task.budget)

  const formattedBudget =
    task.budget.trim() !== "" &&
    Number.isFinite(budgetNumber) &&
    budgetNumber >= 0
      ? new Intl.NumberFormat(undefined, {
          maximumFractionDigits: 2,
        }).format(budgetNumber)
      : null

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant={"outline"}>{category ?? "Category"}</Badge>
      </div>

      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <h3
            className={`max-w-lg text-xl font-semibold tracking-tight wrap-break-word ${
              task.title.trim() ? "" : "text-muted-foreground"
            }`}
          >
            {task.title.trim() || "Your task title will appear here"}
          </h3>
          <p className="mt-1 text-2xl font-semibold wrap-break-word text-primary">
            ₹{formattedBudget ?? "0"}
          </p>
        </div>

        <p className="text-sm leading-6 wrap-break-word whitespace-pre-wrap text-muted-foreground">
          {task.description.trim() || "Your task description will appear here."}
        </p>
      </div>

      <div className="space-y-3 border-t pt-5">
        <h4 className="text-sm font-semibold">Requirements</h4>

        <p className="text-sm leading-6 wrap-break-word whitespace-pre-wrap text-muted-foreground">
          {task.requirements.trim() ||
            "Your deliverables, expectations, and acceptance criteria will appear here."}
        </p>
      </div>
    </div>
  )
}
