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
      const mapped: VideoEntry[] = rows
        .map((row) => {
          const youtubeId = extractYouTubeId(row.youtube_url)
          if (!youtubeId) return null
          return {
            id: String(row.id),
            youtubeId,
            title: row.title,
            thumbnailUrl: row.thumbnail_url ?? undefined,
            addedAt: new Date(row.created_at).getTime(),
          } satisfies VideoEntry
        })
        .filter((v): v is VideoEntry => v !== null)

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
