"use client"

import type { ComponentProps, ReactElement, ReactNode } from "react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface CustomDialogProps {
  dialogTrigger?: ReactElement
  dialogTitle: string
  dialogDescription: string
  dialogContentClassname?: string
  dialogCloseTrigger?: ReactElement
  dialogFooter?: ReactNode
  dialogContent: ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  dialogContentProps?: Omit<
    ComponentProps<typeof DialogContent>,
    "children" | "className"
  >
}

export default function CustomDialog({
  dialogCloseTrigger,
  dialogContent,
  dialogDescription,
  dialogFooter,
  dialogTitle,
  dialogTrigger,
  dialogContentClassname,
  open,
  onOpenChange,
  dialogContentProps,
}: CustomDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {dialogTrigger && <DialogTrigger render={dialogTrigger} />}
      <DialogContent {...dialogContentProps} className={dialogContentClassname}>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        {dialogContent}
        {(dialogFooter || dialogCloseTrigger) && (
          <DialogFooter>
            {dialogFooter}
            {dialogCloseTrigger && <DialogClose render={dialogCloseTrigger} />}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
