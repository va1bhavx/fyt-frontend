import MyTasksListing from "@/features/(dashboard)/my-tasks/my-tasks-listing"
import { Suspense } from "react"

export default function MyTasksPage() {
  return (
    <Suspense
      fallback={
        <div>
          <>Loading Search..</>
        </div>
      }
    >
      <MyTasksListing />
    </Suspense>
  )
}
