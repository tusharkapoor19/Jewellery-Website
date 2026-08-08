import { Sun, Moon } from 'lucide-react'
import { useThemeContext } from '../../context/ThemeContext1'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeContext()

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ivory-dim/70 transition-colors hover:border-gold hover:text-gold"
    >
      {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  )
}
