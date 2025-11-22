'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function ProfilePage() {
  const router = useRouter()
  const supabase = createClient()

  const [user, setUser] = useState<any>(null)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState('')
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info', text: string } | null>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push('/auth')
        return
      }

      setUser(user)
      setEmail(user.email || '')

      // Get profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profile) {
        setFullName(profile.full_name || '')
      }
    }

    getUser()
  }, [])

  const showNotification = (text: string, type: 'success' | 'error' | 'info') => {
    setMessage({ type, text })
    setTimeout(() => setMessage(null), 3000)
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!fullName.trim()) {
      showNotification('Le nom complet est requis', 'error')
      return
    }

    setLoading(true)

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: fullName.trim(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)

      if (error) throw error

      showNotification('Profil mis à jour avec succès !', 'success')
    } catch (error: any) {
      showNotification(error.message || 'Erreur lors de la mise à jour du profil', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (deleteConfirmation !== 'SUPPRIMER') {
      showNotification('Veuillez taper "SUPPRIMER" pour confirmer', 'error')
      return
    }

    setLoading(true)

    try {
      // Delete all user documents first
      const { error: docsError } = await supabase
        .from('generated_documents')
        .delete()
        .eq('user_id', user.id)

      if (docsError) throw docsError

      // Delete profile
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', user.id)

      if (profileError) throw profileError

      // Sign out and delete auth user
      await supabase.auth.signOut()

      showNotification('Compte supprimé avec succès', 'success')
      setTimeout(() => router.push('/'), 2000)
    } catch (error: any) {
      showNotification(error.message || 'Erreur lors de la suppression du compte', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
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

      {/* Modal de confirmation de suppression */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-slideIn">
          <div className="card max-w-lg w-full">
            <div className="text-center mb-6">
              <div className="inline-block bg-red-100 text-red-600 w-16 h-16 rounded-full flex items-center justify-center mb-4 text-3xl">
                ⚠️
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Supprimer votre compte
              </h2>
              <p className="text-gray-600">
                Cette action est irréversible. Tous vos documents seront définitivement supprimés.
              </p>
            </div>

            <div className="mb-6">
              <label className="block font-semibold text-gray-700 mb-2">
                Tapez "SUPPRIMER" pour confirmer
              </label>
              <input
                type="text"
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
                className="form-input"
                placeholder="SUPPRIMER"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => {
                  setShowDeleteModal(false)
                  setDeleteConfirmation('')
                }}
                className="btn-secondary flex-1"
                disabled={loading}
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="flex-1 bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-all duration-300"
                disabled={loading || deleteConfirmation !== 'SUPPRIMER'}
              >
                {loading ? 'Suppression...' : 'Supprimer définitivement'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/app"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors duration-300 mb-4"
          >
            <span>←</span>
            <span>Retour à l'application</span>
          </Link>
          <h1 className="text-4xl font-bold bg-linear-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
            Mon Profil
          </h1>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="md:col-span-2">
            <div className="card">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Informations du profil</h2>

              <form onSubmit={handleUpdate} className="space-y-6">
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
                    value={email}
                    className="form-input bg-gray-100"
                    disabled
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Votre email ne peut pas être modifié
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                >
                  {loading ? 'Enregistrement...' : 'Mettre à jour le profil'}
                </button>
              </form>
            </div>
          </div>

          {/* Actions Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="card">
              <h3 className="text-lg font-bold mb-4 text-gray-800">Actions rapides</h3>
              <div className="space-y-3">
                <Link
                  href="/app"
                  className="block w-full text-left px-4 py-3 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors duration-300"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">📝</span>
                    <span className="font-medium text-gray-700">Générer un document</span>
                  </div>
                </Link>

                <Link
                  href="/documents"
                  className="block w-full text-left px-4 py-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors duration-300"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">📄</span>
                    <span className="font-medium text-gray-700">Mes documents</span>
                  </div>
                </Link>

                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-300"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🚪</span>
                    <span className="font-medium text-gray-700">Déconnexion</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="card border-2 border-red-200">
              <h3 className="text-lg font-bold mb-2 text-red-600">Zone de danger</h3>
              <p className="text-sm text-gray-600 mb-4">
                La suppression de votre compte est définitive et irréversible.
              </p>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="w-full bg-red-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-red-700 transition-all duration-300"
              >
                Supprimer mon compte
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
