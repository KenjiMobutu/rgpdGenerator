'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function AuthPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const mode = searchParams.get('mode')

  const [isSignup, setIsSignup] = useState(mode === 'signup')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info', text: string } | null>(null)

  const supabase = createClient()

  const showNotification = (text: string, type: 'success' | 'error' | 'info') => {
    setMessage({ type, text })
    setTimeout(() => setMessage(null), 3000)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      showNotification('Connexion réussie ! Redirection...', 'success')
      setTimeout(() => router.push('/app'), 1500)
    } catch (error: any) {
      showNotification(error.message || 'Email ou mot de passe incorrect', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (password.length < 8) {
      showNotification('Le mot de passe doit contenir au moins 8 caractères', 'error')
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })

      if (error) throw error

      showNotification('Compte créé avec succès ! Redirection...', 'success')
      setTimeout(() => router.push('/app'), 1500)
    } catch (error: any) {
      showNotification(error.message || 'Une erreur est survenue', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/app`,
        },
      })

      if (error) throw error
    } catch (error: any) {
      showNotification(error.message || 'Erreur de connexion Google', 'error')
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Notification */}
      {message && (
        <div className={`fixed top-8 right-8 px-6 py-4 rounded-lg text-white shadow-lg z-50 animate-slideIn ${
          message.type === 'success' ? 'bg-green-500' :
          message.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
        }`}>
          {message.text}
        </div>
      )}

      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-r from-primary-600 to-primary-700 text-white p-12 flex-col justify-center">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <span className="text-4xl">⚖️</span>
            <span className="text-3xl font-bold">RGPD Generator</span>
          </div>
          <h1 className="text-4xl font-bold mb-6">
            Bienvenue sur RGPD Generator
          </h1>
          <p className="text-xl mb-8 text-white/90">
            La solution professionnelle pour générer vos documents légaux conformes au RGPD belge.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">✓</span>
              <span className="text-lg">Documents conformes au droit belge</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">✓</span>
              <span className="text-lg">Génération en quelques minutes</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">✓</span>
              <span className="text-lg">Export PDF professionnel</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link href="/" className="text-primary-600 hover:text-primary-700 mb-8 inline-block">
            ← Retour à l'accueil
          </Link>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Login Form */}
            {!isSignup && (
              <div>
                <h2 className="text-3xl font-bold mb-2">Connexion</h2>
                <p className="text-gray-600 mb-8">Content de vous revoir !</p>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label htmlFor="login-email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="login-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="form-input"
                      placeholder="vous@exemple.be"
                    />
                  </div>

                  <div>
                    <label htmlFor="login-password" className="block text-sm font-medium mb-2">
                      Mot de passe
                    </label>
                    <input
                      type="password"
                      id="login-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="form-input"
                      placeholder="••••••••"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Se souvenir de moi</span>
                    </label>
                    <Link href="#" className="text-sm text-primary-600 hover:text-primary-700">
                      Mot de passe oublié ?
                    </Link>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full disabled:opacity-50"
                  >
                    {loading ? 'Connexion...' : 'Se connecter'}
                  </button>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">ou</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="btn-google"
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18">
                      <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
                      <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
                      <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z"/>
                      <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z"/>
                    </svg>
                    Continuer avec Google
                  </button>
                </form>

                <p className="mt-6 text-center text-gray-600">
                  Pas encore de compte ?{' '}
                  <button
                    onClick={() => setIsSignup(true)}
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Créer un compte
                  </button>
                </p>
              </div>
            )}

            {/* Signup Form */}
            {isSignup && (
              <div>
                <h2 className="text-3xl font-bold mb-2">Créer un compte</h2>
                <p className="text-gray-600 mb-8">Commencez gratuitement dès aujourd'hui</p>

                <form onSubmit={handleSignup} className="space-y-4">
                  <div>
                    <label htmlFor="signup-name" className="block text-sm font-medium mb-2">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      id="signup-name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="form-input"
                      placeholder="Jean Dupont"
                    />
                  </div>

                  <div>
                    <label htmlFor="signup-email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="signup-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="form-input"
                      placeholder="vous@exemple.be"
                    />
                  </div>

                  <div>
                    <label htmlFor="signup-password" className="block text-sm font-medium mb-2">
                      Mot de passe
                    </label>
                    <input
                      type="password"
                      id="signup-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="form-input"
                      placeholder="••••••••"
                    />
                    <p className="text-sm text-gray-500 mt-1">Minimum 8 caractères</p>
                  </div>

                  <div>
                    <label className="flex items-start gap-2">
                      <input type="checkbox" required className="mt-1 rounded" />
                      <span className="text-sm">
                        J'accepte les <Link href="#" className="text-primary-600 hover:text-primary-700">CGV</Link> et la{' '}
                        <Link href="#" className="text-primary-600 hover:text-primary-700">Politique de confidentialité</Link>
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full disabled:opacity-50"
                  >
                    {loading ? 'Création...' : 'Créer mon compte'}
                  </button>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">ou</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="btn-google"
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18">
                      <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
                      <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
                      <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z"/>
                      <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z"/>
                    </svg>
                    Continuer avec Google
                  </button>
                </form>

                <p className="mt-6 text-center text-gray-600">
                  Déjà un compte ?{' '}
                  <button
                    onClick={() => setIsSignup(false)}
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Se connecter
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
