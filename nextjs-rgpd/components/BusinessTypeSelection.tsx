'use client'

import { useState } from 'react'
import { BusinessType } from '@/types'

interface BusinessTypeSelectionProps {
  onSelect: (type: BusinessType) => void
}

const businessTypes: Array<{ type: BusinessType; label: string; icon: string }> = [
  { type: 'coach-sportif', label: 'Coach Sportif en Ligne', icon: '💪' },
  { type: 'vendeur-etsy', label: 'Vendeur Etsy / Créateur', icon: '🎨' },
  { type: 'saas-b2b', label: 'SaaS B2B', icon: '💼' },
  { type: 'formateur', label: 'Formateur en Ligne', icon: '📚' },
  { type: 'consultant', label: 'Consultant / Freelance', icon: '🎯' },
  { type: 'ecommerce', label: 'E-commerce', icon: '🛒' },
]

export default function BusinessTypeSelection({ onSelect }: BusinessTypeSelectionProps) {
  const [selectedType, setSelectedType] = useState<BusinessType | null>(null)

  const handleSelect = (type: BusinessType) => {
    setSelectedType(type)
    // Petit délai pour l'animation avant de passer à l'étape suivante
    setTimeout(() => onSelect(type), 300)
  }

  return (
    <div className="card max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold bg-linear-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Quelle est votre activité ?
        </h2>
        <p className="text-lg text-gray-600">
          Sélectionnez le type d'entreprise qui correspond à votre activité
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {businessTypes.map(({ type, label, icon }) => (
          <button
            key={type}
            type="button"
            onClick={() => handleSelect(type)}
            className={`business-type-btn group ${selectedType === type ? 'active' : ''}`}
          >
            <div className="text-5xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
              {icon}
            </div>
            <span className="text-lg font-semibold">{label}</span>
          </button>
        ))}
      </div>

      <div className="mt-10 p-6 bg-linear-to-r from-primary-50 to-purple-50 rounded-2xl border-2 border-primary-100 shadow-inner">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <p className="font-semibold text-gray-800 mb-1">Astuce professionnelle</p>
            <p className="text-sm text-gray-600">
              Choisissez le type d'activité le plus proche de la vôtre pour des documents juridiques parfaitement adaptés à votre secteur
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
