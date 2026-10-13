import PageHeader from "@/components/common/page-header"
import { Button } from "@/components/ui/button"
import { Plus } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import TaskListContainer from "./task-list-container"

export default function TaskListingPage() {
  return (
    <section aria-label="Task listing page" className="flex flex-col gap-8">
      <PageHeader
        title="Discover Tasks"
        description="Explore opportunities, submit offers, and turn your skills into meaningful work."
        action={
          <Button size={"lg"}>
            <HugeiconsIcon icon={Plus} />
            Post a task
          </Button>
        }
      />

      <TaskListContainer />
    </section>
  )
}
