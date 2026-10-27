import type { IconSvgElement } from "@hugeicons/react"

import DashboardBrowsingIcon from "@hugeicons/core-free-icons/DashboardBrowsingIcon"
import Search01Icon from "@hugeicons/core-free-icons/Search01Icon"
import Task01Icon from "@hugeicons/core-free-icons/Task01Icon"
import SentIcon from "@hugeicons/core-free-icons/SentIcon"
import Briefcase01Icon from "@hugeicons/core-free-icons/Briefcase01Icon"
import Notification01Icon from "@hugeicons/core-free-icons/Notification01Icon"
import UserCircleIcon from "@hugeicons/core-free-icons/UserCircleIcon"
import Settings01Icon from "@hugeicons/core-free-icons/Settings01Icon"

interface SidebarLink {
  id: string
  title: string
  url: string
  icon: IconSvgElement
  disabled?: boolean
}

export const SIDEBAR_LINKS: SidebarLink[] = [
  {
    id: "dashboard",
    title: "Overview",
    url: "/dashboard",
    icon: DashboardBrowsingIcon,
    disabled: true,
  },
  {
    id: "discover",
    title: "Discover Tasks",
    url: "/tasks",
    icon: Search01Icon,
  },
  {
    id: "my-tasks",
    title: "My Tasks",
    url: "/my-tasks?tab=tasks",
    icon: Task01Icon,
  },
  {
    id: "my-offers",
    title: "My Offers",
    url: "/my-tasks?tab=offers",
    icon: SentIcon,
  },
  {
    id: "contracts",
    title: "My Contracts",
    url: "/my-tasks?tab=contracts",
    icon: Briefcase01Icon,
  },
  // {
  //   id: "messages",
  //   title: "Messages",
  //   url: "/messages",
  //   icon: Message01Icon,
  // },

  {
    id: "notifications",
    title: "Notifications",
    url: "/notifications",
    icon: Notification01Icon,
  },
  {
    id: "profile",
    title: "My Profile",
    url: "/profile",
    icon: UserCircleIcon,
  },
  {
    id: "settings",
    title: "Settings",
    url: "/settings",
    icon: Settings01Icon,
  },
]
