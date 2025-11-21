// Templates de documents adaptés au droit belge

function generateCGV(data) {
    const today = new Date().toLocaleDateString('fr-BE', { day: 'numeric', month: 'long', year: 'numeric' });

    const refundText = getRefundPolicyText(data);
    const businessTypeText = getBusinessTypeDescription(data.businessType);

    return `
<h4>CONDITIONS GÉNÉRALES DE VENTE</h4>
<p><strong>Dernière mise à jour :</strong> ${today}</p>

<h4>1. PRÉSENTATION DE L'ENTREPRISE</h4>
<p>Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre ${data.companyName}, ${data.legalForm} immatriculée sous le numéro d'entreprise ${data.siret}, dont le siège social est situé à ${data.address}, et ses clients.</p>

<p><strong>Contact :</strong><br>
Email : ${data.email}${data.phone ? '<br>Téléphone : ' + data.phone : ''}<br>
Site web : ${data.website}</p>

<h4>2. OBJET</h4>
<p>${data.companyName} ${businessTypeText}</p>
<p><strong>Description des services :</strong><br>${data.servicesDescription}</p>

<h4>3. ACCEPTATION DES CONDITIONS</h4>
<p>Toute commande ou achat de services implique l'acceptation sans réserve des présentes CGV. Ces conditions prévalent sur tout autre document, conformément au Code de droit économique belge (Livre VI).</p>

<h4>4. PRIX</h4>
<p>Les prix sont indiqués en euros et toutes taxes comprises (TTC), incluant la TVA belge applicable. ${data.companyName} se réserve le droit de modifier ses prix à tout moment, mais les services seront facturés sur la base des tarifs en vigueur au moment de la validation de la commande.</p>

<h4>5. COMMANDE ET PAIEMENT</h4>
<p><strong>Moyens de paiement acceptés :</strong> ${data.paymentMethods}</p>
<p>La commande n'est définitive qu'après réception du paiement complet. En cas de défaut de paiement, ${data.companyName} se réserve le droit de suspendre ou d'annuler l'accès aux services, conformément aux dispositions légales belges.</p>

<h4>6. LIVRAISON / ACCÈS AUX SERVICES</h4>
<p>Les services sont accessibles dans le délai suivant : ${data.deliveryTime}</p>
<p>En cas de retard, le client sera informé par email. Les délais indiqués sont donnés à titre indicatif. En cas de dépassement significatif, le client dispose de recours conformément au Code de droit économique.</p>

<h4>7. DROIT DE RÉTRACTATION ET REMBOURSEMENT</h4>
${refundText}
${data.guarantee ? '<p><strong>Garantie :</strong> ' + data.guarantee + '</p>' : ''}

<h4>8. PROPRIÉTÉ INTELLECTUELLE</h4>
<p>Tous les contenus présents sur ${data.website} (textes, images, vidéos, logos, etc.) sont protégés par le droit d'auteur belge et international et appartiennent à ${data.companyName} ou à ses partenaires. Toute reproduction non autorisée est interdite.</p>

<h4>9. PROTECTION DES DONNÉES PERSONNELLES</h4>
<p>Les données personnelles collectées font l'objet d'un traitement conforme au RGPD (Règlement Général sur la Protection des Données) et à la loi belge du 30 juillet 2018 relative à la protection des personnes physiques. Pour plus d'informations, consultez notre Politique de Confidentialité.</p>

<h4>10. RESPONSABILITÉ</h4>
<p>${data.companyName} s'engage à fournir ses services avec diligence et professionnalisme. Toutefois, sa responsabilité ne peut être engagée en cas de :</p>
<ul>
<li>Force majeure ou événements indépendants de sa volonté</li>
<li>Mauvaise utilisation des services par le client</li>
<li>Défaillance technique imputable à un tiers</li>
</ul>
<p>En tout état de cause, la responsabilité de ${data.companyName} est limitée au montant effectivement payé par le client.</p>

<h4>11. RÉCLAMATIONS</h4>
<p>Pour toute réclamation, le client peut contacter ${data.companyName} par email à ${data.email}. Nous nous engageons à répondre dans un délai de 7 jours ouvrés.</p>

<h4>12. RÈGLEMENT DES LITIGES</h4>
<p>En cas de litige, le client consommateur peut :</p>
<ul>
<li>Contacter le Service de Médiation pour le Consommateur (SMC) : <a href="https://consommateurs.fgov.be">consommateurs.fgov.be</a></li>
<li>Utiliser la plateforme européenne de résolution des litiges en ligne : <a href="https://ec.europa.eu/consumers/odr">ec.europa.eu/consumers/odr</a></li>
</ul>

<h4>13. DROIT APPLICABLE</h4>
<p>Les présentes CGV sont soumises au droit belge. En cas de litige, et à défaut d'accord amiable ou de médiation réussie, les tribunaux de l'arrondissement judiciaire du siège social de ${data.companyName} seront seuls compétents.</p>
    `.trim();
}

function generateRGPD(data) {
    const today = new Date().toLocaleDateString('fr-BE', { day: 'numeric', month: 'long', year: 'numeric' });

    const cookiesText = getCookiesDescription(data.cookies);
    const sensitiveDataText = data.sensitiveData === 'oui'
        ? `<p><strong>⚠️ Données sensibles :</strong> Nous collectons également les types de données suivants : ${data.sensitiveDataType}. Ces données font l'objet d'une protection renforcée conformément au RGPD.</p>`
        : '';

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
<li>Le Règlement Général sur la Protection des Données (RGPD - Règlement UE 2016/679)</li>
<li>La loi belge du 30 juillet 2018 relative à la protection des personnes physiques</li>
</ul>

<h4>2. DONNÉES COLLECTÉES</h4>
<p>Dans le cadre de l'utilisation de nos services, nous collectons les données personnelles suivantes :</p>
<ul>
<li><strong>Données d'identification :</strong> nom, prénom, email, adresse</li>
<li><strong>Données de connexion :</strong> adresse IP, logs de connexion</li>
<li><strong>Données transactionnelles :</strong> historique des commandes, informations de paiement</li>
</ul>
${sensitiveDataText}

<h4>3. FINALITÉS DU TRAITEMENT</h4>
<p>Vos données sont collectées pour les finalités suivantes :</p>
<ul>
<li>Gestion de votre compte client et fourniture des services</li>
<li>Traitement de vos commandes et facturation</li>
<li>Communication avec vous (support, notifications)</li>
<li>Amélioration de nos services</li>
<li>Respect de nos obligations légales (comptabilité, TVA)</li>
</ul>

<h4>4. BASE LÉGALE</h4>
<p>Le traitement de vos données repose sur :</p>
<ul>
<li><strong>L'exécution du contrat :</strong> pour la fourniture des services (Article 6.1.b du RGPD)</li>
<li><strong>Votre consentement :</strong> pour les communications marketing, révocable à tout moment (Article 6.1.a du RGPD)</li>
<li><strong>Nos obligations légales :</strong> pour la comptabilité et les obligations fiscales belges (Article 6.1.c du RGPD)</li>
<li><strong>Nos intérêts légitimes :</strong> pour la sécurité et la prévention de la fraude (Article 6.1.f du RGPD)</li>
</ul>

<h4>5. DURÉE DE CONSERVATION</h4>
<p>Vos données sont conservées pendant :</p>
<ul>
<li>La durée de la relation contractuelle</li>
<li>3 ans après la fin de la relation pour les données de prospection</li>
<li>7 ans pour les données comptables et fiscales (obligation légale belge)</li>
<li>Les données de connexion (logs) : 1 an maximum</li>
</ul>

<h4>6. DESTINATAIRES DES DONNÉES</h4>
<p>Vos données peuvent être partagées avec :</p>
<ul>
<li>Notre équipe interne (accès limité au strict nécessaire)</li>
<li>Nos prestataires techniques (hébergement : ${data.hosting})</li>
<li>Nos prestataires de paiement (${data.paymentMethods})</li>
<li>Les autorités belges (SPF Finances, etc.) sur demande légale</li>
</ul>
<p><strong>Nous ne vendons jamais vos données à des tiers.</strong></p>

<h4>7. SÉCURITÉ DES DONNÉES</h4>
<p>Nous mettons en œuvre toutes les mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, perte ou divulgation :</p>
<ul>
<li>Chiffrement des données sensibles (SSL/TLS)</li>
<li>Accès restreint aux données personnelles (authentification forte)</li>
<li>Hébergement sécurisé : ${data.hosting}</li>
<li>Sauvegardes régulières et sécurisées</li>
<li>Pseudonymisation lorsque possible</li>
</ul>

<h4>8. VOS DROITS</h4>
<p>Conformément au RGPD et à la loi belge, vous disposez des droits suivants :</p>
<ul>
<li><strong>Droit d'accès (Art. 15 RGPD) :</strong> obtenir une copie de vos données</li>
<li><strong>Droit de rectification (Art. 16 RGPD) :</strong> corriger vos données inexactes</li>
<li><strong>Droit à l'effacement (Art. 17 RGPD) :</strong> supprimer vos données ("droit à l'oubli")</li>
<li><strong>Droit à la limitation (Art. 18 RGPD) :</strong> limiter le traitement de vos données</li>
<li><strong>Droit à la portabilité (Art. 20 RGPD) :</strong> recevoir vos données dans un format structuré</li>
<li><strong>Droit d'opposition (Art. 21 RGPD) :</strong> vous opposer au traitement de vos données</li>
<li><strong>Droit de retirer votre consentement :</strong> à tout moment pour les traitements basés sur le consentement</li>
<li><strong>Droit de ne pas faire l'objet d'une décision automatisée</strong></li>
</ul>

<p><strong>Pour exercer vos droits :</strong> Contactez-nous à ${data.email} avec une copie de votre carte d'identité (recto uniquement). Nous vous répondrons sous 30 jours maximum (délai RGPD : 1 mois, prolongeable de 2 mois si complexe).</p>

<h4>9. RÉCLAMATION</h4>
<p>Si vous estimez que vos droits ne sont pas respectés, vous pouvez déposer une réclamation auprès de l'Autorité de Protection des Données (APD) belge :</p>
<ul>
<li><strong>Site web :</strong> <a href="https://www.autoriteprotectiondonnees.be">www.autoriteprotectiondonnees.be</a></li>
<li><strong>Adresse :</strong> Rue de la Presse 35, 1000 Bruxelles</li>
<li><strong>Email :</strong> contact@apd-gba.be</li>
</ul>

<h4>10. COOKIES ET TRACEURS</h4>
${cookiesText}

<h4>11. TRANSFERTS DE DONNÉES HORS UE</h4>
<p>Vos données sont hébergées au sein de l'Union Européenne (${data.hosting}). En cas de transfert hors UE, nous nous assurons que des garanties appropriées sont en place conformément à l'Article 46 du RGPD (clauses contractuelles types approuvées par la Commission européenne, etc.).</p>

<h4>12. DÉLÉGUÉ À LA PROTECTION DES DONNÉES (DPO)</h4>
<p>Pour toute question relative à la protection de vos données personnelles, vous pouvez contacter : ${data.email}</p>
<p><em>Note : La désignation d'un DPO est obligatoire pour certaines organisations selon l'Article 37 du RGPD.</em></p>

<h4>13. MODIFICATIONS</h4>
<p>Nous nous réservons le droit de modifier cette politique de confidentialité. Toute modification sera publiée sur cette page avec une nouvelle date de mise à jour. Les modifications substantielles vous seront notifiées par email.</p>
    `.trim();
}

function generateMentionsLegales(data) {
    const today = new Date().toLocaleDateString('fr-BE', { day: 'numeric', month: 'long', year: 'numeric' });

    return `
<h4>MENTIONS LÉGALES</h4>
<p><strong>Dernière mise à jour :</strong> ${today}</p>

<h4>1. ÉDITEUR DU SITE</h4>
<p><strong>Raison sociale :</strong> ${data.companyName}<br>
<strong>Forme juridique :</strong> ${data.legalForm}<br>
<strong>Numéro d'entreprise BCE :</strong> ${data.siret}<br>
<strong>Adresse du siège social :</strong> ${data.address}<br>
<strong>Email :</strong> ${data.email}${data.phone ? '<br><strong>Téléphone :</strong> ' + data.phone : ''}<br>
<strong>Site web :</strong> ${data.website}</p>

${data.legalForm.includes('SRL') || data.legalForm.includes('SA') || data.legalForm.includes('SPRL') ? `<h4>2. CAPITAL SOCIAL</h4>
<p>Le capital social de ${data.companyName} s'élève à [à compléter] euros.</p>` : ''}

<h4>3. NUMÉRO DE TVA</h4>
<p>Numéro de TVA intracommunautaire : BE [à compléter]</p>
<p><em>Les entreprises belges assujetties à la TVA doivent mentionner leur numéro de TVA.</em></p>

<h4>4. DIRECTEUR DE LA PUBLICATION</h4>
<p>Le directeur de la publication est le représentant légal de ${data.companyName}.</p>

<h4>5. HÉBERGEMENT</h4>
<p>Le site ${data.website} est hébergé par :<br>
${data.hosting}</p>
<p><em>Conformément à l'article 74 de la loi du 13 juin 2005 relative aux communications électroniques.</em></p>

<h4>6. PROPRIÉTÉ INTELLECTUELLE</h4>
<p>L'ensemble du contenu de ce site (textes, images, vidéos, logos, etc.) est la propriété exclusive de ${data.companyName} ou de ses partenaires. Tous les droits de propriété intellectuelle sont réservés.</p>
<p>Toute reproduction, distribution ou utilisation sans autorisation préalable écrite est strictement interdite et constituerait une contrefaçon sanctionnée par la loi belge du 30 juin 1994 relative au droit d'auteur et aux droits voisins.</p>

<h4>7. PROTECTION DES DONNÉES PERSONNELLES</h4>
<p>Les données personnelles collectées sur ce site font l'objet d'un traitement conforme :</p>
<ul>
<li>Au Règlement Général sur la Protection des Données (RGPD - Règlement UE 2016/679)</li>
<li>À la loi belge du 30 juillet 2018 relative à la protection des personnes physiques</li>
</ul>
<p>Pour plus d'informations, consultez notre Politique de Confidentialité.</p>
<p>Autorité de contrôle : <a href="https://www.autoriteprotectiondonnees.be">Autorité de Protection des Données (APD)</a></p>

<h4>8. COOKIES</h4>
<p>Ce site utilise des cookies conformément à la législation belge (Article 129 de la loi du 13 juin 2005). Pour plus d'informations sur l'utilisation des cookies et vos droits, consultez notre Politique de Cookies.</p>

<h4>9. LIENS HYPERTEXTES</h4>
<p>Le site peut contenir des liens vers des sites tiers. ${data.companyName} n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu, leur disponibilité ou leur politique de confidentialité.</p>

<h4>10. LIMITATION DE RESPONSABILITÉ</h4>
<p>${data.companyName} s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site. Toutefois, nous ne pouvons garantir l'absence d'erreurs, d'omissions ou de résultats obtenus. L'utilisateur utilise les informations à ses propres risques.</p>

<p>Nous ne saurions être tenus responsables de :</p>
<ul>
<li>Interruptions temporaires du site pour maintenance ou raisons techniques</li>
<li>Dommages directs ou indirects résultant de l'utilisation ou de l'impossibilité d'utiliser le site</li>
<li>Virus informatiques, intrusions malveillantes ou tout autre incident de sécurité</li>
<li>Utilisation frauduleuse du site par des tiers</li>
</ul>

<h4>11. DROIT APPLICABLE ET JURIDICTION</h4>
<p>Les présentes mentions légales sont régies par le droit belge. Tout litige relatif à l'utilisation du site relève de la compétence exclusive des tribunaux de l'arrondissement judiciaire où ${data.companyName} a son siège social.</p>
<p>Conformément au Code de droit économique belge, les consommateurs peuvent recourir au Service de Médiation pour le Consommateur.</p>

<h4>12. CONFORMITÉ</h4>
<p>Ce site web est conforme aux réglementations belges et européennes applicables, notamment :</p>
<ul>
<li>Loi du 13 juin 2005 relative aux communications électroniques</li>
<li>Code de droit économique (Livre VI - Pratiques du marché et protection du consommateur)</li>
<li>RGPD et loi du 30 juillet 2018 sur la protection des données</li>
</ul>

<h4>13. CONTACT</h4>
<p>Pour toute question concernant ces mentions légales, vous pouvez nous contacter à :<br>
Email : ${data.email}${data.phone ? '<br>Téléphone : ' + data.phone : ''}</p>
    `.trim();
}

function generatePolitiqueCookies(data) {
    const today = new Date().toLocaleDateString('fr-BE', { day: 'numeric', month: 'long', year: 'numeric' });

    let cookiesDetails = '';

    if (data.cookies === 'non') {
        cookiesDetails = `<p>Ce site n'utilise pas de cookies de traçage ou de publicité. Seuls des cookies techniques strictement nécessaires au fonctionnement du site peuvent être utilisés (session, sécurité).</p>`;
    } else if (data.cookies === 'analytics') {
        cookiesDetails = `
<h4>COOKIES UTILISÉS</h4>

<p><strong>1. Cookies strictement nécessaires</strong></p>
<p>Ces cookies sont essentiels pour le bon fonctionnement du site. Ils incluent les cookies de session et de sécurité.</p>
<ul>
<li>Durée : Session</li>
<li>Finalité : Fonctionnement technique du site</li>
<li>Base légale : Intérêt légitime (Article 129 §2 loi du 13 juin 2005)</li>
</ul>

<p><strong>2. Cookies analytiques</strong></p>
<p>Nous utilisons des outils d'analyse (type Google Analytics) pour comprendre comment les visiteurs utilisent notre site et améliorer l'expérience utilisateur.</p>
<ul>
<li>Durée : 13 mois maximum</li>
<li>Finalité : Statistiques de visite, amélioration du site</li>
<li>Données collectées : Pages visitées, durée de visite, provenance</li>
<li>Base légale : Consentement (Article 129 §1 loi du 13 juin 2005)</li>
</ul>
        `;
    } else {
        cookiesDetails = `
<h4>COOKIES UTILISÉS</h4>

<p><strong>1. Cookies strictement nécessaires</strong></p>
<p>Ces cookies sont essentiels pour le bon fonctionnement du site.</p>
<ul>
<li>Durée : Session</li>
<li>Finalité : Fonctionnement technique du site</li>
<li>Base légale : Intérêt légitime</li>
</ul>

<p><strong>2. Cookies analytiques</strong></p>
<p>Outils d'analyse pour comprendre l'utilisation du site.</p>
<ul>
<li>Durée : 13 mois maximum</li>
<li>Finalité : Statistiques et amélioration</li>
<li>Base légale : Consentement</li>
</ul>

<p><strong>3. Cookies publicitaires</strong></p>
<p>Ces cookies permettent d'afficher des publicités personnalisées.</p>
<ul>
<li>Durée : 13 mois maximum</li>
<li>Finalité : Publicité ciblée, remarketing</li>
<li>Partenaires : [À compléter selon vos partenaires]</li>
<li>Base légale : Consentement</li>
</ul>
        `;
    }

    return `
<h4>POLITIQUE DE COOKIES</h4>
<p><strong>Dernière mise à jour :</strong> ${today}</p>

<h4>1. CADRE LÉGAL</h4>
<p>Cette politique de cookies est conforme à :</p>
<ul>
<li>L'article 129 de la loi belge du 13 juin 2005 relative aux communications électroniques</li>
<li>Le Règlement Général sur la Protection des Données (RGPD)</li>
<li>Les recommandations de l'Autorité de Protection des Données (APD) belge</li>
</ul>

<h4>2. QU'EST-CE QU'UN COOKIE ?</h4>
<p>Un cookie est un petit fichier texte déposé sur votre appareil (ordinateur, smartphone, tablette) lors de la visite d'un site web. Il permet de reconnaître votre appareil et de mémoriser certaines informations vous concernant.</p>

<h4>3. POURQUOI UTILISONS-NOUS DES COOKIES ?</h4>
<p>Sur ${data.website}, nous utilisons des cookies pour :</p>
<ul>
<li>Assurer le bon fonctionnement technique du site</li>
<li>Améliorer votre expérience de navigation</li>
<li>Analyser la fréquentation du site</li>
${data.cookies === 'publicite' ? '<li>Personnaliser les contenus et publicités</li>' : ''}
</ul>

${cookiesDetails}

<h4>4. CONSENTEMENT ET GESTION DE VOS PRÉFÉRENCES</h4>
<p>Conformément à la législation belge, votre consentement est requis avant le dépôt de cookies non essentiels. Vous pouvez à tout moment modifier ou retirer votre consentement.</p>

<p><strong>Via les paramètres de votre navigateur :</strong></p>
<ul>
<li><strong>Chrome :</strong> Paramètres > Confidentialité et sécurité > Cookies</li>
<li><strong>Firefox :</strong> Options > Vie privée et sécurité > Cookies</li>
<li><strong>Safari :</strong> Préférences > Confidentialité > Cookies</li>
<li><strong>Edge :</strong> Paramètres > Cookies et autorisations de site</li>
</ul>

<p><strong>Attention :</strong> Le blocage de certains cookies peut affecter le bon fonctionnement du site.</p>

<h4>5. COOKIES TIERS</h4>
<p>Certains cookies sont déposés par des services tiers pour des finalités d'analyse ou de publicité. Ces tiers ont leur propre politique de confidentialité et sont soumis au RGPD.</p>

${data.cookies !== 'non' ? `<p>Principaux tiers :</p>
<ul>
<li>Google Analytics (statistiques) - <a href="https://policies.google.com/privacy">Politique de confidentialité</a></li>
${data.cookies === 'publicite' ? '<li>Réseaux publicitaires (à détailler selon vos partenaires)</li>' : ''}
</ul>` : ''}

<h4>6. DURÉE DE CONSERVATION</h4>
<p>Les cookies sont conservés pour une durée maximale de :</p>
<ul>
<li><strong>Cookies de session :</strong> supprimés à la fermeture du navigateur</li>
<li><strong>Cookies persistants :</strong> 13 mois maximum conformément aux recommandations de l'APD</li>
</ul>
<p>À l'expiration, votre consentement vous sera de nouveau demandé pour les cookies non essentiels.</p>

<h4>7. VOS DROITS</h4>
<p>Conformément au RGPD et à la loi belge du 30 juillet 2018, vous disposez des droits suivants concernant les données collectées via les cookies :</p>
<ul>
<li>Droit d'accès à vos données</li>
<li>Droit de rectification</li>
<li>Droit à l'effacement ("droit à l'oubli")</li>
<li>Droit à la limitation du traitement</li>
<li>Droit d'opposition</li>
<li>Droit de retirer votre consentement</li>
</ul>

<p>Pour exercer ces droits, contactez-nous à ${data.email}.</p>

<h4>8. RÉCLAMATION</h4>
<p>Si vous estimez que vos droits ne sont pas respectés, vous pouvez déposer une réclamation auprès de l'Autorité de Protection des Données (APD) :</p>
<ul>
<li>Site web : <a href="https://www.autoriteprotectiondonnees.be">www.autoriteprotectiondonnees.be</a></li>
<li>Email : contact@apd-gba.be</li>
</ul>

<h4>9. MODIFICATIONS</h4>
<p>Nous nous réservons le droit de modifier cette politique de cookies à tout moment pour nous conformer aux évolutions légales ou techniques. Toute modification sera publiée sur cette page avec une nouvelle date de mise à jour.</p>

<h4>10. CONTACT</h4>
<p>Pour toute question concernant notre utilisation des cookies :<br>
Email : ${data.email}</p>
    `.trim();
}

// Helper functions

function getRefundPolicyText(data) {
    switch(data.refundPolicy) {
        case '14-jours':
            return `
<p>Conformément au Livre VI du Code de droit économique belge (protection du consommateur), vous disposez d'un délai de 14 jours calendriers à compter de la réception de votre commande ou de la conclusion du contrat (pour les services) pour exercer votre droit de rétractation sans avoir à justifier de motifs ni à payer de pénalités.</p>
<p>Pour exercer ce droit, vous devez nous notifier votre décision de rétractation par une déclaration dénuée d'ambiguïté (email à ${data.email}). Vous pouvez utiliser le modèle de formulaire de rétractation fourni par le SPF Économie.</p>
<p>Le remboursement sera effectué dans un délai de 14 jours suivant la notification de votre décision de rétractation, en utilisant le même moyen de paiement que celui utilisé lors de la commande initiale.</p>
            `.trim();

        case '30-jours':
            return `
<p>${data.companyName} offre une garantie "Satisfait ou Remboursé" de 30 jours, allant au-delà des obligations légales. Si vous n'êtes pas satisfait de nos services, vous pouvez demander un remboursement complet dans les 30 jours suivant votre achat.</p>
<p>Pour demander un remboursement, contactez-nous à ${data.email}. Le remboursement sera effectué dans un délai de 7 jours ouvrés.</p>
<p><em>Cette garantie s'ajoute à vos droits légaux en tant que consommateur belge.</em></p>
            `.trim();

        case 'aucun':
            return `
<p>Les services proposés par ${data.companyName} sont des contenus numériques non fournis sur un support matériel et dont l'exécution commence immédiatement après paiement avec votre accord préalable exprès.</p>
<p>Conformément à l'article VI.53, 12° du Code de droit économique belge, le droit de rétractation ne s'applique pas aux contenus numériques fournis sur un support immatériel dont l'exécution a commencé avec votre accord préalable exprès et pour lequel vous avez renoncé à votre droit de rétractation.</p>
<p>En validant votre commande et en cochant la case correspondante, vous reconnaissez et acceptez expressément que l'exécution commence immédiatement et que vous renoncez à votre droit de rétractation de 14 jours.</p>
            `.trim();

        case 'personnalise':
            return `
<p><strong>Politique de remboursement :</strong><br>${data.customRefundText || 'Politique de remboursement personnalisée à définir.'}</p>
<p><em>Note : Cette politique respecte les dispositions minimales du Code de droit économique belge en matière de protection du consommateur.</em></p>
            `.trim();

        default:
            return '';
    }
}

function getBusinessTypeDescription(businessType) {
    const descriptions = {
        'coach-sportif': 'propose des services de coaching sportif en ligne, comprenant des programmes d\'entraînement personnalisés, des séances de coaching vidéo et un suivi individuel.',
        'vendeur-etsy': 'propose des créations artisanales uniques faites à la main, vendues sur diverses plateformes en ligne.',
        'saas-b2b': 'propose une solution logicielle en mode SaaS (Software as a Service) destinée aux entreprises, accessible en ligne via abonnement.',
        'formateur': 'propose des formations en ligne sous forme de cours vidéo, modules interactifs et ressources pédagogiques téléchargeables.',
        'consultant': 'propose des services de conseil et d\'accompagnement professionnel dans son domaine d\'expertise.',
        'ecommerce': 'propose la vente en ligne de produits via sa boutique e-commerce.'
    };

    return descriptions[businessType] || 'propose ses services en ligne.';
}

function getCookiesDescription(cookiesType) {
    if (cookiesType === 'non') {
        return '<p>Ce site n\'utilise pas de cookies de traçage. Seuls des cookies techniques strictement nécessaires peuvent être utilisés (session, sécurité). Ces cookies ne nécessitent pas votre consentement conformément à l\'article 129 §2 de la loi du 13 juin 2005.</p>';
    } else if (cookiesType === 'analytics') {
        return '<p>Nous utilisons des cookies analytiques (type Google Analytics) pour comprendre comment les visiteurs utilisent notre site. Ces cookies nous permettent d\'améliorer l\'expérience utilisateur. Votre consentement est requis avant leur dépôt, conformément à la législation belge. Vous pouvez refuser ces cookies ou retirer votre consentement à tout moment. Pour plus de détails, consultez notre Politique de Cookies.</p>';
    } else {
        return '<p>Nous utilisons des cookies analytiques et publicitaires pour améliorer votre expérience et personnaliser les contenus. Votre consentement exprès est requis avant le dépôt de ces cookies, conformément à l\'article 129 de la loi du 13 juin 2005. Vous pouvez gérer vos préférences et retirer votre consentement à tout moment. Pour plus de détails, consultez notre Politique de Cookies.</p>';
    }
}
