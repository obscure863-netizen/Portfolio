import { useState } from 'react'
import type { FormEvent, ReactNode, CSSProperties } from 'react'
import { supabase } from '../lib/supabase'
import { extractYouTubeId, thumbnailFor } from '../lib/youtube'

const UPLOAD_PASSWORD = import.meta.env.VITE_UPLOAD_PASSWORD as string | undefined

type Status = { type: 'idle' } | { type: 'success' } | { type: 'error'; message: string }

export default function AddVideo() {
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [title, setTitle] = useState('')
  const [thumbnailUrl, setThumbnailUrl] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<Status>({ type: 'idle' })

  const isValidYouTubeUrl = (url: string) => extractYouTubeId(url) !== null

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus({ type: 'idle' })

    const trimmedUrl = youtubeUrl.trim()
    const trimmedTitle = title.trim()
    const trimmedThumb = thumbnailUrl.trim()
    const trimmedPassword = password.trim()

    if (!UPLOAD_PASSWORD) {
      setStatus({
        type: 'error',
        message: 'Upload password is not configured on this deployment (VITE_UPLOAD_PASSWORD missing).',
      })
      return
    }

    if (trimmedPassword !== UPLOAD_PASSWORD) {
      setStatus({ type: 'error', message: 'Incorrect password.' })
      return
    }

    if (!trimmedTitle) {
      setStatus({ type: 'error', message: 'Title is required.' })
      return
    }

    if (!isValidYouTubeUrl(trimmedUrl)) {
      setStatus({ type: 'error', message: "That doesn't look like a valid YouTube link." })
      return
    }

    const youtubeId = extractYouTubeId(trimmedUrl)!
    const finalThumbnail = trimmedThumb || thumbnailFor(youtubeId)

    setSubmitting(true)
    const { error } = await supabase.from('videos').insert({
      title: trimmedTitle,
      youtube_url: trimmedUrl,
      thumbnail_url: finalThumbnail,
    })
    setSubmitting(false)

    if (error) {
      setStatus({ type: 'error', message: error.message })
      return
    }

    setStatus({ type: 'success' })
    setYoutubeUrl('')
    setTitle('')
    setThumbnailUrl('')
    setPassword('')
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0A0A0A',
        color: '#F5F5F5',
        fontFamily: 'system-ui, sans-serif',
        display: 'flex',
        justifyContent: 'center',
        padding: '2rem 1.25rem',
      }}
    >
      <div style={{ width: '100%', maxWidth: 420 }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.25rem' }}>
          Add a video
        </h1>
        <p style={{ fontSize: '0.85rem', color: 'rgba(245,245,245,0.5)', marginBottom: '2rem' }}>
          Owner-only. Not indexed, not linked from the main site.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          <Field label="YouTube URL">
            <input
              type="text"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
              style={inputStyle}
              autoCapitalize="off"
              autoCorrect="off"
            />
          </Field>

          <Field label="Title">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="PAJ — Launch Film"
              style={inputStyle}
            />
          </Field>

          <Field label="Thumbnail URL (optional)">
            <input
              type="text"
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              placeholder="Leave blank to auto-generate from YouTube"
              style={inputStyle}
              autoCapitalize="off"
              autoCorrect="off"
            />
          </Field>

          <Field label="Password">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={inputStyle}
            />
          </Field>

          <button
            type="submit"
            disabled={submitting}
            style={{
              marginTop: '0.5rem',
              background: submitting ? 'rgba(245,245,245,0.4)' : '#F5F5F5',
              color: '#0A0A0A',
              fontWeight: 600,
              fontSize: '0.95rem',
              border: 'none',
              borderRadius: '0.6rem',
              padding: '0.85rem',
              cursor: submitting ? 'default' : 'pointer',
            }}
          >
            {submitting ? 'Adding…' : 'Add video'}
          </button>

          {status.type === 'success' && (
            <p style={{ color: '#8AE38A', fontSize: '0.9rem' }}>
              Added. Check the main site — it should appear at the top of the reel.
            </p>
          )}
          {status.type === 'error' && (
            <p style={{ color: '#F08A8A', fontSize: '0.9rem' }}>{status.message}</p>
          )}
        </form>

        <p style={{ fontSize: '0.75rem', color: 'rgba(245,245,245,0.35)', marginTop: '2rem', lineHeight: 1.5 }}>
          Note: this password check happens in your browser, not on a server. It
          keeps casual visitors out but isn't real security — don't share this
          link publicly.
        </p>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      <span style={{ fontSize: '0.75rem', color: 'rgba(245,245,245,0.5)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {label}
      </span>
      {children}
    </label>
  )
}

const inputStyle: CSSProperties = {
  background: 'rgba(245,245,245,0.06)',
  border: '1px solid rgba(245,245,245,0.15)',
  borderRadius: '0.5rem',
  padding: '0.75rem 0.9rem',
  fontSize: '1rem',
  color: '#F5F5F5',
  outline: 'none',
}
