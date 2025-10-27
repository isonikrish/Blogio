import Link from "next/link"
import { Card } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

interface BlogCardProps {
    title: string
    date: string | undefined
    image: string | null
    slug: string
}

export function BlogCard({ title, date, image, slug }: BlogCardProps) {
    return (
        <Link href={`/blog/${slug}`} className="block h-full">
            <Card className="group overflow-hidden cursor-pointer h-full flex flex-col shadow-sm hover:shadow-md transition-shadow duration-200">
                {image && (
                    <div className="relative w-full h-36 overflow-hidden">
                        <img
                            src={image || "/placeholder.svg"}
                            alt={title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                )}
                <div className="p-4 flex flex-col grow">
                    <div className="flex justify-between items-center mb-1 text-xs text-muted-foreground">
                        <span>
                            {date ? new Date(date).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            }) : ""}
                        </span>
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-1 line-clamp-2 text-balance">{title}</h3>

                    <div className="mt-3 font-medium text-xs flex items-center gap-1 group-hover:underline text-gray-600">
                        <span className="leading-none">Read More</span>
                        <ArrowRight size={14} className="shrink-0" />
                    </div>
                </div>
            </Card>
        </Link>
    )
}
