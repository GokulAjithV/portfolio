import { Section } from './ui'
import { about } from '../content'

export default function About() {
  return (
    <Section id="about" title="About">
      <div className="space-y-4 leading-relaxed">
        {about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </Section>
  )
}
