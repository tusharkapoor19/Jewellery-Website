import { Link, useLocation } from 'react-router-dom'
import Container from './Container'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const location = useLocation()
  const isDesign = location.pathname.startsWith('/design')

  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-line bg-ink/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <Link to="/" className="font-display text-2xl tracking-wide text-ivory">
          HIRANYA<span className="text-gold">.</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            to="/design"
            className={`font-mono text-xs uppercase tracking-widest transition-colors ${
              isDesign ? 'text-gold' : 'text-ivory-dim/60 hover:text-ivory'
            }`}
          >
            Design Studio
          </Link>
          <ThemeToggle />
        </nav>
      </Container>
    </header>
  )
}
