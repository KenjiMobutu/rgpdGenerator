'use client'

import { useState } from 'react'
import { BusinessType, DocumentType, FormData } from '@/types'
import { createClient } from '@/lib/supabase/client'
import { generateCGV, generateRGPD, generateMentionsLegales, generatePolitiqueCookies } from '@/lib/templates'

interface DocumentFormProps {
  businessType: BusinessType
  onBack: () => void
  onGenerate: (documents: Array<{ title: string; content: string; type: DocumentType }>) => void
  userId: string
}

export default function DocumentForm({ businessType, onBack, onGenerate, userId }: DocumentFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4
  const supabase = createClient()

  // Form data
  const [formData, setFormData] = useState<Partial<FormData>>({
    businessType,
    selectedDocuments: [], // Aucun document présélectionné par défaut
    sensitiveData: 'non',
    cookies: 'non',
    refundPolicy: '14-jours',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const updateField = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Valider le champ en temps réel s'il a déjà été touché
    if (touched[field]) {
      validateSingleField(field, value)
    }
  }

  const handleBlur = (field: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    validateSingleField(field, formData[field])
  }

  const validateSingleField = (field: keyof FormData, value: any) => {
    const newErrors = { ...errors }

    switch (field) {
      case 'companyName':
        if (!value) newErrors.companyName = 'Le nom de l\'entreprise est requis'
        else delete newErrors.companyName
        break
      case 'legalForm':
        if (!value) newErrors.legalForm = 'La forme juridique est requise'
        else delete newErrors.legalForm
        break
      case 'siret':
        if (!value) newErrors.siret = 'Le numéro d\'entreprise est requis'
        else if (!/^\d{10}$/.test(value.replace(/\./g, ''))) newErrors.siret = 'Format invalide (10 chiffres)'
        else delete newErrors.siret
        break
      case 'address':
        if (!value) newErrors.address = 'L\'adresse est requise'
        else delete newErrors.address
        break
      case 'email':
        if (!value) newErrors.email = 'L\'email est requis'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) newErrors.email = 'Email invalide'
        else delete newErrors.email
        break
      case 'website':
        if (!value) newErrors.website = 'Le site web est requis'
        else delete newErrors.website
        break
      case 'servicesDescription':
        if (!value) newErrors.servicesDescription = 'La description des services est requise'
        else delete newErrors.servicesDescription
        break
      case 'hosting':
        if (!value) newErrors.hosting = 'L\'hébergement est requis'
        else delete newErrors.hosting
        break
      case 'paymentMethods':
        if (!value) newErrors.paymentMethods = 'Les moyens de paiement sont requis'
        else delete newErrors.paymentMethods
        break
      case 'deliveryTime':
        if (!value) newErrors.deliveryTime = 'Le délai de livraison est requis'
        else delete newErrors.deliveryTime
        break
      case 'refundPolicy':
        if (!value) newErrors.refundPolicy = 'La politique de remboursement est requise'
        else delete newErrors.refundPolicy
        break
    }

    setErrors(newErrors)
  }

  const getInputClassName = (field: keyof FormData) => {
    if (!touched[field]) return 'form-input'
    if (errors[field]) return 'form-input invalid'
    if (formData[field]) return 'form-input valid'
    return 'form-input'
  }

  const validateStep = () => {
    const newErrors: Record<string, string> = {}

    if (currentStep === 1) {
      if (!formData.companyName) newErrors.companyName = 'Le nom de l\'entreprise est requis'
      if (!formData.legalForm) newErrors.legalForm = 'La forme juridique est requise'
      if (!formData.siret) newErrors.siret = 'Le numéro d\'entreprise est requis'
      else if (!/^\d{10}$/.test(formData.siret.replace(/\./g, ''))) {
        newErrors.siret = 'Format invalide (10 chiffres)'
      }
      if (!formData.address) newErrors.address = 'L\'adresse est requise'
      if (!formData.email) newErrors.email = 'L\'email est requis'
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Email invalide'
      }
      if (!formData.website) newErrors.website = 'Le site web est requis'
    }

    if (currentStep === 2) {
      if (!formData.servicesDescription) newErrors.servicesDescription = 'La description des services est requise'
      if (!formData.hosting) newErrors.hosting = 'L\'hébergement est requis'
    }

    if (currentStep === 3) {
      if (!formData.paymentMethods) newErrors.paymentMethods = 'Les moyens de paiement sont requis'
      if (!formData.deliveryTime) newErrors.deliveryTime = 'Le délai de livraison est requis'
      if (!formData.refundPolicy) newErrors.refundPolicy = 'La politique de remboursement est requise'
    }

    if (currentStep === 4) {
      if (!formData.selectedDocuments || formData.selectedDocuments.length === 0) {
        newErrors.selectedDocuments = 'Veuillez sélectionner au moins un document'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1)
      }
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateStep()) return

    const completeFormData = formData as FormData

    // Générer les documents
    const documents: Array<{ title: string; content: string; type: DocumentType }> = []

    completeFormData.selectedDocuments?.forEach((docType) => {
      let content = ''
      let title = ''

      switch (docType) {
        case 'cgv':
          title = 'Conditions Générales de Vente'
          content = generateCGV(completeFormData)
          break
        case 'rgpd':
          title = 'Politique de Confidentialité (RGPD)'
          content = generateRGPD(completeFormData)
          break
        case 'mentions':
          title = 'Mentions Légales'
          content = generateMentionsLegales(completeFormData)
          break
        case 'cookies':
          title = 'Politique de Cookies'
          content = generatePolitiqueCookies(completeFormData)
          break
      }

      documents.push({ title, content, type: docType })
    })

    // Sauvegarder dans Supabase
    for (const doc of documents) {
      await supabase.from('generated_documents').insert({
        user_id: userId,
        business_type: completeFormData.businessType,
        document_type: doc.type,
        company_name: completeFormData.companyName,
        legal_form: completeFormData.legalForm,
        siret: completeFormData.siret,
        address: completeFormData.address,
        email: completeFormData.email,
        phone: completeFormData.phone,
        website: completeFormData.website,
        services_description: completeFormData.servicesDescription,
        sensitive_data: completeFormData.sensitiveData === 'oui',
        sensitive_data_type: completeFormData.sensitiveDataType,
        cookies: completeFormData.cookies,
        hosting: completeFormData.hosting,
        payment_methods: completeFormData.paymentMethods,
        delivery_time: completeFormData.deliveryTime,
        refund_policy: completeFormData.refundPolicy,
        custom_refund_text: completeFormData.customRefundText,
        guarantee: completeFormData.guarantee,
        content: doc.content,
      })
    }

    onGenerate(documents)
  }

  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="card max-w-4xl mx-auto">
      <button onClick={onBack} className="text-primary-600 hover:text-primary-700 mb-6">
        ← Retour au choix d'activité
      </button>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-600">Étape {currentStep} sur {totalSteps}</span>
          <span className="text-sm font-semibold text-primary-600">{Math.round(progress)}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Company Information */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Informations de votre entreprise</h2>

            <div className="animate-slideIn">
              <label htmlFor="companyName">
                Nom de votre entreprise *
              </label>
              <input
                type="text"
                id="companyName"
                value={formData.companyName || ''}
                onChange={(e) => updateField('companyName', e.target.value)}
                onBlur={() => handleBlur('companyName')}
                className={getInputClassName('companyName')}
                placeholder="Ex: Ma Super Entreprise"
              />
              {errors.companyName && <p className="error-message">{errors.companyName}</p>}
            </div>

            <div className="animate-slideIn" style={{ animationDelay: '0.1s' }}>
              <label htmlFor="legalForm">
                Forme juridique *
              </label>
              <select
                id="legalForm"
                value={formData.legalForm || ''}
                onChange={(e) => updateField('legalForm', e.target.value)}
                onBlur={() => handleBlur('legalForm')}
                className={getInputClassName('legalForm')}
              >
                <option value="">Sélectionnez...</option>
                <option value="Personne physique">Personne physique (indépendant)</option>
                <option value="SRL">SRL (Société à Responsabilité Limitée)</option>
                <option value="SPRL">SPRL (Société Privée à Responsabilité Limitée)</option>
                <option value="SA">SA (Société Anonyme)</option>
                <option value="SC">SC (Société Coopérative)</option>
                <option value="ASBL">ASBL (Association Sans But Lucratif)</option>
                <option value="Société Simple">Société Simple</option>
              </select>
              {errors.legalForm && <p className="error-message">{errors.legalForm}</p>}
            </div>

            <div>
              <label htmlFor="siret" className="block text-sm font-medium mb-2">
                Numéro d'entreprise BCE *
              </label>
              <input
                type="text"
                id="siret"
                value={formData.siret || ''}
                onChange={(e) => updateField('siret', e.target.value)}
                className={`form-input ${errors.siret ? 'invalid' : ''}`}
                placeholder="0123.456.789"
              />
              <p className="text-sm text-gray-500 mt-1">Format: 0XXX.XXX.XXX (10 chiffres)</p>
              {errors.siret && <p className="error-message">{errors.siret}</p>}
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium mb-2">
                Adresse complète *
              </label>
              <textarea
                id="address"
                value={formData.address || ''}
                onChange={(e) => updateField('address', e.target.value)}
                className={`form-input ${errors.address ? 'invalid' : ''}`}
                placeholder="Rue de la Loi 123, 1000 Bruxelles, Belgique"
                rows={3}
              />
              {errors.address && <p className="error-message">{errors.address}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email de contact *
              </label>
              <input
                type="email"
                id="email"
                value={formData.email || ''}
                onChange={(e) => updateField('email', e.target.value)}
                className={`form-input ${errors.email ? 'invalid' : ''}`}
                placeholder="contact@exemple.be"
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2">
                Téléphone
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone || ''}
                onChange={(e) => updateField('phone', e.target.value)}
                className="form-input"
                placeholder="+32 2 123 45 67"
              />
            </div>

            <div>
              <label htmlFor="website" className="block text-sm font-medium mb-2">
                Site web *
              </label>
              <input
                type="url"
                id="website"
                value={formData.website || ''}
                onChange={(e) => updateField('website', e.target.value)}
                className={`form-input ${errors.website ? 'invalid' : ''}`}
                placeholder="https://www.exemple.be"
              />
              {errors.website && <p className="error-message">{errors.website}</p>}
            </div>
          </div>
        )}

        {/* Step 2: Activity */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Votre activité</h2>

            <div>
              <label htmlFor="servicesDescription" className="block text-sm font-medium mb-2">
                Description de vos services *
              </label>
              <textarea
                id="servicesDescription"
                value={formData.servicesDescription || ''}
                onChange={(e) => updateField('servicesDescription', e.target.value)}
                className={`form-input ${errors.servicesDescription ? 'invalid' : ''}`}
                placeholder="Décrivez brièvement ce que vous proposez à vos clients"
                rows={4}
              />
              {errors.servicesDescription && <p className="error-message">{errors.servicesDescription}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Collectez-vous des données sensibles ?
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="sensitiveData"
                    value="non"
                    checked={formData.sensitiveData === 'non'}
                    onChange={(e) => updateField('sensitiveData', e.target.value as 'oui' | 'non')}
                  />
                  <span>Non, uniquement des données basiques (nom, email)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="sensitiveData"
                    value="oui"
                    checked={formData.sensitiveData === 'oui'}
                    onChange={(e) => updateField('sensitiveData', e.target.value as 'oui' | 'non')}
                  />
                  <span>Oui (données de santé, paiement, etc.)</span>
                </label>
              </div>
            </div>

            {formData.sensitiveData === 'oui' && (
              <div>
                <label htmlFor="sensitiveDataType" className="block text-sm font-medium mb-2">
                  Quel type de données sensibles ?
                </label>
                <textarea
                  id="sensitiveDataType"
                  value={formData.sensitiveDataType || ''}
                  onChange={(e) => updateField('sensitiveDataType', e.target.value)}
                  className="form-input"
                  placeholder="Ex: Données de santé, coordonnées bancaires..."
                  rows={2}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">
                Utilisez-vous des cookies ou traceurs ?
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="cookies"
                    value="non"
                    checked={formData.cookies === 'non'}
                    onChange={(e) => updateField('cookies', e.target.value)}
                  />
                  <span>Non</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="cookies"
                    value="analytics"
                    checked={formData.cookies === 'analytics'}
                    onChange={(e) => updateField('cookies', e.target.value)}
                  />
                  <span>Oui, seulement analytics (Google Analytics, etc.)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="cookies"
                    value="publicite"
                    checked={formData.cookies === 'publicite'}
                    onChange={(e) => updateField('cookies', e.target.value)}
                  />
                  <span>Oui, incluant publicité</span>
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="hosting" className="block text-sm font-medium mb-2">
                Où sont hébergées vos données ? *
              </label>
              <input
                type="text"
                id="hosting"
                value={formData.hosting || ''}
                onChange={(e) => updateField('hosting', e.target.value)}
                className={`form-input ${errors.hosting ? 'invalid' : ''}`}
                placeholder="Ex: OVH (France), AWS Europe, etc."
              />
              {errors.hosting && <p className="error-message">{errors.hosting}</p>}
            </div>
          </div>
        )}

        {/* Step 3: Commercial Conditions */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Conditions commerciales</h2>

            <div>
              <label htmlFor="paymentMethods" className="block text-sm font-medium mb-2">
                Moyens de paiement acceptés *
              </label>
              <input
                type="text"
                id="paymentMethods"
                value={formData.paymentMethods || ''}
                onChange={(e) => updateField('paymentMethods', e.target.value)}
                className={`form-input ${errors.paymentMethods ? 'invalid' : ''}`}
                placeholder="Ex: Carte bancaire, PayPal, Stripe"
              />
              {errors.paymentMethods && <p className="error-message">{errors.paymentMethods}</p>}
            </div>

            <div>
              <label htmlFor="deliveryTime" className="block text-sm font-medium mb-2">
                Délai de livraison / accès *
              </label>
              <input
                type="text"
                id="deliveryTime"
                value={formData.deliveryTime || ''}
                onChange={(e) => updateField('deliveryTime', e.target.value)}
                className={`form-input ${errors.deliveryTime ? 'invalid' : ''}`}
                placeholder="Ex: Immédiat, sous 48h, 7 jours"
              />
              {errors.deliveryTime && <p className="error-message">{errors.deliveryTime}</p>}
            </div>

            <div>
              <label htmlFor="refundPolicy" className="block text-sm font-medium mb-2">
                Politique de remboursement *
              </label>
              <select
                id="refundPolicy"
                value={formData.refundPolicy || ''}
                onChange={(e) => updateField('refundPolicy', e.target.value)}
                className={`form-input ${errors.refundPolicy ? 'invalid' : ''}`}
              >
                <option value="">Sélectionnez...</option>
                <option value="14-jours">14 jours de rétractation (vente à distance standard)</option>
                <option value="30-jours">30 jours satisfait ou remboursé</option>
                <option value="aucun">Aucun remboursement (produits numériques accessibles immédiatement)</option>
                <option value="personnalise">Politique personnalisée</option>
              </select>
              {errors.refundPolicy && <p className="error-message">{errors.refundPolicy}</p>}
            </div>

            {formData.refundPolicy === 'personnalise' && (
              <div>
                <label htmlFor="customRefundText" className="block text-sm font-medium mb-2">
                  Décrivez votre politique de remboursement
                </label>
                <textarea
                  id="customRefundText"
                  value={formData.customRefundText || ''}
                  onChange={(e) => updateField('customRefundText', e.target.value)}
                  className="form-input"
                  placeholder="Expliquez les conditions de remboursement"
                  rows={3}
                />
              </div>
            )}

            <div>
              <label htmlFor="guarantee" className="block text-sm font-medium mb-2">
                Garantie offerte
              </label>
              <input
                type="text"
                id="guarantee"
                value={formData.guarantee || ''}
                onChange={(e) => updateField('guarantee', e.target.value)}
                className="form-input"
                placeholder="Ex: Garantie de résultat, Garantie satisfaction"
              />
            </div>
          </div>
        )}

        {/* Step 4: Document Selection */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Quels documents générer ?</h2>

            <div className="space-y-3">
              <label className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary-600">
                <input
                  type="checkbox"
                  checked={formData.selectedDocuments?.includes('cgv')}
                  onChange={(e) => {
                    const current = formData.selectedDocuments || []
                    if (e.target.checked) {
                      updateField('selectedDocuments', [...current, 'cgv'])
                    } else {
                      updateField('selectedDocuments', current.filter((d) => d !== 'cgv'))
                    }
                  }}
                  className="mt-1"
                />
                <div>
                  <div className="font-medium">Conditions Générales de Vente (CGV)</div>
                  <div className="text-sm text-gray-600">Obligatoire pour toute vente de produits ou services</div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary-600">
                <input
                  type="checkbox"
                  checked={formData.selectedDocuments?.includes('rgpd')}
                  onChange={(e) => {
                    const current = formData.selectedDocuments || []
                    if (e.target.checked) {
                      updateField('selectedDocuments', [...current, 'rgpd'])
                    } else {
                      updateField('selectedDocuments', current.filter((d) => d !== 'rgpd'))
                    }
                  }}
                  className="mt-1"
                />
                <div>
                  <div className="font-medium">Politique de Confidentialité (RGPD)</div>
                  <div className="text-sm text-gray-600">Obligatoire si vous collectez des données personnelles</div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary-600">
                <input
                  type="checkbox"
                  checked={formData.selectedDocuments?.includes('mentions')}
                  onChange={(e) => {
                    const current = formData.selectedDocuments || []
                    if (e.target.checked) {
                      updateField('selectedDocuments', [...current, 'mentions'])
                    } else {
                      updateField('selectedDocuments', current.filter((d) => d !== 'mentions'))
                    }
                  }}
                  className="mt-1"
                />
                <div>
                  <div className="font-medium">Mentions Légales</div>
                  <div className="text-sm text-gray-600">Recommandé pour tout site web professionnel</div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary-600">
                <input
                  type="checkbox"
                  checked={formData.selectedDocuments?.includes('cookies')}
                  onChange={(e) => {
                    const current = formData.selectedDocuments || []
                    if (e.target.checked) {
                      updateField('selectedDocuments', [...current, 'cookies'])
                    } else {
                      updateField('selectedDocuments', current.filter((d) => d !== 'cookies'))
                    }
                  }}
                  className="mt-1"
                />
                <div>
                  <div className="font-medium">Politique de Cookies</div>
                  <div className="text-sm text-gray-600">Obligatoire si vous utilisez des cookies</div>
                </div>
              </label>
            </div>

            {errors.selectedDocuments && (
              <p className="error-message text-center">{errors.selectedDocuments}</p>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Précédent
          </button>

          {currentStep < totalSteps ? (
            <button type="button" onClick={handleNext} className="btn-primary">
              Suivant
            </button>
          ) : (
            <button type="submit" className="btn-primary">
              Générer mes documents
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
