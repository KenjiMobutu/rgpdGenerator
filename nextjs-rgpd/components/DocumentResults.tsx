'use client'

import { DocumentType } from '@/types'
import { jsPDF } from 'jspdf'

interface DocumentResultsProps {
  documents: Array<{
    title: string
    content: string
    type: DocumentType
  }>
  onRestart: () => void
}

export default function DocumentResults({ documents, onRestart }: DocumentResultsProps) {
  const copyDocument = (content: string) => {
    // Remove HTML tags for clipboard
    const text = content.replace(/<[^>]*>/g, '\n').replace(/\n\n+/g, '\n\n').trim()

    navigator.clipboard.writeText(text).then(() => {
      alert('Document copié dans le presse-papier !')
    })
  }

  const downloadDocument = (title: string, content: string) => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    })

    // Remove HTML tags
    const text = content.replace(/<[^>]*>/g, '\n').replace(/\n\n+/g, '\n\n').trim()

    doc.setFontSize(10)

    const pageWidth = doc.internal.pageSize.getWidth()
    const margins = 15
    const maxLineWidth = pageWidth - margins * 2

    const lines = doc.splitTextToSize(text, maxLineWidth)

    let y = margins
    const lineHeight = 7
    const pageHeight = doc.internal.pageSize.getHeight()
    const maxY = pageHeight - margins

    lines.forEach((line: string) => {
      if (y + lineHeight > maxY) {
        doc.addPage()
        y = margins
      }

      doc.text(line, margins, y)
      y += lineHeight
    })

    doc.save(`${title.replace(/\s+/g, '_')}.pdf`)
  }

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-3xl font-bold mb-2 text-green-600">Vos documents sont prêts !</h2>
        <p className="text-gray-600 mb-6">
          Vos documents de conformité ont été générés avec succès.
        </p>

        <div className="space-y-6">
          {documents.map((doc, index) => (
            <div key={index} className="border-2 border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">{doc.title}</h3>

              <div
                className="bg-gray-50 p-6 rounded-lg mb-4 max-h-96 overflow-y-auto prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: doc.content }}
              />

              <div className="flex gap-3">
                <button
                  onClick={() => copyDocument(doc.content)}
                  className="btn-secondary"
                >
                  📋 Copier le texte
                </button>
                <button
                  onClick={() => downloadDocument(doc.title, doc.content)}
                  className="btn-primary"
                >
                  📥 Télécharger le PDF
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t">
          <button onClick={onRestart} className="btn-secondary">
            Créer de nouveaux documents
          </button>
        </div>
      </div>
    </div>
  )
}
