'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import jsPDF from 'jspdf'

interface Document {
  id: string
  document_type: string
  business_type: string
  company_name: string
  content: string
  created_at: string
}

export default function DocumentsPage() {
  const router = useRouter()
  const supabase = createClient()

  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info', text: string } | null>(null)

  useEffect(() => {
    const fetchDocuments = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push('/auth')
        return
      }

      const { data, error } = await supabase
        .from('generated_documents')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        showNotification('Erreur lors du chargement des documents', 'error')
      } else {
        setDocuments(data || [])
      }

      setLoading(false)
    }

    fetchDocuments()
  }, [])

  const showNotification = (text: string, type: 'success' | 'error' | 'info') => {
    setMessage({ type, text })
    setTimeout(() => setMessage(null), 3000)
  }

  const getDocumentTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      cgv: 'Conditions Générales de Vente',
      rgpd: 'Politique de Confidentialité',
      ml: 'Mentions Légales',
    }
    return labels[type] || type
  }

  const getBusinessTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'coach-sportif': 'Coach Sportif en Ligne',
      'vendeur-etsy': 'Vendeur Etsy / Créateur',
      'saas-b2b': 'SaaS B2B',
      'formateur': 'Formateur en Ligne',
      'consultant': 'Consultant / Freelance',
      'ecommerce': 'E-commerce',
    }
    return labels[type] || type
  }

  const handleDownloadPDF = (doc: Document) => {
    const pdf = new jsPDF()
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const margins = 20
    const maxWidth = pageWidth - (margins * 2)

    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(18)
    pdf.text(getDocumentTypeLabel(doc.document_type), margins, 20)

    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(10)
    pdf.text(`${doc.company_name}`, margins, 30)
    pdf.text(`Généré le ${new Date(doc.created_at).toLocaleDateString('fr-FR')}`, margins, 36)

    pdf.setFontSize(11)
    const lines = pdf.splitTextToSize(doc.content, maxWidth)
    let yPosition = 50

    lines.forEach((line: string, index: number) => {
      if (yPosition > pageHeight - margins) {
        pdf.addPage()
        yPosition = 20
      }
      pdf.text(line, margins, yPosition)
      yPosition += 6
    })

    pdf.save(`${getDocumentTypeLabel(doc.document_type)}-${doc.company_name}.pdf`)
    showNotification('PDF téléchargé avec succès !', 'success')
  }

  const handleCopyContent = (content: string) => {
    navigator.clipboard.writeText(content)
    showNotification('Contenu copié dans le presse-papiers !', 'success')
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce document ?')) {
      return
    }

    const { error } = await supabase
      .from('generated_documents')
      .delete()
      .eq('id', id)

    if (error) {
      showNotification('Erreur lors de la suppression', 'error')
    } else {
      setDocuments(documents.filter(d => d.id !== id))
      setSelectedDocument(null)
      showNotification('Document supprimé avec succès', 'success')
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-primary-50/30 to-purple-50/30 p-4">
      {/* Notification */}
      {message && (
        <div className={`fixed top-8 right-8 px-6 py-4 rounded-lg text-white shadow-lg z-50 animate-slideIn ${
          message.type === 'success' ? 'bg-green-500' :
          message.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
        }`}>
          {message.text}
        </div>
      )}

      {/* Modal de visualisation du document */}
      {selectedDocument && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-slideIn">
          <div className="card max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {getDocumentTypeLabel(selectedDocument.document_type)}
                </h2>
                <p className="text-gray-600">{selectedDocument.company_name}</p>
                <p className="text-sm text-gray-500">
                  Créé le {new Date(selectedDocument.created_at).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>
              <button
                onClick={() => setSelectedDocument(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6 max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700">
                {selectedDocument.content}
              </pre>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => handleDownloadPDF(selectedDocument)}
                className="btn-primary flex-1"
              >
                📥 Télécharger PDF
              </button>
              <button
                onClick={() => handleCopyContent(selectedDocument.content)}
                className="btn-secondary flex-1"
              >
                📋 Copier le texte
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/app"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors duration-300 mb-4"
          >
            <span>←</span>
            <span>Retour à l'application</span>
          </Link>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold bg-linear-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Mes Documents
              </h1>
              <p className="text-lg text-gray-600">
                {documents.length} document{documents.length > 1 ? 's' : ''} généré{documents.length > 1 ? 's' : ''}
              </p>
            </div>
            <Link href="/app" className="btn-primary">
              + Nouveau document
            </Link>
          </div>
        </div>

        {/* Documents List */}
        {loading ? (
          <div className="card text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600">Chargement de vos documents...</p>
          </div>
        ) : documents.length === 0 ? (
          <div className="card text-center py-16">
            <div className="text-6xl mb-6">📄</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Aucun document pour le moment
            </h2>
            <p className="text-gray-600 mb-8">
              Commencez par générer votre premier document juridique
            </p>
            <Link href="/app" className="btn-primary inline-block">
              Générer un document
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="card hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                onClick={() => setSelectedDocument(doc)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">
                    {doc.document_type === 'cgv' && '📝'}
                    {doc.document_type === 'rgpd' && '🔒'}
                    {doc.document_type === 'ml' && '⚖️'}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDelete(doc.id)
                    }}
                    className="text-gray-400 hover:text-red-600 transition-colors duration-300"
                  >
                    🗑️
                  </button>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {getDocumentTypeLabel(doc.document_type)}
                </h3>

                <p className="text-gray-600 mb-2">{doc.company_name}</p>

                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <span>{getBusinessTypeLabel(doc.business_type)}</span>
                </div>

                <p className="text-xs text-gray-500">
                  Créé le {new Date(doc.created_at).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>

                <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDownloadPDF(doc)
                    }}
                    className="flex-1 text-sm px-4 py-2 bg-primary-50 hover:bg-primary-100 text-primary-600 rounded-lg transition-colors duration-300"
                  >
                    📥 PDF
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleCopyContent(doc.content)
                    }}
                    className="flex-1 text-sm px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-600 rounded-lg transition-colors duration-300"
                  >
                    📋 Copier
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
