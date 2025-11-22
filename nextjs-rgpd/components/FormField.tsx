'use client'

import { ReactNode } from 'react'

interface FormFieldProps {
  label: string
  error?: string
  required?: boolean
  children: ReactNode
  className?: string
  animationDelay?: number
}

export default function FormField({
  label,
  error,
  required = false,
  children,
  className = '',
  animationDelay = 0,
}: FormFieldProps) {
  const delayClass = animationDelay > 0 ? `delay-${animationDelay}` : ''

  return (
    <div className={`animate-slideIn ${delayClass} ${className}`}>
      <label className="block font-semibold text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
    </div>
  )
}
