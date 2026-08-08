import { useState } from 'react'
import SectionHeading from '../../../../components/Common/SectionHeading'
import FadeIn from '../../../../components/Animations/FadeIn'
import PrimaryButton from '../../../../components/Buttons/PrimaryButton'
import CostBreakdown from '../CostBreakdown'
import SimilarDesigns from '../SimilarDesigns'
import CustomerInfoForm from '../CustomerInfo'
import SuccessScreen from '../SuccessScreen'
import { useDesignContext } from '../../../../context/DesignContext'
import type { CustomerInfo } from '../../../../types'
import { isNonEmpty, isValidEmail, isValidIndianPhone } from '../../../../utils/validators'
import { generateId } from '../../../../utils/helpers'
import { submitDesign } from '../../../../services/api/designs'
import { generateQuotationPDF } from '../../../../services/quotation/generateQuotationPDF'

const emptyCustomer: CustomerInfo = { name: '', email: '', phone: '', city: '', notes: '' }

export default function ReviewSubmit() {
  const { selection, estimate, resetSelection } = useDesignContext()
  const [customer, setCustomer] = useState<CustomerInfo>(emptyCustomer)
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerInfo, string>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [quoteId, setQuoteId] = useState<string | null>(null)

  const validate = (): boolean => {
    const next: Partial<Record<keyof CustomerInfo, string>> = {}
    if (!isNonEmpty(customer.name)) next.name = 'Please enter your name.'
    if (!isValidEmail(customer.email)) next.email = 'Enter a valid email address.'
    if (!isValidIndianPhone(customer.phone)) next.phone = 'Enter a valid 10-digit phone number.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

const handleSubmit = async () => {
  if (!validate()) return;

  try {
    setSubmitting(true);

    const id = generateId();

    const design = {
      ...selection,
      id,
      customer,
      createdAt: new Date().toISOString(),
      estimate,
    };

    const result = await submitDesign(design);

    console.log("SUCCESS:", result);

    setQuoteId(id);
  } catch (err) {
    console.error("Submit Error:", err);
    alert("Submit Failed. Check Console (F12).");
  } finally {
    setSubmitting(false);
  }
};

  const handleDownloadPDF = () => {
    if (!quoteId) return
    const doc = generateQuotationPDF(quoteId, selection, estimate, customer)
    doc.save(`${quoteId}-quotation.pdf`)
  }

  if (quoteId) {
    return (
      <SuccessScreen
        quoteId={quoteId}
        total={estimate.total}
        onDownloadPDF={handleDownloadPDF}
        onStartOver={() => {
          resetSelection()
          setCustomer(emptyCustomer)
          setQuoteId(null)
        }}
      />
    )
  }

  return (
    <FadeIn>
      <SectionHeading eyebrow="Step 09" title="Review & submit" description="Check everything looks right before you send it in." />
      <div className="mt-8 space-y-10">
        <CostBreakdown />
        <SimilarDesigns />
        <CustomerInfoForm value={customer} onChange={(patch) => setCustomer((prev) => ({ ...prev, ...patch }))} errors={errors} />
        <PrimaryButton onClick={handleSubmit} disabled={submitting}>
          {submitting ? 'Submitting…' : 'Submit design request'}
        </PrimaryButton>
      </div>
    </FadeIn>
  )
}
