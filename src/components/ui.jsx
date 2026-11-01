export function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-14 border-t border-line py-12 sm:py-16">
      <h2 className="mb-6 text-2xl font-bold tracking-tight">{title}</h2>
      {children}
    </section>
  )
}

const buttonStyles = {
  primary: 'bg-ink text-paper hover:opacity-85',
  secondary: 'border border-line text-ink hover:border-ink',
}

export function Button({ href, variant = 'secondary', children }) {
  // In-page links stay in this tab; everything else opens a new one.
  const external = href.startsWith('#') ? {} : { target: '_blank', rel: 'noopener noreferrer' }

  return (
    <a
      href={href}
      className={`inline-block rounded-md px-4 py-2 text-sm font-semibold transition-colors ${buttonStyles[variant]}`}
      {...external}
    >
      {children}
    </a>
  )
}

export function Tag({ children }) {
  return (
    <li className="rounded border border-line px-2 py-1 font-mono text-xs text-muted">{children}</li>
  )
}

export function BulletList({ items }) {
  return (
    <ul className="list-disc space-y-2 pl-5 leading-relaxed marker:text-accent">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}
