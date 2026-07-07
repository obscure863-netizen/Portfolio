import { useState } from 'react'
import { Plus } from 'lucide-react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Reel from './components/Reel'
import About from './components/About'
import Footer from './components/Footer'
import Lightbox from './components/Lightbox'
import AddVideoPanel from './components/AddVideoPanel'
import { useVideos } from './useVideos'
import type { VideoEntry } from './types'

export default function App() {
  const { videos, addVideo, removeVideo } = useVideos()
  const [playing, setPlaying] = useState<VideoEntry | null>(null)
  const [panelOpen, setPanelOpen] = useState(false)

  return (
    <div className="relative bg-ink text-paper min-h-screen selection:bg-paper selection:text-ink">
      <div className="grain" />
      <Nav />
      <main>
        <Hero />
        <Reel
          videos={videos}
          onPlay={setPlaying}
          onRemove={removeVideo}
          onAddClick={() => setPanelOpen(true)}
        />
        <About />
      </main>
      <Footer />

      {videos.length > 0 && (
        <button
          onClick={() => setPanelOpen(true)}
          aria-label="Add a video"
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-30 glass rounded-full p-4 hover:bg-paper/10 transition-colors"
        >
          <Plus size={20} />
        </button>
      )}

      {playing && <Lightbox video={playing} onClose={() => setPlaying(null)} />}
      {panelOpen && (
        <AddVideoPanel onClose={() => setPanelOpen(false)} onAdd={addVideo} />
      )}
    </div>
  )
}
