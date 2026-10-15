import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

const SIMILAR_TASKS = [
  {
    id: "express-role-middleware",
    title: "Develop dynamic role-check middleware for Express",
    category: "Development",
    budget: 12000,
    postedAt: "2 days ago",
  },
  {
    id: "dashboard-api",
    title: "Build REST APIs for an analytics dashboard",
    category: "Development",
    budget: 8500,
    postedAt: "3 days ago",
  },
  {
    id: "authentication-flow",
    title: "Implement authentication and account recovery",
    category: "Development",
    budget: 15000,
    postedAt: "4 days ago",
  },
]

const formatBudget = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount)

export default function SimilarTaskCard() {
  return (
    <Card className="min-w-0 gap-0 overflow-hidden py-0">
      <CardHeader className="border-b py-2">
        <h3 className="text-base font-semibold tracking-tight">
          Similar tasks
        </h3>
      </CardHeader>

      <CardContent className="p-0">
        <ul className="divide-y divide-border">
          {SIMILAR_TASKS.map((task) => (
            <li key={task.id}>
              <Link
                href={`/tasks/${task.id}`}
                className="group flex min-w-0 flex-col gap-3 px-5 py-4 transition-colors hover:bg-muted/40 focus-visible:bg-muted/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-inset"
              >
                <h4 className="text-sm leading-6 font-medium [overflow-wrap:anywhere] transition-colors group-hover:text-primary">
                  {task.title}
                </h4>

                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
                  <Badge variant="secondary" className="text-xs font-normal">
                    {task.category}
                  </Badge>

                  <p className="text-base font-bold whitespace-nowrap text-primary">
                    {formatBudget(task.budget)}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs text-muted-foreground">
                    Posted {task.postedAt}
                  </p>

                  <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors group-hover:text-primary">
                    View task
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M7 17 17 7M7 7h10v10" />
                    </svg>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
