"use client"

import { useId, useRef, useState, type ReactNode } from "react"
import { useEditor, useEditorState, EditorContent } from "@tiptap/react"
import { BubbleMenu } from "@tiptap/react/menus"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import TaskList from "@tiptap/extension-task-list"
import TaskItem from "@tiptap/extension-task-item"
import Link from "@tiptap/extension-link"
import {
  TextBoldIcon,
  TextItalicIcon,
  StrikethroughIcon,
  Heading01Icon,
  Heading02Icon,
  ParagraphIcon,
  Link01Icon,
  LeftToRightListBulletIcon,
  ListOrderedIcon,
  Unlink04Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import CustomDialog from "@/components/common/custom-dialog"

interface TaskEditorProps {
  onChange: (value: string) => void
  onBlur?: () => void
}

interface ToolbarButtonProps {
  label: string
  children: ReactNode
  active?: boolean
  disabled?: boolean
  onClick: () => void
}

function ToolbarButton({
  label,
  children,
  active = false,
  disabled = false,
  onClick,
}: ToolbarButtonProps) {
  return (
    <Button
      type="button"
      size="icon"
      variant="ghost"
      title={label}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      className={`size-9 shrink-0 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring ${
        active ? "bg-accent text-accent-foreground" : ""
      }`}
    >
      <span aria-hidden="true">{children}</span>
    </Button>
  )
}

function Icon({ icon }: { icon: typeof TextBoldIcon }) {
  return <HugeiconsIcon icon={icon} size={17} strokeWidth={1.8} />
}

export default function TaskEditor({ onChange, onBlur }: TaskEditorProps) {
  const linkInputId = useId()
  const [linkOpen, setLinkOpen] = useState(false)
  const [linkUrl, setLinkUrl] = useState("")
  const [linkError, setLinkError] = useState<string | null>(null)
  const linkSelection = useRef<{ from: number; to: number } | null>(null)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ link: false }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "tiptap-link" },
      }),
      Placeholder.configure({
        placeholder:
          "Describe the task, expected deliverables, and any requirements...",
      }),
    ],
    content: "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "tiptap-content task-editor-content",
        "aria-label": "Task requirements editor",
      },
    },
    onUpdate: ({ editor }) => {
      // Preserves the existing plain-text callback used by your form and Zod.
      onChange(editor.getText({ blockSeparator: "\n" }))
    },
    onBlur: () => onBlur?.(),
  })

  // Subscribe to selection/document changes so toolbar states stay current.
  const state = useEditorState({
    editor,
    selector: ({ editor }) => {
      if (!editor) return null
      return {
        h1: editor.isActive("heading", { level: 1 }),
        h2: editor.isActive("heading", { level: 2 }),
        paragraph: editor.isActive("paragraph"),
        bold: editor.isActive("bold"),
        italic: editor.isActive("italic"),
        strike: editor.isActive("strike"),
        code: editor.isActive("code"),
        bullet: editor.isActive("bulletList"),
        ordered: editor.isActive("orderedList"),
        task: editor.isActive("taskList"),
        quote: editor.isActive("blockquote"),
        codeBlock: editor.isActive("codeBlock"),
        link: editor.isActive("link"),
        canUndo: editor.can().undo(),
        canRedo: editor.can().redo(),
      }
    },
  })

  if (!editor) return null

  function openLinkDialog() {
    if (!editor) return
    const { from, to } = editor.state.selection
    linkSelection.current = { from, to }
    setLinkUrl(editor.getAttributes("link").href ?? "")
    setLinkError(null)
    setLinkOpen(true)
  }

  function saveLink() {
    if (!editor || !linkSelection.current) return
    const value = linkUrl.trim()

    let url: URL
    try {
      url = new URL(value)
      if (!["https:", "http:", "mailto:"].includes(url.protocol)) {
        throw new Error("Unsupported protocol")
      }
    } catch {
      setLinkError("Enter a valid https://, http://, or mailto: URL.")
      return
    }

    const { from, to } = linkSelection.current
    const chain = editor.chain().setTextSelection({ from, to })
    const isExistingLink = editor.isActive("link")
    const saved =
      from === to && !isExistingLink
        ? chain
            .insertContent({
              type: "text",
              text: url.href,
              marks: [{ type: "link", attrs: { href: url.href } }],
            })
            .run()
        : chain.extendMarkRange("link").setLink({ href: url.href }).run()

    if (!saved) {
      setLinkError("A link cannot be added at this position.")
      return
    }

    setLinkOpen(false)
  }

  const groups: ToolbarButtonProps[][] = [
    [
      {
        label: "Heading 1",
        children: <Icon icon={Heading01Icon} />,
        active: state?.h1,
        onClick: () => {
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        },
      },
      {
        label: "Heading 2",
        children: <Icon icon={Heading02Icon} />,
        active: state?.h2,
        onClick: () => {
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        },
      },
      {
        label: "Paragraph",
        children: <Icon icon={ParagraphIcon} />,
        active: state?.paragraph,
        onClick: () => {
          editor.chain().focus().setParagraph().run()
        },
      },
    ],
    [
      {
        label: "Bold",
        children: <Icon icon={TextBoldIcon} />,
        active: state?.bold,
        onClick: () => {
          editor.chain().focus().toggleBold().run()
        },
      },
      {
        label: "Italic",
        children: <Icon icon={TextItalicIcon} />,
        active: state?.italic,
        onClick: () => {
          editor.chain().focus().toggleItalic().run()
        },
      },
      {
        label: "Strikethrough",
        children: <Icon icon={StrikethroughIcon} />,
        active: state?.strike,
        onClick: () => {
          editor.chain().focus().toggleStrike().run()
        },
      },
      {
        label: "Inline code",
        children: <span className="font-mono text-xs">{"<>"}</span>,
        active: state?.code,
        onClick: () => {
          editor.chain().focus().toggleCode().run()
        },
      },
    ],
    [
      {
        label: "Bullet list",
        children: <Icon icon={LeftToRightListBulletIcon} />,
        active: state?.bullet,
        onClick: () => {
          editor.chain().focus().toggleBulletList().run()
        },
      },
      {
        label: "Numbered list",
        children: <Icon icon={ListOrderedIcon} />,
        active: state?.ordered,
        onClick: () => {
          editor.chain().focus().toggleOrderedList().run()
        },
      },
      {
        label: "Checklist",
        children: <span className="text-base">☑</span>,
        active: state?.task,
        onClick: () => {
          editor.chain().focus().toggleTaskList().run()
        },
      },
    ],
    [
      {
        label: "Blockquote",
        children: <span className="font-serif text-xl">❝</span>,
        active: state?.quote,
        onClick: () => {
          editor.chain().focus().toggleBlockquote().run()
        },
      },
      {
        label: "Code block",
        children: <span className="font-mono text-xs">{"{ }"}</span>,
        active: state?.codeBlock,
        onClick: () => {
          editor.chain().focus().toggleCodeBlock().run()
        },
      },
      {
        label: "Horizontal divider",
        children: <span className="text-lg">―</span>,
        onClick: () => {
          editor.chain().focus().setHorizontalRule().run()
        },
      },
    ],
    [
      {
        label: "Add or edit link",
        children: <Icon icon={Link01Icon} />,
        active: state?.link,
        onClick: openLinkDialog,
      },
      {
        label: "Remove link",
        children: <Icon icon={Unlink04Icon} />,
        disabled: !state?.link,
        onClick: () => {
          editor.chain().focus().extendMarkRange("link").unsetLink().run()
        },
      },
    ],
    [
      {
        label: "Undo",
        children: <span className="text-lg">↶</span>,
        disabled: !state?.canUndo,
        onClick: () => {
          editor.chain().focus().undo().run()
        },
      },
      {
        label: "Redo",
        children: <span className="text-lg">↷</span>,
        disabled: !state?.canRedo,
        onClick: () => {
          editor.chain().focus().redo().run()
        },
      },
    ],
  ]

  return (
    <div className="task-editor w-full min-w-0 overflow-hidden rounded-xl border border-input bg-background shadow-sm transition-colors focus-within:border-ring">
      <div className="max-w-full overflow-x-auto overscroll-x-contain border-b border-border bg-muted/50">
        <div
          role="group"
          aria-label="Text formatting"
          className="flex w-max min-w-full flex-nowrap items-center gap-1 p-2"
        >
          {groups.map((group, index) => (
            <div
              key={index}
              className={`flex shrink-0 items-center gap-1 ${index ? "ml-1 border-l border-border pl-2" : ""}`}
            >
              {group.map((button) => (
                <ToolbarButton key={button.label} {...button} />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="min-w-0 bg-card transition-colors">
        <EditorContent editor={editor} />
      </div>

      <BubbleMenu
        editor={editor}
        shouldShow={({ editor, from, to }) =>
          !linkOpen && from !== to && !editor.isActive("codeBlock")
        }
        className="flex items-center gap-1 rounded-lg border border-border bg-popover p-1.5 text-popover-foreground shadow-lg"
      >
        <ToolbarButton
          label="Bold"
          active={state?.bold}
          onClick={() => {
            editor.chain().focus().toggleBold().run()
          }}
        >
          <Icon icon={TextBoldIcon} />
        </ToolbarButton>
        <ToolbarButton
          label="Italic"
          active={state?.italic}
          onClick={() => {
            editor.chain().focus().toggleItalic().run()
          }}
        >
          <Icon icon={TextItalicIcon} />
        </ToolbarButton>
        <ToolbarButton
          label="Add or edit link"
          active={state?.link}
          onClick={openLinkDialog}
        >
          <Icon icon={Link01Icon} />
        </ToolbarButton>
      </BubbleMenu>

      <CustomDialog
        open={linkOpen}
        onOpenChange={setLinkOpen}
        dialogTitle="Add or edit link"
        dialogDescription="Link the selected text, or insert a URL at the cursor."
        dialogContentClassname="sm:max-w-md"
        dialogContentProps={{ finalFocus: () => editor.view.dom }}
        dialogContent={
          <div className="space-y-2 py-2">
            <Label htmlFor={linkInputId}>URL</Label>
            <Input
              id={linkInputId}
              type="url"
              inputMode="url"
              placeholder="https://example.com"
              value={linkUrl}
              onChange={(event) => {
                setLinkUrl(event.target.value)
                setLinkError(null)
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault()
                  event.stopPropagation()
                  saveLink()
                }
              }}
              aria-invalid={Boolean(linkError)}
              aria-describedby={linkError ? `${linkInputId}-error` : undefined}
            />
            {linkError && (
              <p
                id={`${linkInputId}-error`}
                role="alert"
                className="text-xs text-destructive"
              >
                {linkError}
              </p>
            )}
          </div>
        }
        dialogFooter={
          <>
            <Button
              type="button"
              variant="outline"
              onClick={() => setLinkOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button" onClick={saveLink}>
              Save link
            </Button>
          </>
        }
      />
    </div>
  )
}
