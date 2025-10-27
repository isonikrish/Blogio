"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { trpc } from "../_trpc/trpc"
import { Search } from "lucide-react"
import { BlogCard } from "@/components/blogcard"

export default function BlogsPage() {
    const [query, setQuery] = useState("")
    const [category, setCategory] = useState("")
    const { data: categories, isLoading: categoriesLoading } = trpc.category.getAll.useQuery()
    const { data: posts, isLoading } = trpc.post.getByFilter.useQuery({ category, query })

    return (
        <div className="bg-background min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-bold text-foreground mb-2">Explore Blog Posts</h1>
                        <p className="text-muted-foreground">Browse and filter posts by category or title</p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <div>
                        <Select value={category || "all"} onValueChange={(v) => setCategory(v === "all" ? "" : v)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                {!categoriesLoading &&
                                    categories?.map((c) => (
                                        <SelectItem key={c.id} value={c.name}>
                                            {c.name}
                                        </SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="relative ">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                            id="query"
                            placeholder="Search by title..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                </div>
                {isLoading && (
                    <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="p-6 border rounded-lg animate-pulse">
                                <div className="h-6 bg-muted rounded w-1/3 mb-2" />
                                <div className="h-4 bg-muted rounded w-2/3" />
                            </div>
                        ))}
                    </div>
                )}
                {!isLoading && posts && posts.length > 0 && (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post) => (
                            <BlogCard title={post.title} key={post.id} date={post.createdAt?.toString()} image={post.imageUrl} slug={post.slug} />
                        ))}
                    </div>
                )}

                {!isLoading && (!posts || posts.length === 0) && (
                    <div className="text-center py-16">
                        <p className="text-muted-foreground">
                            No posts found. Try changing your filters.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
