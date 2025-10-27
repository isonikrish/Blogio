"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { trpc } from "@/app/_trpc/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { RichTextEditor } from "@/components/richtext-editor";
import { ArrowLeft } from "lucide-react";

export default function EditBlog() {
    const { slug } = useParams();
    const router = useRouter();
    const utils = trpc.useContext();

    const { data: post, isLoading: postLoading } = trpc.post.getBySlug.useQuery(
        { slug: Array.isArray(slug) ? slug[0] : slug || "" },
        { enabled: !!slug }
    );

    const { data: categories, isLoading: categoriesLoading } =
        trpc.category.getAll.useQuery();

    const updatePost = trpc.post.update.useMutation({
        onSuccess: () => {
            utils.post.invalidate();
            alert("Post updated successfully!");
            router.push("/dashboard");
        },
        onError: (err) => alert("Failed to update post: " + err.message),
    });

    const [data, setData] = useState({
        title: "",
        content: "",
        categoryId: "",
        published: false,
        imageUrl: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!post || !Array.isArray(categories) || categories.length === 0) return;
        if (!post.categories || post.categories.length === 0) return;

        const catId = post.categories[0]?.id;
        if (!catId) return;

        setData({
            title: post.title ?? "",
            content: post.content ?? "",
            categoryId: String(catId),
            published: post.published ?? false,
            imageUrl: post.imageUrl ?? "",
        });
    }, [post, categories]);


    const handleChange = (field: string, value: any) =>
        setData((prev) => ({ ...prev, [field]: value }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!data.title || !data.content || !data.categoryId) return;
        setIsSubmitting(true);
        updatePost.mutate({
            id: post?.id!,
            title: data.title,
            content: data.content,
            imageUrl: data.imageUrl || undefined,
            published: data.published,
            categoryIds: [parseInt(data.categoryId)],
        });
        setIsSubmitting(false);
    };

    if (postLoading || categoriesLoading)
        return (
            <div className="max-w-4xl mx-auto px-4 py-12 space-y-4">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="p-6 border border-muted rounded-lg animate-pulse">
                        <div className="h-6 bg-muted rounded w-1/3 mb-2"></div>
                        <div className="h-4 bg-muted rounded w-full mb-2"></div>
                        <div className="h-4 bg-muted rounded w-2/3 mb-2"></div>
                    </div>
                ))}
            </div>
        );

    if (!post)
        return (
            <div className="max-w-4xl mx-auto px-4 py-12 text-center">
                <p className="text-muted-foreground">Post not found.</p>
                <Button asChild variant="ghost" className="mt-4">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Back to dashboard
                    </Link>
                </Button>
            </div>
        );

    return (
        <div className="bg-background min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-foreground mb-2">Edit Post</h1>
                        <p className="text-muted-foreground">Update and manage your post details</p>
                    </div>
                    <Button asChild variant="ghost">
                        <Link href="/dashboard" className="flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            Back
                        </Link>
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-base font-semibold">
                            Post Title
                        </Label>
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
                        <Label htmlFor="imageUrl" className="text-base font-semibold">
                            Thumbnail
                        </Label>
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
                        <Label htmlFor="category" className="text-base font-semibold">
                            Category
                        </Label>
                        <Select
                            key={data.categoryId} // forces re-render when post loads
                            value={data.categoryId}
                            onValueChange={(v) => handleChange("categoryId", v)}
                        >

                            <SelectTrigger id="category">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories?.map((cat) => (
                                    <SelectItem key={cat.id} value={String(cat.id)}>
                                        {cat.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-base font-semibold">Content</Label>
                        <RichTextEditor
                            key={data.content}
                            value={data.content}
                            onChange={(v) => handleChange("content", v)}
                        />
                    </div>

                    <Card className="p-6 bg-secondary border-0">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-foreground mb-1">Publish Status</h3>
                                <p className="text-sm text-muted-foreground">
                                    {data.published
                                        ? "This post will remain published"
                                        : "This post will be saved as draft"}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => handleChange("published", !data.published)}
                                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${data.published ? "bg-primary" : "bg-border"
                                    }`}
                            >
                                <span
                                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${data.published ? "translate-x-7" : "translate-x-1"
                                        }`}
                                />
                            </button>
                        </div>
                    </Card>

                    <div className="flex gap-4 pt-4">
                        <Button
                            type="submit"
                            size="lg"
                            disabled={
                                isSubmitting || !data.title || !data.content || !data.categoryId
                            }
                        >
                            {isSubmitting ? "Updating..." : "Update Post"}
                        </Button>
                        <Button asChild variant="outline" size="lg">
                            <Link href="/dashboard">Cancel</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
