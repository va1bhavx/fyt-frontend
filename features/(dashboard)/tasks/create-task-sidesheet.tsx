import { CustomSearchableSelect } from "@/components/common/custom-searchable-select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import TaskEditor from "./task-editor"

interface BaseDropdown {
  key: string
  value: string
}

const CATEGORIES: BaseDropdown[] = [
  { key: "development", value: "Development" },
  { key: "design", value: "Design" },
  { key: "marketing", value: "Marketing" },
]

export default function CreateTaskSideSheet() {
  return (
    <section className="flex gap-4">
      <div className="flex-1">
        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col gap-2">
            <Label>Title</Label>
            <Input placeholder="eg: Write something" className="h-10" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Budget</Label>
            <Input
              placeholder="eg: Write something"
              className="h-10"
              type="number"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Categories</Label>
            <CustomSearchableSelect items={CATEGORIES} />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Description</Label>
            <Textarea placeholder="eg: Write something" className="h-10" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Status</Label>
            <CustomSearchableSelect items={CATEGORIES} />
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-2">
          <Label>Requirements</Label>

          <TaskEditor />
        </div>
      </div>

      <div className="h-screen flex-1 border-l border-border">
        {/*
          preview of the task which is getting created
          */}
      </div>
    </section>
  )
}
