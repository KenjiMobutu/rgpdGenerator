# Guide de Test - Générateur de Conformité Belgique

## Tests à effectuer

### ✅ Test 1 : Chargement initial
1. Ouvrir `index.html` dans un navigateur
2. Vérifier que la page s'affiche correctement
3. Vérifier que les 6 boutons de niche sont visibles
4. **Résultat attendu** : Pas d'erreur dans la console

### ✅ Test 2 : Sélection d'activité
1. Cliquer sur une niche (ex: "Coach Sportif en Ligne")
2. Vérifier que le formulaire s'affiche
3. Vérifier que la barre de progression est à 25%
4. **Résultat attendu** : Transition fluide vers le formulaire

### ✅ Test 3 : Bouton retour sans perte de données
1. Remplir quelques champs du formulaire :
   - Nom : "Test Entreprise"
   - Forme juridique : "SRL"
   - BCE : "0123.456.789"
2. Cliquer sur "← Retour au choix d'activité"
3. Vérifier qu'on revient à l'écran de sélection
4. Cliquer à nouveau sur la même niche
5. **Résultat attendu** : Les données saisies sont toujours présentes dans les champs

### ✅ Test 4 : Navigation entre étapes
1. Remplir tous les champs obligatoires de l'étape 1
2. Cliquer sur "Suivant"
3. Vérifier qu'on passe à l'étape 2
4. Vérifier que la barre de progression est à 50%
5. Cliquer sur "Précédent"
6. **Résultat attendu** : Retour à l'étape 1 avec les données conservées

### ✅ Test 5 : Validation des champs
1. À l'étape 1, laisser des champs vides
2. Cliquer sur "Suivant"
3. **Résultat attendu** : Message "Veuillez remplir tous les champs obligatoires (*)"

### ✅ Test 6 : Génération de documents
1. Remplir tous les champs du formulaire (4 étapes)
2. À l'étape 4, sélectionner les 4 types de documents
3. Cliquer sur "Générer mes documents"
4. **Résultat attendu** :
   - 4 documents s'affichent
   - CGV avec références au Code de droit économique belge
   - RGPD avec mention de l'APD
   - Mentions Légales avec numéro BCE
   - Politique de Cookies avec Article 129

### ✅ Test 7 : Spécificités belges
Vérifier dans les documents générés :
- [ ] Numéro d'entreprise BCE (pas SIRET)
- [ ] Forme juridique belge (SRL, SA, etc.)
- [ ] Référence à l'APD (pas CNIL)
- [ ] Code de droit économique belge
- [ ] Loi belge du 30 juillet 2018
- [ ] Conservation comptable : 7 ans (pas 10)
- [ ] Article 129 loi du 13 juin 2005 (cookies)
- [ ] Service de Médiation pour le Consommateur

### ✅ Test 8 : Copier et télécharger
1. Après génération, cliquer sur "📋 Copier"
2. Coller dans un éditeur de texte
3. Cliquer sur "⬇️ Télécharger"
4. **Résultat attendu** :
   - Texte copié dans le presse-papier
   - Fichier .txt téléchargé

### ✅ Test 9 : Responsive (mobile)
1. Ouvrir les DevTools (F12)
2. Activer le mode responsive
3. Tester en 375px (iPhone)
4. **Résultat attendu** : Interface adaptée, boutons empilés verticalement

### ✅ Test 10 : Footer et liens
1. Faire défiler jusqu'au footer
2. Cliquer sur les liens "APD", "SPF Économie", "Médiation Consommateur"
3. **Résultat attendu** : Liens s'ouvrent dans un nouvel onglet

## Problèmes connus résolus

### ❌ Erreur : "An invalid form control with name='' is not focusable"
**Solution** : Le script gère maintenant dynamiquement l'attribut `required` pour ne l'appliquer qu'aux champs de l'étape visible.

### ❌ Documents ne se génèrent pas
**Solution** : Le fichier `templates.js` doit être chargé avant `script.js` (vérifié dans index.html).

### ❌ Pas de bouton retour
**Solution** : Ajout du bouton "← Retour au choix d'activité" qui conserve les données.

## Checklist de conformité droit belge

- [x] Formes juridiques belges (SRL, SPRL, SA, SC, ASBL, etc.)
- [x] Numéro d'entreprise BCE (format 0XXX.XXX.XXX)
- [x] Code de droit économique belge (Livre VI)
- [x] Loi du 30 juillet 2018 (protection des données)
- [x] Article 129 loi du 13 juin 2005 (cookies)
- [x] APD (Autorité de Protection des Données)
- [x] SPF Économie et SPF Finances
- [x] Service de Médiation pour le Consommateur
- [x] Conservation comptable 7 ans (obligation belge)
- [x] Droit de rétractation 14 jours (Code de droit économique)
- [x] Mentions TVA intracommunautaire (BE + numéro)

## Performance

### Temps de chargement attendu
- Page initiale : < 1s
- Génération documents : < 500ms
- Transition entre écrans : 200ms

### Compatibilité navigateurs
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## Support

Pour tout problème, vérifier :
1. La console JavaScript (F12)
2. Que `templates.js` est chargé avant `script.js`
3. Que tous les champs obligatoires sont remplis
4. Le format du numéro BCE (0XXX.XXX.XXX)

---

**Tests réalisés le** : [Date]
**Navigateur** : [Nom et version]
**Résultat** : ✅ PASS / ❌ FAIL
