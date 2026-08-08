import { STEP_LABELS } from '../../hooks/useDesignFlow'

export default function StepIndicator({ step, onJump }: { step: number; onJump: (i: number) => void }) {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-2 [scrollbar-width:none]">
      {STEP_LABELS.map((label, i) => (
        <button
          key={label}
          onClick={() => i < step && onJump(i)}
          className={`group flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors ${
            i === step
              ? 'bg-gold text-ink'
              : i < step
              ? 'cursor-pointer text-gold hover:bg-gold/10'
              : 'cursor-default text-ivory-dim/30'
          }`}
        >
          <span>{String(i + 1).padStart(2, '0')}</span>
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  )
}
