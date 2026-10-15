"use client"

import { useEffect, useId, useRef, useState, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import CustomAttachment, { type AttachmentState } from "./custom-attachment"
import { addFiles, formatFileSize } from "@/utils/upload-files"
import { HugeiconsIcon } from "@hugeicons/react"
import { CloudUploadIcon } from "@hugeicons/core-free-icons"

export interface UploadedFile {
  id: string
  storageKey: string
  url?: string
}

interface UploadStatus {
  state: AttachmentState
  error?: string
}

export interface CustomUploadProps {
  value: File[]
  onChange: (files: File[]) => void
  onBlur?: () => void
  id?: string
  title?: string
  description?: string
  buttonLabel?: string
  accept?: string
  multiple?: boolean
  maxFiles?: number
  /** Maximum bytes per file. Defaults to 10 MiB. */
  maxSize?: number
  disabled?: boolean
  showPreview?: boolean
  className?: string
  error?: string
  icon?: ReactNode
  /** Omit to select files now and upload later with the parent form. */
  uploadFile?: (
    file: File,
    options: { signal: AbortSignal }
  ) => Promise<UploadedFile>
  onUploaded?: (file: File, result: UploadedFile) => void
  onUploadingChange?: (uploading: boolean) => void
  onRemove?: (file: File) => void
}

export function CustomUpload({
  value,
  onChange,
  onBlur,
  id,
  title = "Attachments",
  description = "Add reference documents, screenshots, or other useful files.",
  buttonLabel = "Choose files",
  accept = "",
  multiple = true,
  maxFiles = 5,
  maxSize = 10 * 1024 * 1024,
  disabled = false,
  showPreview = true,
  className = "",
  error,
  icon,
  uploadFile,
  onUploaded,
  onUploadingChange,
  onRemove,
}: CustomUploadProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const inputRef = useRef<HTMLInputElement>(null)
  const latestFiles = useRef(value)
  const mounted = useRef(false)
  const controllerRef = useRef<AbortController | null>(null)
  const busyRef = useRef(false)
  const statusesRef = useRef(new Map<File, UploadStatus>())
  const [statuses, setStatuses] = useState(new Map<File, UploadStatus>())
  const [errors, setErrors] = useState<string[]>([])
  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const locked = disabled || uploading
  const limit = multiple ? maxFiles : Math.min(1, maxFiles)
  const atLimit = value.length >= limit

  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
      controllerRef.current?.abort()
    }
  }, [])

  useEffect(() => {
    latestFiles.current = value
    // Also forget upload statuses when the parent resets/removes files.
    let removed = false
    for (const file of statusesRef.current.keys()) {
      if (!value.includes(file)) {
        statusesRef.current.delete(file)
        removed = true
      }
    }
    if (removed) setStatuses(new Map(statusesRef.current))
  }, [value])

  function updateStatus(file: File, status: UploadStatus) {
    statusesRef.current.set(file, status)
    if (mounted.current) setStatuses(new Map(statusesRef.current))
  }

  function selectFiles(incoming: File[]) {
    if (locked || busyRef.current) return
    const result = addFiles(latestFiles.current, incoming, {
      accept,
      maxFiles,
      maxSize,
      multiple,
    })
    latestFiles.current = result.files
    setErrors(result.errors)
    onChange(result.files)
    onBlur?.()
  }

  function removeFile(file: File) {
    if (locked || busyRef.current) return
    const files = latestFiles.current.filter((item) => item !== file)
    latestFiles.current = files
    statusesRef.current.delete(file)
    setStatuses(new Map(statusesRef.current))
    setErrors([])
    onChange(files)
    onRemove?.(file)
    onBlur?.()
  }

  async function uploadFiles(files: File[]) {
    if (!uploadFile || disabled || busyRef.current || !files.length) return
    busyRef.current = true
    const controller = new AbortController()
    controllerRef.current = controller
    setUploading(true)
    try {
      onUploadingChange?.(true)
      for (const file of files) {
        if (controller.signal.aborted) break
        if (
          !latestFiles.current.includes(file) ||
          statusesRef.current.get(file)?.state === "done"
        )
          continue
        updateStatus(file, { state: "uploading" })
        let result: UploadedFile
        try {
          result = await uploadFile(file, { signal: controller.signal })
        } catch (cause) {
          if (controller.signal.aborted) break
          if (mounted.current && latestFiles.current.includes(file)) {
            updateStatus(file, {
              state: "error",
              error:
                cause instanceof Error
                  ? cause.message
                  : "Upload failed. Try again.",
            })
          }
          continue
        }
        if (!mounted.current || controller.signal.aborted) break
        if (!latestFiles.current.includes(file)) continue
        updateStatus(file, { state: "done" })
        onUploaded?.(file, result)
      }
    } finally {
      busyRef.current = false
      controllerRef.current = null
      if (mounted.current) {
        setUploading(false)
        onUploadingChange?.(false)
      }
    }
  }

  const pendingFiles = value.filter(
    (file) => statuses.get(file)?.state !== "done"
  )
  const messages = [...(error ? [error] : []), ...errors]

  return (
    <section
      className={`min-w-0 space-y-3 ${className}`}
      aria-labelledby={`${inputId}-title`}
    >
      <div>
        <h3 id={`${inputId}-title`} className="text-sm font-medium">
          {title}
        </h3>
        <p
          id={`${inputId}-description`}
          className="mt-1 text-xs leading-5 text-muted-foreground"
        >
          {description}
        </p>
      </div>

      <div
        onDragOver={(event) => {
          event.preventDefault()
          if (!locked && !atLimit) setDragging(true)
        }}
        onDragLeave={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null))
            setDragging(false)
        }}
        onDrop={(event) => {
          event.preventDefault()
          setDragging(false)
          selectFiles(Array.from(event.dataTransfer.files))
        }}
        className={`flex min-h-44 flex-col items-center justify-center gap-3 rounded-xl border border-dashed p-5 text-center transition-colors ${dragging ? "border-primary bg-primary/5" : "border-border bg-muted/20"} ${locked ? "opacity-60" : ""}`}
      >
        <div className="flex size-10 items-center justify-center rounded-full border bg-background text-muted-foreground">
          {icon ?? <HugeiconsIcon icon={CloudUploadIcon} />}
        </div>
        <div>
          <p className="text-sm font-medium">
            {dragging ? "Drop files here" : "Drag and drop your files here"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Up to {limit} file(s) · {formatFileSize(maxSize)} per file
          </p>
          {accept && (
            <p className="mt-1 max-w-sm text-xs break-words text-muted-foreground">
              Accepted: {accept}
            </p>
          )}
        </div>
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          className="hidden"
          aria-label={title}
          aria-describedby={`${inputId}-description`}
          accept={accept || undefined}
          multiple={multiple}
          disabled={locked || atLimit}
          onChange={(event) => {
            selectFiles(Array.from(event.target.files ?? []))
            // Allows choosing the same file after removing it.
            event.target.value = ""
          }}
        />
        <Button
          type="button"
          variant="outline"
          disabled={locked || atLimit}
          onClick={() => inputRef.current?.click()}
          aria-describedby={messages.length ? `${inputId}-errors` : undefined}
        >
          {buttonLabel}
        </Button>
      </div>

      {messages.length > 0 && (
        <ul
          id={`${inputId}-errors`}
          role="alert"
          className="space-y-1 text-xs text-destructive"
        >
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      )}

      <div className="grid min-w-0 gap-2" aria-label="Selected attachments">
        {value.map((file) => {
          const status = statuses.get(file)
          return (
            <CustomAttachment
              key={`${file.name}-${file.size}-${file.lastModified}-${file.type}`}
              file={file}
              state={status?.state ?? "idle"}
              error={status?.error}
              disabled={locked}
              showPreview={showPreview}
              onRemove={() => removeFile(file)}
              onRetry={
                uploadFile
                  ? () => {
                      void uploadFiles([file])
                    }
                  : undefined
              }
            />
          )
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <p role="status" className="text-xs text-muted-foreground">
          {uploading
            ? "Uploading files…"
            : `${value.length} of ${limit} file(s) selected`}
        </p>
        {uploadFile && pendingFiles.length > 0 && (
          <Button
            type="button"
            disabled={locked}
            onClick={() => {
              void uploadFiles(pendingFiles)
            }}
          >
            {uploading ? "Uploading…" : "Upload files"}
          </Button>
        )}
      </div>
    </section>
  )
}
