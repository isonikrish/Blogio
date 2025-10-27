"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Plus, Folder, LayoutDashboard } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/dashboard", label: "All Posts", icon: LayoutDashboard },
  { href: "/create", label: "New Post", icon: Plus },
  { href: "/categories", label: "Categories", icon: Folder },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex flex-col w-64 bg-secondary border-r border-border h-screen sticky top-16">
      <nav className="flex-1 p-6 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-background",
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
