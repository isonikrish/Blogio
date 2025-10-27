import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Edit3, Folder, Globe, PenTool, Star } from "lucide-react"

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-semibold leading-tight tracking-tight">
              Share Your Stories with the World
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              A clean, distraction-free platform built for writers who want to focus on their words and reach real readers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="px-8 font-medium">
                <Link href="/create">Start Writing</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8 font-medium">
                <Link href="/blogs">Explore Blogs</Link>
              </Button>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-center">
            <div className="w-80 h-80 bg-secondary rounded-2xl flex items-center justify-center">
              <Edit3 className="w-20 h-20 text-primary" />
            </div>
          </div>
        </div>
      </section>

       <section className="py-24 border-t border-border/40">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-semibold">Built for Writers, Loved by Readers</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Blogio gives you everything you need to publish beautiful posts, share your thoughts, and grow your personal brand — all without complexity.
          </p>
          <div className="flex justify-center gap-8 pt-6">
            <div className="text-center">
              <PenTool className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Minimal Writing Interface</p>
            </div>
            <div className="text-center">
              <Folder className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Organized Posts & Tags</p>
            </div>
            <div className="text-center">
              <Globe className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Share with the World</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold mb-3">Focus on Writing, We Handle the Rest</h2>
            <p className="text-muted-foreground">Tools that keep you inspired and productive</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Edit3 className="w-6 h-6 text-primary" />,
                title: "Fast Markdown Editor",
                desc: "Write freely with instant previews and no clutter — just your words.",
              },
              {
                icon: <Folder className="w-6 h-6 text-primary" />,
                title: "Smart Post Organization",
                desc: "Keep your posts sorted by category or tags for easy navigation.",
              },
              {
                icon: <Globe className="w-6 h-6 text-primary" />,
                title: "Instant Publishing",
                desc: "Publish in one click and share your ideas with readers anywhere.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="bg-background border border-border rounded-xl p-8 shadow-sm hover:shadow-md transition"
              >
                <div className="mb-4">{f.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 border-t border-border/40">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-16">Writers Who Chose Simplicity</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Writing feels effortless again. The clean editor helps me stay focused.",
                name: "Aarav Mehta",
              },
              {
                quote: "Finally a platform that doesn’t get in my way. It’s all about the writing.",
                name: "Sophia Lee",
              },
              {
                quote: "My blogs look beautiful without extra work. Love the simplicity.",
                name: "James Carter",
              },
            ].map((t) => (
              <div key={t.name} className="bg-muted/20 p-8 rounded-xl border border-border/50">
                <Star className="w-6 h-6 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground italic mb-4">“{t.quote}”</p>
                <p className="font-medium text-foreground">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="bg-primary text-primary-foreground rounded-2xl text-center p-12 md:p-16 space-y-6">
          <h2 className="text-3xl md:text-4xl font-semibold">Start Your Writing Journey Today</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Join thousands of independent writers sharing their stories on <span className="font-medium">BlogHub</span>.
          </p>
          <Button asChild size="lg" variant="secondary" className="px-8 font-medium">
            <Link href="/create">Create Your First Post</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
