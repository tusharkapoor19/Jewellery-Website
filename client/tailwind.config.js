/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'var(--color-ink)',
        'ink-soft': 'var(--color-ink-soft)',
        ivory: 'var(--color-ivory)',
        'ivory-dim': 'var(--color-ivory-dim)',
        gold: 'var(--color-gold)',
        'gold-bright': 'var(--color-gold-bright)',
        'gold-deep': 'var(--color-gold-deep)',
        emerald: 'var(--color-emerald)',
        'emerald-bright': 'var(--color-emerald-bright)',
        rose: 'var(--color-rose)',
        line: 'var(--color-line)',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
        mono: ['var(--font-mono)'],
      },
    },
  },
  plugins: [],
}
