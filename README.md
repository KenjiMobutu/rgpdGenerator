# Générateur de Conformité - CGV & RGPD (Droit Belge)

Une application web simple et professionnelle pour générer des documents de conformité légale (CGV, Politique de Confidentialité RGPD, Mentions Légales, Politique de Cookies) adaptés aux petits créateurs et entrepreneurs **belges**, conforme au droit belge et aux réglementations européennes.

## Fonctionnalités

- **6 niches prédéfinies** : Coach sportif, Vendeur Etsy, SaaS B2B, Formateur, Consultant, E-commerce
- **Formulaire en 4 étapes** guidé et intuitif
- **4 types de documents conformes au droit belge** :
  - Conditions Générales de Vente (CGV) - Code de droit économique belge (Livre VI)
  - Politique de Confidentialité (RGPD + loi belge du 30 juillet 2018)
  - Mentions Légales - Loi du 13 juin 2005 sur les communications électroniques
  - Politique de Cookies - Article 129 de la loi belge
- **Navigation flexible** : bouton retour sans perte de données
- **Interface responsive** : optimisée pour mobile, tablette et desktop
- **Génération instantanée** avec références légales belges précises
- **Téléchargement et copie** des documents générés
- **Formes juridiques belges** : Personne physique, SRL, SPRL, SA, SC, ASBL, Société Simple

## Installation

1. Clonez ou téléchargez ce répertoire
2. Ouvrez le fichier `index.html` dans votre navigateur web

Aucune installation de dépendances n'est nécessaire. L'application fonctionne entièrement côté client.

## Structure des fichiers

```
rgpdGenerator/
│
├── index.html          # Structure HTML de l'application
├── styles.css          # Styles CSS responsive
├── script.js           # Logique JavaScript principale
├── templates.js        # Templates de génération des documents
└── README.md           # Documentation
```

## Utilisation

1. **Sélectionnez votre type d'activité** parmi les 6 options proposées
2. **Remplissez le formulaire en 4 étapes** :
   - Étape 1 : Informations de l'entreprise
   - Étape 2 : Détails de l'activité et traitement des données
   - Étape 3 : Conditions commerciales
   - Étape 4 : Sélection des documents à générer
3. **Cliquez sur "Générer mes documents"**
4. **Copiez ou téléchargez** vos documents

## Personnalisation

### Ajouter une nouvelle niche

Dans [index.html](index.html), ajoutez un nouveau bouton dans la section `.business-types` :

```html
<button class="business-type-btn" data-type="votre-niche">
    <span class="icon">🎯</span>
    <span class="label">Votre Niche</span>
</button>
```

Dans [templates.js](templates.js), ajoutez la description dans la fonction `getBusinessTypeDescription()` :

```javascript
'votre-niche': 'propose des services de...'
```

### Modifier les couleurs

Dans [styles.css](styles.css), modifiez les variables CSS dans `:root` :

```css
:root {
    --primary-color: #2563eb;
    --primary-dark: #1e40af;
    /* ... autres couleurs */
}
```

## Technologies utilisées

- HTML5
- CSS3 (avec variables CSS et Grid/Flexbox)
- JavaScript Vanilla (ES6+)
- Aucune dépendance externe

## Compatibilité

- Chrome/Edge (dernières versions)
- Firefox (dernières versions)
- Safari (dernières versions)
- Responsive : Mobile, Tablette, Desktop

## Avertissement légal

⚠️ **Important** : Les documents générés par cette application sont fournis à titre informatif et constituent une base de travail conforme au droit belge. Ils ne remplacent pas les conseils d'un avocat spécialisé en droit belge.

Pour des situations juridiques complexes ou spécifiques, il est fortement recommandé de consulter un avocat belge spécialisé en droit commercial, droit de la consommation ou protection des données.

**Autorités belges de référence :**
- [Autorité de Protection des Données (APD)](https://www.autoriteprotectiondonnees.be) - Pour le RGPD
- [SPF Économie](https://economie.fgov.be) - Pour le Code de droit économique
- [Service de Médiation pour le Consommateur](https://consommateurs.fgov.be) - Pour les litiges

## Licence

Ce projet est fourni à des fins éducatives et peut être librement modifié et adapté selon vos besoins.

## Améliorations futures possibles

- Ajout de plus de niches métier
- Export en PDF
- Sauvegarde locale des données (localStorage)
- Multi-langue (anglais, espagnol, etc.)
- Templates plus personnalisables
- Intégration avec des APIs juridiques

## Contact

Pour toute question ou suggestion d'amélioration, n'hésitez pas à contribuer au projet.

---

**Créé avec soin pour simplifier la conformité des petits créateurs** ⚖️
