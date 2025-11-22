// Authentication System
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const showSignupLink = document.getElementById('show-signup');
    const showLoginLink = document.getElementById('show-login');
    const loginFormElement = document.getElementById('loginForm');
    const signupFormElement = document.getElementById('signupForm');

    // Check URL parameters for mode
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode');

    if (mode === 'signup') {
        showSignup();
    }

    // Toggle between login and signup
    showSignupLink.addEventListener('click', function(e) {
        e.preventDefault();
        showSignup();
    });

    showLoginLink.addEventListener('click', function(e) {
        e.preventDefault();
        showLogin();
    });

    function showSignup() {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
    }

    function showLogin() {
        signupForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    }

    // Handle Login
    loginFormElement.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const rememberMe = document.getElementById('remember-me').checked;

        // Simple validation
        if (!email || !password) {
            showNotification('Veuillez remplir tous les champs', 'error');
            return;
        }

        // Simulate login (in production, this would call your backend API)
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            // Store session
            const session = {
                email: user.email,
                name: user.name,
                loggedIn: true,
                loginTime: new Date().toISOString()
            };

            if (rememberMe) {
                localStorage.setItem('userSession', JSON.stringify(session));
            } else {
                sessionStorage.setItem('userSession', JSON.stringify(session));
            }

            showNotification('Connexion réussie ! Redirection...', 'success');
            setTimeout(() => {
                window.location.href = 'app.html';
            }, 1500);
        } else {
            showNotification('Email ou mot de passe incorrect', 'error');
        }
    });

    // Handle Signup
    signupFormElement.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const termsAccepted = document.getElementById('terms').checked;

        // Validation
        if (!name || !email || !password) {
            showNotification('Veuillez remplir tous les champs', 'error');
            return;
        }

        if (password.length < 8) {
            showNotification('Le mot de passe doit contenir au moins 8 caractères', 'error');
            return;
        }

        if (!termsAccepted) {
            showNotification('Veuillez accepter les conditions', 'error');
            return;
        }

        // Check if user already exists
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.find(u => u.email === email)) {
            showNotification('Un compte existe déjà avec cet email', 'error');
            return;
        }

        // Create new user (in production, this would call your backend API)
        const newUser = {
            name,
            email,
            password, // In production, this should be hashed
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // Auto login after signup
        const session = {
            email: newUser.email,
            name: newUser.name,
            loggedIn: true,
            loginTime: new Date().toISOString()
        };

        sessionStorage.setItem('userSession', JSON.stringify(session));

        showNotification('Compte créé avec succès ! Redirection...', 'success');
        setTimeout(() => {
            window.location.href = 'app.html';
        }, 1500);
    });

    // Google OAuth placeholder
    document.querySelectorAll('.btn-google').forEach(btn => {
        btn.addEventListener('click', function() {
            showNotification('Connexion Google sera disponible prochainement', 'info');
        });
    });

    // Notification system
    function showNotification(message, type) {
        // Remove existing notifications
        const existing = document.querySelector('.notification');
        if (existing) {
            existing.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // Add styles
        const style = document.createElement('style');
        if (!document.querySelector('#notification-styles')) {
            style.id = 'notification-styles';
            style.textContent = `
                .notification {
                    position: fixed;
                    top: 2rem;
                    right: 2rem;
                    padding: 1rem 1.5rem;
                    border-radius: 0.5rem;
                    color: white;
                    font-weight: 500;
                    z-index: 10000;
                    animation: slideIn 0.3s ease;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                }

                .notification-success {
                    background: #10b981;
                }

                .notification-error {
                    background: #ef4444;
                }

                .notification-info {
                    background: #3b82f6;
                }

                @keyframes slideIn {
                    from {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }

                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notification);

        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Real-time validation
    const emailInputs = [document.getElementById('login-email'), document.getElementById('signup-email')];
    const passwordInputs = [document.getElementById('login-password'), document.getElementById('signup-password')];

    emailInputs.forEach(input => {
        if (input) {
            input.addEventListener('blur', function() {
                validateEmail(this);
            });
        }
    });

    passwordInputs.forEach(input => {
        if (input) {
            input.addEventListener('input', function() {
                if (this.id === 'signup-password') {
                    validatePassword(this);
                }
            });
        }
    });

    function validateEmail(input) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const parent = input.parentElement;

        // Remove existing error
        const existingError = parent.querySelector('.error-message');
        if (existingError) existingError.remove();

        if (input.value && !emailPattern.test(input.value)) {
            input.classList.add('invalid');
            input.classList.remove('valid');

            const error = document.createElement('div');
            error.className = 'error-message';
            error.textContent = 'Email invalide';
            parent.appendChild(error);
        } else if (input.value) {
            input.classList.remove('invalid');
            input.classList.add('valid');
        }
    }

    function validatePassword(input) {
        const parent = input.parentElement;
        const small = parent.querySelector('small');

        if (input.value.length > 0 && input.value.length < 8) {
            input.classList.add('invalid');
            input.classList.remove('valid');
            small.style.color = '#ef4444';
        } else if (input.value.length >= 8) {
            input.classList.remove('invalid');
            input.classList.add('valid');
            small.style.color = '#10b981';
        }
    }
});
