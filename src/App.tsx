import { useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Reel from './components/Reel'
import About from './components/About'
import Footer from './components/Footer'
import Lightbox from './components/Lightbox'
import { videos } from './data/videos'
import type { VideoEntry } from './types'

export default function App() {
  const [playing, setPlaying] = useState<VideoEntry | null>(null)

  return (
    <div className="relative bg-ink text-paper min-h-screen selection:bg-paper selection:text-ink">
      <div className="grain" />
      <Nav />
      <main>
        <Hero />
        <Reel videos={videos} onPlay={setPlaying} />
        <About />
      </main>
      <Footer />

      {playing && <Lightbox video={playing} onClose={() => setPlaying(null)} />}
    </div>
  )
}
