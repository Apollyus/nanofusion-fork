'use client'

import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { Color } from '@tiptap/extension-color'
import { TextStyle } from '@tiptap/extension-text-style'
import { FontFamily } from '@tiptap/extension-font-family'
import { TextAlign } from '@tiptap/extension-text-align'
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Quote, 
  Undo, 
  Redo, 
  Heading1, 
  Heading2, 
  Link as LinkIcon, 
  Image as ImageIcon,
  AlignCenter,
  AlignLeft,
  AlignRight,
  Type,
  Pipette
} from 'lucide-react'

interface EditorProps {
  content: string
  onChange: (content: string) => void
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null

  const addImage = () => {
    const url = window.prompt('URL obrázku:')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  const setLink = () => {
    const url = window.prompt('URL odkazu:')
    if (url) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border-b bg-slate-50 rounded-t-xl" style={{ borderColor: 'var(--border)' }}>
      {/* Text Style */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`p-2 rounded-lg hover:bg-slate-200 transition-colors ${editor.isActive('bold') ? 'bg-white shadow-sm text-amber-600' : ''}`}
        title="Tučné"
      >
        <Bold size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`p-2 rounded-lg hover:bg-slate-200 transition-colors ${editor.isActive('italic') ? 'bg-white shadow-sm text-amber-600' : ''}`}
        title="Kurzíva"
      >
        <Italic size={18} />
      </button>

      <div className="w-px h-6 bg-slate-300 mx-1" />

      {/* Font Family */}
      <select
        onChange={e => editor.chain().focus().setFontFamily(e.target.value).run()}
        className="text-xs font-semibold bg-white border rounded-lg px-2 py-1 outline-none focus:ring-1 focus:ring-amber-500/20"
        value={editor.getAttributes('textStyle').fontFamily || ''}
      >
        <option value="">Výchozí písmo</option>
        <option value="Inter, sans-serif">Sans-serif</option>
        <option value="serif">Serif</option>
        <option value="monospace">Monospace</option>
        <option value="'Outfit', sans-serif">Outfit</option>
      </select>

      {/* Color Picker */}
      <div className="relative flex items-center group ml-1">
        <div className="relative p-2 rounded-lg hover:bg-slate-200 cursor-pointer transition-colors flex items-center gap-1" title="Barva textu">
          <Pipette size={18} style={{ color: editor.getAttributes('textStyle').color || 'inherit' }} />
          <input
            type="color"
            onInput={e => editor.chain().focus().setColor((e.target as HTMLInputElement).value).run()}
            onChange={e => editor.chain().focus().setColor((e.target as HTMLInputElement).value).run()}
            value={editor.getAttributes('textStyle').color || '#000000'}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
      </div>

      <div className="w-px h-6 bg-slate-300 mx-1" />

      {/* Headings */}
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-2 rounded-lg hover:bg-slate-200 transition-colors ${editor.isActive('heading', { level: 1 }) ? 'bg-white shadow-sm text-amber-600' : ''}`}
        title="Nadpis 1"
      >
        <Heading1 size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded-lg hover:bg-slate-200 transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-white shadow-sm text-amber-600' : ''}`}
        title="Nadpis 2"
      >
        <Heading2 size={18} />
      </button>

      <div className="w-px h-6 bg-slate-300 mx-1" />

      {/* Alignment */}
      <button
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={`p-2 rounded-lg hover:bg-slate-200 transition-colors ${editor.isActive({ textAlign: 'left' }) ? 'bg-white shadow-sm text-amber-600' : ''}`}
        title="Zarovnat doleva"
      >
        <AlignLeft size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={`p-2 rounded-lg hover:bg-slate-200 transition-colors ${editor.isActive({ textAlign: 'center' }) ? 'bg-white shadow-sm text-amber-600' : ''}`}
        title="Zarovnat na střed"
      >
        <AlignCenter size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={`p-2 rounded-lg hover:bg-slate-200 transition-colors ${editor.isActive({ textAlign: 'right' }) ? 'bg-white shadow-sm text-amber-600' : ''}`}
        title="Zarovnat doprava"
      >
        <AlignRight size={18} />
      </button>

      <div className="w-px h-6 bg-slate-300 mx-1" />

      {/* Lists */}
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded-lg hover:bg-slate-200 transition-colors ${editor.isActive('bulletList') ? 'bg-white shadow-sm text-amber-600' : ''}`}
        title="Odrážky"
      >
        <List size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded-lg hover:bg-slate-200 transition-colors ${editor.isActive('orderedList') ? 'bg-white shadow-sm text-amber-600' : ''}`}
        title="Číslovaný seznam"
      >
        <ListOrdered size={18} />
      </button>

      <div className="w-px h-6 bg-slate-300 mx-1" />

      {/* Others */}
      <button onClick={setLink} className={`p-2 rounded-lg hover:bg-slate-200 transition-colors ${editor.isActive('link') ? 'bg-white shadow-sm text-amber-600' : ''}`} title="Odkaz">
        <LinkIcon size={18} />
      </button>
      <button onClick={addImage} className="p-2 rounded-lg hover:bg-slate-200 transition-colors" title="Obrázek">
        <ImageIcon size={18} />
      </button>

      <div className="ml-auto flex items-center gap-1">
        <button onClick={() => editor.chain().focus().undo().run()} className="p-2 rounded-lg hover:bg-slate-200 transition-colors" title="Zpět">
          <Undo size={18} />
        </button>
        <button onClick={() => editor.chain().focus().redo().run()} className="p-2 rounded-lg hover:bg-slate-200 transition-colors" title="Vpřed">
          <Redo size={18} />
        </button>
      </div>
    </div>
  )
}

export function TiptapEditor({ content, onChange }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      FontFamily,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Image,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-slate max-w-none focus:outline-none min-h-[300px] p-6 text-slate-800 bg-white'
      }
    }
  })

  // Synchronizace prop content do editoru (Tiptap ignoruje změny props by default)
  React.useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content, { emitUpdate: false })
    }
  }, [content, editor])

  return (
    <div className="border rounded-xl flex flex-col overflow-hidden transition-all focus-within:ring-4 focus-within:ring-amber-500/10 focus-within:border-amber-500/50" style={{ borderColor: 'var(--border)' }}>
      <MenuBar editor={editor} />
      <div className="bg-white">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
