import { Section } from './ui'
import { education } from '../content'

export default function Education() {
  return (
    <Section id="education" title="Education">
      <div className="space-y-5">
        {education.map((entry) => (
          <div key={entry.degree}>
            <h3 className="font-bold">{entry.degree}</h3>
            <p className="mt-1 text-sm text-muted">{entry.school}</p>
            <p className="mt-1 font-mono text-xs text-muted">{entry.details}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
