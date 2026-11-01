import { useEffect, useState } from 'react'

function storedTheme() {
  try {
    return localStorage.getItem('theme')
  } catch {
    return null
  }
}

export default function ThemeToggle() {
  // index.html has already applied the right class before first paint.
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  // Keep following the system setting until the visitor makes their own choice.
  useEffect(() => {
    const media = matchMedia('(prefers-color-scheme: dark)')
    const onChange = (event) => {
      if (!storedTheme()) setDark(event.matches)
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  function toggle() {
    const next = !dark
    setDark(next)
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light')
    } catch {
      // Private windows can block storage; the toggle still works for this visit.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="shrink-0 rounded-md border border-line p-1.5 text-muted transition-colors hover:border-ink hover:text-ink"
    >
      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        {dark ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path strokeLinecap="round" d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </>
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
        )}
      </svg>
    </button>
  )
}
