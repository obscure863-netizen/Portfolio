interface Props {
  text: string
  className?: string
}

/**
 * Renders text twice, stacked: a crisp copy masked to fade out partway
 * across, and a horizontally-blurred copy masked to fade in where the
 * crisp copy fades out. The result reads as solid type dissolving into a
 * horizontal motion-blur streak — the "Vetted"-style effect.
 */
export default function BlurFadeText({ text, className = '' }: Props) {
  return (
    <span className={`relative inline-block ${className}`}>
      {/* Hidden SVG filter definition — direction-only (x-axis) gaussian blur */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <filter id="horizontal-blur">
          <feGaussianBlur in="SourceGraphic" stdDeviation="14 0" />
        </filter>
      </svg>

      {/* Crisp layer, fading out left-to-right */}
      <span
        aria-hidden="true"
        style={{
          WebkitMaskImage: 'linear-gradient(to right, black 0%, black 45%, transparent 78%)',
          maskImage: 'linear-gradient(to right, black 0%, black 45%, transparent 78%)',
        }}
      >
        {text}
      </span>

      {/* Blurred streak layer, fading in where the crisp layer fades out */}
      <span
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          filter: 'url(#horizontal-blur)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 40%, black 62%, black 88%, transparent 100%)',
          maskImage: 'linear-gradient(to right, transparent 40%, black 62%, black 88%, transparent 100%)',
        }}
      >
        {text}
      </span>

      {/* Real text for accessibility / selection, visually hidden */}
      <span className="sr-only">{text}</span>
    </span>
  )
}
