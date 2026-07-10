import { ArrowDown } from 'lucide-react'
import BlurFadeText from './BlurFadeText'

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex flex-col justify-center px-6 sm:px-10 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, #0A0A0A 0, transparent 45%), radial-gradient(circle at 80% 75%, #0A0A0A 0, transparent 40%)',
        }}
      />

      <p className="animate-fade-up text-xs sm:text-sm tracking-[0.25em] uppercase text-paper/50 mb-6">
        Creative Director, Video Editor, AI Cinematographer
      </p>

      <h1
        className="animate-fade-up font-display font-bold leading-[0.9] tracking-tight text-[19vw] sm:text-[15vw] md:text-[13vw] lg:text-[11rem]"
        style={{ animationDelay: '100ms' }}
      >
        <BlurFadeText text="Obscure" />
      </h1>

      <p
        className="animate-fade-up mt-8 max-w-xl text-base sm:text-lg text-paper/60 leading-relaxed"
        style={{ animationDelay: '220ms' }}
      >
        Commercials, narrative shorts, and AI-generated motion work, built and
        edited shot by shot rather than prompted all at once. This is the reel.
      </p>

      <a
        href="#work"
        className="animate-fade-up mt-14 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-paper/50 hover:text-paper transition-colors w-fit"
        style={{ animationDelay: '340ms' }}
      >
        View the reel
        <ArrowDown size={14} />
      </a>
    </section>
  )
}
