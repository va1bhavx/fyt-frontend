import CustomPopover from "@/components/common/custom-popover"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

import {
  Audit01Icon,
  Delete02Icon,
  Edit02Icon,
  EllipsisVerticalIcon,
  Star,
  Tick,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

const formatINR = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
})

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
    <Card className="gap-0 py-5 transition-colors hover:border-foreground/15">
      {/* Top row: Identity + Bid */}
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 px-5 pb-0">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar className="size-10 shrink-0">
            <AvatarFallback className="text-xs font-medium">
              {offer.initials}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="truncate text-sm font-medium text-foreground">
                {offer.name}
              </h3>
              <span className="text-xs text-muted-foreground/50">·</span>
              <div className="flex items-center gap-1 text-xs">
                <HugeiconsIcon
                  icon={Star}
                  size={13}
                  className="-mt-0.5 fill-amber-400 text-amber-400"
                />
                <span className="font-medium text-foreground tabular-nums">
                  {offer.rating.toFixed(1)}
                </span>
                <span className="text-muted-foreground">({offer.reviews})</span>
              </div>
            </div>

            <p className="mt-0.5 text-xs text-muted-foreground">
              Submitted {offer.submitted}
            </p>
          </div>
        </div>

        {/* Price & Menu */}
        <div className="flex shrink-0 items-start gap-1">
          <div className="text-right">
            <p className="text-base font-semibold tracking-tight text-foreground tabular-nums">
              {formatINR.format(offer.amount)}
            </p>
            <p className="text-xs text-muted-foreground">in {offer.delivery}</p>
          </div>

          <CustomPopover
            render={
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="-mt-1 -mr-2 size-8 shrink-0 text-muted-foreground hover:text-foreground"
                aria-label={`More actions for ${offer.name}'s offer`}
              >
                <HugeiconsIcon icon={EllipsisVerticalIcon} size={16} />
              </Button>
            }
            width="156px"
            align="end"
            popoverContentClassname="overflow-hidden p-1"
            popoverContent={
              <div className="flex flex-col">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-full justify-start gap-2 px-2 text-xs font-normal"
                >
                  <HugeiconsIcon icon={Edit02Icon} size={14} />
                  Edit offer
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-full justify-start gap-2 px-2 text-xs font-normal"
                >
                  <HugeiconsIcon icon={Audit01Icon} size={14} />
                  Report offer
                </Button>

                <div className="my-1 h-px bg-border" />

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-full justify-start gap-2 px-2 text-xs font-normal text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <HugeiconsIcon icon={Delete02Icon} size={14} />
                  Remove offer
                </Button>
              </div>
            }
          />
        </div>
      </CardHeader>

      {/* Proposal text */}
      <CardContent className="px-5 pt-4 pb-0">
        <p className="text-sm leading-relaxed text-foreground/80">
          {offer.proposal}
        </p>
      </CardContent>

      {/* Bottom bar: Skills on the left, CTA on the right */}
      <CardFooter className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border/60 px-5 pt-4 pb-0">
        {/*<div className="flex flex-wrap items-center gap-1.5">
          {offer.skills.map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="rounded-md px-2 py-0.5 text-xs font-normal text-muted-foreground"
            >
              {skill}
            </Badge>
          ))}
        </div>*/}

        <div className="ml-auto flex w-full items-center justify-end gap-2 sm:w-auto">
          {offer.status !== "Pending" && (
            <Badge variant="outline" className="text-xs font-normal">
              {offer.status}
            </Badge>
          )}
          <Button type="button" size="sm" className="w-full gap-1.5 sm:w-auto">
            <HugeiconsIcon icon={Tick} size={15} />
            Accept offer
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
