"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Agreement02Icon,
  FilterVerticalIcon,
  Task01Icon,
  Task02FreeIcons,
  TicketStarIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import MyTasksHeader from "./my-tasks-header"
import { useState } from "react"
import TaskListCards from "../tasks/task-list-cards"
import OfferCardsHolder from "../tasks/task-details/offer-cards-holder"
import OfferCard from "../tasks/task-details/offer-card"

const tabs = [
  { key: "tasks", value: "Tasks", icon: Task01Icon },
  { key: "offers", value: "Offers", icon: TicketStarIcon },
  { key: "contracts", value: "Contracts", icon: Agreement02Icon },
]

export default function MyTasksListing() {
  const [activeTab, setActiveTab] = useState("tasks")

  return (
    <section className="flex w-full flex-col gap-8 md:gap-12">
      <MyTasksHeader />

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex w-full flex-col gap-6"
      >
        <div className="flex w-full flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="group relative w-full md:max-w-md lg:max-w-lg">
            <HugeiconsIcon
              icon={Task02FreeIcons}
              className="pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Search by task name"
              className="h-10 w-full pr-10 pl-10"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1/2 right-1 size-8 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <HugeiconsIcon icon={FilterVerticalIcon} className="size-4" />
            </Button>
          </div>

          <TabsList className="grid w-full grid-cols-3 md:inline-flex md:w-auto">
            {tabs.map((tab) => (
              <TabsTrigger value={tab.key} key={tab.key}>
                <HugeiconsIcon icon={tab.icon} />
                {tab.value}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className="w-full">
          <TabsContent value="tasks" className="mt-0 w-full">
            <TaskListCards />
          </TabsContent>

          <TabsContent value="offers" className="mt-0 w-full">
            <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((offerId) => (
                <OfferCard key={offerId} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="contracts" className="mt-0 w-full">
            <div className="w-full rounded-lg border border-dashed p-8 text-center text-muted-foreground">
              Contracts Content (Full Width)
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </section>
  )
}
