import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function TaskDetailListingPage() {
  return (
    <section className="flex flex-col gap-3">
      <div>
        <Button variant={"ghost"}>Back to task</Button>
      </div>
      <section className="flex h-full flex-wrap gap-4">
        <div className="min-h-0 min-w-0 flex-2 overflow-auto overscroll-contain bg-gray-900 px-3 py-3">
          <div>
            <Badge>Development</Badge>
          </div>
        </div>
        <div className="min-h-0 min-w-0 flex-1 overflow-auto overscroll-contain bg-gray-500">
          <h2>Hello world</h2>
        </div>
      </section>
    </section>
  )
}
