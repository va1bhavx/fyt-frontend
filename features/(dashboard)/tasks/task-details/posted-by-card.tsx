import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Star, Task02Icon, UserAccountIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export default function PostedByCard() {
  return (
    <Card>
      <CardHeader>
        <h3>Posted By</h3>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex gap-3">
            <Avatar>
              <AvatarFallback>VK</AvatarFallback>
            </Avatar>
            <div>
              <h3>Vaibhav Kumar</h3>
              <p>vaibhavkumar@gmail.com</p>
            </div>
          </div>
          <div>
            <Button variant={"outline"}>View Profile</Button>
          </div>
        </div>
        <div>
          <ul className="flex flex-col gap-3 pt-4">
            <li className="flex items-center gap-2">
              <HugeiconsIcon icon={UserAccountIcon} size={18} />
              <span className="text-muted-foreground">
                Member since Jan, 2025
              </span>
            </li>
            <li className="flex items-center gap-2">
              <HugeiconsIcon icon={Task02Icon} size={18} />
              <span className="text-muted-foreground">12 task posted</span>
            </li>
            <li className="flex items-center gap-2">
              <HugeiconsIcon icon={Star} size={18} />
              <span className="text-muted-foreground">4.8 average rating</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
