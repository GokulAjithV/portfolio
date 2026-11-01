import { BulletList, Section } from './ui'
import { experience } from '../content'

export default function Experience() {
  return (
    <Section id="experience" title="Experience">
      <div className="space-y-10">
        {experience.map((job) => (
          <article key={job.role}>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
              <h3 className="text-lg font-bold">{job.role}</h3>
              <p className="font-mono text-xs whitespace-nowrap text-muted">{job.dates}</p>
            </div>
            <p className="mt-1 mb-4 text-sm text-muted">
              {job.company} · {job.location}
            </p>
            <BulletList items={job.bullets} />
          </article>
        ))}
      </div>
    </Section>
  )
}
