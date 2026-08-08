interface Props {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export default function SectionHeading({ eyebrow, title, description, align = 'left' }: Props) {
  return (
    <div className={align === 'center' ? 'text-center' : 'text-left'}>
      {eyebrow && (
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold mb-3">{eyebrow}</p>
      )}
      <h2 className="font-display text-4xl md:text-5xl text-ivory leading-tight">{title}</h2>
      {description && (
        <p className={`mt-4 text-ivory-dim/70 max-w-2xl ${align === 'center' ? 'mx-auto' : ''}`}>
          {description}
        </p>
      )}
    </div>
  )
}
