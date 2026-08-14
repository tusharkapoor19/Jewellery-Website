import { useEffect, useState, type FormEvent } from 'react'
import './MyCustomOrders.css'
import Topbar from '../../components/TopBar/TopBar'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import Container from '../../components/Common/Container'
import FadeIn from '../../components/Animations/FadeIn'
import PrimaryButton from '../../components/Buttons/PrimaryButton'
import GhostButton from '../../components/Buttons/GhostButton'
import { formatINR } from '../../data/prices'
import { isValidEmail } from '../../utils/validators'
import { getDesignsByEmail, getDesignsByUserId, getMessages, sendCustomerMessage } from '../../services/api/designs'
import { useAuth } from '../../context/AuthContext'
import type { ChatMessage, CustomDesignRecord } from '../../types'

const EMAIL_STORAGE_KEY = 'hiranya_custom_orders_email'

const STATUS_STYLES: Record<string, string> = {
  Pending: 'text-ivory-dim/70 border-line',
  'Design Review': 'text-gold border-gold/40',
  Approved: 'text-emerald-bright border-emerald/60',
  'In Production': 'text-emerald-bright border-emerald/60',
  Ready: 'text-gold-bright border-gold/40',
  Completed: 'text-emerald-bright border-emerald/60',
  Cancelled: 'text-rose border-rose/40',
}

function StatusPill({ status }: { status?: string }) {
  const label = status || 'Pending'
  return <span className={`mco-status-pill ${STATUS_STYLES[label] || 'text-ivory-dim/70 border-line'}`}>{label}</span>
}

function ChatThread({ designId }: { designId: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    getMessages(designId)
      .then((msgs) => {
        if (!cancelled) setMessages(msgs)
      })
      .catch(() => {
        if (!cancelled) setError('Could not load messages.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [designId])

  const handleSend = async (e: FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return
    setSending(true)
    try {
      const updated = await sendCustomerMessage(designId, text.trim())
      setMessages(updated)
      setText('')
    } catch {
      setError('Could not send your message. Please try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="mt-6 rounded-2xl border border-line bg-ink p-5">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold/70 mb-3">Chat with our design team</p>

      {loading ? (
        <p className="text-sm text-ivory-dim/50">Loading conversation…</p>
      ) : (
        <div className="mco-chat-scroll space-y-3 pr-1">
          {messages.length === 0 && (
            <p className="text-sm text-ivory-dim/50">No messages yet — say hello, or ask us anything about your request.</p>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.sender === 'admin' ? 'justify-start' : 'justify-end'}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                  m.sender === 'admin'
                    ? 'bg-ink-soft border border-line text-ivory'
                    : 'bg-gold/10 border border-gold/30 text-ivory'
                }`}
              >
                <p className="mb-1 font-mono text-[10px] uppercase tracking-wider text-gold/60">
                  {m.sender === 'admin' ? 'Hiranya Team' : 'You'}
                </p>
                <p className="whitespace-pre-wrap">{m.text}</p>
                {m.createdAt && (
                  <p className="mt-1 text-[10px] text-ivory-dim/40">{new Date(m.createdAt).toLocaleString('en-IN')}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {error && <p className="mt-2 text-xs text-rose">{error}</p>}

      <form onSubmit={handleSend} className="mt-4 flex items-center gap-2">
        <input
          className="w-full rounded-xl border border-line bg-ink-soft px-4 py-2.5 text-sm text-ivory placeholder:text-ivory-dim/30 focus:border-gold outline-none transition-colors"
          placeholder="Type a message…"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <PrimaryButton type="submit" disabled={sending || !text.trim()} className="whitespace-nowrap">
          {sending ? 'Sending…' : 'Send'}
        </PrimaryButton>
      </form>
    </div>
  )
}

function OrderCard({ design }: { design: CustomDesignRecord }) {
  const [open, setOpen] = useState(false)
  const gemstones = design.jewellery?.gemstone || []
  const total = design.estimation?.totalEstimatedCost ?? design.budget?.estimatedPrice

  return (
    <FadeIn>
      <div className="rounded-2xl border border-line bg-ink-soft p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold/60">
              {design.customOrderId ? `${design.customOrderId} · ` : ''}
              {design.createdAt ? new Date(design.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : ''}
            </p>
            <h3 className="mt-1 font-display text-2xl text-ivory">
              {design.jewellery?.type || 'Custom piece'} · {design.jewellery?.material || '—'}
            </h3>
            {gemstones.length > 0 && (
              <p className="mt-1 text-sm text-ivory-dim/60">
                {gemstones.map((g) => `${g.name} x${g.quantity}`).join(', ')}
              </p>
            )}
          </div>
          <StatusPill status={design.orderStatus} />
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-ivory-dim/70">
          {typeof total === 'number' && total > 0 && (
            <span>
              Estimated total: <span className="font-mono text-gold">{formatINR(total)}</span>
            </span>
          )}
          {design.jewellery?.purity && <span>Purity: {design.jewellery.purity}</span>}
        </div>

        {design.adminNotes && (
          <div className="mt-4 rounded-xl border border-gold/20 bg-gold/[0.05] p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold/70 mb-1">Note from our team</p>
            <p className="text-sm text-ivory-dim/80">{design.adminNotes}</p>
          </div>
        )}

        <div className="mt-5">
          <GhostButton onClick={() => setOpen((v) => !v)}>{open ? 'Hide chat' : 'View & chat about this request'}</GhostButton>
        </div>

        {open && <ChatThread designId={design._id} />}
      </div>
    </FadeIn>
  )
}

export default function MyCustomOrders() {
  // Logged-in customers are looked up by their account's userId (reliable,
  // tied to their account). Guests (not logged in) fall back to the email
  // form, matched against `customer.email` on the request.
  const { id: authUserId, isAuthenticated } = useAuth()

  const [email, setEmail] = useState(() => localStorage.getItem(EMAIL_STORAGE_KEY) || '')
  const [submittedEmail, setSubmittedEmail] = useState('')
  const [designs, setDesigns] = useState<CustomDesignRecord[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')


const lookupByEmail = async (lookupEmail: string) => {
    if (!isValidEmail(lookupEmail)) {
      setError('Enter a valid email address.')
      return
    }
    setError('')
    setLoading(true)
    setSubmittedEmail(lookupEmail)
    localStorage.setItem(EMAIL_STORAGE_KEY, lookupEmail)
    try {
      const results = await getDesignsByEmail(lookupEmail)
      setDesigns(results)
    } catch {
      setError('Something went wrong while fetching your orders. Please try again.')
      setDesigns(null)
    } finally {
      setLoading(false)
    }
  }

  const lookupByUserId = async (userId: string) => {
    setError('')
    setLoading(true)
    try {
      const results = await getDesignsByUserId(userId)
      setDesigns(results)
    } catch {
      setError('Something went wrong while fetching your orders. Please try again.')
      setDesigns(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated && authUserId) {
      // Logged in: fetch this account's orders straight away, no email
      // form needed.
      lookupByUserId(authUserId)
    } else if (email) {
      // Guest with a previously-used email saved in this browser.
      lookupByEmail(email)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, authUserId])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    lookupByEmail(email)
  }

  return (
    <>
      <Topbar />
      <Navbar />
      <div className="min-h-screen bg-ink pb-24 pt-28">
        <Container>
          <FadeIn className="mb-10">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold mb-3">Design Studio</p>
            <h1 className="font-display text-4xl md:text-6xl text-ivory leading-[1.05] max-w-3xl">
              Your custom orders
            </h1>
            <p className="mt-4 max-w-xl text-ivory-dim/60">
              {isAuthenticated
              ? 'Here are the custom design requests linked to your account, their status, our notes, and the chat with our design team.'
              : 'Enter the email you used when submitting a custom design request to see its status, our notes, and chat with our design team.'}
            </p>
          </FadeIn>

        {!isAuthenticated && (
          <>
            <form onSubmit={handleSubmit} className="flex max-w-lg flex-col gap-3 sm:flex-row">
              <input
                type="email"
                className="w-full rounded-xl border border-line bg-ink-soft px-4 py-3 text-sm text-ivory placeholder:text-ivory-dim/30 focus:border-gold outline-none transition-colors"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <PrimaryButton type="submit" disabled={loading} className="whitespace-nowrap">
                {loading ? 'Searching…' : 'Find my orders'}
              </PrimaryButton>
            </form>
            {error && <p className="mt-2 text-sm text-rose">{error}</p>}
          </>
        )}
        {isAuthenticated && error && <p className="mt-2 text-sm text-rose">{error}</p>}

          <div className="mt-10 space-y-6">
            {designs !== null && designs.length === 0 && !loading && (
              <div className="rounded-2xl border border-line bg-ink-soft p-8 text-center">
                <p className="text-ivory-dim/60">
                  {isAuthenticated
                  ? 'No custom design requests found for your account yet.'
                  : (
                    <>
                      No custom design requests found for <span className="text-ivory">{submittedEmail}</span>.
                    </>
                  )}
                </p>
              </div>
            )}

            {designs?.map((design) => (
              <OrderCard key={design._id} design={design} />
            ))}
          </div>
        </Container>
      </div>
      <Footer />
    </>
  )
}
