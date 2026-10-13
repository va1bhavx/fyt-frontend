"use client"

import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  DashboardBrowsingIcon,
  Search01Icon,
  ArrowLeft01Icon,
  FileNotFoundIcon,
  Task01Icon,
} from "@hugeicons/core-free-icons"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function NotFound() {
  return (
    <main className="relative flex items-center justify-center overflow-hidden bg-background px-4 py-6 text-foreground">
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.06] blur-[110px]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-xl flex-col items-center text-center">
        {/* Brand */}
        <Link
          href="/"
          className="mb-12 inline-flex items-center gap-2.5 rounded-lg transition-opacity outline-none hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-sm">
            FYT
          </span>
          <span className="text-base font-semibold tracking-tight">
            Find Your Tasks
          </span>
        </Link>

        {/* Error illustration */}
        <div className="relative mb-8 flex items-center justify-center">
          <div className="absolute size-48 rounded-full border border-dashed border-border/80" />
          <div className="absolute size-36 rounded-full border border-border/60" />

          <Card className="relative w-56 rotate-[-4deg] border-border/80 bg-card shadow-xl">
            <CardContent className="space-y-4 p-5">
              <div className="flex items-center justify-between">
                <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <HugeiconsIcon
                    icon={Task01Icon}
                    size={20}
                    strokeWidth={1.8}
                  />
                </div>

                <span className="rounded-full border border-destructive/20 bg-destructive/10 px-2.5 py-1 text-[10px] font-medium text-destructive">
                  Not found
                </span>
              </div>

              <div className="space-y-2 text-left">
                <div className="h-2 w-3/4 rounded-full bg-muted-foreground/20" />
                <div className="h-2 w-full rounded-full bg-muted-foreground/10" />
                <div className="h-2 w-2/3 rounded-full bg-muted-foreground/10" />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Task reference
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  #404
                </span>
              </div>
            </CardContent>
          </Card>

          <div className="absolute -top-3 -right-5 flex size-11 items-center justify-center rounded-xl border bg-background shadow-md">
            <HugeiconsIcon
              icon={FileNotFoundIcon}
              size={22}
              strokeWidth={1.7}
              className="text-muted-foreground"
            />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border bg-muted/40 px-3 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary" />
            ERROR 404 · PAGE NOT FOUND
          </div>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Looks like this task
            <br />
            <span className="text-muted-foreground">went missing.</span>
          </h1>

          <p className="mx-auto max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
            The page you&apos;re looking for doesn&apos;t exist, may have been
            moved, or is no longer available. Let&apos;s get you back on track.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <Button size="lg" className="gap-2">
            <Link href="/tasks" className="flex items-center gap-2">
              <HugeiconsIcon icon={Search01Icon} size={18} strokeWidth={1.8} />
              Explore tasks
            </Link>
          </Button>

          <Button variant="outline" size="lg" className="gap-2">
            <Link href="/dashboard" className="flex items-center gap-2">
              <HugeiconsIcon
                icon={DashboardBrowsingIcon}
                size={18}
                strokeWidth={1.8}
              />
              Back to dashboard
            </Link>
          </Button>
        </div>

        <Separator className="my-8 max-w-sm" />

        <button
          type="button"
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:outline-none"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size={16} strokeWidth={1.8} />
          Go back to the previous page
        </button>

        <p className="mt-12 text-xs text-muted-foreground/70">
          FYT · Find something worth building.
        </p>
      </div>
    </main>
  )
}
