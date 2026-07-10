interface Props {
  text: string
  className?: string
  durationSeconds?: number
}

/**
 * A thin, continuously scrolling line of repeated text. Purely decorative —
 * hidden from screen readers and never intercepts clicks.
 */
export default function MarqueeStrip({ text, className = '', durationSeconds = 32 }: Props) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none overflow-hidden whitespace-nowrap ${className}`}
      style={{
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
        maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
      }}
    >
      <div className="inline-flex" style={{ animation: `marquee ${durationSeconds}s linear infinite` }}>
        <MarqueeContent text={text} />
        <MarqueeContent text={text} />
      </div>
    </div>
  )
}

function MarqueeContent({ text }: { text: string }) {
  return (
    <span className="flex shrink-0 items-center text-[10px] sm:text-xs uppercase tracking-[0.3em] text-paper/25">
      {Array.from({ length: 10 }).map((_, i) => (
        <span key={i} className="flex items-center gap-3 pr-3">
          {text}
          <span className="text-paper/15">/</span>
        </span>
      ))}
    </span>
  )
}
