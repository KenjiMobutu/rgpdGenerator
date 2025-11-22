// Authentication Check for Protected App
(function() {
    'use strict';

    // Check if user is authenticated
    function isAuthenticated() {
        const sessionUser = sessionStorage.getItem('userSession');
        const localUser = localStorage.getItem('userSession');

        return sessionUser || localUser;
    }

    // Get current user data
    function getCurrentUser() {
        const sessionUser = sessionStorage.getItem('userSession');
        const localUser = localStorage.getItem('userSession');

        const userJSON = sessionUser || localUser;

        if (userJSON) {
            try {
                return JSON.parse(userJSON);
            } catch (e) {
                return null;
            }
        }

        return null;
    }

    // Redirect to auth if not logged in
    if (!isAuthenticated()) {
        window.location.href = 'auth.html';
    } else {
        // User is authenticated, set up the page
        const user = getCurrentUser();

        if (user && user.name) {
            // Update user name in header
            document.addEventListener('DOMContentLoaded', function() {
                const userNameElement = document.getElementById('user-name');
                if (userNameElement) {
                    userNameElement.textContent = user.name;
                }

                // Setup logout button
                const logoutBtn = document.getElementById('logout-btn');
                if (logoutBtn) {
                    logoutBtn.addEventListener('click', function() {
                        // Clear session
                        sessionStorage.removeItem('userSession');
                        localStorage.removeItem('userSession');

                        // Redirect to landing page
                        window.location.href = 'landing.html';
                    });
                }
            });
        }
    }
})();
