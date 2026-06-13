'use client'
import { useEditor, EditorContent, useEditorState } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import Placeholder from '@tiptap/extension-placeholder'
import Image from '@tiptap/extension-image'
import { useEffect, useCallback, useRef, useState } from 'react'
import { compressImage } from '@/lib/compressImage'
import {
  FaBold, FaItalic, FaUnderline, FaStrikethrough,
  FaListUl, FaListOl, FaQuoteLeft, FaCode, FaLink,
  FaAlignLeft, FaAlignCenter, FaAlignRight,
  FaUndo, FaRedo, FaImage,
} from 'react-icons/fa'
import { MdHighlight } from 'react-icons/md'

interface EditorProps {
  content: string
  onChange: (html: string) => void
}

function ToolbarButton({
  onClick,
  active,
  disabled,
  title,
  children,
}: {
  onClick: () => void
  active?: boolean
  disabled?: boolean
  title: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-pressed={active}
      className={`p-2 rounded-lg text-sm transition-colors ${
        disabled
          ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
          : active
            ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
      }`}
    >
      {children}
    </button>
  )
}

function Divider() {
  return <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />
}

export default function Editor({ content, onChange }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      Image,
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder: 'Write your post content here...' }),
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: 'prose prose-gray dark:prose-invert max-w-none min-h-full p-4 focus:outline-hidden prose-img:rounded-xl prose-img:shadow-lg prose-img:mx-auto',
      },
    },
  })

  // Reactive snapshot of the marks/nodes active at the current selection.
  // useEditorState re-renders the toolbar on every selection change (not just
  // on edits), so the buttons reflect the styles where the cursor actually is.
  const state = useEditorState({
    editor,
    // editor is null on the server/first client render (Tiptap defers init to
    // avoid hydration mismatch); the selector still runs, so guard every access.
    selector: ({ editor }) => ({
      bold: editor?.isActive('bold') ?? false,
      italic: editor?.isActive('italic') ?? false,
      underline: editor?.isActive('underline') ?? false,
      strike: editor?.isActive('strike') ?? false,
      highlight: editor?.isActive('highlight') ?? false,
      h1: editor?.isActive('heading', { level: 1 }) ?? false,
      h2: editor?.isActive('heading', { level: 2 }) ?? false,
      h3: editor?.isActive('heading', { level: 3 }) ?? false,
      bulletList: editor?.isActive('bulletList') ?? false,
      orderedList: editor?.isActive('orderedList') ?? false,
      blockquote: editor?.isActive('blockquote') ?? false,
      codeBlock: editor?.isActive('codeBlock') ?? false,
      alignLeft: editor?.isActive({ textAlign: 'left' }) ?? false,
      alignCenter: editor?.isActive({ textAlign: 'center' }) ?? false,
      alignRight: editor?.isActive({ textAlign: 'right' }) ?? false,
      link: editor?.isActive('link') ?? false,
      canUndo: editor?.can().undo() ?? false,
      canRedo: editor?.can().redo() ?? false,
    }),
  })

  useEffect(() => {
    // Only sync external content changes when the editor isn't focused.
    // When focused, the editor owns its own state — running setContent on every
    // parent re-render resets the cursor after each keystroke.
    if (editor && !editor.view.hasFocus() && content !== editor.getHTML()) {
      editor.commands.setContent(content, { emitUpdate: false })
    }
  }, [content, editor])

  const addLink = useCallback(() => {
    const url = window.prompt('URL')
    if (!url || !editor) return
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
    } else {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    }
  }, [editor])

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')

  const handleImageFile = useCallback(async (file: File) => {
    if (!editor) return
    setUploading(true)
    setUploadError('')
    try {
      const compressed = await compressImage(file)
      const fd = new FormData()
      fd.append('file', compressed)
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (res.ok) {
        editor.chain().focus().setImage({ src: data.url }).run()
      } else {
        setUploadError(data.error ?? 'Upload failed')
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : ''
      setUploadError(
        msg && !msg.toLowerCase().includes('fetch') && !msg.toLowerCase().includes('network')
          ? `Image processing failed — ${msg}`
          : 'Network error — could not upload image'
      )
    } finally {
      setUploading(false)
    }
  }, [editor])

  const addImage = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  if (!editor || !state) return null

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-900">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 p-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={state.bold} title="Bold">
          <FaBold />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={state.italic} title="Italic">
          <FaItalic />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={state.underline} title="Underline">
          <FaUnderline />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} active={state.strike} title="Strikethrough">
          <FaStrikethrough />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHighlight().run()} active={state.highlight} title="Highlight">
          <MdHighlight />
        </ToolbarButton>

        <Divider />

        {([1, 2, 3] as const).map(level => (
          <ToolbarButton
            key={level}
            onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
            active={level === 1 ? state.h1 : level === 2 ? state.h2 : state.h3}
            title={`Heading ${level}`}
          >
            <span className="font-bold text-xs">H{level}</span>
          </ToolbarButton>
        ))}

        <Divider />

        <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={state.bulletList} title="Bullet List">
          <FaListUl />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={state.orderedList} title="Ordered List">
          <FaListOl />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={state.blockquote} title="Blockquote">
          <FaQuoteLeft />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={state.codeBlock} title="Code Block">
          <FaCode />
        </ToolbarButton>

        <Divider />

        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('left').run()} active={state.alignLeft} title="Align Left">
          <FaAlignLeft />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('center').run()} active={state.alignCenter} title="Align Center">
          <FaAlignCenter />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('right').run()} active={state.alignRight} title="Align Right">
          <FaAlignRight />
        </ToolbarButton>

        <Divider />

        <ToolbarButton onClick={addLink} active={state.link} title="Add Link">
          <FaLink />
        </ToolbarButton>
        <ToolbarButton onClick={addImage} title="Upload Image">
          {uploading ? <span className="text-xs">…</span> : <FaImage />}
        </ToolbarButton>

        <Divider />

        <ToolbarButton onClick={() => editor.chain().focus().undo().run()} disabled={!state.canUndo} title="Undo">
          <FaUndo />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()} disabled={!state.canRedo} title="Redo">
          <FaRedo />
        </ToolbarButton>
      </div>

      {/* Hidden file input for image uploads */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={e => {
          const file = e.target.files?.[0]
          if (file) handleImageFile(file)
          e.target.value = ''
        }}
      />

      {uploadError && (
        <div className="px-4 py-2 bg-red-50 dark:bg-red-900/20 border-b border-red-100 dark:border-red-800 text-xs text-red-600 dark:text-red-400 flex items-center justify-between">
          <span>{uploadError}</span>
          <button type="button" onClick={() => setUploadError('')} className="ml-4 font-bold">✕</button>
        </div>
      )}

      {/* Editor — fixed height, content scrolls inside */}
      <div
        className="h-[60vh] overflow-y-auto relative"
        onClick={() => editor.commands.focus()}
      >
        {uploading && (
          <div className="absolute inset-0 bg-white/70 dark:bg-gray-900/70 flex items-center justify-center z-10 text-sm text-gray-500">
            Uploading image…
          </div>
        )}
        <EditorContent editor={editor} className="h-full" />
      </div>
    </div>
  )
}
