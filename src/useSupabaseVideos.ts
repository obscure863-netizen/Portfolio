import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import type { VideoRow } from './lib/supabase'
import { extractYouTubeId } from './lib/youtube'
import type { VideoEntry } from './types'

interface UseVideosResult {
  videos: VideoEntry[]
  loading: boolean
  error: string | null
}

export function useSupabaseVideos(): UseVideosResult {
  const [videos, setVideos] = useState<VideoEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      const { data, error: fetchError } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false })

      if (cancelled) return

      if (fetchError) {
        setError(fetchError.message)
        setLoading(false)
        return
      }

      const rows = (data ?? []) as VideoRow[]
      const mapped: VideoEntry[] = []
      for (const row of rows) {
        const youtubeId = extractYouTubeId(row.youtube_url)
        if (!youtubeId) continue
        const entry: VideoEntry = {
          id: String(row.id),
          youtubeId,
          title: row.title,
          addedAt: new Date(row.created_at).getTime(),
        }
        if (row.thumbnail_url) {
          entry.thumbnailUrl = row.thumbnail_url
        }
        mapped.push(entry)
      }

      setVideos(mapped)
      setLoading(false)
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  return { videos, loading, error }
}
