import ThemeToggle from './ThemeToggle'
import { hero, navItems } from '../content'

export default function Nav() {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-paper/90 backdrop-blur">
      <nav
        aria-label="Main"
        className="mx-auto flex h-14 max-w-page items-center justify-between gap-2 px-3 min-[360px]:gap-3 min-[360px]:px-4 sm:px-6"
      >
        <a href="#top" className="hidden font-mono text-sm font-medium sm:block">
          {hero.name}
        </a>
        <ul className="flex min-w-0 gap-2 overflow-x-auto text-xs font-medium text-muted min-[360px]:gap-3 min-[360px]:text-[13px] sm:gap-5 sm:text-sm">
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="transition-colors hover:text-ink">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <ThemeToggle />
      </nav>
    </header>
  )
}
