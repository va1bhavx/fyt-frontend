import CustomPopover from "@/components/common/custom-popover"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft01Icon,
  Audit01Icon,
  BookmarkAdd01Icon,
  Delete02Icon,
  Edit02Icon,
  EllipsisVerticalIcon,
  Share08Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import OffersListing from "./offers-listing"
import Link from "next/link"
import PostedByCard from "./posted-by-card"
import SimilarTaskCard from "./similar-task-card"

export default function TaskDetailListingPage() {
  return (
    <section className="flex flex-col gap-3">
      <Link href={"/tasks"}>
        <Button variant={"ghost"}>
          <HugeiconsIcon icon={ArrowLeft01Icon} size={18} aria-hidden="true" />
          Back to task
        </Button>
      </Link>
      <section className="flex h-full w-full flex-col gap-8 md:flex-row">
        <div className="flex-2 px-1 py-3 sm:px-2">
          <div className="flex flex-col gap-4 pb-5">
            <div className="flex items-center justify-between">
              <Badge>Development</Badge>
              <div className="flex items-center">
                <Button variant={"ghost"} size={"lg"}>
                  <HugeiconsIcon icon={BookmarkAdd01Icon} />
                  Save
                </Button>
                <Button variant={"ghost"}>
                  <HugeiconsIcon icon={Share08Icon} />
                  Share
                </Button>
                <CustomPopover
                  render={
                    <Button variant={"ghost"} size={"lg"}>
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
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-xl sm:text-2xl">
                Develop dynamic role check middleware layer for Express
              </h1>
              <p className="w-full text-sm text-muted-foreground">
                Our platform needs a modular role authorization block inserted
                into the main route controllers. The goal is to easily lock down
                resource access fields depending on user privileges.
              </p>
            </div>
            <div className="flex w-full flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">
                    Posted 2 days ago
                  </p>
                </div>
                <Separator orientation="vertical" />
                <div>
                  <p className="text-xs text-muted-foreground">0 Offers</p>
                </div>
                <Separator orientation="vertical" />
                <div>
                  <p className="text-xs text-muted-foreground">
                    Deadline: 12/10/2025
                  </p>
                </div>
              </div>
              <div className="w-full sm:w-max">
                <Button size={"lg"} className={"w-full"}>
                  Send Offer
                </Button>
              </div>
            </div>
          </div>
          <div className="space-y-3 border-t pt-5 pb-5">
            <h4 className="text-sm font-semibold">Requirements</h4>
            <p className="text-sm leading-6 [overflow-wrap:anywhere] whitespace-pre-wrap text-muted-foreground">
              What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
              printing and typesetting industry. Lorem Ipsum has been the
              industrys standard dummy text ever since 1966, when designers at
              Letraset and James Mosley, the librarian at St Bride Printing
              Library in London, took a 1914 Cicero translation and scrambled it
              to make dummy text for Letrasets Body Type sheets.
              <br />
              It has survived not only many decades, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised thanks to these sheets and more recently with desktop
              publishing software like Aldus PageMaker and Microsoft Word
              including versions of Lorem Ipsum. Why do we use it? It is a long
              established fact that a reader will be distracted by the readable
              content of a page when looking at its layout. The point of using
              Lorem Ipsum is that it has a more-or-less normal distribution of
              letters, as opposed to using Content here, content here, making it
              look like readable English.
              <br />
              Many desktop publishing packages and web page editors now use
              Lorem Ipsum as their default model text, and a search for lorem
              ipsum will uncover many web sites still in their infancy. Various
              versions have evolved over the years, sometimes by accident,
              sometimes on purpose (injected humour and the like).
            </p>
          </div>
          <div className="space-y-3 border-t pt-5 pb-5">
            <h4 className="text-sm font-semibold">Attachments</h4>
            <div className="grid grid-cols-2 gap-4 2xl:grid-cols-3">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-dashed border-border px-2 py-2"
                >
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 animate-pulse rounded-lg bg-gray-500" />
                    <div>
                      <h3 className="block max-w-30 truncate text-xs sm:max-w-50">
                        some_name_file_jsut_for_checking_purpose.png
                      </h3>
                      <p className="text-xs text-muted-foreground">2mb</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <OffersListing />
        </div>
        <div className="flex h-full flex-1 flex-col gap-4">
          <PostedByCard />
          <SimilarTaskCard />
        </div>
      </section>
    </section>
  )
}
