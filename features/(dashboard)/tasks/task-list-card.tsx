import CustomPopover from "@/components/common/custom-popover"
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
import {
  Agreement02Icon,
  Audit01Icon,
  BookmarkAdd01Icon,
  Calendar03Icon,
  Delete02Icon,
  Edit02Icon,
  EllipsisVerticalIcon,
  Share08Icon,
  UserAccountIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"

export default function TaskListCard() {
  return (
    <Card className="">
      <CardHeader className="flex flex-col gap-4 border-b">
        <div className="flex w-full items-center justify-between">
          <Badge>Development</Badge>

          <Button variant={"outline"} size={"icon-lg"}>
            <HugeiconsIcon icon={BookmarkAdd01Icon} />
          </Button>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex w-full justify-between">
            <CardTitle className="w-full max-w-70 text-lg">
              Develop dynamic role check middleware layer for Express
            </CardTitle>
            <p className="text-2xl font-extrabold text-sidebar-primary">₹40K</p>
          </div>
          <CardDescription>
            Our platform needs a modular role authorization block inserted into
            the main route controllers. The goal is to easily lock down resource
            access fields depending on user privileges.
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
          <HugeiconsIcon icon={Agreement02Icon} size={20} />
          <div>
            <span>Offers</span>
            <p className="self-end text-muted-foreground">5</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between overflow-hidden border-t">
        <div className="flex items-center gap-3 overflow-hidden">
          <Link href={"/tasks/12"}>
            <Button variant={"outline"} size={"lg"}>
              View Details
            </Button>
          </Link>
          {/*<Button size={"lg"}>Apply Now</Button>*/}
        </div>
        <div>
          <Button variant={"ghost"} size={"icon-lg"}>
            <HugeiconsIcon icon={Share08Icon} />
          </Button>
          <CustomPopover
            render={
              <Button variant={"ghost"} size={"icon-lg"}>
                <HugeiconsIcon icon={EllipsisVerticalIcon} />
              </Button>
            }
            width="120px"
            align="end"
            popoverContentClassname="overflow-hidden"
            popoverContent={
              <div className="flex flex-col gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full justify-start gap-2"
                >
                  <HugeiconsIcon
                    icon={Edit02Icon}
                    size={18}
                    aria-hidden="true"
                  />
                  Edit
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  className="w-full justify-start gap-2"
                >
                  <HugeiconsIcon
                    icon={Audit01Icon}
                    size={18}
                    aria-hidden="true"
                  />
                  Report
                </Button>

                <div className="my-1 h-px bg-border" />

                <Button
                  type="button"
                  variant="destructive"
                  className="w-full justify-start gap-2"
                >
                  <HugeiconsIcon
                    icon={Delete02Icon}
                    size={18}
                    aria-hidden="true"
                  />
                  Delete
                </Button>
              </div>
            }
          />
        </div>
      </CardFooter>
    </Card>
  )
}
