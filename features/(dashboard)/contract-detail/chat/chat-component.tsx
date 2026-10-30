import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from "@/components/ui/bubble"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Marker, MarkerContent } from "@/components/ui/marker"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
} from "@/components/ui/message"
import { MessageScroller } from "@/components/ui/message-scroller"
import { Textarea } from "@/components/ui/textarea"
import { Download02Icon, Pdf02Icon, SendIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Image from "next/image"

export default function ChatComponent() {
  return (
    <Card>
      <CardHeader className="border-b">
        <div className="flex items-center gap-4">
          <div>
            <Avatar>
              <AvatarImage src="https://i.pravatar.cc/150?img=12" alt="@me" />
              <AvatarFallback>ME</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <CardTitle>John Doe</CardTitle>
            <CardDescription>
              Something sort of there bio or description
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex min-h-[500px] flex-col gap-6">
        <Message>
          <MessageAvatar>
            <Avatar>
              <AvatarImage src="https://i.pravatar.cc/150?img=12" alt="@me" />
              <AvatarFallback>ME</AvatarFallback>
            </Avatar>
          </MessageAvatar>
          <MessageContent>
            <Bubble variant={"muted"}>
              <BubbleContent>Deploying to prod real quick.</BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <Message>
          <MessageAvatar>
            <Avatar>
              <AvatarImage
                src="https://i.pravatar.cc/150?img=23"
                alt="@rabbit"
              />
              <AvatarFallback>R</AvatarFallback>
            </Avatar>
          </MessageAvatar>
          <MessageContent>
            <Bubble variant="muted">
              <BubbleContent>It&apos;s 4:55 PM. On a Friday.</BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
        <Message align="end">
          <MessageAvatar>
            <Avatar>
              <AvatarImage src="/avatars/10.png" alt="@me" />
              <AvatarFallback>ME</AvatarFallback>
            </Avatar>
          </MessageAvatar>
          <MessageContent>
            <Bubble>
              <BubbleContent>It&apos;s a one-line change.</BubbleContent>
            </Bubble>
            <MessageFooter>Delivered</MessageFooter>
          </MessageContent>
        </Message>
        <Message align="end">
          <MessageAvatar>
            <Avatar>
              <AvatarImage src="/avatars/10.png" alt="@me" />
              <AvatarFallback>ME</AvatarFallback>
            </Avatar>
          </MessageAvatar>
          <MessageContent>
            <Attachment orientation="vertical">
              <AttachmentMedia variant="image">
                <Image
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80"
                  alt="Workspace"
                  width={100}
                  height={100}
                />
              </AttachmentMedia>
            </Attachment>
            <Bubble>
              <BubbleContent>
                Here&apos;s the image. Can you add it to the PDF? Use it for the
                cover page.
              </BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>

        <Message>
          <MessageAvatar>
            <Avatar>
              <AvatarImage src="/avatars/10.png" alt="@me" />
              <AvatarFallback>ME</AvatarFallback>
            </Avatar>
          </MessageAvatar>
          <MessageContent>
            <Bubble variant="muted">
              <BubbleContent>
                Done. Here&apos;s the PDF with the image added as the cover
                page.
              </BubbleContent>
            </Bubble>
            <Attachment>
              <AttachmentMedia>
                <HugeiconsIcon
                  icon={Pdf02Icon}
                  size={16}
                  className="shrink-0"
                />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>sales-dashboard.pdf</AttachmentTitle>
                <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
              </AttachmentContent>
              <AttachmentActions>
                <AttachmentAction
                  type="button"
                  title="Download"
                  aria-label="Download"
                  size="icon-sm"
                  variant="secondary"
                >
                  <HugeiconsIcon
                    icon={Download02Icon}
                    size={16}
                    className="shrink-0"
                  />
                </AttachmentAction>
              </AttachmentActions>
            </Attachment>
          </MessageContent>
        </Message>

        <Message>
          <MessageAvatar>
            <Avatar>
              <AvatarImage src="/avatars/02.png" alt="@rabbit" />
              <AvatarFallback>R</AvatarFallback>
            </Avatar>
          </MessageAvatar>
          <MessageContent>
            <BubbleGroup>
              <Bubble variant="muted">
                <BubbleContent>
                  It&apos;s always a one-line change 😭.
                </BubbleContent>
              </Bubble>
              <Bubble variant="muted">
                <BubbleContent>Alright, let me take a look.</BubbleContent>
                <BubbleReactions aria-label="Reactions: thumbs up">
                  <span>👍</span>
                </BubbleReactions>
              </Bubble>
            </BubbleGroup>
          </MessageContent>
        </Message>
        <Marker role="status">
          <MarkerContent className="shimmer">
            <span className="font-medium">Oliver</span> is typing...
          </MarkerContent>
        </Marker>
      </CardContent>
      <CardFooter className="flex items-center gap-4">
        <div className="relative w-full">
          <Textarea
            className="relative min-h-11 resize-y"
            placeholder="What is your thought?"
          />
          <Button size={"icon-lg"} className={"absolute top-1 right-2"}>
            <HugeiconsIcon
              icon={SendIcon}
              size={16}
              className="shrink-0 text-muted-foreground"
            />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
