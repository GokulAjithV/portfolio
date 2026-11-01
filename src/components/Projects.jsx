import { useState } from 'react'
import { BulletList, Button, Section, Tag } from './ui'
import { projects } from '../content'

function Diagram({ src, alt }) {
  const [missing, setMissing] = useState(false)

  if (missing) {
    return (
      <div className="flex aspect-[3/1] items-center justify-center rounded-md border border-dashed border-line font-mono text-xs text-muted">
        Architecture diagram
      </div>
    )
  }

  // Scrolls sideways on phones, where shrinking to fit would make the labels unreadable.
  return (
    <div className="overflow-x-auto rounded-md border border-line">
      <img
        src={src}
        alt={alt}
        width={1000}
        height={560}
        loading="lazy"
        onError={() => setMissing(true)}
        className="w-full min-w-[640px]"
      />
    </div>
  )
}

function ProjectCard({ project }) {
  return (
    <article className="space-y-4 rounded-lg border border-line bg-card p-5 sm:p-6">
      <div>
        <h3 className="text-lg font-bold">
          {project.name}
          {project.tagline && <span className="font-medium text-muted"> — {project.tagline}</span>}
        </h3>
        <p className="mt-2 leading-relaxed">{project.summary}</p>
      </div>

      <ul className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </ul>

      {project.diagram && <Diagram src={project.diagram} alt={project.diagramAlt} />}
      {project.bullets && <BulletList items={project.bullets} />}

      {project.improvements && (
        <details className="text-sm">
          <summary className="cursor-pointer font-semibold text-accent">What I'd improve next</summary>
          <div className="mt-3">
            <BulletList items={project.improvements} />
          </div>
        </details>
      )}

      <div className="flex flex-wrap gap-3">
        {project.links.map((link) => (
          <Button key={link.href} href={link.href}>
            {link.label}
          </Button>
        ))}
      </div>
    </article>
  )
}

export default function Projects() {
  return (
    <Section id="projects" title="Projects">
      <div className="space-y-6">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </Section>
  )
}
