import Container from './Container'

export default function Footer() {
  return (
    <footer className="border-t border-line py-12">
      <Container className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-display text-xl text-ivory">HIRANYA<span className="text-gold">.</span></p>
          <p className="mt-1 text-xs text-ivory-dim/40">Bespoke fine jewellery, designed and priced online.</p>
        </div>
        <p className="text-xs text-ivory-dim/30">© {new Date().getFullYear()} Hiranya Atelier. Design demo project.</p>
      </Container>
    </footer>
  )
}
