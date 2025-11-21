// Global functions for onclick handlers (must be outside DOMContentLoaded)
function copyDocument(button) {
    const documentContent = button.closest('.document-item').querySelector('.document-content');
    const text = documentContent.innerText;

    navigator.clipboard.writeText(text).then(() => {
        const originalText = button.innerHTML;
        button.innerHTML = 'Copié';
        button.style.opacity = '0.7';
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.opacity = '1';
        }, 2000);
    });
}

function downloadDocument(title, button) {
    const documentContent = button.closest('.document-item').querySelector('.document-content');

    // Create a new jsPDF instance
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });

    // Get the text content
    const text = documentContent.innerText;

    // Set font size and styling
    doc.setFontSize(10);

    // Split text into lines that fit the page width
    const pageWidth = doc.internal.pageSize.getWidth();
    const margins = 15;
    const maxLineWidth = pageWidth - (margins * 2);

    // Split text into lines
    const lines = doc.splitTextToSize(text, maxLineWidth);

    // Add text to PDF with pagination
    let y = margins;
    const lineHeight = 7;
    const pageHeight = doc.internal.pageSize.getHeight();
    const maxY = pageHeight - margins;

    lines.forEach((line, index) => {
        // Check if we need a new page
        if (y + lineHeight > maxY) {
            doc.addPage();
            y = margins;
        }

        doc.text(line, margins, y);
        y += lineHeight;
    });

    // Save the PDF
    doc.save(`${title.replace(/\s+/g, '_')}.pdf`);
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

// State management
let currentStep = 1;
let selectedBusinessType = '';
const totalSteps = 4;

// DOM Elements
const businessTypeSection = document.getElementById('business-type-section');
const formSection = document.getElementById('form-section');
const resultsSection = document.getElementById('results-section');
const complianceForm = document.getElementById('compliance-form');
const progressFill = document.getElementById('progress-fill');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const generateBtn = document.getElementById('generate-btn');
const restartBtn = document.getElementById('restart-btn');
const backToHomeBtn = document.getElementById('back-to-home');

// Business type selection
document.querySelectorAll('.business-type-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.business-type-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        selectedBusinessType = this.dataset.type;

        // Show form section
        setTimeout(() => {
            businessTypeSection.classList.add('hidden');
            formSection.classList.remove('hidden');
        }, 200);
    });
});

// Form navigation
prevBtn.addEventListener('click', () => {
    if (currentStep > 1) {
        currentStep--;
        updateFormStep();
    }
});

nextBtn.addEventListener('click', () => {
    if (validateCurrentStep()) {
        if (currentStep < totalSteps) {
            currentStep++;
            updateFormStep();
        }
    }
});

// Form submission
complianceForm.addEventListener('submit', (e) => {
    e.preventDefault();
    generateDocuments();
});

// Back to home button (without losing data)
backToHomeBtn.addEventListener('click', () => {
    // Store the current business type
    const previousType = selectedBusinessType;

    // Go back to business type selection
    formSection.classList.add('hidden');
    businessTypeSection.classList.remove('hidden');

    // Reselect the previous business type button
    if (previousType) {
        document.querySelectorAll('.business-type-btn').forEach(btn => {
            if (btn.dataset.type === previousType) {
                btn.classList.add('active');
            }
        });
    }
});

// Restart button
restartBtn.addEventListener('click', () => {
    currentStep = 1;
    selectedBusinessType = '';
    complianceForm.reset();
    resultsSection.classList.add('hidden');
    businessTypeSection.classList.remove('hidden');
    document.querySelectorAll('.business-type-btn').forEach(b => b.classList.remove('active'));
    updateFormStep();
});

// Dynamic form fields
document.querySelectorAll('input[name="sensitive-data"]').forEach(radio => {
    radio.addEventListener('change', function() {
        const detailsDiv = document.getElementById('sensitive-data-details');
        detailsDiv.style.display = this.value === 'oui' ? 'block' : 'none';
    });
});

document.getElementById('refund-policy').addEventListener('change', function() {
    const customDiv = document.getElementById('custom-refund-policy');
    customDiv.style.display = this.value === 'personnalise' ? 'block' : 'none';
});

// Helper functions
function updateFormStep() {
    // Update step visibility and manage required attributes
    document.querySelectorAll('.form-step').forEach((step, index) => {
        const isActive = index + 1 === currentStep;

        if (isActive) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }

        // Manage required attributes: only active step should have required fields
        step.querySelectorAll('input, select, textarea').forEach(field => {
            // Store original required state if not already stored
            if (!field.hasAttribute('data-was-required') && field.hasAttribute('required')) {
                field.setAttribute('data-was-required', 'true');
            }

            // Apply or remove required based on visibility
            if (isActive && field.getAttribute('data-was-required') === 'true') {
                field.setAttribute('required', 'required');
            } else if (!isActive) {
                field.removeAttribute('required');
            }
        });
    });

    // Update progress bar
    const progress = (currentStep / totalSteps) * 100;
    progressFill.style.width = `${progress}%`;

    // Update buttons
    prevBtn.disabled = currentStep === 1;

    if (currentStep === totalSteps) {
        nextBtn.classList.add('hidden');
        generateBtn.classList.remove('hidden');
    } else {
        nextBtn.classList.remove('hidden');
        generateBtn.classList.add('hidden');
    }
}

// --- NOUVELLE LOGIQUE DE VALIDATION ---

// Regex pour validations spécifiques
const patterns = {
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    // Format belge standard : 0XXX.XXX.XXX ou juste 10 chiffres
    siret: /^\d{10}$/,
    url: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
};

// Messages d'erreur personnalisés
const errorMessages = {
    required: "Ce champ est obligatoire.",
    email: "Veuillez entrer une adresse email valide.",
    siret: "Format invalide. Ex: 0123456789",
    url: "Veuillez entrer une URL valide (ex: https://...)"
};

// Fonction principale de validation d'un champ
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let message = "";

    // Nettoyer les erreurs précédentes
    clearError(field);

    // 1. Vérification Requis
    if (field.hasAttribute('required') && value === "") {
        isValid = false;
        message = errorMessages.required;
    }

    // 2. Vérifications Spécifiques (si le champ n'est pas vide)
    else if (value !== "") {
        if (field.type === "email" && !patterns.email.test(value)) {
            isValid = false;
            message = errorMessages.email;
        }
        else if (field.id === "siret" && !patterns.siret.test(value)) {
            isValid = false;
            message = errorMessages.siret;
        }
        else if (field.type === "url" && !patterns.url.test(value)) {
            isValid = false;
            message = errorMessages.url;
        }
    }

    // Application visuelle du résultat
    if (isValid) {
        field.classList.remove('invalid');
        if (value !== "") field.classList.add('valid'); // Vert uniquement si rempli
    } else {
        field.classList.remove('valid');
        field.classList.add('invalid');
        showError(field, message);
    }

    return isValid;
}

// Afficher le message d'erreur
function showError(field, message) {
    const parent = field.parentElement;
    // Vérifie si un message existe déjà pour ne pas le dupliquer
    let errorDiv = parent.querySelector('.error-message');

    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        parent.appendChild(errorDiv);
    }

    errorDiv.textContent = message;
}

// Supprimer le message d'erreur
function clearError(field) {
    const parent = field.parentElement;
    const errorDiv = parent.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Attacher les écouteurs d'événements pour le temps réel
function attachRealTimeValidation() {
    const inputs = document.querySelectorAll('input, select, textarea');

    inputs.forEach(input => {
        // Validation quand l'utilisateur quitte le champ (Blur)
        input.addEventListener('blur', () => {
            validateField(input);
        });

        // Validation immédiate quand l'utilisateur corrige une erreur (Input)
        input.addEventListener('input', () => {
            if (input.classList.contains('invalid')) {
                validateField(input);
            }
        });
    });
}

// Initialiser les écouteurs au chargement
attachRealTimeValidation();

// --- MISE À JOUR DES FONCTIONS EXISTANTES ---

function updateFormStep() {
    // Update step visibility
    document.querySelectorAll('.form-step').forEach((step, index) => {
        const isActive = index + 1 === currentStep;
        if (isActive) {
            step.classList.add('active');
            // Focus sur le premier champ de la nouvelle étape
            const firstInput = step.querySelector('input, select, textarea');
            if (firstInput) setTimeout(() => firstInput.focus(), 400);
        } else {
            step.classList.remove('active');
        }

        // Gestion des attributs required (conservée de votre code précédent)
        step.querySelectorAll('input, select, textarea').forEach(field => {
            if (!field.hasAttribute('data-was-required') && field.hasAttribute('required')) {
                field.setAttribute('data-was-required', 'true');
            }
            if (isActive && field.getAttribute('data-was-required') === 'true') {
                field.setAttribute('required', 'required');
            } else if (!isActive) {
                field.removeAttribute('required');
            }
        });
    });

    // Update progress bar
    const progress = (currentStep / totalSteps) * 100;
    progressFill.style.width = `${progress}%`;

    // Update buttons visibility
    prevBtn.disabled = currentStep === 1;
    if (currentStep === totalSteps) {
        nextBtn.classList.add('hidden');
        generateBtn.classList.remove('hidden');
    } else {
        nextBtn.classList.remove('hidden');
        generateBtn.classList.add('hidden');
    }
}

function validateCurrentStep() {
    const currentStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    // Sélectionner uniquement les champs visibles et requis
    const requiredFields = currentStepElement.querySelectorAll('[required]');
    let isStepValid = true;
    let firstErrorField = null;

    requiredFields.forEach(field => {
        const isFieldValid = validateField(field);
        if (!isFieldValid) {
            isStepValid = false;
            if (!firstErrorField) firstErrorField = field;

            // Animation Shake
            field.parentElement.classList.add('shake');
            setTimeout(() => field.parentElement.classList.remove('shake'), 500);
        }
    });

    if (!isStepValid && firstErrorField) {
        firstErrorField.focus();
        // Optionnel : un petit toast ou notification globale si nécessaire
        // Mais les messages rouges sous les champs suffisent généralement
    }

    return isStepValid;
}

function getFormData() {
    return {
        businessType: selectedBusinessType,
        companyName: document.getElementById('company-name').value,
        legalForm: document.getElementById('legal-form').value,
        siret: document.getElementById('siret').value,
        address: document.getElementById('address').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        website: document.getElementById('website').value,
        servicesDescription: document.getElementById('services-description').value,
        sensitiveData: document.querySelector('input[name="sensitive-data"]:checked').value,
        sensitiveDataType: document.getElementById('sensitive-data-type').value,
        cookies: document.querySelector('input[name="cookies"]:checked').value,
        hosting: document.getElementById('hosting').value,
        paymentMethods: document.getElementById('payment-methods').value,
        deliveryTime: document.getElementById('delivery-time').value,
        refundPolicy: document.getElementById('refund-policy').value,
        customRefundText: document.getElementById('custom-refund-text').value,
        guarantee: document.getElementById('guarantee').value,
        selectedDocuments: Array.from(document.querySelectorAll('input[name="documents"]:checked')).map(cb => cb.value)
    };
}

function generateDocuments() {
    const formData = getFormData();
    const documentsContainer = document.getElementById('documents-container');
    documentsContainer.innerHTML = '';

    formData.selectedDocuments.forEach(docType => {
        let content = '';
        let title = '';

        switch(docType) {
            case 'cgv':
                title = 'Conditions Générales de Vente';
                content = generateCGV(formData);
                break;
            case 'rgpd':
                title = 'Politique de Confidentialité (RGPD)';
                content = generateRGPD(formData);
                break;
            case 'mentions':
                title = 'Mentions Légales';
                content = generateMentionsLegales(formData);
                break;
            case 'cookies':
                title = 'Politique de Cookies';
                content = generatePolitiqueCookies(formData);
                break;
        }

        const docElement = createDocumentElement(title, content, docType);
        documentsContainer.appendChild(docElement);
    });

    // Show results section
    formSection.classList.add('hidden');
    resultsSection.classList.remove('hidden');
}

function createDocumentElement(title, content, type) {
    const div = document.createElement('div');
    div.className = 'document-item';

    div.innerHTML = `
        <h3>${title}</h3>
        <div class="document-content">${content}</div>
        <div class="document-actions">
            <button class="btn btn-secondary" onclick="copyDocument(this)">Copier le texte</button>
            <button class="btn btn-primary" onclick="downloadDocument('${title}', this)">Télécharger le PDF</button>
        </div>
    `;

    return div;
}



}); // End of DOMContentLoaded
