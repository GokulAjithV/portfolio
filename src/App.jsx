import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Education from './components/Education'
import Contact from './components/Contact'
import { footer } from './content'

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-20 focus:bg-card focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main" className="mx-auto max-w-page px-4 sm:px-6">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <footer className="mx-auto max-w-page px-4 pt-6 pb-10 font-mono text-xs text-muted sm:px-6">{footer}</footer>
    </>
  )
}
