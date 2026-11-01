import { Button } from './ui'
import { hero, links } from '../content'

export default function Hero() {
  return (
    <section id="top" className="scroll-mt-14 py-14 sm:py-20">
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{hero.name}</h1>
      <p className="mt-4 text-xl leading-snug font-semibold text-balance sm:text-2xl">{hero.headline}</p>
      <p className="mt-4 leading-relaxed text-muted">{hero.subline}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="#projects" variant="primary">
          View projects
        </Button>
        <Button href={links.resume}>Resume</Button>
        <Button href={links.github}>GitHub</Button>
        <Button href={links.linkedin}>LinkedIn</Button>
      </div>
    </section>
  )
}
