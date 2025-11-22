# 🚀 Guide de Déploiement Rapide

Ce guide vous permettra de déployer votre application RGPD Generator sur Vercel en 10 minutes.

## ✅ Checklist pré-déploiement

- [ ] Compte Supabase créé
- [ ] Compte Vercel créé (ou GitHub)
- [ ] Compte GitHub créé (si utilisation de Vercel)

## 📦 Étape 1 : Configuration de Supabase

### 1.1 Créer un projet Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Cliquez sur "Start your project"
3. Créez une organisation si nécessaire
4. Cliquez sur "New Project"
5. Remplissez :
   - **Name** : rgpd-generator (ou votre choix)
   - **Database Password** : Choisissez un mot de passe fort (notez-le !)
   - **Region** : Europe (West) - Ireland (ou le plus proche)
6. Cliquez sur "Create new project"
7. Attendez 2-3 minutes que le projet soit provisionné

### 1.2 Exécuter le script SQL

1. Dans le menu de gauche, cliquez sur **SQL Editor**
2. Cliquez sur "New query"
3. Copiez tout le contenu du fichier `supabase/schema.sql`
4. Collez-le dans l'éditeur
5. Cliquez sur "Run" (ou Ctrl/Cmd + Enter)
6. Vérifiez que tout s'est bien passé (message de succès)

### 1.3 Configurer l'authentification

1. Allez dans **Authentication** > **Providers**
2. **Email** est déjà activé par défaut ✅
3. **(Optionnel)** Pour activer Google OAuth :
   - Allez dans **Authentication** > **Providers** > **Google**
   - Suivez les instructions pour créer un projet Google OAuth
   - Ajoutez vos `Client ID` et `Client Secret`
   - Ajoutez `https://votre-projet.supabase.co/auth/v1/callback` dans les URL autorisées de Google

### 1.4 Récupérer les clés API

1. Allez dans **Settings** (⚙️ en bas à gauche) > **API**
2. Copiez ces deux valeurs (vous en aurez besoin plus tard) :
   ```
   Project URL: https://xxxxx.supabase.co
   anon public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

## 🌐 Étape 2 : Déploiement sur Vercel

### Option A : Via l'interface Vercel (Recommandé)

#### 2.1 Préparer le repository Git

```bash
cd nextjs-rgpd
git init
git add .
git commit -m "Initial commit: RGPD Generator Next.js app"
```

#### 2.2 Pousser sur GitHub

1. Créez un nouveau repository sur [github.com](https://github.com/new)
2. Nommez-le `rgpd-generator`
3. Ne cochez aucune option (pas de README, gitignore, etc.)
4. Cliquez sur "Create repository"
5. Exécutez dans votre terminal :

```bash
git remote add origin https://github.com/VOTRE_USERNAME/rgpd-generator.git
git branch -M main
git push -u origin main
```

#### 2.3 Déployer sur Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur "Add New..." > "Project"
3. Importez votre repository GitHub `rgpd-generator`
4. Configurez le projet :
   - **Framework Preset** : Next.js (détecté automatiquement)
   - **Root Directory** : ./
   - **Build Command** : `npm run build`
   - **Output Directory** : `.next`

5. **IMPORTANT** : Cliquez sur "Environment Variables" et ajoutez :
   ```
   NEXT_PUBLIC_SUPABASE_URL = https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
   (Utilisez les valeurs récupérées à l'étape 1.4)

6. Cliquez sur "Deploy"
7. Attendez 2-3 minutes
8. 🎉 Votre site est en ligne !

### Option B : Via la CLI Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Suivez les prompts:
# ? Set up and deploy "~/path/to/nextjs-rgpd"? [Y/n] y
# ? Which scope? [Select your account]
# ? Link to existing project? [n]
# ? What's your project's name? rgpd-generator
# ? In which directory is your code located? ./

# Ajouter les variables d'environnement
vercel env add NEXT_PUBLIC_SUPABASE_URL
# Collez votre URL Supabase

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# Collez votre clé Supabase

# Déployer en production
vercel --prod
```

## 🔧 Étape 3 : Configuration post-déploiement

### 3.1 Configurer les URL de redirection Supabase

1. Retournez sur Supabase
2. Allez dans **Authentication** > **URL Configuration**
3. Ajoutez votre URL Vercel dans **Site URL** :
   ```
   https://votre-app.vercel.app
   ```
4. Ajoutez également dans **Redirect URLs** :
   ```
   https://votre-app.vercel.app/app
   https://votre-app.vercel.app/auth
   ```

### 3.2 Tester l'application

1. Ouvrez votre site : `https://votre-app.vercel.app`
2. Testez l'inscription : Créez un compte avec un email
3. Vérifiez que vous êtes redirigé vers `/app`
4. Testez la génération de documents
5. Testez le téléchargement PDF

## 🎨 Étape 4 : Personnalisation (Optionnel)

### 4.1 Domaine personnalisé

1. Allez dans votre projet Vercel
2. **Settings** > **Domains**
3. Ajoutez votre domaine personnalisé
4. Suivez les instructions pour configurer vos DNS
5. **N'oubliez pas** de mettre à jour les redirect URLs dans Supabase !

### 4.2 Variables d'environnement supplémentaires

Si besoin, ajoutez d'autres variables dans Vercel :
- **Settings** > **Environment Variables**
- Ajoutez vos variables
- Redéployez : **Deployments** > **...** > **Redeploy**

## 🐛 Dépannage

### Erreur : "Failed to connect to Supabase"

**Cause** : Variables d'environnement incorrectes ou manquantes

**Solution** :
1. Vérifiez dans Vercel > Settings > Environment Variables
2. Assurez-vous que les valeurs sont correctes
3. Redéployez l'application

### Erreur : "Row Level Security policy violation"

**Cause** : Le script SQL n'a pas été exécuté correctement

**Solution** :
1. Allez dans Supabase > SQL Editor
2. Ré-exécutez le contenu de `supabase/schema.sql`
3. Vérifiez les logs d'erreur

### Erreur de build Next.js

**Cause** : Dépendances manquantes ou erreur TypeScript

**Solution** :
```bash
# Localement, testez le build
npm run build

# Si ça échoue, installez les dépendances
npm install

# Corrigez les erreurs TypeScript affichées
# Puis committez et pushez
```

### L'authentification Google ne fonctionne pas

**Cause** : Configuration OAuth incorrecte

**Solution** :
1. Vérifiez que vous avez ajouté les bon redirects dans Google Cloud Console
2. Le redirect doit être : `https://xxxxx.supabase.co/auth/v1/callback`
3. Vérifiez que le Client ID et Secret sont corrects dans Supabase

## 📊 Monitoring et Analytics

### Logs d'application

- **Vercel** : Allez dans votre projet > "Logs" pour voir les logs en temps réel
- **Supabase** : "Logs" dans le menu pour voir les requêtes SQL

### Performance

- **Vercel Analytics** : Activez dans Settings > Analytics
- **Supabase** : Consultez les métriques dans Database > Reports

## 🔐 Sécurité

### Checklist de sécurité

- [ ] RLS (Row Level Security) activé sur toutes les tables
- [ ] Variables d'environnement configurées (pas de clés en dur dans le code)
- [ ] HTTPS activé (automatique avec Vercel)
- [ ] Politique de mots de passe forte dans Supabase Auth
- [ ] Logs activés pour surveiller les accès

### Backups

Supabase fait des backups automatiques sur les plans payants. Pour le plan gratuit :
1. Allez dans Database > Backups
2. Vous pouvez faire des backups manuels

## 🚀 Mises à jour

### Déployer une nouvelle version

```bash
# 1. Faites vos modifications
# 2. Committez
git add .
git commit -m "Description des changements"

# 3. Pushez
git push origin main

# 4. Vercel détecte automatiquement et redéploie ! 🎉
```

## 💡 Prochaines étapes

1. **Ajoutez votre logo** dans `/public`
2. **Personnalisez les couleurs** dans `tailwind.config.ts`
3. **Ajoutez Google Analytics** si nécessaire
4. **Configurez un domaine personnalisé**
5. **Ajoutez des plans tarifaires** avec Stripe
6. **Configurez les emails** avec un service SMTP

## 📞 Besoin d'aide ?

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Supabase](https://supabase.com/docs)
- [Documentation Vercel](https://vercel.com/docs)
- [GitHub Issues](https://github.com/VOTRE_USERNAME/rgpd-generator/issues)

---

✅ **Félicitations !** Votre application RGPD Generator est maintenant en ligne et prête à l'emploi !
