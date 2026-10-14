"use client"

import { useCallback } from "react"
import { useEditor, EditorContent, type Editor } from "@tiptap/react"
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
import { Separator } from "@/components/ui/separator"

interface TaskEditorProps {
  onChange: (value: string) => void
}

interface ToolbarButtonProps {
  editor: Editor
  label: string
  icon: typeof TextBoldIcon
  active?: boolean
  onClick: () => void
}

function ToolbarButton({
  label,
  icon,
  active = false,
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
      onClick={onClick}
      className={[
        "size-8 shrink-0 rounded-md text-muted-foreground",
        "hover:bg-accent hover:text-accent-foreground",
        "focus-visible:ring-2 focus-visible:ring-ring",
        active ? "bg-accent text-accent-foreground" : "",
      ].join(" ")}
    >
      <HugeiconsIcon icon={icon} size={17} strokeWidth={1.8} />
    </Button>
  )
}

export default function TaskEditor({ onChange }: TaskEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "tiptap-link",
        },
      }),
      Placeholder.configure({
        placeholder:
          "Describe the task, expected deliverables, and any requirements...",
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "tiptap-content",
        "aria-label": "Task description editor",
      },
    },
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getText({ blockSeparator: "\n" }))
    },
  })

  const setLink = useCallback(() => {
    if (!editor) return

    const previousUrl = editor.getAttributes("link").href
    const url = window.prompt("Enter URL", previousUrl || "https://")

    if (url === null) return

    if (url.trim() === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run()
      return
    }

    try {
      const parsedUrl = new URL(url)

      if (!["http:", "https:", "mailto:"].includes(parsedUrl.protocol)) {
        return
      }

      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run()
    } catch {
      // Keep the editor unchanged if the URL is invalid.
    }
  }, [editor])

  if (!editor) return null

  const toolbar = (
    <>
      <ToolbarButton
        editor={editor}
        label="Heading 1"
        icon={Heading01Icon}
        active={editor.isActive("heading", { level: 1 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      />

      <ToolbarButton
        editor={editor}
        label="Heading 2"
        icon={Heading02Icon}
        active={editor.isActive("heading", { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      />

      <ToolbarButton
        editor={editor}
        label="Paragraph"
        icon={ParagraphIcon}
        active={editor.isActive("paragraph")}
        onClick={() => editor.chain().focus().setParagraph().run()}
      />

      <Separator orientation="vertical" className="mx-1 h-5" />

      <ToolbarButton
        editor={editor}
        label="Bold"
        icon={TextBoldIcon}
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      />

      <ToolbarButton
        editor={editor}
        label="Italic"
        icon={TextItalicIcon}
        active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      />

      <ToolbarButton
        editor={editor}
        label="Strikethrough"
        icon={StrikethroughIcon}
        active={editor.isActive("strike")}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      />

      <Separator orientation="vertical" className="mx-1 h-5" />

      <ToolbarButton
        editor={editor}
        label="Bullet list"
        icon={LeftToRightListBulletIcon}
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      />

      <ToolbarButton
        editor={editor}
        label="Task list"
        icon={ListOrderedIcon}
        active={editor.isActive("taskList")}
        onClick={() => editor.chain().focus().toggleTaskList().run()}
      />

      <Separator orientation="vertical" className="mx-1 h-5" />

      <ToolbarButton
        editor={editor}
        label="Add link"
        icon={Link01Icon}
        active={editor.isActive("link")}
        onClick={setLink}
      />

      {editor.isActive("link") && (
        <ToolbarButton
          editor={editor}
          label="Remove link"
          icon={Unlink04Icon}
          onClick={() =>
            editor.chain().focus().extendMarkRange("link").unsetLink().run()
          }
        />
      )}
    </>
  )

  return (
    <div className="w-full min-w-0 overflow-hidden rounded-xl border border-input bg-background shadow-sm transition-colors focus-within:border-ring">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-border bg-muted/50 p-2">
        {toolbar}
      </div>

      {/* Editor surface */}
      <div className="bg-card transition-colors">
        <EditorContent editor={editor} />
      </div>

      {/* Floating selection toolbar */}
      <BubbleMenu
        editor={editor}
        className="flex items-center gap-1 rounded-lg border border-border bg-popover p-1.5 text-popover-foreground shadow-lg"
      >
        <ToolbarButton
          editor={editor}
          label="Bold"
          icon={TextBoldIcon}
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        />

        <ToolbarButton
          editor={editor}
          label="Italic"
          icon={TextItalicIcon}
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />

        <ToolbarButton
          editor={editor}
          label="Add link"
          icon={Link01Icon}
          active={editor.isActive("link")}
          onClick={setLink}
        />
      </BubbleMenu>
    </div>
  )
}
