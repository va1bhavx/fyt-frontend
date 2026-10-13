import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function AppHeader() {
  return (
    <div className="flex items-center gap-3">
      <div>
        <SidebarTrigger />
      </div>
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>Workspace</BreadcrumbItem>
            <BreadcrumbSeparator />
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  )
}
