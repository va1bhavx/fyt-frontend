import type { ReactNode } from "react"

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import AppHeader from "@/features/(dashboard)/layout/app-header"
import AppSidebar from "@/features/(dashboard)/layout/app-sidebar"

export default function DashboardLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset className="min-w-0 bg-background">
        {/* Application header */}
        <header className="sticky top-0 z-30 flex h-17 items-center gap-3 border-b bg-background/80 px-4 py-4 backdrop-blur-xl md:px-6">
          <div className="min-w-0 flex-1">
            <AppHeader />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1">
          <div className="mx-auto w-full max-w-[1600px] p-4 md:p-6">
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
