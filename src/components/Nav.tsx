import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'Reel', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-5 sm:px-10 sm:py-6">
      <a href="#top" className="font-serif italic text-xl sm:text-2xl tracking-tight">
        Obscure
      </a>

      <nav className="hidden md:flex items-center gap-1 glass rounded-full px-2 py-2">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="px-4 py-1.5 text-sm text-paper/70 hover:text-paper transition-colors"
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          className="ml-1 bg-paper text-ink text-sm font-medium rounded-full px-4 py-1.5 hover:bg-white transition-colors"
        >
          Work with me
        </a>
      </nav>

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        className="md:hidden glass rounded-full p-2.5 text-paper"
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      {open && (
        <div className="fixed inset-0 z-30 bg-ink/95 backdrop-blur-sm flex flex-col items-center justify-center gap-8 md:hidden">
          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-3xl font-serif italic text-paper animate-fade-up"
              style={{ animationDelay: `${100 + i * 60}ms` }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
