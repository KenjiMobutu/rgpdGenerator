# RGPD Generator - Next.js + Supabase

Application Next.js pour générer des documents de conformité RGPD adaptés au droit belge.

## 🚀 Fonctionnalités

- ✅ Authentification utilisateur avec Supabase Auth
- ✅ Génération de documents légaux (CGV, RGPD, Mentions Légales, Cookies)
- ✅ Formulaire multi-étapes intuitif
- ✅ Export PDF des documents
- ✅ Sauvegarde en base de données
- ✅ Interface responsive avec Tailwind CSS
- ✅ TypeScript pour la sécurité du typage

## 📋 Prérequis

- Node.js 18+
- Un compte Supabase (gratuit)
- Un compte Vercel (gratuit pour le déploiement)

## 🛠️ Installation locale

### 1. Cloner le projet

```bash
cd nextjs-rgpd
npm install
```

### 2. Configuration de Supabase

#### A. Créer un projet Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Attendez que le projet soit provisionné

#### B. Configurer la base de données

1. Dans le dashboard Supabase, allez dans **SQL Editor**
2. Copiez le contenu du fichier `supabase/schema.sql`
3. Exécutez le script SQL

#### C. Configurer l'authentification

1. Allez dans **Authentication > Providers**
2. Activez **Email** (déjà activé par défaut)
3. (Optionnel) Activez **Google** :
   - Suivez les instructions pour créer un projet Google OAuth
   - Ajoutez vos Client ID et Client Secret

#### D. Récupérer les clés API

1. Allez dans **Settings > API**
2. Copiez :
   - `Project URL` (NEXT_PUBLIC_SUPABASE_URL)
   - `anon public` key (NEXT_PUBLIC_SUPABASE_ANON_KEY)

### 3. Configuration des variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```env
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_anon_key_ici
```

### 4. Lancer l'application

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🚀 Déploiement sur Vercel

### Option 1 : Déploiement via le Dashboard Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur **Add New Project**
3. Importez votre repository Git
4. Configurez les variables d'environnement :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Cliquez sur **Deploy**

### Option 2 : Déploiement via CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Pour la production
vercel --prod
```

### Configuration des variables d'environnement sur Vercel

Après le déploiement, ajoutez vos variables d'environnement :

1. Allez dans votre projet sur Vercel
2. **Settings > Environment Variables**
3. Ajoutez :
   - `NEXT_PUBLIC_SUPABASE_URL` = votre URL Supabase
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = votre clé Supabase
4. Redéployez le projet

## 📱 Structure du projet

```
nextjs-rgpd/
├── app/
│   ├── (auth)/
│   │   └── auth/
│   │       └── page.tsx          # Page d'authentification
│   ├── (app)/
│   │   └── app/
│   │       └── page.tsx          # Page principale de l'app
│   ├── layout.tsx                # Layout principal
│   ├── page.tsx                  # Landing page
│   └── globals.css               # Styles globaux
├── components/
│   ├── BusinessTypeSelection.tsx # Sélection du type d'activité
│   ├── DocumentForm.tsx          # Formulaire multi-étapes
│   ├── DocumentResults.tsx       # Affichage des résultats
│   └── GeneratorApp.tsx          # Composant principal de l'app
├── lib/
│   ├── supabase/
│   │   ├── client.ts             # Client Supabase pour le navigateur
│   │   ├── server.ts             # Client Supabase pour le serveur
│   │   └── middleware.ts         # Middleware pour l'auth
│   └── templates.ts              # Templates de documents
├── types/
│   └── index.ts                  # Types TypeScript
├── supabase/
│   └── schema.sql                # Schéma de la base de données
├── middleware.ts                 # Middleware Next.js
└── next.config.js                # Configuration Next.js
```

## 🔧 Technologies utilisées

- **Next.js 15** - Framework React
- **TypeScript** - Typage statique
- **Supabase** - Backend as a Service (Auth + Database)
- **Tailwind CSS** - Framework CSS
- **jsPDF** - Génération de PDF
- **Vercel** - Plateforme de déploiement

## 📊 Base de données

La base de données Supabase contient 2 tables principales :

### `profiles`
- Stocke les informations des utilisateurs
- Créé automatiquement lors de l'inscription

### `generated_documents`
- Stocke tous les documents générés par les utilisateurs
- Lié aux utilisateurs via `user_id`

### Row Level Security (RLS)
- Chaque utilisateur ne peut voir que ses propres données
- Sécurité au niveau de la base de données

## 🔒 Sécurité

- ✅ Authentification gérée par Supabase Auth
- ✅ Row Level Security (RLS) activé sur toutes les tables
- ✅ Middleware Next.js pour protéger les routes
- ✅ Variables d'environnement pour les secrets
- ✅ Validation côté client et serveur

## 📝 Personnalisation

### Ajouter un nouveau type de document

1. Ajoutez le type dans `types/index.ts` :
```typescript
export type DocumentType = 'cgv' | 'rgpd' | 'mentions' | 'cookies' | 'nouveau'
```

2. Créez la fonction de génération dans `lib/templates.ts` :
```typescript
export function generateNouveau(data: FormData): string {
  // Votre logique ici
  return `...`
}
```

3. Ajoutez l'option dans `DocumentForm.tsx` à l'étape 4

### Modifier les styles

Les styles sont dans :
- `app/globals.css` - Styles globaux et classes utilitaires
- `tailwind.config.ts` - Configuration Tailwind
- Composants individuels - Classes Tailwind inline

## 🐛 Dépannage

### Erreur de connexion Supabase
- Vérifiez que vos variables d'environnement sont correctes
- Vérifiez que le schéma SQL a été exécuté
- Vérifiez que RLS est activé

### Erreur lors du build
```bash
# Nettoyer et réinstaller
rm -rf .next node_modules
npm install
npm run build
```

### Les documents ne se génèrent pas
- Vérifiez la console du navigateur pour les erreurs
- Vérifiez que l'utilisateur est bien authentifié
- Vérifiez les permissions RLS dans Supabase

## 📞 Support

Pour toute question ou problème :
1. Consultez la documentation de [Next.js](https://nextjs.org/docs)
2. Consultez la documentation de [Supabase](https://supabase.com/docs)
3. Ouvrez une issue sur GitHub

## 📄 Licence

Ce projet est sous licence MIT.

## 🙏 Remerciements

- Next.js team
- Supabase team
- Vercel team
- La communauté open source

---

Développé avec ❤️ pour simplifier la conformité RGPD en Belgique
