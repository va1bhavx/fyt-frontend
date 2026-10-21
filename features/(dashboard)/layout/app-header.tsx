import { SidebarTrigger } from "@/components/ui/sidebar"
import Image from "next/image"
import Link from "next/link"

export default function AppHeader() {
  return (
    <div className="flex items-center">
      <div>
        <SidebarTrigger size={"lg"} />
      </div>
      <div className="mx-auto block sm:hidden">
        <Link href="/" aria-label="FYT home">
          <Image
            src="/fyt_logo.png"
            alt="FYT"
            width={80}
            height={80}
            priority
          />
        </Link>
      </div>
    </div>
  )
}
