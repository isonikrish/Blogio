"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { trpc } from "../../_trpc/trpc";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";

export default function BlogPostPage() {
  const params = useParams();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;

  if (!slug) return <div>Slug is missing</div>;

  const { data: post, isLoading } = trpc.post.getBySlug.useQuery({ slug });
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-4">
        <div className="h-8 bg-muted rounded w-1/3 animate-pulse"></div>
        <div className="h-6 bg-muted rounded w-1/2 animate-pulse"></div>
        <div className="h-4 bg-muted rounded w-full animate-pulse"></div>
        <div className="h-96 bg-muted rounded-2xl animate-pulse"></div>
        <div className="h-4 bg-muted rounded w-full animate-pulse"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <p className="text-muted-foreground">Post not found.</p>
        <Button asChild variant="ghost" className="mt-4">
          <Link href="/blogs" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to all posts
          </Link>
        </Button>
      </div>
    );
  }

  const textContent = post.content
    ? post.content
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/<\/p>/gi, " ")
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim()
    : ""


  const wordCount = textContent.trim().split(/\s+/).length
  const readTime = Math.ceil(wordCount / 200) // ~200 words per minute

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button asChild variant="ghost" className="mb-8">
          <Link href="/blogs" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to all posts
          </Link>
        </Button>
        <article className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge>{post.categories[0].categories.name}</Badge>
              <span className="text-sm text-muted-foreground">
                {new Date(post.createdAt!).toLocaleDateString()}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight text-balance">
              {post.title}
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-muted-foreground">
              <span>{readTime} min read</span>
              <span className="hidden sm:inline">•</span>
              <span>{wordCount.toLocaleString()} words</span>
            </div>

          </div>
          {post.imageUrl && (
            <div className="w-full h-96 bg-secondary rounded-2xl overflow-hidden">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="prose prose-lg max-w-none">
            <div
              className="prose prose-lg max-w-none text-foreground leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content || "" }}
            />
          </div>
        </article>
      </div>
    </div>
  );
}
