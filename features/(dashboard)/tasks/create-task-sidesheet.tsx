"use client"

import { CustomSearchableSelect } from "@/components/common/custom-searchable-select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import TaskEditor from "./task-editor"
import { useState } from "react"
import TaskPreview from "./task-preview"

interface BaseDropdown {
  key: string
  value: string
}

export interface TaskDraft {
  title: string
  description: string
  category: string
  requirements: string
  budget: string
}

export const CATEGORIES: BaseDropdown[] = [
  { key: "development", value: "Development" },
  { key: "design", value: "Design" },
  { key: "marketing", value: "Marketing" },
]

export default function CreateTaskSideSheet() {
  const [task, setTask] = useState<TaskDraft>({
    title: "",
    description: "",
    category: "",
    requirements: "",
    budget: "",
  })

  function updateTask<K extends keyof TaskDraft>(
    field: K,
    value: TaskDraft[K]
  ) {
    setTask((current) => ({
      ...current,
      [field]: value,
    }))
  }

  return (
    <section className="grid h-full min-h-0 overflow-auto lg:grid-cols-2">
      {/* Form */}
      <div className="flex min-h-0 flex-col">
        <form className="flex min-h-0 flex-1 flex-col">
          <div className="flex-1 space-y-8 overflow-y-auto px-1 sm:px-6">
            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-semibold">Task details</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Help people quickly understand your task.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="task-title">Title</Label>
                <Input
                  id="task-title"
                  name="title"
                  placeholder="e.g. Design a landing page"
                  className="h-11"
                  required
                  value={task.title}
                  onChange={(event) => updateTask("title", event.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="task-description">Description</Label>
                <Textarea
                  id="task-description"
                  name="description"
                  placeholder="Give a short overview of the work..."
                  className="min-h-28 resize-y"
                  value={task.description}
                  onChange={(event) =>
                    updateTask("description", event.target.value)
                  }
                />
                <p className="text-xs text-muted-foreground">
                  Include the goal and any useful context.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <CustomSearchableSelect
                    items={CATEGORIES}
                    placeholder="Choose a category"
                    value={task.category}
                    onValueChange={(category) =>
                      updateTask("category", category)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="task-budget">Budget</Label>
                  <Input
                    id="task-budget"
                    name="budget"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="e.g. 500"
                    className="h-11"
                    value={task.budget}
                    onChange={(event) =>
                      updateTask("budget", event.target.value)
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    Set the total amount available for this task.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 border-t pt-6">
              <div>
                <Label>Requirements</Label>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  List deliverables, expectations, and acceptance criteria.
                </p>
              </div>

              <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
                <TaskEditor
                  onChange={(value) => updateTask("requirements", value)}
                />
              </div>
            </div>
          </div>

          <footer className="mt-4 flex items-center justify-between gap-4 border-t px-6 py-2">
            <p className="text-xs text-muted-foreground">
              Review your details before creating.
            </p>
            <Button type="submit" className="shrink-0 px-6">
              Create Task
            </Button>
          </footer>
        </form>
      </div>

      {/* Preview — connect this to form state next */}
      <aside className="hidden min-h-0 flex-col border-l lg:flex">
        {/*<header className="border-b px-8 py-3">
          <p className="text-sm font-semibold">Task preview</p>
          <p className="mt-1 text-xs text-muted-foreground">
            See how your task will look as you fill in the form.
          </p>
        </header>*/}

        <div className="flex-1 overflow-y-auto p-8">
          <div className="">
            <TaskPreview task={task} />
          </div>
        </div>
      </aside>
    </section>
  )
}
