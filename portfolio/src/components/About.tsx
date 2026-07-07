export default function About() {
  return (
    <section id="about" className="relative px-6 sm:px-10 py-28 sm:py-36 border-t hairline">
      <div className="grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <span className="text-xs uppercase tracking-[0.25em] text-paper/40">About</span>
        </div>
        <div className="md:col-span-8">
          <p className="font-serif italic text-2xl sm:text-4xl leading-tight max-w-2xl">
            I direct and produce cinematic films, commercials, and branded visual
            experiences by combining the craft of filmmaking with the power of
            AI.
          </p>
          <p className="mt-8 text-paper/55 leading-relaxed max-w-xl text-sm sm:text-base">
            From concept development and storyboarding to final delivery, I
            transform ideas into visually compelling stories that rival
            traditional productions. Faster, smarter, and cheaper without
            compromising creative quality. Recent work spans short launch
            films, animated series trailers, and commercials.
          </p>
        </div>
      </div>
    </section>
  )
}
