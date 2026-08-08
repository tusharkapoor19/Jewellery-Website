import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  icon?: ReactNode
}

export default function PrimaryButton({ children, icon, className = '', ...rest }: Props) {
  return (
    <button
      {...rest}
      className={`group inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 font-body text-sm font-semibold tracking-wide text-ink transition-all hover:bg-gold-bright hover:shadow-[0_0_30px_-6px_rgba(201,166,103,0.8)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-gold disabled:hover:shadow-none ${className}`}
    >
      {children}
      {icon}
    </button>
  )
}
