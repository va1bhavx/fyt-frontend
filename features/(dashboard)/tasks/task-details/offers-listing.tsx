import CustomPopover from "@/components/common/custom-popover"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Audit01Icon,
  Delete02Icon,
  Edit02Icon,
  EllipsisVerticalIcon,
  Star,
  Tick,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export default function OffersListing() {
  return (
    <section className="min-w-0 space-y-3 border-t pt-5">
      <h4 className="text-sm font-semibold">Offers</h4>

      <div className="flex min-w-0 flex-col">
        {[1, 2, 3, 4, 5].map((offerId) => (
          <article
            key={offerId}
            className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-3 border-b px-1 py-4 last:border-none sm:gap-x-5 sm:px-3"
          >
            {/* Profile */}
            <div className="flex min-w-0 items-start gap-3">
              <Avatar className="size-9 shrink-0 sm:size-10">
                <AvatarFallback>PS</AvatarFallback>
              </Avatar>

              <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3">
                <h5 className="min-w-0 text-sm font-medium [overflow-wrap:anywhere] sm:text-base">
                  Priya Sharma
                </h5>

                <span
                  aria-hidden="true"
                  className="hidden h-3 w-px shrink-0 bg-border sm:block"
                />

                <div
                  className="flex shrink-0 items-center gap-1.5"
                  aria-label="Rated 4.3 out of 5 from 441 reviews"
                >
                  <HugeiconsIcon
                    icon={Star}
                    size={14}
                    aria-hidden="true"
                    className="shrink-0 fill-amber-300 text-amber-400"
                  />

                  <p className="text-xs whitespace-nowrap text-muted-foreground">
                    <span className="font-medium text-foreground">4.3</span>{" "}
                    (441)
                  </p>
                </div>
              </div>
            </div>

            {/* Price and actions */}
            <div className="flex shrink-0 items-start gap-1 sm:col-start-2 sm:row-span-2 sm:row-start-1 sm:flex-col sm:items-end sm:gap-2">
              <p className="pt-1 text-base font-bold whitespace-nowrap text-primary sm:pt-0 sm:text-xl">
                ₹30,000
              </p>

              <CustomPopover
                render={
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8 shrink-0"
                    aria-label="Offer actions for Priya Sharma"
                  >
                    <HugeiconsIcon
                      icon={EllipsisVerticalIcon}
                      size={18}
                      aria-hidden="true"
                    />
                  </Button>
                }
                width="160px"
                align="end"
                popoverContentClassname="overflow-hidden p-1"
                popoverContent={
                  <div className="flex flex-col gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      className="w-full justify-start gap-2"
                    >
                      <HugeiconsIcon icon={Tick} size={18} aria-hidden="true" />
                      Accept
                    </Button>

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

            {/* Description */}
            <p className="col-span-2 min-w-0 text-sm leading-6 [overflow-wrap:anywhere] text-muted-foreground sm:col-span-1 sm:col-start-1 sm:pl-[52px]">
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old.
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
