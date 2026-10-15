"use client"

import { useEffect, useState } from "react"
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment"
import { formatFileSize } from "@/utils/upload-files"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Cancel01Icon,
  CloudUploadIcon,
  ReloadIcon,
} from "@hugeicons/core-free-icons"

export type AttachmentState =
  "idle" | "uploading" | "processing" | "error" | "done"

interface CustomAttachmentProps {
  file: File
  state?: AttachmentState
  error?: string
  disabled?: boolean
  showPreview?: boolean
  onRemove?: () => void
  onRetry?: () => void
  className?: string
}

export default function CustomAttachment({
  file,
  state = "idle",
  error,
  disabled = false,
  showPreview = true,
  onRemove,
  onRetry,
  className = "",
}: CustomAttachmentProps) {
  const [preview, setPreview] = useState<{ file: File; url: string } | null>(
    null
  )

  useEffect(() => {
    if (!showPreview || !file.type.startsWith("image/")) return
    const url = URL.createObjectURL(file)
    setPreview({ file, url })
    return () => URL.revokeObjectURL(url)
  }, [file, showPreview])

  const previewUrl =
    showPreview && preview?.file === file ? preview.url : undefined
  const status = {
    idle: "Ready to upload",
    uploading: "Uploading…",
    processing: "Processing…",
    error: error || "Upload failed. Try again.",
    done: "Uploaded",
  }[state]

  return (
    <Attachment state={state} className={`w-full min-w-0 ${className}`}>
      <AttachmentMedia variant={previewUrl ? "image" : "icon"}>
        {previewUrl ? (
          // Local blob URL; a plain image is appropriate for a temporary thumbnail.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={previewUrl} alt="" className="size-full object-cover" />
        ) : (
          <HugeiconsIcon icon={CloudUploadIcon} />
        )}
      </AttachmentMedia>
      <AttachmentContent className="min-w-0 flex-1">
        <AttachmentTitle className="truncate" title={file.name}>
          {file.name}
        </AttachmentTitle>
        <AttachmentDescription className="break-words">
          {formatFileSize(file.size)} · {status}
        </AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        {state === "error" && onRetry && (
          <AttachmentAction
            type="button"
            aria-label={`Retry uploading ${file.name}`}
            disabled={disabled}
            onClick={onRetry}
          >
            <HugeiconsIcon icon={ReloadIcon} />
          </AttachmentAction>
        )}
        {onRemove && (
          <AttachmentAction
            type="button"
            aria-label={`Remove ${file.name}`}
            disabled={disabled}
            onClick={onRemove}
          >
            <HugeiconsIcon icon={Cancel01Icon} />
          </AttachmentAction>
        )}
      </AttachmentActions>
    </Attachment>
  )
}
