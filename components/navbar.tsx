"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-md transition-transform group-hover:scale-105">
              <span className="text-primary-foreground font-bold text-lg">B</span>
            </div>
            <span className="font-semibold text-xl text-foreground tracking-tight">Blogio</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {["Home", "Blogs", "Categories", "Dashboard"].map((item) => (
              <Link
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="relative text-foreground/80 hover:text-primary font-medium transition-colors after:content-[''] after:absolute after:w-0 after:h-0.5 after:left-0 after:-bottom-1 after:bg-primary after:transition-all hover:after:w-full"
              >
                {item}
              </Link>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-4">
            
            <Button asChild className="rounded-lg shadow-sm font-medium">
              <Link href="/create">New Post</Link>
            </Button>
          </div>


          <button
            className="md:hidden p-2 rounded-md hover:bg-secondary/50 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
            {["Home", "Blogs", "Categories", "Dashboard"].map((item) => (
              <Link
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="block px-4 py-2 text-foreground/90 font-medium hover:bg-secondary/50 rounded-md transition-colors"
              >
                {item}
              </Link>
            ))}
            <Button asChild className="w-full font-medium">
              <Link href="/create">Write a Post</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}
