// site-enhancements.js - Additional JavaScript functionality for Delicious Desserts website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all enhancements
    initNewsletterForm();
    initRecipeCards();
    initSearchFunctionality();
    initMobileMenu();
    initBackToTop();
    initImageLazyLoading();
});

// Newsletter form validation and submission
function initNewsletterForm() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        const emailInput = form.querySelector('input[type="email"]');
        const submitButton = form.querySelector('button');
        
        if (emailInput && submitButton) {
            submitButton.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Simple email validation
                const email = emailInput.value.trim();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
                if (!email) {
                    showFormMessage(form, 'Please enter your email address', 'error');
                    return;
                }
                
                if (!emailRegex.test(email)) {
                    showFormMessage(form, 'Please enter a valid email address', 'error');
                    return;
                }
                
                // Simulate form submission (would be replaced with actual AJAX call)
                submitButton.disabled = true;
                submitButton.textContent = 'Subscribing...';
                
                setTimeout(() => {
                    emailInput.value = '';
                    submitButton.disabled = false;
                    submitButton.textContent = 'Subscribe';
                    showFormMessage(form, 'Thank you for subscribing!', 'success');
                }, 1500);
            });
        }
    });
}

// Helper function to show form messages
function showFormMessage(form, message, type) {
    // Remove any existing message
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create and add new message
    const messageElement = document.createElement('p');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    form.appendChild(messageElement);
    
    // Auto-remove message after 5 seconds
    setTimeout(() => {
        messageElement.classList.add('fade-out');
        setTimeout(() => {
            messageElement.remove();
        }, 500);
    }, 5000);
}

// Recipe card enhancements
function initRecipeCards() {
    const recipeCards = document.querySelectorAll('.recipe-card');
    
    recipeCards.forEach(card => {
        // Add hover effect
        card.addEventListener('mouseenter', function() {
            this.classList.add('card-hover');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('card-hover');
        });
        
        // Add click effect for mobile
        card.addEventListener('touchstart', function() {
            this.classList.add('card-touch');
        });
        
        card.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('card-touch');
            }, 300);
        });
    });
}

// Simple search functionality
function initSearchFunctionality() {
    // Create search bar
    const header = document.querySelector('header .container');
    
    if (header) {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search recipes...';
        searchInput.className = 'search-input';
        
        const searchButton = document.createElement('button');
        searchButton.className = 'search-button';
        searchButton.innerHTML = '<i class="fas fa-search"></i>';
        
        searchContainer.appendChild(searchInput);
        searchContainer.appendChild(searchButton);
        
        // Insert after the branding div
        const branding = header.querySelector('#branding');
        if (branding && branding.nextSibling) {
            header.insertBefore(searchContainer, branding.nextSibling);
        } else {
            header.appendChild(searchContainer);
        }
        
        // Add search functionality
        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        function performSearch() {
            const searchTerm = searchInput.value.trim().toLowerCase();
            
            if (searchTerm) {
                // Redirect to recipes page with search parameter
                window.location.href = `Recipes.html?search=${encodeURIComponent(searchTerm)}`;
            }
        }
    }
}

// Mobile menu toggle
function initMobileMenu() {
    const nav = document.querySelector('header nav');
    
    if (nav) {
        // Create mobile menu toggle button
        const menuToggle = document.createElement('button');
        menuToggle.className = 'menu-toggle';
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
        
        // Insert before the nav
        nav.parentNode.insertBefore(menuToggle, nav);
        
        // Add toggle functionality
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('mobile-nav-open');
            
            // Change icon based on state
            if (nav.classList.contains('mobile-nav-open')) {
                menuToggle.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
}

// Back to top button
function initBackToTop() {
    // Create back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopBtn);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Image lazy loading
function initImageLazyLoading() {
    // Check if browser supports Intersection Observer
    if ('IntersectionObserver' in window) {
        const imgOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px 200px 0px'
        };
        
        const imgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                        img.classList.add('loaded');
                    }
                    
                    imgObserver.unobserve(img);
                }
            });
        }, imgOptions);
        
        // Find all images with data-src attribute
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            imgObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support Intersection Observer
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            const src = img.getAttribute('data-src');
            if (src) {
                img.src = src;
                img.removeAttribute('data-src');
            }
        });
    }
}