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
import TaskListCards from "../tasks/task-list-cards"
import MyOffersListing from "./my-offers-listing"
import MyContractsListing from "./my-contracts-listing"
import { usePathname, useSearchParams, useRouter } from "next/navigation"

const tabs = [
  { key: "tasks", value: "My Tasks", icon: Task01Icon },
  { key: "offers", value: "My Offers", icon: TicketStarIcon },
  { key: "contracts", value: "My Contracts", icon: Agreement02Icon },
]

export default function MyTasksListing() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const activeTab = searchParams.get("tab")
  const handleTabClick = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (!params) {
      return alert("Wait! we need some params")
    }

    params.set("tab", value)
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <section className="flex w-full flex-col gap-8 md:gap-12">
      <MyTasksHeader />

      <Tabs
        value={activeTab}
        onValueChange={handleTabClick}
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
            <MyOffersListing />
          </TabsContent>

          <TabsContent value="contracts" className="mt-0 w-full">
            <MyContractsListing />
          </TabsContent>
        </div>
      </Tabs>
    </section>
  )
}
