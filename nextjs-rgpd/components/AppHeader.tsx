'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'

export default function AppHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [showMenu, setShowMenu] = useState(false)

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const navItems = [
    { href: '/app', label: 'Générateur', icon: '📝' },
    { href: '/documents', label: 'Mes Documents', icon: '📄' },
    { href: '/profile', label: 'Profil', icon: '👤' },
  ]

  return (
    <header className="bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/app" className="flex items-center gap-3 group">
            <span className="text-2xl transform group-hover:scale-110 transition-transform duration-300">
              ⚖️
            </span>
            <span className="font-bold text-xl bg-linear-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              RGPD Generator
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                  pathname === item.href
                    ? 'bg-linear-to-r from-primary-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}

            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-300"
            >
              <span>🚪</span>
              <span>Déconnexion</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors duration-300"
          >
            {showMenu ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Navigation */}
        {showMenu && (
          <div className="md:hidden py-4 animate-slideIn">
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setShowMenu(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                    pathname === item.href
                      ? 'bg-linear-to-r from-primary-600 to-purple-600 text-white'
                      : 'text-gray-700 hover:bg-primary-50'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}

              <button
                onClick={() => {
                  setShowMenu(false)
                  handleSignOut()
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-300"
              >
                <span>🚪</span>
                <span>Déconnexion</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
