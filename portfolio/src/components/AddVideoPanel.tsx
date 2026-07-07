import { useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { X } from 'lucide-react'
import { extractYouTubeId } from '../lib/youtube'

export default function AddVideoPanel({
  onClose,
  onAdd,
}: {
  onClose: () => void
  onAdd: (entry: { youtubeId: string; title: string; meta?: string }) => void
}) {
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [meta, setMeta] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const id = extractYouTubeId(url.trim())
    if (!id) {
      setError("That doesn't look like a valid YouTube link.")
      return
    }
    if (!title.trim()) {
      setError('Give the cut a title.')
      return
    }
    onAdd({ youtubeId: id, title: title.trim(), meta: meta.trim() || undefined })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full sm:w-[440px] h-full bg-ink border-l hairline p-8 sm:p-10 flex flex-col animate-fade-up" style={{ animationDuration: '350ms' }}>
        <div className="flex items-center justify-between mb-10">
          <h3 className="font-serif italic text-2xl">Add a cut</h3>
          <button
            onClick={onClose}
            aria-label="Close panel"
            className="p-2 rounded-full text-paper/50 hover:text-paper hover:bg-paper/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <Field label="YouTube link">
            <input
              autoFocus
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
              className="input"
            />
          </Field>

          <Field label="Title">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="PAJ — Launch Film"
              className="input"
            />
          </Field>

          <Field label="Client / year — optional">
            <input
              value={meta}
              onChange={(e) => setMeta(e.target.value)}
              placeholder="PAJ, 2026"
              className="input"
            />
          </Field>

          {error && <p className="text-sm text-paper/70 -mt-2">{error}</p>}

          <button
            type="submit"
            className="mt-4 bg-paper text-ink text-sm font-medium rounded-full px-5 py-3 hover:bg-white transition-colors"
          >
            Add to reel
          </button>

          <p className="text-xs text-paper/35 leading-relaxed">
            This saves in your browser only. To show the same reel to every
            visitor, edit the starter list in <code className="text-paper/50">src/App.tsx</code> and redeploy.
          </p>
        </form>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs uppercase tracking-[0.15em] text-paper/40">{label}</span>
      {children}
    </label>
  )
}
