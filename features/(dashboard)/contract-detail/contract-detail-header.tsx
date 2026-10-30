import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ContractDetail,
  RequesterDetail,
  TaskDetail,
  TermsDetail,
  WorkerDetail,
} from "@/data/dummy-contract"
import {
  Calendar03Icon,
  Clock01Icon,
  Location04Icon,
  PackageDeliveredIcon,
  UserStar01Icon,
  UserTime02Icon,
  Wallet01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

interface ContractDetailHeaderProps {
  taskDetail: TaskDetail
  workerDetail: WorkerDetail
  requesterDetail: RequesterDetail
  termsDetail: TermsDetail
  createdAt: string
}

const formatDate = (isoString: string, includeDay = true) => {
  return new Intl.DateTimeFormat("en-IN", {
    day: includeDay ? "numeric" : undefined,
    month: "short",
    year: "numeric",
  }).format(new Date(isoString))
}

const formatCurrency = (amount: number, currency = "INR") => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

export default function ContractDetailHeader({
  requesterDetail,
  taskDetail,
  workerDetail,
  termsDetail,
}: ContractDetailHeaderProps) {
  const isWorker = true

  const counterparty = isWorker ? requesterDetail : workerDetail
  const counterpartyRole = isWorker ? "About the Requester" : "About the Worker"

  return (
    <section className="flex flex-col justify-between gap-6 lg:flex-row lg:items-stretch lg:gap-8">
      <div className="flex flex-2 flex-col justify-between space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              {taskDetail.title}
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {taskDetail.description}
            </p>
          </div>

          {taskDetail.requirements && (
            <div className="space-y-1 pt-1">
              <h2 className="text-xs font-medium text-foreground">
                Requirements
              </h2>
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {taskDetail.requirements}
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 border-t pt-4 sm:grid-cols-3">
          <div className="flex items-start gap-2.5">
            <HugeiconsIcon
              icon={Calendar03Icon}
              size={18}
              className="mt-0.5 shrink-0 text-muted-foreground"
            />
            <div>
              <p className="text-xs text-muted-foreground">Start Date</p>
              <p className="mt-0.5 text-sm font-medium text-foreground">
                {formatDate(termsDetail.startDate)}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <HugeiconsIcon
              icon={Clock01Icon}
              size={18}
              className="mt-0.5 shrink-0 text-muted-foreground"
            />
            <div>
              <p className="text-xs text-muted-foreground">
                {termsDetail.completionDate ? "Completed On" : "Deadline"}
              </p>
              <p className="mt-0.5 text-sm font-medium text-foreground">
                {formatDate(termsDetail.completionDate ?? termsDetail.deadline)}
              </p>
            </div>
          </div>

          <div className="col-span-2 flex items-start gap-2.5 sm:col-span-1">
            <HugeiconsIcon
              icon={Wallet01Icon}
              size={18}
              className="mt-0.5 shrink-0 text-primary"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <p className="text-xs text-muted-foreground">Agreed Budget</p>
                <span className="text-[11px] text-muted-foreground/70 capitalize">
                  ({termsDetail.paymentType})
                </span>
              </div>
              <div className="mt-0.5 flex items-baseline gap-2">
                <p className="text-lg leading-tight font-semibold text-primary">
                  {formatCurrency(
                    termsDetail.agreedBudget,
                    termsDetail.currency
                  )}
                </p>
                {taskDetail.budget !== termsDetail.agreedBudget && (
                  <span className="text-xs text-muted-foreground line-through">
                    {formatCurrency(taskDetail.budget, termsDetail.currency)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-80 lg:shrink-0">
        <Card className="h-full">
          <CardHeader className="pb-4">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {counterpartyRole}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={counterparty.avatar}
                  alt={counterparty.name}
                />
                <AvatarFallback>
                  {getInitials(counterparty.name)}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm leading-none font-medium">
                  {counterparty.name}
                </h3>
                <div className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="shrink-0">@{counterparty.username}</span>
                  <span className="h-1 w-1 shrink-0 rounded-full bg-primary" />
                  <span className="truncate">{counterparty.email}</span>
                </div>
              </div>
            </div>

            <ul className="space-y-2.5 border-t pt-4 text-sm">
              <li className="flex items-center gap-2.5">
                <HugeiconsIcon
                  icon={UserStar01Icon}
                  size={16}
                  className="shrink-0 text-muted-foreground"
                />
                <span>
                  <span className="font-medium">{counterparty.rating}</span>{" "}
                  <span className="text-muted-foreground">rating</span>
                </span>
              </li>

              <li className="flex items-center gap-2.5">
                <HugeiconsIcon
                  icon={PackageDeliveredIcon}
                  size={16}
                  className="shrink-0 text-muted-foreground"
                />
                <span>
                  <span className="font-medium">
                    {counterparty.completedContracts}
                  </span>{" "}
                  <span className="text-muted-foreground">
                    contracts completed
                  </span>
                </span>
              </li>

              <li className="flex items-center gap-2.5">
                <HugeiconsIcon
                  icon={Location04Icon}
                  size={16}
                  className="shrink-0 text-muted-foreground"
                />
                <span className="truncate text-muted-foreground">
                  {counterparty.location}
                </span>
              </li>

              <li className="flex items-center gap-2.5">
                <HugeiconsIcon
                  icon={UserTime02Icon}
                  size={16}
                  className="shrink-0 text-muted-foreground"
                />
                <span className="text-muted-foreground">
                  Joined {formatDate(counterparty.joinedAt, false)}
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
