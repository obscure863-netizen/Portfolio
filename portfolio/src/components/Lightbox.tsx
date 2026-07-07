import { useEffect } from 'react'
import { X } from 'lucide-react'
import type { VideoEntry } from '../types'

export default function Lightbox({
  video,
  onClose,
}: {
  video: VideoEntry
  onClose: () => void
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-10 animate-fade-up"
      style={{ animationDuration: '250ms' }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close video"
        className="absolute top-5 right-5 sm:top-8 sm:right-8 glass rounded-full p-3 text-paper hover:bg-paper/10 transition-colors"
      >
        <X size={20} />
      </button>

      <div
        className="w-full max-w-4xl aspect-video border hairline rounded-lg overflow-hidden bg-ink"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-paper/50 max-w-lg text-center px-4">
        {video.title}
      </p>
    </div>
  )
}
