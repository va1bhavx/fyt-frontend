import { SidebarTrigger } from "@/components/ui/sidebar"

export default function AppHeader() {
  return (
    <div className="flex items-center gap-3">
      <div>
        <SidebarTrigger size={"lg"} />
      </div>
      <div className="block sm:hidden">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-sm">
          FYT
        </span>
      </div>
    </div>
  )
}
