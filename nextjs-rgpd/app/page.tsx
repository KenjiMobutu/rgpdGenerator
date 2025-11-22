import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3 group cursor-pointer">
              <span className="text-3xl transform group-hover:scale-110 transition-transform duration-300">⚖️</span>
              <span className="font-bold text-2xl bg-linear-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                RGPD Generator
              </span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="#features" className="text-gray-700 hover:text-primary-600 font-medium transition-all duration-300 hover:scale-105">
                Fonctionnalités
              </Link>
              <Link href="#pricing" className="text-gray-700 hover:text-primary-600 font-medium transition-all duration-300 hover:scale-105">
                Tarifs
              </Link>
              <Link href="/auth" className="text-gray-700 hover:text-primary-600 font-medium transition-all duration-300 hover:scale-105">
                Connexion
              </Link>
              <Link href="/auth?mode=signup" className="btn-primary">
                Commencer
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-primary-600 via-purple-600 to-primary-700 text-white py-24 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="animate-slideIn">
              <h1 className="text-6xl font-bold mb-6 leading-tight">
                Générez vos documents RGPD en{' '}
                <span className="bg-white/20 px-3 py-1 rounded-lg backdrop-blur">quelques clics</span>
              </h1>
              <p className="text-xl mb-10 text-white/90 leading-relaxed">
                CGV, Politique de Confidentialité, Mentions Légales conformes au droit belge.
                Simple, rapide et professionnel.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/auth?mode=signup" className="group relative bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold shadow-2xl hover:shadow-2xl transition-all duration-300 text-center overflow-hidden hover:scale-105">
                  <span className="relative z-10">Commencer gratuitement</span>
                  <div className="absolute inset-0 bg-linear-to-r from-primary-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <Link href="#demo" className="group bg-white/10 backdrop-blur-xl text-white border-2 border-white/50 px-8 py-4 rounded-xl font-semibold hover:bg-white/20 hover:border-white transition-all duration-300 text-center hover:scale-105 hover:shadow-2xl">
                  Voir la démo
                </Link>
              </div>
              <div className="flex items-center gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <span className="text-green-300 text-xl">✓</span>
                  <span>Aucune carte bancaire requise</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-300 text-xl">✓</span>
                  <span>Conforme au droit belge</span>
                </div>
              </div>
            </div>
            <div className="animate-slideIn relative">
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/20 transform hover:scale-105 transition-all duration-500">
                <div className="flex gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-400 shadow-lg"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-lg"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400 shadow-lg"></div>
                </div>
                <div className="space-y-4">
                  <div className="h-5 bg-white/30 rounded-lg w-3/4 animate-pulse"></div>
                  <div className="h-5 bg-white/30 rounded-lg w-1/2 animate-pulse"></div>
                  <div className="h-5 bg-white/30 rounded-lg w-2/3 animate-pulse"></div>
                  <div className="h-5 bg-white/30 rounded-lg w-3/4 animate-pulse"></div>
                  <div className="h-5 bg-white/30 rounded-lg w-1/2 animate-pulse"></div>
                  <div className="mt-6 p-4 bg-white/20 rounded-xl">
                    <div className="h-4 bg-white/40 rounded w-full mb-2"></div>
                    <div className="h-4 bg-white/40 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-white text-primary-600 px-6 py-3 rounded-full shadow-2xl font-bold animate-bounce">
                100% Conforme
              </div>
              <div className="absolute -bottom-4 -left-4 bg-green-500 text-white px-6 py-3 rounded-full shadow-2xl font-bold">
                ⚡ En 5 min
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-linear-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-slideIn">
            <h2 className="text-5xl font-bold mb-6 bg-linear-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              Pourquoi choisir RGPD Generator ?
            </h2>
            <p className="text-2xl text-gray-600">Tout ce dont vous avez besoin pour être conforme</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center group hover:shadow-2xl hover:border-primary-200">
              <div className="text-6xl mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">⚡</div>
              <h3 className="text-2xl font-bold mb-3 bg-linear-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">Rapide & Simple</h3>
              <p className="text-gray-600 leading-relaxed">
                Générez vos documents en moins de 5 minutes grâce à notre formulaire intelligent guidé.
              </p>
            </div>

            <div className="card text-center group hover:shadow-2xl hover:border-primary-200">
              <div className="text-6xl mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">🇧🇪</div>
              <h3 className="text-2xl font-bold mb-3 bg-linear-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">Conforme au droit belge</h3>
              <p className="text-gray-600 leading-relaxed">
                Documents conformes au RGPD européen et adaptés aux spécificités juridiques belges.
              </p>
            </div>

            <div className="card text-center group hover:shadow-2xl hover:border-primary-200">
              <div className="text-6xl mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">🎯</div>
              <h3 className="text-2xl font-bold mb-3 bg-linear-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">Adapté à votre activité</h3>
              <p className="text-gray-600 leading-relaxed">
                Coach, SaaS, E-commerce, Formateur... Des modèles personnalisés pour chaque secteur.
              </p>
            </div>

            <div className="card text-center group hover:shadow-2xl hover:border-primary-200">
              <div className="text-6xl mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">📄</div>
              <h3 className="text-2xl font-bold mb-3 bg-linear-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">Tous vos documents</h3>
              <p className="text-gray-600 leading-relaxed">
                CGV, Politique de Confidentialité, Mentions Légales, Politique de Cookies en un seul endroit.
              </p>
            </div>

            <div className="card text-center group hover:shadow-2xl hover:border-primary-200">
              <div className="text-6xl mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">💾</div>
              <h3 className="text-2xl font-bold mb-3 bg-linear-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">Export PDF instantané</h3>
              <p className="text-gray-600 leading-relaxed">
                Téléchargez vos documents en PDF professionnel ou copiez-les directement.
              </p>
            </div>

            <div className="card text-center group hover:shadow-2xl hover:border-primary-200">
              <div className="text-6xl mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">🔄</div>
              <h3 className="text-2xl font-bold mb-3 bg-linear-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">Mises à jour incluses</h3>
              <p className="text-gray-600 leading-relaxed">
                Restez à jour avec l'évolution de la législation, sans effort supplémentaire.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-linear-to-b from-white to-primary-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-bold text-center mb-20 bg-linear-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
            Comment ça marche ?
          </h2>
          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting lines */}
            <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-0.5 bg-linear-to-r from-primary-200 via-purple-300 to-primary-200"></div>

            <div className="text-center group">
              <div className="relative mx-auto mb-8 w-24 h-24">
                <div className="absolute inset-0 bg-linear-to-br from-primary-600 to-purple-600 rounded-full animate-pulse opacity-20"></div>
                <div className="relative bg-linear-to-br from-primary-600 to-purple-600 text-white w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold shadow-2xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  1
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Choisissez votre activité</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Sélectionnez le type d'entreprise qui correspond à votre activité.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mx-auto mb-8 w-24 h-24">
                <div className="absolute inset-0 bg-linear-to-br from-primary-600 to-purple-600 rounded-full animate-pulse opacity-20"></div>
                <div className="relative bg-linear-to-br from-primary-600 to-purple-600 text-white w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold shadow-2xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  2
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Remplissez le formulaire</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Complétez les informations en quelques minutes avec notre guide étape par étape.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mx-auto mb-8 w-24 h-24">
                <div className="absolute inset-0 bg-linear-to-br from-primary-600 to-purple-600 rounded-full animate-pulse opacity-20"></div>
                <div className="relative bg-linear-to-br from-primary-600 to-purple-600 text-white w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold shadow-2xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  3
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Téléchargez vos documents</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Obtenez instantanément vos documents conformes, prêts à être publiés.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-linear-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6 bg-linear-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              Tarifs simples et transparents
            </h2>
            <p className="text-2xl text-gray-600">Choisissez le plan qui vous convient</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <h3 className="text-3xl font-bold mb-4 bg-linear-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">Starter</h3>
              <div className="mb-8">
                <span className="text-5xl font-bold bg-linear-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">29€</span>
                <span className="text-gray-600 text-xl">/mois</span>
              </div>
              <ul className="space-y-4 mb-10">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-2xl">✓</span>
                  <span className="text-gray-700">Jusqu'à 3 documents / mois</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-2xl">✓</span>
                  <span className="text-gray-700">Tous les types de documents</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-2xl">✓</span>
                  <span className="text-gray-700">Export PDF</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-2xl">✓</span>
                  <span className="text-gray-700">Support email</span>
                </li>
              </ul>
              <Link href="/auth?mode=signup&plan=starter" className="btn-primary w-full text-center block">
                Commencer
              </Link>
            </div>

            <div className="card border-4 border-primary-600 relative shadow-2xl transform scale-105 hover:scale-110 transition-all duration-300">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-linear-to-r from-primary-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                ⭐ Populaire
              </div>
              <h3 className="text-3xl font-bold mb-4 mt-4 bg-linear-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">Pro</h3>
              <div className="mb-8">
                <span className="text-5xl font-bold bg-linear-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">79€</span>
                <span className="text-gray-600 text-xl">/mois</span>
              </div>
              <ul className="space-y-4 mb-10">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-2xl">✓</span>
                  <span className="text-gray-700 font-medium">Documents illimités</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-2xl">✓</span>
                  <span className="text-gray-700">Tous les types de documents</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-2xl">✓</span>
                  <span className="text-gray-700">Export PDF premium</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-2xl">✓</span>
                  <span className="text-gray-700">Support prioritaire</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-2xl">✓</span>
                  <span className="text-gray-700">Mises à jour automatiques</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-2xl">✓</span>
                  <span className="text-gray-700">Personnalisation avancée</span>
                </li>
              </ul>
              <Link href="/auth?mode=signup&plan=pro" className="btn-primary w-full text-center block">
                Commencer
              </Link>
            </div>

            <div className="card hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <h3 className="text-3xl font-bold mb-4 bg-linear-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">Enterprise</h3>
              <div className="mb-8">
                <span className="text-3xl font-bold text-gray-800">Sur mesure</span>
              </div>
              <ul className="space-y-4 mb-10">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-2xl">✓</span>
                  <span className="text-gray-700">Tout du plan Pro</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-2xl">✓</span>
                  <span className="text-gray-700">Comptes multi-utilisateurs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-2xl">✓</span>
                  <span className="text-gray-700">API d'intégration</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-2xl">✓</span>
                  <span className="text-gray-700">Support dédié</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-2xl">✓</span>
                  <span className="text-gray-700">Conformité sur mesure</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-2xl">✓</span>
                  <span className="text-gray-700">Formation incluse</span>
                </li>
              </ul>
              <a href="mailto:contact@rgpdgenerator.be" className="btn-secondary w-full text-center block">
                Nous contacter
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-linear-to-br from-primary-600 via-purple-600 to-primary-700 text-white py-28 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-20 w-80 h-80 bg-purple-300 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-6xl font-bold mb-6 leading-tight">
            Prêt à vous mettre en conformité ?
          </h2>
          <p className="text-2xl mb-10 text-white/90 leading-relaxed">
            Rejoignez des centaines d'entrepreneurs belges qui nous font confiance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth?mode=signup" className="group relative inline-block bg-white text-primary-600 px-10 py-5 rounded-xl font-bold text-lg shadow-2xl hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105">
              <span className="relative z-10">Commencer gratuitement</span>
              <div className="absolute inset-0 bg-linear-to-r from-primary-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <div className="flex items-center gap-3 text-white/90">
              <span className="text-green-300 text-2xl">✓</span>
              <span className="text-lg">Aucune carte bancaire requise</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-linear-to-b from-gray-900 to-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6 group cursor-pointer">
                <span className="text-3xl transform group-hover:scale-110 transition-transform duration-300">⚖️</span>
                <span className="font-bold text-2xl bg-linear-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
                  RGPD Generator
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                La solution SaaS pour vos documents légaux conformes au RGPD et au droit belge.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Produit</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="#features" className="text-gray-400 hover:text-primary-400 transition-colors duration-300 hover:translate-x-1 inline-block">
                    Fonctionnalités
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-gray-400 hover:text-primary-400 transition-colors duration-300 hover:translate-x-1 inline-block">
                    Tarifs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-300 hover:translate-x-1 inline-block">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Ressources</h4>
              <ul className="space-y-3">
                <li>
                  <a href="https://www.autoriteprotectiondonnees.be" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 transition-colors duration-300 hover:translate-x-1 inline-block">
                    APD Belgique
                  </a>
                </li>
                <li>
                  <a href="https://economie.fgov.be" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 transition-colors duration-300 hover:translate-x-1 inline-block">
                    SPF Économie
                  </a>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-300 hover:translate-x-1 inline-block">
                    Guide RGPD
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Légal</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-300 hover:translate-x-1 inline-block">
                    CGV
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-300 hover:translate-x-1 inline-block">
                    Politique de confidentialité
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-300 hover:translate-x-1 inline-block">
                    Mentions légales
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-10 text-center">
            <p className="text-gray-400 text-lg">
              &copy; 2025 RGPD Generator - Tous droits réservés
            </p>
            <p className="text-gray-500 mt-2">
              Fait avec ❤️ en Belgique
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
