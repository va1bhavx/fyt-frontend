import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function CustomSideSheet({
  sheetTrigger,
  sheetTitle,
  sheetDescription,
  children,
  sheetClose,
  sheetContentClassname,
  sheetDescriptionClassname,
  sheetTitleClassname,
  sheetFooter,
  width = "100%",
  height = "100%",
}: {
  sheetTrigger: React.ReactElement
  sheetTitle: string
  sheetDescription: string
  children: React.ReactElement
  sheetClose?: React.ReactElement
  sheetTitleClassname?: string
  sheetDescriptionClassname?: string
  sheetContentClassname?: string
  sheetFooter?: React.ReactElement
  width?: string | number
  height?: string | number
}) {
  return (
    <Sheet>
      <SheetTrigger render={sheetTrigger} />
      <SheetContent style={{ width: width, height: height }}>
        <SheetHeader className="border-b">
          <SheetTitle className={sheetTitleClassname}>{sheetTitle}</SheetTitle>
          <SheetDescription className={sheetDescriptionClassname}>
            {sheetDescription}
          </SheetDescription>
        </SheetHeader>
        <div className={`${sheetContentClassname} p-6`}>{children}</div>
        <SheetFooter>
          {sheetFooter && <>{sheetFooter}</>}
          {sheetClose && <SheetClose render={sheetClose} />}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
