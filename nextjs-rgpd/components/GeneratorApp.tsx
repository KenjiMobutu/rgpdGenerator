'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'
import { Profile, BusinessType, DocumentType, FormData } from '@/types'
import { createClient } from '@/lib/supabase/client'
import BusinessTypeSelection from './BusinessTypeSelection'
import DocumentForm from './DocumentForm'
import DocumentResults from './DocumentResults'

interface GeneratorAppProps {
  user: User
  profile: Profile | null
}

export default function GeneratorApp({ user, profile }: GeneratorAppProps) {
  const router = useRouter()
  const supabase = createClient()

  const [currentView, setCurrentView] = useState<'select' | 'form' | 'results'>('select')
  const [selectedBusinessType, setSelectedBusinessType] = useState<BusinessType | ''>('')
  const [generatedDocuments, setGeneratedDocuments] = useState<Array<{
    title: string
    content: string
    type: DocumentType
  }>>([])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const handleBusinessTypeSelect = (type: BusinessType) => {
    setSelectedBusinessType(type)
    setCurrentView('form')
  }

  const handleBackToSelection = () => {
    setCurrentView('select')
  }

  const handleDocumentsGenerated = (documents: Array<{ title: string; content: string; type: DocumentType }>) => {
    setGeneratedDocuments(documents)
    setCurrentView('results')
  }

  const handleRestart = () => {
    setSelectedBusinessType('')
    setGeneratedDocuments([])
    setCurrentView('select')
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-primary-50/30 to-purple-50/30">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'select' && (
          <BusinessTypeSelection onSelect={handleBusinessTypeSelect} />
        )}

        {currentView === 'form' && selectedBusinessType && (
          <DocumentForm
            businessType={selectedBusinessType}
            onBack={handleBackToSelection}
            onGenerate={handleDocumentsGenerated}
            userId={user.id}
          />
        )}

        {currentView === 'results' && (
          <DocumentResults
            documents={generatedDocuments}
            onRestart={handleRestart}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-sm text-gray-600">
            <strong>Disclaimer :</strong> Ces documents sont conformes au droit belge et fournis à titre informatif.
            Pour des situations complexes, consultez un avocat belge spécialisé.
          </p>
          <p className="text-sm text-gray-600 mt-2">
            <strong>Autorités belges :</strong>{' '}
            <a href="https://www.autoriteprotectiondonnees.be" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">APD</a>
            {' | '}
            <a href="https://economie.fgov.be" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">SPF Économie</a>
            {' | '}
            <a href="https://consommateurs.fgov.be" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">Médiation Consommateur</a>
          </p>
          <p className="text-sm text-gray-600 mt-2">
            &copy; 2025 Générateur de Conformité Belgique - Tous droits réservés
          </p>
        </div>
      </footer>
    </div>
  )
}
