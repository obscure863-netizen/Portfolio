import { ArrowUp } from 'lucide-react'

export default function Footer() {
  return (
    <footer id="contact" className="relative px-6 sm:px-10 py-20 sm:py-28 border-t hairline">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-10">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-paper/40 mb-4">Contact</p>
          <a
            href="mailto:obscure863@gmail.com"
            className="font-serif italic text-3xl sm:text-5xl hover:text-paper/70 transition-colors"
          >
            obscure863@gmail.com
          </a>
        </div>

        <div className="flex gap-6 text-sm text-paper/50">
          <a href="#" className="hover:text-paper transition-colors">
            YouTube
          </a>
          <a href="#" className="hover:text-paper transition-colors">
            Instagram
          </a>
          <a href="#" className="hover:text-paper transition-colors">
            X
          </a>
        </div>
      </div>

      <div className="mt-20 flex items-center justify-between text-xs text-paper/35">
        <span>© {new Date().getFullYear()} Obscure. All work protected.</span>
        <a href="#top" className="flex items-center gap-1.5 hover:text-paper transition-colors">
          Back to top <ArrowUp size={12} />
        </a>
      </div>
    </footer>
  )
}
