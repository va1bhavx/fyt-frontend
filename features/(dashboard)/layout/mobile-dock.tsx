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

function DockLabel({
  label,
  isScrolling,
}: {
  label: string
  isScrolling: boolean
}) {
  return (
    <div
      className={cn(
        "grid transition-all duration-300 ease-out",
        isScrolling
          ? "grid-rows-[0fr] opacity-0 scale-90 -translate-y-0.5"
          : "grid-rows-[1fr] opacity-100 scale-100 translate-y-0"
      )}
    >
      <div className="overflow-hidden">
        <span className="mt-1 block text-[10px] tracking-tight leading-none whitespace-nowrap">
          {label}
        </span>
      </div>
    </div>
  )
}

function ActiveIndicator({ isScrolling }: { isScrolling: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out",
        isScrolling
          ? "size-8 rounded-full bg-primary/15 ring-1 ring-primary/25 shadow-xs dark:bg-primary/25 dark:ring-primary/30"
          : "size-full rounded-2xl bg-primary/10 dark:bg-primary/20"
      )}
    />
  )
}

function MobileDockInner() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const tab = searchParams.get("tab")
  const { toggleSidebar, openMobile } = useSidebar()
  const [createSheetOpen, setCreateSheetOpen] = React.useState(false)
  const [isScrolling, setIsScrolling] = React.useState(false)

  // Scroll detection to animate & shrink/hide text when scrolling in either direction
  React.useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout> | null = null
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const delta = Math.abs(currentScrollY - lastScrollY)

      if (currentScrollY <= 12) {
        setIsScrolling(false)
        if (scrollTimeout) clearTimeout(scrollTimeout)
        lastScrollY = currentScrollY
        return
      }

      if (delta > 3) {
        setIsScrolling(true)
        lastScrollY = currentScrollY

        if (scrollTimeout) {
          clearTimeout(scrollTimeout)
        }

        scrollTimeout = setTimeout(() => {
          setIsScrolling(false)
        }, 1100)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (scrollTimeout) clearTimeout(scrollTimeout)
    }
  }, [])

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
      <nav
        className={cn(
          "pointer-events-auto relative flex w-full items-center justify-between rounded-full border border-white/60 bg-white/75 shadow-[0_12px_36px_-4px_rgba(0,0,0,0.16),0_2px_8px_-2px_rgba(0,0,0,0.06),inset_0_1px_1px_0_rgba(255,255,255,0.85)] backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 ease-out dark:border-white/10 dark:bg-zinc-900/80 dark:shadow-[0_16px_40px_-4px_rgba(0,0,0,0.65),0_2px_8px_-2px_rgba(0,0,0,0.3),inset_0_1px_1px_0_rgba(255,255,255,0.15)]",
          isScrolling
            ? "max-w-[280px] px-2 py-1 gap-0.5"
            : "max-w-[390px] px-2.5 py-1.5 gap-1"
        )}
      >
        {/* Specular gloss top highlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-6 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent dark:via-white/20"
        />

        {/* 1. Discover */}
        <Link
          href="/tasks"
          aria-label="Discover Tasks"
          className={cn(
            "group relative flex flex-1 flex-col items-center justify-center rounded-2xl text-center transition-all duration-300 active:scale-90",
            isScrolling ? "py-0.5" : "py-1",
            isDiscoverActive
              ? "text-primary dark:text-emerald-400 font-semibold"
              : "text-muted-foreground/85 hover:text-foreground"
          )}
        >
          {isDiscoverActive && <ActiveIndicator isScrolling={isScrolling} />}
          <div className="relative z-10 flex flex-col items-center">
            <HugeiconsIcon
              icon={Search01Icon}
              size={isScrolling ? 19 : 20}
              strokeWidth={isDiscoverActive ? 2.2 : 1.8}
              className="transition-transform duration-200 group-hover:scale-110"
            />
            <DockLabel label="Discover" isScrolling={isScrolling} />
          </div>
        </Link>

        {/* 2. My Tasks */}
        <Link
          href="/my-tasks?tab=tasks"
          aria-label="My Tasks"
          className={cn(
            "group relative flex flex-1 flex-col items-center justify-center rounded-2xl text-center transition-all duration-300 active:scale-90",
            isScrolling ? "py-0.5" : "py-1",
            isTasksActive
              ? "text-primary dark:text-emerald-400 font-semibold"
              : "text-muted-foreground/85 hover:text-foreground"
          )}
        >
          {isTasksActive && <ActiveIndicator isScrolling={isScrolling} />}
          <div className="relative z-10 flex flex-col items-center">
            <HugeiconsIcon
              icon={Task01Icon}
              size={isScrolling ? 19 : 20}
              strokeWidth={isTasksActive ? 2.2 : 1.8}
              className="transition-transform duration-200 group-hover:scale-110"
            />
            <DockLabel label="Tasks" isScrolling={isScrolling} />
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
                <div
                  className={cn(
                    "relative flex items-center justify-center rounded-full bg-gradient-to-tr from-primary to-emerald-400 text-primary-foreground shadow-[0_4px_16px_rgba(16,185,129,0.35)] ring-2 ring-white/80 transition-all duration-300 group-hover:shadow-[0_6px_20px_rgba(16,185,129,0.5)] group-hover:brightness-105 dark:ring-zinc-800",
                    isScrolling ? "size-9" : "size-10"
                  )}
                >
                  <HugeiconsIcon
                    icon={Add01Icon}
                    size={isScrolling ? 20 : 22}
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
          aria-label="Offers"
          className={cn(
            "group relative flex flex-1 flex-col items-center justify-center rounded-2xl text-center transition-all duration-300 active:scale-90",
            isScrolling ? "py-0.5" : "py-1",
            isOffersActive
              ? "text-primary dark:text-emerald-400 font-semibold"
              : "text-muted-foreground/85 hover:text-foreground"
          )}
        >
          {isOffersActive && <ActiveIndicator isScrolling={isScrolling} />}
          <div className="relative z-10 flex flex-col items-center">
            <HugeiconsIcon
              icon={SentIcon}
              size={isScrolling ? 19 : 20}
              strokeWidth={isOffersActive ? 2.2 : 1.8}
              className="transition-transform duration-200 group-hover:scale-110"
            />
            <DockLabel label="Offers" isScrolling={isScrolling} />
          </div>
        </Link>

        {/* 5. More / Sidebar Toggle */}
        <button
          type="button"
          onClick={() => toggleSidebar()}
          aria-label="Open sidebar menu"
          className={cn(
            "group relative flex flex-1 flex-col items-center justify-center rounded-2xl text-center outline-none transition-all duration-300 active:scale-90",
            isScrolling ? "py-0.5" : "py-1",
            isMoreActive
              ? "text-primary dark:text-emerald-400 font-semibold"
              : "text-muted-foreground/85 hover:text-foreground"
          )}
        >
          {isMoreActive && <ActiveIndicator isScrolling={isScrolling} />}
          <div className="relative z-10 flex flex-col items-center">
            <HugeiconsIcon
              icon={Menu01Icon}
              size={isScrolling ? 19 : 20}
              strokeWidth={isMoreActive ? 2.2 : 1.8}
              className="transition-transform duration-200 group-hover:scale-110"
            />
            <DockLabel label="More" isScrolling={isScrolling} />
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
