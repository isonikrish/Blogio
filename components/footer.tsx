import { Github, Twitter, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-secondary border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo and Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">B</span>
              </div>
              <span className="font-bold text-lg text-foreground">BlogHub</span>
            </div>
            <p className="text-muted-foreground text-sm">© 2025 BlogHub. All rights reserved.</p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-lg bg-background hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-lg bg-background hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-lg bg-background hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
