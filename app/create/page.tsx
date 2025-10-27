"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { RichTextEditor } from "@/components/richtext-editor"
import { trpc } from "../_trpc/trpc"

export default function CreatePostPage() {
  const [data, setData] = useState({
    title: "",
    content: "",
    categoryId: 0,
    published: false,
    imageUrl: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const utils = trpc.useContext()

  const { data: categories, isLoading: categoriesLoading } = trpc.category.getAll.useQuery()

  const createPost = trpc.post.create.useMutation({
    onSuccess: () => {
      utils.post.invalidate()
      setIsSubmitting(false)
      setData({ title: "", content: "", categoryId: 0, published: false, imageUrl: "" })
      alert("Post created successfully!")
    },
    onError: (err) => {
      setIsSubmitting(false)
      alert("Failed to create post: " + err.message)
    },
  })

  const handleChange = <K extends keyof typeof data>(
    field: K,
    value: typeof data[K]
  ) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!data.title || !data.content || !data.categoryId) return

    setIsSubmitting(true)

    createPost.mutate({
      title: data.title,
      content: data.content,
      imageUrl: data.imageUrl || undefined,
      published: data.published,
      categoryIds: [data.categoryId],
    })
  }

  if (categoriesLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-6 border border-muted rounded-lg animate-pulse">
            <div className="h-6 bg-muted rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-muted rounded w-full mb-2"></div>
            <div className="h-4 bg-muted rounded w-2/3 mb-2"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Create New Post</h1>
          <p className="text-muted-foreground">Write and publish your blog post</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-base font-semibold">Post Title</Label>
            <Input
              id="title"
              value={data.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Enter your post title..."
              className="text-lg py-6"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="imageUrl" className="text-base font-semibold">Thumbnail</Label>
            <Input
              id="imageUrl"
              value={data.imageUrl}
              onChange={(e) => handleChange("imageUrl", e.target.value)}
              placeholder="Enter your blog thumbnail URL..."
              className="text-lg py-6"
              pattern="https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|avif)(?:\?.*)?"
              title="Please enter a valid image URL"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category" className="text-base font-semibold">Category</Label>
            <Select
              value={data.categoryId.toString()}
              onValueChange={(value) => handleChange("categoryId", parseInt(value))}
              required
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories?.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id.toString()}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-base font-semibold">Content</Label>
            <RichTextEditor
              value={data.content}
              onChange={(value) => handleChange("content", value)}
            />
          </div>
          <Card className="p-6 bg-secondary border-0">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground mb-1">Publish Status</h3>
                <p className="text-sm text-muted-foreground">
                  {data.published ? "This post will be published immediately" : "This post will be saved as draft"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleChange("published", !data.published)}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${data.published ? "bg-primary" : "bg-border"}`}
              >
                <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${data.published ? "translate-x-7" : "translate-x-1"}`} />
              </button>
            </div>
          </Card>

          <div className="flex gap-4 pt-4">
            <Button type="submit" size="lg" disabled={isSubmitting || !data.title || !data.content || !data.categoryId}>
              {isSubmitting ? "Publishing..." : data.published ? "Publish Post" : "Save as Draft"}
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/dashboard">Cancel</Link>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
