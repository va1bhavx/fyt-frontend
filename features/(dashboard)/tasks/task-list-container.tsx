"use client"

import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ListIcon } from "@hugeicons/core-free-icons"
import FilterVerticalIcon from "@hugeicons/core-free-icons/FilterVerticalIcon"
import GridViewIcon from "@hugeicons/core-free-icons/GridViewIcon"
import Task02Icon from "@hugeicons/core-free-icons/Task02Icon"
import { HugeiconsIcon } from "@hugeicons/react"
import { useState } from "react"
import TaskListCards from "./task-list-cards"

const TAB_LIST = [
  { key: "grid", value: "Grid", icon: GridViewIcon },
  { key: "list", value: "List", icon: ListIcon },
]

export default function TaskListContainer() {
  const [activeTab, setActiveTab] = useState("grid")

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full space-y-6"
    >
      <div className="flex w-full items-center justify-between">
        <div className="group relative w-full max-w-lg">
          <HugeiconsIcon
            icon={Task02Icon}
            className="absolute top-0 left-2 size-5 translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Search by task name"
            className="h-10 w-full overflow-hidden pl-8"
          />
          <HugeiconsIcon
            icon={FilterVerticalIcon}
            className="absolute top-0 right-2 size-5 translate-y-1/2 text-muted-foreground"
          />
        </div>

        <div>
          <TabsList className={""}>
            {TAB_LIST.map((tab) => {
              const isActive = activeTab === tab.key
              return (
                <TabsTrigger
                  value={tab.key}
                  key={tab.key}
                  className={"group flex items-center gap-2 px-4 py-2"}
                >
                  {isActive && <HugeiconsIcon icon={tab.icon} />}
                  {tab.value}
                </TabsTrigger>
              )
            })}
          </TabsList>
        </div>
      </div>

      <div className="w-full">
        <TabsContent value="grid" className="m-0 w-full">
          <TaskListCards />
        </TabsContent>
        <TabsContent value="list" className="m-0 w-full">
          <div>List View Content Go Here</div>
        </TabsContent>
      </div>
    </Tabs>
  )
}
