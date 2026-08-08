export default function Loader({ label = 'Loading' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10">
      <div className="relative h-10 w-10">
        <div className="absolute inset-0 rounded-full border-2 border-gold/20" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-gold animate-spin" />
      </div>
      <p className="font-mono text-xs uppercase tracking-widest text-ivory-dim/60">{label}</p>
    </div>
  )
}
