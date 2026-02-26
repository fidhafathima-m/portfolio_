import { useState, useEffect } from 'react'
import Preloader from './components/layout/Preloader'
import Navigation from './components/layout/Navigation'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Education from './components/sections/Education'
import Contact from './components/sections/Contact'
import Footer from './components/layout/Footer'
import QuillCursor from './components/ui/QuillCursor'
import Marginalia from './components/layout/Marginalia'
import SVGFilters from './components/ui/SVGFilters'
import Game from './components/sections/Game'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Artificial delay to show the ink drip
    const timer = setTimeout(() => setLoading(false), 4000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <SVGFilters />
      <QuillCursor />
      <Marginalia />

      {loading ? (
        <Preloader />
      ) : (
        <div className="portfolio-container">
          <Navigation />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Education />
            <Game/>
            <Contact />
          </main>
          <Footer />
        </div>
      )}
    </>
  )
}

export default App
