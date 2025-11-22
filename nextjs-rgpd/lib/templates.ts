import { FormData, BusinessType } from '@/types'

export function generateCGV(data: FormData): string {
  const today = new Date().toLocaleDateString('fr-BE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const refundText = getRefundPolicyText(data)
  const businessTypeText = getBusinessTypeDescription(data.businessType)
  const phoneText = data.phone ? `<br>Téléphone : ${data.phone}` : ''

  return `
<h4>CONDITIONS GÉNÉRALES DE VENTE</h4>
<p><strong>Dernière mise à jour :</strong> ${today}</p>

<h4>1. PRÉSENTATION DE L'ENTREPRISE</h4>
<p>Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre ${data.companyName}, ${data.legalForm} immatriculée sous le numéro d'entreprise ${data.siret}, dont le siège social est situé à ${data.address}, et ses clients.</p>

<p><strong>Contact :</strong><br>
Email : ${data.email}${phoneText}<br>
Site web : ${data.website}</p>

<h4>2. OBJET</h4>
<p>${data.companyName} ${businessTypeText}</p>
<p><strong>Description des services :</strong><br>${data.servicesDescription}</p>

<h4>3. ACCEPTATION DES CONDITIONS</h4>
<p>Toute commande ou achat de services implique l'acceptation sans réserve des présentes CGV. Ces conditions prévalent sur tout autre document, conformément au Code de droit économique belge (Livre VI).</p>

<h4>4. PRIX</h4>
<p>Les prix sont indiqués en euros et toutes taxes comprises (TTC), incluant la TVA belge applicable. ${data.companyName} se réserve le droit de modifier ses prix à tout moment.</p>

<h4>5. COMMANDE ET PAIEMENT</h4>
<p><strong>Moyens de paiement acceptés :</strong> ${data.paymentMethods}</p>
<p>La commande n'est définitive qu'après réception du paiement complet.</p>

<h4>6. LIVRAISON / ACCÈS AUX SERVICES</h4>
<p>Les services sont accessibles dans le délai suivant : ${data.deliveryTime}</p>

<h4>7. DROIT DE RÉTRACTATION ET REMBOURSEMENT</h4>
${refundText}
${data.guarantee ? `<p><strong>Garantie :</strong> ${data.guarantee}</p>` : ''}

<h4>8. PROPRIÉTÉ INTELLECTUELLE</h4>
<p>Tous les contenus présents sur ${data.website} sont protégés par le droit d'auteur belge et international.</p>

<h4>9. PROTECTION DES DONNÉES PERSONNELLES</h4>
<p>Les données personnelles collectées font l'objet d'un traitement conforme au RGPD. Pour plus d'informations, consultez notre Politique de Confidentialité.</p>

<h4>10. RESPONSABILITÉ</h4>
<p>${data.companyName} s'engage à fournir ses services avec diligence et professionnalisme.</p>

<h4>11. RÉCLAMATIONS</h4>
<p>Pour toute réclamation, le client peut contacter ${data.companyName} par email à ${data.email}.</p>

<h4>12. RÈGLEMENT DES LITIGES</h4>
<p>En cas de litige, le client consommateur peut contacter le Service de Médiation pour le Consommateur.</p>

<h4>13. DROIT APPLICABLE</h4>
<p>Les présentes CGV sont soumises au droit belge.</p>
  `.trim()
}

export function generateRGPD(data: FormData): string {
  const today = new Date().toLocaleDateString('fr-BE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const sensitiveDataText =
    data.sensitiveData === 'oui'
      ? `<p><strong>⚠️ Données sensibles :</strong> Nous collectons également : ${data.sensitiveDataType}. Ces données font l'objet d'une protection renforcée.</p>`
      : ''

  return `
<h4>POLITIQUE DE CONFIDENTIALITÉ (RGPD)</h4>
<p><strong>Dernière mise à jour :</strong> ${today}</p>

<h4>1. RESPONSABLE DU TRAITEMENT</h4>
<p>${data.companyName}, ${data.legalForm}<br>
Numéro d'entreprise BCE : ${data.siret}<br>
Adresse : ${data.address}<br>
Email : ${data.email}</p>

<p>En Belgique, les données personnelles sont régies par :</p>
<ul>
<li>Le Règlement Général sur la Protection des Données (RGPD)</li>
<li>La loi belge du 30 juillet 2018</li>
</ul>

<h4>2. DONNÉES COLLECTÉES</h4>
<p>Dans le cadre de l'utilisation de nos services, nous collectons les données personnelles suivantes :</p>
<ul>
<li><strong>Données d'identification :</strong> nom, prénom, email, adresse</li>
<li><strong>Données de connexion :</strong> adresse IP, logs de connexion</li>
<li><strong>Données transactionnelles :</strong> historique des commandes</li>
</ul>
${sensitiveDataText}

<h4>3. FINALITÉS DU TRAITEMENT</h4>
<p>Vos données sont collectées pour :</p>
<ul>
<li>Gestion de votre compte client et fourniture des services</li>
<li>Traitement de vos commandes et facturation</li>
<li>Communication avec vous (support, notifications)</li>
<li>Amélioration de nos services</li>
</ul>

<h4>4. BASE LÉGALE</h4>
<p>Le traitement de vos données repose sur :</p>
<ul>
<li><strong>L'exécution du contrat</strong> (Article 6.1.b du RGPD)</li>
<li><strong>Votre consentement</strong> (Article 6.1.a du RGPD)</li>
<li><strong>Nos obligations légales</strong> (Article 6.1.c du RGPD)</li>
</ul>

<h4>5. DURÉE DE CONSERVATION</h4>
<p>Vos données sont conservées pendant :</p>
<ul>
<li>La durée de la relation contractuelle</li>
<li>3 ans après la fin de la relation pour les données de prospection</li>
<li>7 ans pour les données comptables (obligation légale belge)</li>
</ul>

<h4>6. DESTINATAIRES DES DONNÉES</h4>
<p>Vos données peuvent être partagées avec :</p>
<ul>
<li>Notre équipe interne</li>
<li>Nos prestataires techniques (hébergement : ${data.hosting})</li>
<li>Nos prestataires de paiement (${data.paymentMethods})</li>
<li>Les autorités belges sur demande légale</li>
</ul>
<p><strong>Nous ne vendons jamais vos données à des tiers.</strong></p>

<h4>7. SÉCURITÉ DES DONNÉES</h4>
<p>Nous mettons en œuvre toutes les mesures techniques et organisationnelles appropriées :</p>
<ul>
<li>Chiffrement des données sensibles (SSL/TLS)</li>
<li>Accès restreint aux données personnelles</li>
<li>Hébergement sécurisé : ${data.hosting}</li>
<li>Sauvegardes régulières</li>
</ul>

<h4>8. VOS DROITS</h4>
<p>Conformément au RGPD et à la loi belge, vous disposez des droits suivants :</p>
<ul>
<li><strong>Droit d'accès :</strong> obtenir une copie de vos données</li>
<li><strong>Droit de rectification :</strong> corriger vos données inexactes</li>
<li><strong>Droit à l'effacement :</strong> supprimer vos données</li>
<li><strong>Droit à la limitation :</strong> limiter le traitement</li>
<li><strong>Droit à la portabilité :</strong> recevoir vos données</li>
<li><strong>Droit d'opposition :</strong> vous opposer au traitement</li>
</ul>

<p><strong>Pour exercer vos droits :</strong> Contactez-nous à ${data.email}</p>

<h4>9. RÉCLAMATION</h4>
<p>Si vous estimez que vos droits ne sont pas respectés, vous pouvez déposer une réclamation auprès de l'Autorité de Protection des Données (APD) belge :</p>
<ul>
<li><strong>Site web :</strong> <a href="https://www.autoriteprotectiondonnees.be">www.autoriteprotectiondonnees.be</a></li>
<li><strong>Email :</strong> contact@apd-gba.be</li>
</ul>

<h4>10. COOKIES</h4>
<p>Pour plus d'informations sur l'utilisation des cookies, consultez notre Politique de Cookies.</p>

<h4>11. MODIFICATIONS</h4>
<p>Nous nous réservons le droit de modifier cette politique de confidentialité. Toute modification sera publiée sur cette page.</p>
  `.trim()
}

export function generateMentionsLegales(data: FormData): string {
  const today = new Date().toLocaleDateString('fr-BE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const phoneText = data.phone ? `<br><strong>Téléphone :</strong> ${data.phone}` : ''

  return `
<h4>MENTIONS LÉGALES</h4>
<p><strong>Dernière mise à jour :</strong> ${today}</p>

<h4>1. ÉDITEUR DU SITE</h4>
<p><strong>Raison sociale :</strong> ${data.companyName}<br>
<strong>Forme juridique :</strong> ${data.legalForm}<br>
<strong>Numéro d'entreprise BCE :</strong> ${data.siret}<br>
<strong>Adresse du siège social :</strong> ${data.address}<br>
<strong>Email :</strong> ${data.email}${phoneText}<br>
<strong>Site web :</strong> ${data.website}</p>

<h4>2. NUMÉRO DE TVA</h4>
<p>Numéro de TVA intracommunautaire : BE [à compléter]</p>

<h4>3. DIRECTEUR DE LA PUBLICATION</h4>
<p>Le directeur de la publication est le représentant légal de ${data.companyName}.</p>

<h4>4. HÉBERGEMENT</h4>
<p>Le site ${data.website} est hébergé par :<br>
${data.hosting}</p>
<p><em>Conformément à l'article 74 de la loi du 13 juin 2005 relative aux communications électroniques.</em></p>

<h4>5. PROPRIÉTÉ INTELLECTUELLE</h4>
<p>L'ensemble du contenu de ce site est la propriété exclusive de ${data.companyName} ou de ses partenaires. Tous les droits de propriété intellectuelle sont réservés.</p>

<h4>6. PROTECTION DES DONNÉES PERSONNELLES</h4>
<p>Les données personnelles collectées sur ce site font l'objet d'un traitement conforme :</p>
<ul>
<li>Au Règlement Général sur la Protection des Données (RGPD)</li>
<li>À la loi belge du 30 juillet 2018</li>
</ul>
<p>Pour plus d'informations, consultez notre Politique de Confidentialité.</p>
<p>Autorité de contrôle : <a href="https://www.autoriteprotectiondonnees.be">Autorité de Protection des Données (APD)</a></p>

<h4>7. COOKIES</h4>
<p>Ce site utilise des cookies conformément à la législation belge. Pour plus d'informations, consultez notre Politique de Cookies.</p>

<h4>8. LIENS HYPERTEXTES</h4>
<p>Le site peut contenir des liens vers des sites tiers. ${data.companyName} décline toute responsabilité quant à leur contenu.</p>

<h4>9. LIMITATION DE RESPONSABILITÉ</h4>
<p>${data.companyName} s'efforce d'assurer l'exactitude des informations diffusées sur ce site.</p>

<h4>10. DROIT APPLICABLE</h4>
<p>Les présentes mentions légales sont régies par le droit belge.</p>

<h4>11. CONTACT</h4>
<p>Pour toute question concernant ces mentions légales :<br>
Email : ${data.email}${phoneText}</p>
  `.trim()
}

export function generatePolitiqueCookies(data: FormData): string {
  const today = new Date().toLocaleDateString('fr-BE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  let cookiesDetails = ''

  if (data.cookies === 'non') {
    cookiesDetails = `<p>Ce site n'utilise pas de cookies de traçage ou de publicité. Seuls des cookies techniques strictement nécessaires au fonctionnement du site peuvent être utilisés.</p>`
  } else if (data.cookies === 'analytics') {
    cookiesDetails = `
<h4>COOKIES UTILISÉS</h4>
<p><strong>1. Cookies strictement nécessaires</strong></p>
<p>Ces cookies sont essentiels pour le bon fonctionnement du site.</p>

<p><strong>2. Cookies analytiques</strong></p>
<p>Nous utilisons des outils d'analyse (type Google Analytics) pour comprendre comment les visiteurs utilisent notre site.</p>
<ul>
<li>Durée : 13 mois maximum</li>
<li>Finalité : Statistiques de visite</li>
</ul>
    `
  } else {
    cookiesDetails = `
<h4>COOKIES UTILISÉS</h4>
<p><strong>1. Cookies strictement nécessaires</strong></p>
<p>Essentiels pour le fonctionnement du site.</p>

<p><strong>2. Cookies analytiques</strong></p>
<p>Pour comprendre l'utilisation du site.</p>

<p><strong>3. Cookies publicitaires</strong></p>
<p>Pour afficher des publicités personnalisées.</p>
    `
  }

  return `
<h4>POLITIQUE DE COOKIES</h4>
<p><strong>Dernière mise à jour :</strong> ${today}</p>

<h4>1. CADRE LÉGAL</h4>
<p>Cette politique de cookies est conforme à :</p>
<ul>
<li>L'article 129 de la loi belge du 13 juin 2005</li>
<li>Le Règlement Général sur la Protection des Données (RGPD)</li>
<li>Les recommandations de l'Autorité de Protection des Données (APD) belge</li>
</ul>

<h4>2. QU'EST-CE QU'UN COOKIE ?</h4>
<p>Un cookie est un petit fichier texte déposé sur votre appareil lors de la visite d'un site web.</p>

<h4>3. POURQUOI UTILISONS-NOUS DES COOKIES ?</h4>
<p>Sur ${data.website}, nous utilisons des cookies pour :</p>
<ul>
<li>Assurer le bon fonctionnement technique du site</li>
<li>Améliorer votre expérience de navigation</li>
<li>Analyser la fréquentation du site</li>
${data.cookies === 'publicite' ? '<li>Personnaliser les contenus et publicités</li>' : ''}
</ul>

${cookiesDetails}

<h4>4. GESTION DE VOS PRÉFÉRENCES</h4>
<p>Vous pouvez à tout moment modifier ou retirer votre consentement via les paramètres de votre navigateur.</p>

<h4>5. DURÉE DE CONSERVATION</h4>
<p>Les cookies sont conservés pour une durée maximale de 13 mois conformément aux recommandations de l'APD.</p>

<h4>6. VOS DROITS</h4>
<p>Vous disposez des droits suivants concernant les données collectées via les cookies :</p>
<ul>
<li>Droit d'accès à vos données</li>
<li>Droit de rectification</li>
<li>Droit à l'effacement</li>
<li>Droit de retirer votre consentement</li>
</ul>

<p>Pour exercer ces droits, contactez-nous à ${data.email}.</p>

<h4>7. RÉCLAMATION</h4>
<p>Vous pouvez déposer une réclamation auprès de l'APD : <a href="https://www.autoriteprotectiondonnees.be">www.autoriteprotectiondonnees.be</a></p>

<h4>8. CONTACT</h4>
<p>Email : ${data.email}</p>
  `.trim()
}

// Helper functions

function getRefundPolicyText(data: FormData): string {
  switch (data.refundPolicy) {
    case '14-jours':
      return `
<p>Conformément au Livre VI du Code de droit économique belge, vous disposez d'un délai de 14 jours pour exercer votre droit de rétractation.</p>
<p>Pour exercer ce droit, vous devez nous notifier par email à ${data.email}.</p>
<p>Le remboursement sera effectué dans un délai de 14 jours.</p>
      `.trim()

    case '30-jours':
      return `
<p>${data.companyName} offre une garantie "Satisfait ou Remboursé" de 30 jours.</p>
<p>Pour demander un remboursement, contactez-nous à ${data.email}.</p>
      `.trim()

    case 'aucun':
      return `
<p>Les services proposés sont des contenus numériques dont l'exécution commence immédiatement après paiement.</p>
<p>Conformément au Code de droit économique belge, le droit de rétractation ne s'applique pas.</p>
      `.trim()

    case 'personnalise':
      return `
<p><strong>Politique de remboursement :</strong><br>${data.customRefundText || 'Politique personnalisée à définir.'}</p>
      `.trim()

    default:
      return ''
  }
}

function getBusinessTypeDescription(businessType: BusinessType): string {
  const descriptions: Record<BusinessType, string> = {
    'coach-sportif':
      'propose des services de coaching sportif en ligne, comprenant des programmes d\'entraînement personnalisés et un suivi individuel',
    'vendeur-etsy': 'propose des créations artisanales uniques faites à la main',
    'saas-b2b':
      'propose une solution logicielle en mode SaaS (Software as a Service) destinée aux entreprises',
    formateur:
      'propose des formations en ligne sous forme de cours vidéo et ressources pédagogiques',
    consultant:
      'propose des services de conseil et d\'accompagnement professionnel',
    ecommerce: 'propose la vente en ligne de produits via sa boutique e-commerce',
  }

  return descriptions[businessType] || 'propose ses services en ligne'
}
