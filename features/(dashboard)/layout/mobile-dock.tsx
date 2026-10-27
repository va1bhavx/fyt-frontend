"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Search01Icon,
  Task01Icon,
  SentIcon,
  Add01Icon,
  Menu01Icon,
} from "@hugeicons/core-free-icons"
import { useSidebar } from "@/components/ui/sidebar"
import CustomSideSheet from "@/components/common/custom-sidesheet"
import CreateTaskSideSheet from "../tasks/create-task-sidesheet"
import { cn } from "@/lib/utils"

function MobileDockInner() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const tab = searchParams.get("tab")
  const { toggleSidebar, openMobile } = useSidebar()
  const [createSheetOpen, setCreateSheetOpen] = React.useState(false)

  // Active status checks
  const isDiscoverActive =
    pathname === "/tasks" || (pathname.startsWith("/tasks/") && pathname !== "/my-tasks")
  const isTasksActive =
    pathname === "/my-tasks" && (tab === "tasks" || !tab)
  const isOffersActive =
    pathname === "/my-tasks" && tab === "offers"
  const isMoreActive =
    openMobile ||
    pathname === "/profile" ||
    pathname === "/settings" ||
    pathname === "/notifications" ||
    (pathname === "/my-tasks" && tab === "contracts")

  return (
    <div
      role="navigation"
      aria-label="Mobile navigation dock"
      className="fixed inset-x-0 bottom-3 z-40 flex justify-center px-3 pointer-events-none md:hidden pb-[env(safe-area-inset-bottom,0px)]"
    >
      <nav className="pointer-events-auto relative flex w-full max-w-[390px] items-center justify-between gap-1 rounded-full border border-white/60 bg-white/75 px-2.5 py-1.5 shadow-[0_12px_36px_-4px_rgba(0,0,0,0.16),0_2px_8px_-2px_rgba(0,0,0,0.06),inset_0_1px_1px_0_rgba(255,255,255,0.85)] backdrop-blur-2xl backdrop-saturate-150 transition-all dark:border-white/10 dark:bg-zinc-900/80 dark:shadow-[0_16px_40px_-4px_rgba(0,0,0,0.65),0_2px_8px_-2px_rgba(0,0,0,0.3),inset_0_1px_1px_0_rgba(255,255,255,0.15)]">
        {/* Specular gloss top highlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-6 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent dark:via-white/20"
        />

        {/* 1. Discover */}
        <Link
          href="/tasks"
          className={cn(
            "group relative flex flex-1 flex-col items-center justify-center rounded-2xl py-1 text-center transition-transform duration-150 active:scale-90",
            isDiscoverActive
              ? "text-primary dark:text-emerald-400 font-semibold"
              : "text-muted-foreground/85 hover:text-foreground"
          )}
        >
          {isDiscoverActive && (
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-2xl bg-primary/10 transition-all dark:bg-primary/20"
            />
          )}
          <div className="relative z-10 flex flex-col items-center">
            <HugeiconsIcon
              icon={Search01Icon}
              size={20}
              strokeWidth={isDiscoverActive ? 2.2 : 1.8}
              className="transition-transform duration-200 group-hover:scale-110"
            />
            <span className="mt-1 text-[10px] tracking-tight leading-none">
              Discover
            </span>
          </div>
        </Link>

        {/* 2. My Tasks */}
        <Link
          href="/my-tasks?tab=tasks"
          className={cn(
            "group relative flex flex-1 flex-col items-center justify-center rounded-2xl py-1 text-center transition-transform duration-150 active:scale-90",
            isTasksActive
              ? "text-primary dark:text-emerald-400 font-semibold"
              : "text-muted-foreground/85 hover:text-foreground"
          )}
        >
          {isTasksActive && (
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-2xl bg-primary/10 transition-all dark:bg-primary/20"
            />
          )}
          <div className="relative z-10 flex flex-col items-center">
            <HugeiconsIcon
              icon={Task01Icon}
              size={20}
              strokeWidth={isTasksActive ? 2.2 : 1.8}
              className="transition-transform duration-200 group-hover:scale-110"
            />
            <span className="mt-1 text-[10px] tracking-tight leading-none">
              Tasks
            </span>
          </div>
        </Link>

        {/* 3. Center Create Task Action */}
        <div className="flex flex-1 items-center justify-center">
          <CustomSideSheet
            open={createSheetOpen}
            onOpenChange={setCreateSheetOpen}
            sheetTrigger={
              <button
                type="button"
                aria-label="Create a task"
                className="group relative flex items-center justify-center outline-none transition-transform duration-150 active:scale-90"
              >
                <div className="relative flex size-10 items-center justify-center rounded-full bg-gradient-to-tr from-primary to-emerald-400 text-primary-foreground shadow-[0_4px_16px_rgba(16,185,129,0.35)] ring-2 ring-white/80 transition-all duration-200 group-hover:shadow-[0_6px_20px_rgba(16,185,129,0.5)] group-hover:brightness-105 dark:ring-zinc-800">
                  <HugeiconsIcon
                    icon={Add01Icon}
                    size={22}
                    strokeWidth={2.4}
                    className="transition-transform duration-200 group-hover:rotate-90"
                  />
                </div>
              </button>
            }
            sheetTitle="Create Task"
            sheetDescription="Describe what you need done, set your budget and deadline, and connect with skilled people ready to get it done."
          >
            <CreateTaskSideSheet />
          </CustomSideSheet>
        </div>

        {/* 4. Offers */}
        <Link
          href="/my-tasks?tab=offers"
          className={cn(
            "group relative flex flex-1 flex-col items-center justify-center rounded-2xl py-1 text-center transition-transform duration-150 active:scale-90",
            isOffersActive
              ? "text-primary dark:text-emerald-400 font-semibold"
              : "text-muted-foreground/85 hover:text-foreground"
          )}
        >
          {isOffersActive && (
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-2xl bg-primary/10 transition-all dark:bg-primary/20"
            />
          )}
          <div className="relative z-10 flex flex-col items-center">
            <HugeiconsIcon
              icon={SentIcon}
              size={20}
              strokeWidth={isOffersActive ? 2.2 : 1.8}
              className="transition-transform duration-200 group-hover:scale-110"
            />
            <span className="mt-1 text-[10px] tracking-tight leading-none">
              Offers
            </span>
          </div>
        </Link>

        {/* 5. More / Sidebar Toggle */}
        <button
          type="button"
          onClick={() => toggleSidebar()}
          aria-label="Open sidebar menu"
          className={cn(
            "group relative flex flex-1 flex-col items-center justify-center rounded-2xl py-1 text-center outline-none transition-transform duration-150 active:scale-90",
            isMoreActive
              ? "text-primary dark:text-emerald-400 font-semibold"
              : "text-muted-foreground/85 hover:text-foreground"
          )}
        >
          {isMoreActive && (
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-2xl bg-primary/10 transition-all dark:bg-primary/20"
            />
          )}
          <div className="relative z-10 flex flex-col items-center">
            <HugeiconsIcon
              icon={Menu01Icon}
              size={20}
              strokeWidth={isMoreActive ? 2.2 : 1.8}
              className="transition-transform duration-200 group-hover:scale-110"
            />
            <span className="mt-1 text-[10px] tracking-tight leading-none">
              More
            </span>
          </div>
        </button>
      </nav>
    </div>
  )
}

export default function MobileDock() {
  return (
    <React.Suspense fallback={null}>
      <MobileDockInner />
    </React.Suspense>
  )
}
