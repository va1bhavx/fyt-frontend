import { SidebarTrigger } from "@/components/ui/sidebar"

export default function AppHeader() {
  return (
    <div className="flex items-center gap-3">
      <div>
        <SidebarTrigger />
      </div>
      <h1>App Header</h1>
    </div>
  )
}
