import { useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Reel from './components/Reel'
import About from './components/About'
import Footer from './components/Footer'
import Lightbox from './components/Lightbox'
import AddVideo from './pages/AddVideo'
import { useSupabaseVideos } from './useSupabaseVideos'
import type { VideoEntry } from './types'

export default function App() {
  // No router dependency needed for a single extra route — plain path check.
  if (window.location.pathname === '/add-video') {
    return <AddVideo />
  }
  return <Portfolio />
}

function Portfolio() {
  const [playing, setPlaying] = useState<VideoEntry | null>(null)
  const { videos, loading, error } = useSupabaseVideos()

  return (
    <div className="relative bg-ink text-paper min-h-screen selection:bg-paper selection:text-ink">
      <div className="grain" />
      <Nav />
      <main>
        <Hero />
        {error ? (
          <section className="px-6 sm:px-10 py-28 sm:py-36 text-center text-paper/50 text-sm">
            Couldn't load the reel right now. ({error})
          </section>
        ) : (
          <Reel videos={videos} loading={loading} onPlay={setPlaying} />
        )}
        <About />
      </main>
      <Footer />

      {playing && <Lightbox video={playing} onClose={() => setPlaying(null)} />}
    </div>
  )
}
