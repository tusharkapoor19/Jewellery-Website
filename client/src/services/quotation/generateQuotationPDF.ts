import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import type { DesignSelection, PriceEstimate, CustomerInfo } from '../../types'
import { formatINR } from '../../data/prices'
import { getJewelleryById } from '../../data/jewellery'
import { getMaterialById, getPurityById } from '../../data/materials'
import { describeGemstoneSelection } from '../../utils/gemstonePrice'
import { getStyleById } from '../../data/styles'

const GOLD: [number, number, number] = [162, 130, 74]
const INK: [number, number, number] = [17, 17, 20]

export function generateQuotationPDF(
  quoteId: string,
  selection: DesignSelection,
  estimate: PriceEstimate,
  customer: CustomerInfo
): jsPDF {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const pageWidth = doc.internal.pageSize.getWidth()

  // Header band
  doc.setFillColor(...INK)
  doc.rect(0, 0, pageWidth, 90, 'F')
  doc.setTextColor(...GOLD)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(22)
  doc.text('HIRANYA ATELIER', 40, 42)
  doc.setTextColor(230, 230, 230)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text('Bespoke Fine Jewellery — Design Quotation', 40, 62)

  doc.setTextColor(...GOLD)
  doc.setFontSize(10)
  doc.text(`Quote No: ${quoteId}`, pageWidth - 220, 42)
  doc.text(`Date: ${new Date().toLocaleDateString('en-IN')}`, pageWidth - 220, 58)

  // Customer block
  doc.setTextColor(...INK)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text('Prepared for', 40, 118)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text(`${customer.name || '—'}`, 40, 134)
  doc.text(`${customer.email || '—'}  |  ${customer.phone || '—'}`, 40, 148)
  doc.text(`${customer.city || '—'}`, 40, 162)

  const jewellery = selection.jewellery ? getJewelleryById(selection.jewellery) : undefined
  const material = selection.material ? getMaterialById(selection.material) : undefined
  const purity = selection.purity ? getPurityById(selection.purity) : undefined
  const gemstoneSummary = describeGemstoneSelection(selection.gemstones)
  const style = selection.style ? getStyleById(selection.style) : undefined

  autoTable(doc, {
    startY: 185,
    head: [['Specification', 'Selection']],
    body: [
      ['Jewellery type', jewellery?.name ?? '—'],
      ['Material', material?.name ?? '—'],
      ['Purity', purity?.label ?? '—'],
      ['Gemstones', gemstoneSummary || 'No stone'],
      ['Style', style?.name ?? '—'],
      ['Estimated metal weight', `${selection.weight || '—'} g`],
      ['Customer budget', formatINR(selection.budget)],
    ],
    theme: 'grid',
    headStyles: { fillColor: INK, textColor: GOLD, fontStyle: 'bold' },
    styles: { fontSize: 10, cellPadding: 6 },
    margin: { left: 40, right: 40 },
  })

  const afterSpecY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 24

  autoTable(doc, {
    startY: afterSpecY,
    head: [['Cost Component', 'Amount (INR)']],
    body: [
      ...estimate.breakdown.map((item) => [item.label, formatINR(item.value)]),
      ['Estimated Total', formatINR(estimate.total)],
    ],
    theme: 'striped',
    headStyles: { fillColor: INK, textColor: GOLD, fontStyle: 'bold' },
    styles: { fontSize: 10, cellPadding: 6 },
    columnStyles: { 1: { halign: 'right' } },
    margin: { left: 40, right: 40 },
    didParseCell: (data) => {
      if (data.row.index === estimate.breakdown.length && data.section === 'body') {
        data.cell.styles.fontStyle = 'bold'
        data.cell.styles.fillColor = [245, 237, 220]
      }
    },
  })

  const finalY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 24
  doc.setFontSize(10)
  doc.setTextColor(90, 90, 90)
  doc.text(
    `Indicative price range: ${formatINR(estimate.low)} – ${formatINR(estimate.high)}. Final quote is`,
    40,
    finalY
  )
  doc.text(
    'confirmed after in-studio consultation, live bullion rates and stone certification.',
    40,
    finalY + 14
  )

  doc.setDrawColor(...GOLD)
  doc.setLineWidth(0.5)
  doc.line(40, finalY + 36, pageWidth - 40, finalY + 36)
  doc.setFontSize(9)
  doc.setTextColor(140, 140, 140)
  doc.text('Hiranya Atelier · This is a system-generated estimate, not a final invoice.', 40, finalY + 52)

  return doc
}
