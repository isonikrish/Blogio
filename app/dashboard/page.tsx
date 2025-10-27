"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit2, Trash2 } from "lucide-react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { trpc } from "../_trpc/trpc"

export default function DashboardPage() {
  const { data: posts, isLoading } = trpc.post.getAll.useQuery()

  const utils = trpc.useContext()
  const deleteBlog = trpc.post.delete.useMutation({
    onSuccess: () => {
      utils.post.getAll.invalidate()
    },
  })
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      deleteBlog.mutate({ id: parseInt(id) })
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-muted-foreground">
        Loading...
      </div>
    )
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="flex bg-background min-h-screen">
        <DashboardSidebar />
        <main className="flex-1 flex flex-col items-center justify-center">
          <p className="text-muted-foreground mb-4">No posts yet. Create your first one!</p>
          <Button asChild>
            <Link href="/create">Create Post</Link>
          </Button>
        </main>
      </div>
    )
  }

  const publishedCount = posts.filter((p) => p.published).length

  return (
    <div className="flex bg-background min-h-screen">
      <DashboardSidebar />

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
              <p className="text-muted-foreground">Manage your blog posts and content</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6">
              <p className="text-muted-foreground text-sm mb-2">Total Posts</p>
              <p className="text-3xl font-bold text-foreground">{posts.length}</p>
            </Card>
            <Card className="p-6">
              <p className="text-muted-foreground text-sm mb-2">Published</p>
              <p className="text-3xl font-bold text-foreground">{publishedCount}</p>
            </Card>
          </div>

          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Title</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Categories</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id} className="border-b border-border hover:bg-secondary transition-colors">
                      <td className="px-6 py-4 text-foreground font-medium">{post.title}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          {post.categories?.map((cat: string) => (
                            <Badge key={cat} variant="secondary">
                              {cat}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={post.published ? "default" : "outline"}>
                          {post.published ? "published" : "draft"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground text-sm">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-start gap-2">
                          <Button
                            asChild
                            size="sm"
                            variant="outline"
                            className="rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-all duration-150">
                            <Link href={`/blog/${post.slug}`}>View</Link>
                          </Button>

                          <Button
                            asChild
                            size="sm"
                            variant="secondary"
                            className="rounded-lg hover:bg-primary/10 hover:text-primary transition-all duration-150 flex items-center gap-1">
                            <Link href={`/blog/${post.slug}/edit`}>
                              <Edit2 className="w-4 h-4" />
                              Edit
                            </Link>
                          </Button>

                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(post.id)}
                            className="rounded-lg text-destructive hover:bg-destructive/10 hover:text-destructive transition-all duration-150 flex items-center gap-1"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </Button>
                        </div>
                      </td>


                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
