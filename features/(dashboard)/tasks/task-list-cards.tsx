import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { EllipsisVerticalIcon } from "@hugeicons/core-free-icons"
import BookmarkAdd01Icon from "@hugeicons/core-free-icons/BookmarkAdd01Icon"
import Calendar03Icon from "@hugeicons/core-free-icons/Calendar03Icon"
import MoneyBag02Icon from "@hugeicons/core-free-icons/MoneyBag02Icon"
import UserAccountIcon from "@hugeicons/core-free-icons/UserAccountIcon"
import { HugeiconsIcon } from "@hugeicons/react"

export default function TaskListCards() {
  return (
    <div className="grid-grid-cols-1 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((_, i) => (
        <Card className="" key={i}>
          <CardHeader className="flex flex-col gap-4 border-b">
            <div className="flex w-full items-center justify-between">
              <Badge>Development</Badge>
              <Button variant={"outline"} size={"icon-lg"}>
                <HugeiconsIcon icon={BookmarkAdd01Icon} />
              </Button>
            </div>
            <div className="flex flex-col gap-3">
              <CardTitle className="text-lg">
                Develop dynamic role check middleware layer for Express
              </CardTitle>
              <CardDescription>
                Our platform needs a modular role authorization block inserted
                into the main route controllers. The goal is to easily lock down
                resource access fields depending on user privileges.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="flex gap-2">
              <HugeiconsIcon icon={UserAccountIcon} size={20} />
              <div>
                <span>Posted By</span>
                <p className="text-muted-foreground">John Doe</p>
              </div>
            </div>
            <div className="flex gap-2">
              <HugeiconsIcon icon={Calendar03Icon} size={20} />
              <div>
                <span>Deadline</span>
                <p className="text-muted-foreground">13/10/2026</p>
              </div>
            </div>
            <div className="flex gap-2">
              <HugeiconsIcon icon={MoneyBag02Icon} size={20} />
              <div>
                <span>Budget</span>
                <p className="font-extrabold text-primary">40,000</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between border-t">
            <div className="flex items-center gap-3">
              <Button variant={"outline"}>View Details</Button>
              <Button>Apply Now</Button>
            </div>
            <Button variant={"ghost"} size={"icon-lg"}>
              <HugeiconsIcon icon={EllipsisVerticalIcon} />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
