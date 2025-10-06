// Code Crafter - Complete Optimized JavaScript

// Application Object
const CodeCrafterApp = {
    // Initialize the application
    init() {
        this.setupLoadingScreen();
        this.setupThemeToggle();
        this.setupNavigation();
        this.setupSearch();
        this.setupScrollAnimations();
        this.setupBackToTop();
        this.setupFormHandling();
        this.setupCardAnimations();
    },

    // Loading Screen
    setupLoadingScreen() {
        window.addEventListener('load', () => {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                setTimeout(() => {
                    loadingScreen.classList.add('hidden');
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                    }, 500);
                }, 800);
            }
        });
    },

    // Theme Toggle
    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const body = document.body;
        
        if (!themeToggle) return;
        
        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
            themeToggle.checked = true;
        }

        themeToggle.addEventListener('change', () => {
            const isDark = themeToggle.checked;
            
            if (isDark) {
                body.classList.add('dark-mode');
            } else {
                body.classList.remove('dark-mode');
            }
            
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    },

    // Navigation
    setupNavigation() {
        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu
                    const menuToggle = document.getElementById('responsive_menu');
                    if (menuToggle && menuToggle.checked) {
                        menuToggle.checked = false;
                    }
                }
            });
        });

        // Mobile menu
        const menuToggle = document.getElementById('responsive_menu');
        if (menuToggle) {
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.navbar') && menuToggle.checked) {
                    menuToggle.checked = false;
                }
            });
        }
    },

    // Search
    setupSearch() {
        const searchInput = document.getElementById('search');
        const searchBtn = document.querySelector('.search-btn');

        if (!searchInput || !searchBtn) return;

        const performSearch = () => {
            const searchQuery = searchInput.value.trim();
            if (searchQuery) {
                const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery + ' programming tutorial')}`;
                window.open(searchUrl, '_blank');
            }
        };

        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    },

    // Scroll Animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -10% 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    element.classList.add('visible');
                    
                    // Staggered animation for cards
                    if (element.classList.contains('note-card')) {
                        const cards = element.parentElement.children;
                        const index = Array.from(cards).indexOf(element);
                        element.style.transitionDelay = `${index * 0.1}s`;
                    }
                    
                    observer.unobserve(element);
                }
            });
        }, observerOptions);

        // Observe elements
        document.querySelectorAll('section, .note-card, .course-card').forEach(el => {
            observer.observe(el);
        });
    },

    // Back to Top Button
    setupBackToTop() {
        const backToTopBtn = document.getElementById('back-to-top');
        
        if (backToTopBtn) {
            let isVisible = false;
            
            window.addEventListener('scroll', () => {
                const shouldShow = window.pageYOffset > 300;
                
                if (shouldShow && !isVisible) {
                    backToTopBtn.classList.add('show');
                    isVisible = true;
                } else if (!shouldShow && isVisible) {
                    backToTopBtn.classList.remove('show');
                    isVisible = false;
                }
            });

            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    },

    // Form Handling
    setupFormHandling() {
        // Contact form
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactForm(contactForm);
            });
        }

        // Newsletter form
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            const button = newsletterForm.querySelector('button');
            const input = newsletterForm.querySelector('input');
            
            if (button && input) {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.handleNewsletterForm(newsletterForm);
                });
            }
        }
    },

    handleContactForm(form) {
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Basic validation
        const inputs = form.querySelectorAll('input, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = '#f44336';
                isValid = false;
            } else {
                input.style.borderColor = '';
            }
        });
        
        if (!isValid) {
            alert('Please fill in all fields');
            return;
        }
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.style.background = 'linear-gradient(45deg, #4caf50, #45a049)';
            
            alert('Message sent successfully!');
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                form.reset();
            }, 2000);
        }, 1500);
    },

    handleNewsletterForm(form) {
        const input = form.querySelector('input');
        const button = form.querySelector('button');
        const email = input.value.trim();
        
        if (this.validateEmail(email)) {
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
            button.disabled = true;

            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
                button.style.background = 'linear-gradient(45deg, #4caf50, #45a049)';
                
                alert('Successfully subscribed!');
                
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.style.background = '';
                    button.disabled = false;
                    input.value = '';
                }, 2000);
            }, 1000);
        } else {
            alert('Please enter a valid email address');
        }
    },

    // Card Animations
    setupCardAnimations() {
        document.querySelectorAll('.note-card, .course-card').forEach((card, index) => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                this.style.zIndex = '10';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.zIndex = '';
            });
        });

        // Button hover effects
        document.querySelectorAll('.cta-button, .card-button, .submit-btn').forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px) scale(1.05)';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    },

    // Utility function
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
};

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl+K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('search');
        if (searchInput) {
            searchInput.focus();
        }
    }
    
    // Escape to close mobile menu
    if (e.key === 'Escape') {
        const menuToggle = document.getElementById('responsive_menu');
        if (menuToggle && menuToggle.checked) {
            menuToggle.checked = false;
        }
    }
});

// Initialize app
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        CodeCrafterApp.init();
    });
} else {
    CodeCrafterApp.init();
}
