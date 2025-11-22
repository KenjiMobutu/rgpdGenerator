'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function CompleteProfilePage() {
  const router = useRouter()
  const supabase = createClient()

  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth')
      } else {
        setUser(user)
        // Pre-fill name from Google if available
        if (user.user_metadata?.full_name) {
          setFullName(user.user_metadata.full_name)
        }
      }
    }
    getUser()
  }, [])

  const showNotification = (text: string, type: 'success' | 'error') => {
    setMessage({ type, text })
    setTimeout(() => setMessage(null), 3000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!fullName.trim()) {
      showNotification('Le nom complet est requis', 'error')
      return
    }

    setLoading(true)

    try {
      // Update profile
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: fullName.trim(),
        })
        .eq('id', user.id)

      if (error) throw error

      showNotification('Profil complété avec succès !', 'success')
      setTimeout(() => router.push('/app'), 1500)
    } catch (error: any) {
      showNotification(error.message || 'Erreur lors de la mise à jour du profil', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-primary-50/30 to-purple-50/30 flex items-center justify-center p-4">
      {/* Notification */}
      {message && (
        <div className={`fixed top-8 right-8 px-6 py-4 rounded-lg text-white shadow-lg z-50 animate-slideIn ${
          message.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}>
          {message.text}
        </div>
      )}

      <div className="card max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="inline-block bg-linear-to-br from-primary-600 to-purple-600 text-white w-20 h-20 rounded-full flex items-center justify-center mb-6 text-4xl">
            👤
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-linear-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
            Complétez votre profil
          </h1>
          <p className="text-lg text-gray-600">
            Bienvenue ! Dites-nous en plus sur vous pour personnaliser votre expérience
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Nom complet <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="form-input"
              placeholder="Jean Dupont"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={user?.email || ''}
              className="form-input bg-gray-100"
              disabled
            />
            <p className="text-sm text-gray-500 mt-1">
              Votre email ne peut pas être modifié
            </p>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? 'Enregistrement...' : 'Continuer vers l\'application'}
            </button>
          </div>
        </form>

        <div className="mt-8 p-6 bg-linear-to-r from-primary-50 to-purple-50 rounded-2xl border-2 border-primary-100">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔒</span>
            <div>
              <p className="font-semibold text-gray-800 mb-1">Vos données sont protégées</p>
              <p className="text-sm text-gray-600">
                Nous respectons votre vie privée. Vos informations sont stockées de manière sécurisée et ne seront jamais partagées.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
