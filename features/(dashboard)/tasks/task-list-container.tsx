import { Input } from "@/components/ui/input"
import FilterVerticalIcon from "@hugeicons/core-free-icons/FilterVerticalIcon"
import Task02Icon from "@hugeicons/core-free-icons/Task02Icon"
import { HugeiconsIcon } from "@hugeicons/react"
import TaskListCards from "./task-list-cards"
import { Button } from "@/components/ui/button"

export default function TaskListContainer() {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex w-full flex-wrap items-center justify-between gap-4">
        <div className="group relative w-full max-w-lg">
          <HugeiconsIcon
            icon={Task02Icon}
            className="absolute top-0 left-2 size-5 translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Search by task name"
            className="h-10 w-full overflow-hidden pl-10"
          />
          <Button
            variant={"ghost"}
            size={"icon-lg"}
            className="absolute top-0 right-2 size-5 translate-y-1/2 text-muted-foreground"
          >
            <HugeiconsIcon icon={FilterVerticalIcon} />
          </Button>
        </div>
      </div>

      <div className="w-full">
        <TaskListCards />
      </div>
    </section>
  )
}
