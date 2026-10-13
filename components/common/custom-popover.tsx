import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function CustomPopover({
  render,
  popoverContent,
  popoverContentClassname,
  width = "80px",
  height,
  align = "start",
}: {
  render: React.ReactElement
  popoverContent: React.ReactNode
  popoverContentClassname?: string
  width?: string
  height?: string
  align?: "start" | "center" | "end"
}) {
  return (
    <Popover>
      <PopoverTrigger render={render} />
      <PopoverContent
        align={align}
        style={{ width: width, height: height }}
        className={popoverContentClassname}
      >
        {popoverContent}
      </PopoverContent>
    </Popover>
  )
}
