"use client"

import { useEffect, useRef, useState } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Bold, Eye, Italic, Pen } from "lucide-react"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
}

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const [tab, setTab] = useState("edit")
  const [mounted, setMounted] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const editor = useEditor({
    extensions: [StarterKit],
    content: value || "<p></p>",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm dark:prose-invert min-h-96 max-w-none focus:outline-none p-3 border rounded-md",
      },
    },
    onUpdate: ({ editor }) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        onChange(editor.getHTML())
      }, 200)
    },
    immediatelyRender: false,
  })

  if (!mounted || !editor) return null

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <Tabs value={tab} onValueChange={setTab} defaultValue="edit" className="w-full">
        <TabsList className="w-full rounded-none border-b border-border bg-muted/40">
          <TabsTrigger value="edit" className="flex-1 font-medium cursor-pointer">
            <Pen /> Edit
          </TabsTrigger>
          <TabsTrigger value="preview" className="flex-1 font-medium cursor-pointer">
            <Eye /> Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="edit" className="p-4">
    
          <div className="flex flex-wrap gap-2 mb-3">
            <Button
              size="sm"
              type="button"
              variant="outline"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive("bold") ? "bg-muted" : ""}
            >
              <Bold className="w-4 h-4 mr-1" /> Bold
            </Button>
            <Button
              size="sm"
              type="button"
              variant="outline"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive("italic") ? "bg-muted" : ""}
            >
              <Italic className="w-4 h-4 mr-1" /> Italic
            </Button>

          </div>

          <EditorContent editor={editor} />
        </TabsContent>

        <TabsContent value="preview" className="p-6 min-h-96 bg-muted/30 overflow-auto">
          <div
            className="prose prose-lg prose-neutral dark:prose-invert max-w-none text-foreground"
            dangerouslySetInnerHTML={{
              __html: editor.getHTML() || "<p>Nothing to preview yet...</p>",
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
