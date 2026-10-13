import PageHeader from "@/components/common/page-header"
import { Button } from "@/components/ui/button"
import { Plus } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export default function TaskListingPage() {
  return (
    <section>
      <PageHeader
        title="Tasks"
        description="Find tasks according to what you want to do."
        action={
          <Button size={"lg"}>
            <HugeiconsIcon icon={Plus} />
            Post a task
          </Button>
        }
      />
    </section>
  )
}
