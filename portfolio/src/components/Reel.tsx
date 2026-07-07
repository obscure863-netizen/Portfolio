import { useState } from 'react'
import { Play, Plus, Trash2 } from 'lucide-react'
import type { VideoEntry } from '../types'
import { fallbackThumbnailFor, thumbnailFor } from '../lib/youtube'

interface Props {
  videos: VideoEntry[]
  onPlay: (video: VideoEntry) => void
  onRemove: (id: string) => void
  onAddClick: () => void
}

export default function Reel({ videos, onPlay, onRemove, onAddClick }: Props) {
  return (
    <section id="work" className="relative px-6 sm:px-10 py-28 sm:py-36">
      <div className="flex items-end justify-between mb-14 border-b hairline pb-6">
        <h2 className="font-serif italic text-3xl sm:text-4xl">The Reel</h2>
        <span className="text-xs sm:text-sm text-paper/40 tracking-wide">
          {videos.length.toString().padStart(2, '0')} {videos.length === 1 ? 'cut' : 'cuts'}
        </span>
      </div>

      {videos.length === 0 ? (
        <EmptyReel onAddClick={onAddClick} />
      ) : (
        <div className="flex flex-col">
          {videos.map((video, i) => (
            <ReelRow
              key={video.id}
              index={i + 1}
              video={video}
              onPlay={() => onPlay(video)}
              onRemove={() => onRemove(video.id)}
            />
          ))}
        </div>
      )}
    </section>
  )
}

function EmptyReel({ onAddClick }: { onAddClick: () => void }) {
  return (
    <div className="border hairline rounded-2xl py-24 flex flex-col items-center justify-center text-center px-6">
      <p className="font-serif italic text-2xl text-paper/70 mb-3">The reel is empty.</p>
      <p className="text-sm text-paper/45 max-w-sm mb-8">
        Paste a YouTube link to add the first cut. It'll show up here for anyone
        who visits this page.
      </p>
      <button
        onClick={onAddClick}
        className="inline-flex items-center gap-2 bg-paper text-ink text-sm font-medium rounded-full px-5 py-2.5 hover:bg-white transition-colors"
      >
        <Plus size={16} />
        Add a video
      </button>
    </div>
  )
}

function ReelRow({
  index,
  video,
  onPlay,
  onRemove,
}: {
  index: number
  video: VideoEntry
  onPlay: () => void
  onRemove: () => void
}) {
  const [hover, setHover] = useState(false)
  const [imgError, setImgError] = useState(false)

  return (
    <div
      className="group relative flex items-center gap-6 sm:gap-10 py-6 border-b hairline cursor-pointer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onPlay}
    >
      <span className="font-serif italic text-xl sm:text-2xl text-paper/35 w-8 shrink-0">
        {index.toString().padStart(2, '0')}
      </span>

      <div className="relative w-28 h-16 sm:w-40 sm:h-24 shrink-0 overflow-hidden rounded-md bg-ink border hairline">
        <img
          src={imgError ? fallbackThumbnailFor(video.youtubeId) : thumbnailFor(video.youtubeId)}
          alt={video.title}
          onError={() => setImgError(true)}
          className={`w-full h-full object-cover grayscale transition-transform duration-500 ${
            hover ? 'scale-110' : 'scale-100'
          }`}
        />
        <div
          className={`absolute inset-0 flex items-center justify-center bg-ink/30 transition-opacity ${
            hover ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Play size={18} fill="#0A0A0A" className="text-paper" />
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="text-lg sm:text-2xl font-medium truncate group-hover:text-paper transition-colors">
          {video.title}
        </h3>
        {video.meta && (
          <p className="text-xs sm:text-sm text-paper/40 mt-1 truncate">{video.meta}</p>
        )}
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation()
          onRemove()
        }}
        aria-label={`Remove ${video.title}`}
        className="shrink-0 p-2 rounded-full text-paper/30 hover:text-paper hover:bg-paper/10 transition-colors opacity-0 group-hover:opacity-100"
      >
        <Trash2 size={16} />
      </button>
    </div>
  )
}
