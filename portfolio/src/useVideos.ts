import { useEffect, useState } from 'react'
import type { VideoEntry } from './types'

const STORAGE_KEY = 'obscure-portfolio-videos'

export function useVideos() {
  const [videos, setVideos] = useState<VideoEntry[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) setVideos(JSON.parse(raw))
    } catch {
      // ignore corrupt storage
    }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(videos))
    } catch {
      // storage unavailable (private browsing, quota) — fail silently
    }
  }, [videos, loaded])

  const addVideo = (entry: Omit<VideoEntry, 'id' | 'addedAt'>) => {
    const newEntry: VideoEntry = {
      ...entry,
      id: crypto.randomUUID(),
      addedAt: Date.now(),
    }
    setVideos((prev) => [newEntry, ...prev])
  }

  const removeVideo = (id: string) => {
    setVideos((prev) => prev.filter((v) => v.id !== id))
  }

  return { videos, addVideo, removeVideo, loaded }
}
