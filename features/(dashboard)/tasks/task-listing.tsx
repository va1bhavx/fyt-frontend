import PageHeader from "@/components/common/page-header"
import { Button } from "@/components/ui/button"
import { Plus } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import TaskListContainer from "./task-list-container"
import CustomSideSheet from "@/components/common/custom-sidesheet"
import CreateTaskSideSheet from "./create-task-sidesheet"

export default function TaskListingPage() {
  return (
    <section aria-label="Task listing page" className="flex flex-col gap-8">
      <PageHeader
        title="Discover Tasks"
        description="Explore opportunities, submit offers, and turn your skills into meaningful work."
        action={
          <CustomSideSheet
            sheetTrigger={
              <Button size={"lg"}>
                <HugeiconsIcon icon={Plus} />
                Post a task
              </Button>
            }
            sheetTitle="Create Task"
            sheetDescription="Describe what you need done, set your budget and deadline, and connect with skilled people ready to get it done."
          >
            <CreateTaskSideSheet />
          </CustomSideSheet>
        }
      />

      <TaskListContainer />
    </section>
  )
}
