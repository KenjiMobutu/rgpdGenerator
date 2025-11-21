// Global functions for onclick handlers (must be outside DOMContentLoaded)
function copyDocument(button) {
    const documentContent = button.closest('.document-item').querySelector('.document-content');
    const text = documentContent.innerText;

    navigator.clipboard.writeText(text).then(() => {
        const originalText = button.innerHTML;
        button.innerHTML = '✅ Copié !';
        setTimeout(() => {
            button.innerHTML = originalText;
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

function validateCurrentStep() {
    const currentStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    const requiredFields = currentStepElement.querySelectorAll('[required]');

    for (let field of requiredFields) {
        if (!field.value.trim()) {
            field.focus();
            alert('Veuillez remplir tous les champs obligatoires (*)');
            return false;
        }
    }

    return true;
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
        <h3>📄 ${title}</h3>
        <div class="document-content">${content}</div>
        <div class="document-actions">
            <button class="btn btn-primary" onclick="copyDocument(this)">📋 Copier</button>
            <button class="btn btn-secondary" onclick="downloadDocument('${title}', this)">⬇️ Télécharger</button>
        </div>
    `;

    return div;
}

// Initialize
updateFormStep();

}); // End of DOMContentLoaded
