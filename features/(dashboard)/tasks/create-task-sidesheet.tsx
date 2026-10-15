"use client"

import { CustomSearchableSelect } from "@/components/common/custom-searchable-select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import TaskEditor from "./task-editor"
import TaskPreview from "./task-preview"
import { Controller, useForm, useWatch } from "react-hook-form"
import {
  MAX_ATTACHMENT_SIZE,
  MAX_TASK_ATTACHMENTS,
  TASK_ATTACHMENT_ACCEPT,
  TaskFormValues,
  taskSchema,
  TaskSubmitValues,
} from "@/lib/validations/tasks"
import { zodResolver } from "@hookform/resolvers/zod"
import { CustomCalendar } from "@/components/common/custom-calendar"
import { useState } from "react"
import { CustomUpload } from "@/components/common/custom-uppload"

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
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormValues, unknown, TaskSubmitValues>({
    resolver: zodResolver(taskSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      category: "",
      requirements: "",
      budget: "",
      deadline: undefined,
      attachments: [],
    },
  })

  const task = useWatch({ control })
  const [deadline, setDeadline] = useState<Date | undefined>(undefined)
  const [attachments, setAttachments] = useState<File[]>([])

  async function onSubmit(data: TaskSubmitValues) {
    // Runs only after successful validation.
    console.log(data)

    // Await your API request or Server Action here.
  }

  return (
    <section className="grid h-full min-h-0 grid-rows-[minmax(0,1fr)] overflow-hidden lg:grid-cols-2">
      <div className="flex min-h-0 min-w-0 flex-col overflow-hidden">
        <form
          className="flex min-h-0 flex-1 flex-col overflow-hidden"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="min-h-0 flex-1 space-y-8 overflow-y-auto overscroll-contain px-1 sm:px-6">
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
                  placeholder="e.g. Design a landing page"
                  className="h-11"
                  required
                  {...register("title")}
                  aria-invalid={Boolean(errors.title)}
                  aria-describedby={
                    errors.title ? "task-title-error" : undefined
                  }
                />
                {errors.title && (
                  <p id="task-title-error" className="text-xs text-destructive">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="task-description">Description</Label>
                <Textarea
                  id="task-description"
                  placeholder="Give a short overview of the work..."
                  className="min-h-28 resize-y"
                  {...register("description")}
                  aria-invalid={Boolean(errors.description)}
                  aria-describedby={
                    errors.description ? "task-description-error" : undefined
                  }
                />
                {errors.description ? (
                  <p id="task-title-error" className="text-xs text-destructive">
                    {errors.description.message}
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    Include the goal and any useful context.
                  </p>
                )}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Controller
                  name="category"
                  control={control}
                  render={({ field, fieldState }) => (
                    <div className="space-y-2">
                      <Label>Category</Label>

                      <CustomSearchableSelect
                        items={CATEGORIES}
                        placeholder="Choose a category"
                        value={field.value}
                        onValueChange={field.onChange}
                      />

                      {fieldState.error && (
                        <p className="text-xs text-destructive">
                          {fieldState.error.message}
                        </p>
                      )}
                    </div>
                  )}
                />

                <div className="space-y-2">
                  <Label htmlFor="task-budget">Budget</Label>
                  <Input
                    id="task-budget"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="e.g. 500"
                    className="h-11"
                    {...register("budget")}
                    aria-invalid={Boolean(errors.budget)}
                    aria-describedby={
                      errors.budget ? "task-budget-error" : undefined
                    }
                  />
                  {errors.budget ? (
                    <p
                      id="task-title-error"
                      className="text-xs text-destructive"
                    >
                      {errors.budget.message}
                    </p>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      Set the total amount available for this task.
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="task-deadline">Deadline</Label>

                  <Controller
                    name="deadline"
                    control={control}
                    render={({ field, fieldState }) => (
                      <>
                        <CustomCalendar
                          id="task-deadline"
                          mode="single"
                          value={field.value}
                          onChange={(date) => {
                            field.onChange(date)
                            field.onBlur()
                          }}
                          captionLayout="label"
                        />
                        {fieldState.error && (
                          <p role="alert" className="text-xs text-destructive">
                            {fieldState.error.message}
                          </p>
                        )}
                      </>
                    )}
                  />
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

              <div className="">
                <Controller
                  name="requirements"
                  control={control}
                  render={({ field, fieldState }) => (
                    <>
                      <TaskEditor onChange={field.onChange} />

                      {fieldState.error && (
                        <p className="text-xs text-destructive">
                          {fieldState.error.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Controller
                name="attachments"
                control={control}
                render={({ field, fieldState }) => {
                  // Zod file errors can occur at array level or on an individual file.
                  const attachmentError =
                    fieldState.error?.message ??
                    fieldState.error?.root?.message ??
                    field.value
                      .map((_, index) => errors.attachments?.[index]?.message)
                      .find(Boolean)

                  return (
                    <CustomUpload
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      error={attachmentError}
                      title="Task attachments"
                      description="Add documents, screenshots, or references for this task."
                      accept={TASK_ATTACHMENT_ACCEPT}
                      maxFiles={MAX_TASK_ATTACHMENTS}
                      maxSize={MAX_ATTACHMENT_SIZE}
                    />
                  )
                }}
              />
            </div>
          </div>

          <footer className="mt-4 flex shrink-0 items-center justify-between gap-4 border-t px-4 py-2 sm:px-6">
            <p className="text-xs text-muted-foreground">
              Review your details before creating.
            </p>
            <Button
              type="submit"
              className="shrink-0 px-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Task"}
            </Button>
          </footer>
        </form>
      </div>

      <aside className="hidden min-h-0 min-w-0 flex-col overflow-hidden border-l lg:flex">
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-8">
          <div className="">
            <TaskPreview
              task={{
                title: task.title ?? "",
                description: task.description ?? "",
                category: task.category ?? "",
                budget: task.budget ?? "",
                requirements: task.requirements ?? "",
                deadline: task.deadline,
                attachments: task.attachments ?? [],
              }}
            />
          </div>
        </div>
      </aside>
    </section>
  )
}
