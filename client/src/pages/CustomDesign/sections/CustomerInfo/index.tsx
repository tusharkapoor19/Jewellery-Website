import SectionHeading from '../../../../components/Common/SectionHeading'
import type { CustomerInfo as CustomerInfoType } from '../../../../types'

interface Props {
  value: CustomerInfoType
  onChange: (patch: Partial<CustomerInfoType>) => void
  errors: Partial<Record<keyof CustomerInfoType, string>>
}

export default function CustomerInfo({ value, onChange, errors }: Props) {
  const fieldClass =
    'w-full rounded-xl border border-line bg-ink px-4 py-3 text-sm text-ivory placeholder:text-ivory-dim/30 focus:border-gold outline-none transition-colors'

  return (
    <div>
      <SectionHeading eyebrow="Almost there" title="Your details" description="We'll send your quotation here." />
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 max-w-2xl">
        <div>
          <input
            className={fieldClass}
            placeholder="Full name"
            value={value.name}
            onChange={(e) => onChange({ name: e.target.value })}
          />
          {errors.name && <p className="mt-1 text-xs text-rose">{errors.name}</p>}
        </div>
        <div>
          <input
            className={fieldClass}
            placeholder="Phone number"
            value={value.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
          />
          {errors.phone && <p className="mt-1 text-xs text-rose">{errors.phone}</p>}
        </div>
        <div>
          <input
            className={fieldClass}
            placeholder="Email address"
            value={value.email}
            onChange={(e) => onChange({ email: e.target.value })}
          />
          {errors.email && <p className="mt-1 text-xs text-rose">{errors.email}</p>}
        </div>
        <div>
          <input
            className={fieldClass}
            placeholder="City"
            value={value.city}
            onChange={(e) => onChange({ city: e.target.value })}
          />
        </div>
        <div className="sm:col-span-2">
          <textarea
            className={fieldClass}
            placeholder="Anything else we should know? (optional)"
            rows={3}
            value={value.notes}
            onChange={(e) => onChange({ notes: e.target.value })}
          />
        </div>
      </div>
    </div>
  )
}
