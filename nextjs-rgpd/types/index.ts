export type BusinessType =
  | 'coach-sportif'
  | 'vendeur-etsy'
  | 'saas-b2b'
  | 'formateur'
  | 'consultant'
  | 'ecommerce'

export type DocumentType = 'cgv' | 'rgpd' | 'mentions' | 'cookies'

export interface FormData {
  businessType: BusinessType
  companyName: string
  legalForm: string
  siret: string
  address: string
  email: string
  phone?: string
  website: string
  servicesDescription: string
  sensitiveData: 'oui' | 'non'
  sensitiveDataType?: string
  cookies: 'non' | 'analytics' | 'publicite'
  hosting: string
  paymentMethods: string
  deliveryTime: string
  refundPolicy: string
  customRefundText?: string
  guarantee?: string
  selectedDocuments: DocumentType[]
}

export interface GeneratedDocument {
  id: string
  user_id: string
  business_type: BusinessType
  document_type: DocumentType
  company_name: string
  legal_form: string
  siret?: string
  address?: string
  email?: string
  phone?: string
  website?: string
  services_description?: string
  sensitive_data: boolean
  sensitive_data_type?: string
  cookies?: string
  hosting?: string
  payment_methods?: string
  delivery_time?: string
  refund_policy?: string
  custom_refund_text?: string
  guarantee?: string
  content: string
  created_at: string
  updated_at: string
}

export interface Profile {
  id: string
  email: string
  full_name?: string
  created_at: string
  updated_at: string
}
