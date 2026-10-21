import CustomPopover from "@/components/common/custom-popover"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
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

export default function OfferCard() {
  const offer = {
    name: "Priya Sharma",
    initials: "PS",
    rating: 4.8,
    reviews: 41,
    amount: 28000,
    delivery: "3 days",
    submitted: "2 hours ago",
    status: "Pending",
    proposal:
      "I've worked on similar responsive interfaces and can fix the layout issues while keeping the code clean, accessible, and maintainable.",
    skills: ["React", "Next.js", "Tailwind CSS"],
  }

  return (
    <article className="group border-b border-border px-3 py-5 transition-colors last:border-b-0 sm:px-4">
      {/* Worker details and proposed price */}
      <div className="flex items-start gap-3">
        <Avatar className="size-10 shrink-0">
          <AvatarFallback>{offer.initials}</AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-semibold sm:text-base">{offer.name}</h3>

            <Badge
              variant="secondary"
              className="rounded-full px-2 py-0.5 text-[10px] font-medium"
            >
              {offer.status}
            </Badge>
          </div>

          <div className="flex items-center gap-1.5">
            <HugeiconsIcon
              icon={Star}
              size={14}
              className="fill-amber-400 text-amber-400"
            />

            <span className="text-xs font-medium">
              {offer.rating.toFixed(1)}
            </span>

            <span className="text-xs text-muted-foreground">
              ({offer.reviews} reviews)
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-start gap-1">
          <div className="text-right">
            <p className="text-base font-semibold tracking-tight text-primary sm:text-lg">
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
              }).format(offer.amount)}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              {offer.delivery} delivery
            </p>
          </div>

          <CustomPopover
            render={
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-8 shrink-0"
                aria-label={`More actions for ${offer.name}'s offer`}
              >
                <HugeiconsIcon icon={EllipsisVerticalIcon} size={18} />
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
                  <HugeiconsIcon icon={Edit02Icon} size={16} />
                  Edit offer
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  className="w-full justify-start gap-2"
                >
                  <HugeiconsIcon icon={Audit01Icon} size={16} />
                  Report offer
                </Button>

                <div className="my-1 h-px bg-border" />

                <Button
                  type="button"
                  variant="destructive"
                  className="w-full justify-start gap-2"
                >
                  <HugeiconsIcon icon={Delete02Icon} size={16} />
                  Remove offer
                </Button>
              </div>
            }
          />
        </div>
      </div>

      {/* Proposal preview */}
      <div className="mt-4 sm:pl-[52px]">
        <p className="text-sm leading-6 text-muted-foreground">
          {offer.proposal}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {offer.skills.map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="rounded-md font-normal"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3 sm:ml-[52px]">
        <p className="text-xs text-muted-foreground">
          Submitted {offer.submitted}
        </p>

        <div className="flex w-full gap-2 sm:w-auto">
          <Button type="button" className="flex-1 gap-2 sm:flex-none">
            <HugeiconsIcon icon={Tick} size={16} />
            Accept offer
          </Button>
        </div>
      </div>
    </article>
  )
}
