import React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  MoneyBag02Icon,
  Calendar03Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Separator } from "@/components/ui/separator"

export type ContractStatus = "Active" | "Submitted" | "Completed"
export type CategoryVariant = "Development" | "Design" | "Writing" | string

export interface ContractCardProps {
  title: string
  description: string
  category: CategoryVariant
  status: ContractStatus
  budget: string
  deadline: string
  workerName: string
  workerInitials?: string
  onClick?: () => void
}

const statusConfig: Record<
  ContractStatus,
  { badge: string; dot: string; showDotOnMobile: boolean }
> = {
  Active: {
    badge: "bg-emerald-950/60 text-emerald-400 border-emerald-500/40",
    dot: "bg-emerald-400",
    showDotOnMobile: true,
  },
  Submitted: {
    badge: "bg-amber-950/60 text-amber-400 border-amber-500/40",
    dot: "bg-amber-400",
    showDotOnMobile: false,
  },
  Completed: {
    badge: "bg-emerald-950/60 text-emerald-400 border-emerald-500/40",
    dot: "bg-emerald-400",
    showDotOnMobile: false,
  },
}

const categoryStyles: Record<string, string> = {
  Development: "bg-emerald-950/50 text-emerald-300 border-emerald-800/40",
  Design: "bg-indigo-950/60 text-indigo-300 border-indigo-800/40",
  Writing: "bg-sky-950/60 text-sky-300 border-sky-800/40",
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export default function ContractCard({
  title = "Build a responsive landing page",
  description = "Design and develop a modern, responsive landing page for our product using Next.js and Tailwind CSS.",
  category = "Development",
  status = "Active",
  budget = "₹5,000",
  deadline = "20 Dec 2024",
  workerName = "Alex Chen",
  workerInitials,
  onClick,
}: ContractCardProps) {
  const currentStatus = statusConfig[status] || statusConfig.Active
  const categoryClass =
    categoryStyles[category] ||
    "bg-zinc-800/80 text-zinc-300 border-zinc-700/50"
  const initials = workerInitials || getInitials(workerName)

  return (
    <Card
      onClick={onClick}
      className="group flex w-full cursor-pointer flex-col gap-4 p-4 shadow-sm transition-all hover:border-zinc-700/80 sm:p-6 md:flex-row md:items-center md:justify-between md:gap-6"
    >
      {/* Override shadcn's default grid on CardHeader with flex-col & items-start */}
      <CardHeader className="flex min-w-0 flex-1 flex-col items-start space-y-0 p-0 text-left">
        <div className="flex w-full items-start justify-between gap-3">
          <Tooltip>
            <TooltipTrigger className="max-w-full min-w-0 text-left">
              <CardTitle className="truncate text-left text-base leading-snug font-semibold text-white sm:text-lg">
                {title}
              </CardTitle>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs wrap-break-word">
              {title}
            </TooltipContent>
          </Tooltip>

          {/* Status Pill (Visible on Mobile, Hidden on Desktop) */}
          <span
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium md:hidden ${currentStatus.badge}`}
          >
            {currentStatus.showDotOnMobile && (
              <span className={`h-2 w-2 rounded-full ${currentStatus.dot}`} />
            )}
            {status}
          </span>
        </div>

        {/* Category Badge on Mobile (Placed directly under Title) */}
        <div className="mt-2 md:hidden">
          <span
            className={`inline-flex items-center rounded-full border px-3 py-0.5 text-xs font-medium ${categoryClass}`}
          >
            {category}
          </span>
        </div>

        {/* Description with 2-line clamp + Tooltip fallback */}
        <Tooltip>
          <TooltipTrigger className="mt-2.5 w-full max-w-full text-left md:mt-2">
            <CardDescription className="line-clamp-2 text-left text-xs leading-relaxed text-zinc-400 sm:text-sm">
              {description}
            </CardDescription>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="max-w-sm wrap-break-word">
            {description}
          </TooltipContent>
        </Tooltip>

        {/* Category Badge on Desktop (Placed below Description) */}
        <div className="hidden pt-3.5 md:block">
          <span
            className={`inline-flex items-center rounded-full border px-3.5 py-1 text-xs font-medium ${categoryClass}`}
          >
            {category}
          </span>
        </div>
      </CardHeader>

      <CardContent className="shrink-0 p-0 md:w-52 lg:w-60">
        <div className="hidden flex-col items-start gap-3 md:flex">
          <span
            className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-medium ${currentStatus.badge}`}
          >
            <span className={`h-2 w-2 rounded-full ${currentStatus.dot}`} />
            {status}
          </span>

          <div className="flex w-full min-w-0 items-center gap-3">
            <HugeiconsIcon
              icon={MoneyBag02Icon}
              className="size-4 shrink-0 text-zinc-400"
            />

            <div className="min-w-0 text-left">
              <Tooltip>
                <TooltipTrigger className="block max-w-full truncate text-left text-sm leading-tight font-semibold text-white">
                  {budget}
                </TooltipTrigger>
                <TooltipContent>{budget}</TooltipContent>
              </Tooltip>
              <p className="text-xs text-zinc-400">Agreed budget</p>
            </div>
          </div>

          <div className="flex w-full min-w-0 items-center gap-3">
            <HugeiconsIcon
              icon={Calendar03Icon}
              className="size-4 shrink-0 text-zinc-400"
            />

            <div className="min-w-0 text-left">
              <Tooltip>
                <TooltipTrigger className="block max-w-full truncate text-left text-sm leading-tight font-semibold text-white">
                  {deadline}
                </TooltipTrigger>
                <TooltipContent>{deadline}</TooltipContent>
              </Tooltip>
              <p className="text-xs text-zinc-400">Deadline</p>
            </div>
          </div>
        </div>

        {/* Mobile Layout: 2-Column Grid with Vertical Divider */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 md:hidden">
          <div className="min-w-0 text-left">
            <Tooltip>
              <TooltipTrigger className="block max-w-full truncate text-left text-sm font-semibold text-white">
                {budget}
              </TooltipTrigger>
              <TooltipContent>{budget}</TooltipContent>
            </Tooltip>
            <p className="mt-0.5 text-xs text-zinc-400">Budget</p>
          </div>

          <Separator orientation="vertical" className="h-8 bg-zinc-800" />

          <div className="min-w-0 text-left">
            <Tooltip>
              <TooltipTrigger className="block max-w-full truncate text-left text-sm font-semibold text-white">
                {deadline}
              </TooltipTrigger>
              <TooltipContent>{deadline}</TooltipContent>
            </Tooltip>
            <p className="mt-0.5 text-xs text-zinc-400">Deadline</p>
          </div>
        </div>
      </CardContent>

      {/* RIGHT / FOOTER SECTION: Worker Info & Chevron */}
      <CardFooter className="flex shrink-0 items-center justify-between gap-3 p-0 pt-1 md:w-52 md:border-l md:border-zinc-800/90 md:pt-0 md:pl-6 lg:w-60">
        {/* Desktop Worker Presentation */}
        <div className="hidden min-w-0 flex-col gap-2 text-left md:flex">
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span>Worker</span>
            <span className="tracking-tighter text-zinc-600">•••</span>
          </div>
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-300 text-xs font-bold text-slate-900">
              {initials}
            </div>
            <Tooltip>
              <TooltipTrigger className="max-w-full truncate text-left text-sm font-semibold text-white">
                {workerName}
              </TooltipTrigger>
              <TooltipContent>{workerName}</TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Mobile Worker Presentation */}
        <div className="flex min-w-0 items-center gap-3 text-left md:hidden">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-300 text-xs font-bold text-slate-900">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="text-[11px] leading-tight text-zinc-400">Worker</p>
            <Tooltip>
              <TooltipTrigger className="mt-0.5 block max-w-full truncate text-left text-sm font-semibold text-white">
                {workerName}
              </TooltipTrigger>
              <TooltipContent>{workerName}</TooltipContent>
            </Tooltip>
          </div>
        </div>

        <HugeiconsIcon
          icon={ArrowRight01Icon}
          className="h-5 w-5 shrink-0 text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:text-white"
        />
      </CardFooter>
    </Card>
  )
}
