# ⚡ Démarrage Ultra-Rapide

## 🎯 En 3 commandes

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer l'environnement
cp .env.local.example .env.local
# Éditez .env.local avec vos clés Supabase

# 3. Lancer l'app
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000)

## 🔑 Obtenir vos clés Supabase (2 minutes)

1. Allez sur [supabase.com](https://supabase.com)
2. Créez un projet
3. Allez dans Settings > API
4. Copiez :
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public key` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 📊 Configurer la base de données (1 minute)

1. Dans Supabase, allez dans SQL Editor
2. Copiez le contenu de `supabase/schema.sql`
3. Exécutez-le

## 🚀 Déployer sur Vercel (3 minutes)

```bash
npm i -g vercel
vercel login
vercel
```

Ajoutez les variables d'environnement dans le dashboard Vercel.

## 📖 Documentation complète

- [README.md](./README.md) - Documentation complète
- [DEPLOY.md](./DEPLOY.md) - Guide de déploiement détaillé

## 🐛 Problèmes ?

Vérifiez que :
- ✅ Node.js 18+ est installé
- ✅ Les variables d'environnement sont correctes
- ✅ Le script SQL a été exécuté dans Supabase
- ✅ Vous êtes connecté à internet

---

**Prêt en moins de 10 minutes !** 🎉
