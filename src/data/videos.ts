import { extractYouTubeId } from '../lib/youtube'
import type { VideoEntry } from '../types'

// Add, remove, or reorder entries here to update the reel.
// Paste any YouTube URL format (youtu.be, watch?v=, embed/, shorts/) — the
// video ID is extracted automatically.
const RAW_VIDEOS: { url: string; title: string; meta?: string }[] = [
  {
    url: 'https://youtu.be/6oyDHXSclYE',
    title: 'RIFTBORN Series',
    meta: 'Trailer',
  },
  {
    url: 'https://youtu.be/PHEjv48LKwM',
    title: 'That Will Never Work',
    meta: 'Trailer Proposal',
  },
  {
    url: 'https://youtu.be/vSBjQQLASp8',
    title: 'NASCO Cornflakes Commercial',
    meta: 'Proposal',
  },
  {
    url: 'https://youtu.be/k3I4AJ5F-Y4',
    title: 'Avantis Promotion Video',
  },
]

export const videos: VideoEntry[] = RAW_VIDEOS.map((entry, i) => {
  const youtubeId = extractYouTubeId(entry.url)
  if (!youtubeId) {
    throw new Error(`Could not parse a YouTube ID from: ${entry.url}`)
  }
  return {
    id: `video-${i}`,
    youtubeId,
    title: entry.title,
    meta: entry.meta,
    addedAt: 0,
  }
})
