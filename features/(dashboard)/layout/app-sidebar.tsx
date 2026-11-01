"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import Image from "next/image"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { SIDEBAR_LINKS } from "@/data/sidebar-links"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

function isLinkActive(
  linkUrl: string,
  pathname: string,
  searchParams: URLSearchParams
) {
  if (linkUrl.includes("?")) {
    const [linkPath, queryString] = linkUrl.split("?")
    if (pathname !== linkPath) return false

    const linkParams = new URLSearchParams(queryString)
    const expectedTab = linkParams.get("tab")
    const currentTab = searchParams.get("tab")

    if (expectedTab) {
      if (linkPath === "/my-tasks" && (!currentTab || currentTab === "tasks")) {
        return expectedTab === "tasks"
      }
      return currentTab === expectedTab
    }

    for (const [key, value] of linkParams.entries()) {
      if (searchParams.get(key) !== value) return false
    }
    return true
  }

  if (pathname === linkUrl) {
    return true
  }

  if (
    linkUrl !== "/" &&
    linkUrl !== "/dashboard" &&
    pathname.startsWith(`${linkUrl}/`)
  ) {
    return true
  }

  return false
}

function SidebarNav() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  return (
    <>
      <SidebarGroup className="group-data-[collapsible=icon]:p-0">
        <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">
          Workspace
        </SidebarGroupLabel>

        <SidebarMenu className="gap-1 group-data-[collapsible=icon]:gap-1.5">
          {SIDEBAR_LINKS.slice(0, 6).map((link) => {
            const isActive = isLinkActive(link.url, pathname, searchParams)

            return (
              <SidebarMenuItem
                key={link.id}
                className="group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center"
              >
                <SidebarMenuButton
                  isActive={isActive}
                  tooltip={link.title}
                  className="h-9 rounded-lg disabled:cursor-not-allowed disabled:opacity-40 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2!"
                  disabled={link.disabled}
                  render={<Link href={link.disabled ? "#" : link.url} />}
                >
                  <HugeiconsIcon
                    icon={link.icon}
                    size={18}
                    strokeWidth={1.8}
                    className="shrink-0"
                  />
                  <span className="group-data-[collapsible=icon]:hidden">
                    {link.title}
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroup>

      <SidebarGroup className="group-data-[collapsible=icon]:p-0">
        <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">
          Account
        </SidebarGroupLabel>

        <SidebarMenu className="gap-1 group-data-[collapsible=icon]:gap-1.5">
          {SIDEBAR_LINKS.slice(6).map((link) => {
            const isActive = isLinkActive(link.url, pathname, searchParams)

            return (
              <SidebarMenuItem
                key={link.id}
                className="group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center"
              >
                <SidebarMenuButton
                  isActive={isActive}
                  tooltip={link.title}
                  className="h-9 rounded-lg group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2!"
                  render={<Link href={link.url} />}
                >
                  <HugeiconsIcon
                    icon={link.icon}
                    size={18}
                    strokeWidth={1.8}
                    className="shrink-0"
                  />
                  <span className="group-data-[collapsible=icon]:hidden">
                    {link.title}
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroup>
    </>
  )
}

export default function AppSidebar() {
  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="flex h-17 flex-row items-center border-b px-4 py-0 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0"
        >
          <div className="flex size-9 shrink-0 items-center justify-center">
            <Image
              src="/fyt-icon-512.png"
              alt="FYT"
              width={36}
              height={36}
              className="size-8 object-contain"
              priority
            />
          </div>

          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-semibold tracking-tight leading-tight">
              Find Your Tasks
            </span>
            <span className="text-xs text-muted-foreground leading-tight">
              Marketplace
            </span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2 py-3 group-data-[collapsible=icon]:px-1 group-data-[collapsible=icon]:py-2">
        <React.Suspense fallback={null}>
          <SidebarNav />
        </React.Suspense>
      </SidebarContent>

      <SidebarFooter className="p-3 group-data-[collapsible=icon]:p-2 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center">
        <Tooltip>
          <TooltipTrigger className="w-full">
            <div className="flex w-full items-center gap-3 rounded-xl p-2 ring-1 ring-border transition-colors hover:bg-sidebar-accent group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:ring-0">
              <Avatar className="size-8 shrink-0">
                <AvatarFallback className="text-xs font-semibold">
                  VK
                </AvatarFallback>
              </Avatar>

              <div className="flex min-w-0 flex-1 flex-col text-left group-data-[collapsible=icon]:hidden">
                <h1 className="truncate text-sm font-medium leading-tight">
                  Vaibhav Kumar
                </h1>
                <p className="truncate text-xs text-muted-foreground leading-tight">
                  @theceo
                </p>
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent
            side="right"
            align="center"
            className="hidden group-data-[collapsible=icon]:block"
          >
            <div className="text-xs">
              <p className="font-semibold">Vaibhav Kumar</p>
              <p className="text-muted-foreground">@theceo</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </SidebarFooter>
    </Sidebar>
  )
}
