"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"

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

import { SIDEBAR_LINKS } from "@/data/sidebar-links"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="border-b px-4 py-4">
        <Link href="/dashboard" className="flex items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-sm">
            FYT
          </span>

          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-semibold tracking-tight">
              Find Your Tasks
            </span>
            <span className="text-xs text-muted-foreground">Marketplace</span>
          </div>
          {/*<span>
            <SidebarTrigger />
          </span>*/}
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2 py-3">
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>

          <SidebarMenu>
            {SIDEBAR_LINKS.slice(0, 6).map((link) => {
              const isActive =
                pathname === link.url ||
                (link.url !== "/dashboard" &&
                  pathname.startsWith(`${link.url}/`))

              return (
                <SidebarMenuItem key={link.id}>
                  <SidebarMenuButton
                    isActive={isActive}
                    tooltip={link.title}
                    className="h-9 rounded-lg disabled:cursor-not-allowed disabled:opacity-10"
                    disabled={link.disabled}
                  >
                    <Link
                      href={link.url}
                      className="flex items-center gap-3 disabled:cursor-not-allowed disabled:opacity-10"
                      aria-disabled={link.disabled}
                    >
                      <HugeiconsIcon
                        icon={link.icon}
                        size={18}
                        strokeWidth={1.8}
                      />
                      <span>{link.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>

          <SidebarMenu>
            {SIDEBAR_LINKS.slice(6).map((link) => {
              const isActive =
                pathname === link.url || pathname.startsWith(`${link.url}/`)

              return (
                <SidebarMenuItem key={link.id}>
                  <SidebarMenuButton
                    isActive={isActive}
                    tooltip={link.title}
                    className="h-9 rounded-lg"
                  >
                    <Link href={link.url} className="flex items-center gap-3">
                      <HugeiconsIcon
                        icon={link.icon}
                        size={18}
                        strokeWidth={1.8}
                      />
                      <span>{link.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="flex items-center gap-3 rounded-2xl px-2 py-1 ring ring-border">
          <Avatar>
            <AvatarFallback>VK</AvatarFallback>
          </Avatar>

          <div>
            <h1 className="text-sm">Vaibhav Kumar</h1>
            <p className="text-xs text-muted-foreground">@theceo</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
