// Main JavaScript functionality for NanoDecor website

// DOM loaded event listener
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize all website functionality
function initializeWebsite() {
    initializeNavigation();
    initializeLanguageSwitcher();
    initializeProductFilter();
    initializeSmoothScrolling();
    initializeRegistrationButtons();
    initializeContactForm();
    initializeMobileMenu();
    initializeAnimations();
}

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    let currentPath = window.location.pathname;
    
    // Normalize path for comparison
    if (currentPath === '/' || currentPath === '/index.html' || currentPath === '/index') {
        currentPath = '/';
    } else if (currentPath.endsWith('.html')) {
        currentPath = currentPath.replace('.html', '');
    }
    
    // Ensure path starts with /
    if (!currentPath.startsWith('/')) {
        currentPath = '/' + currentPath;
    }
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        
        if (linkHref === currentPath || 
            (currentPath === '/' && linkHref === '/') ||
            (currentPath !== '/' && linkHref === currentPath)) {
            link.classList.add('active');
        }
    });
}

// Language switcher functionality
function initializeLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');
    let currentLang = localStorage.getItem('selectedLanguage') || 'uz';
    
    // Set initial language
    updateLanguage(currentLang);
    updateActiveLangButton(currentLang);
    
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedLang = this.getAttribute('data-lang');
            updateLanguage(selectedLang);
            updateActiveLangButton(selectedLang);
            localStorage.setItem('selectedLanguage', selectedLang);
        });
    });
}

// Update active language button
function updateActiveLangButton(lang) {
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
}

// Update language content
function updateLanguage(lang) {
    const elementsWithDataKey = document.querySelectorAll('[data-key]');
    
    elementsWithDataKey.forEach(element => {
        const key = element.getAttribute('data-key');
        if (window.translations && window.translations[lang] && window.translations[lang][key]) {
            element.textContent = window.translations[lang][key];
        }
    });
    
    // Update document language
    document.documentElement.lang = lang;
    
    // Update page title if translation exists
    const titleElement = document.querySelector('title[data-default]');
    if (titleElement && window.translations && window.translations[lang] && window.translations[lang]['page-title']) {
        titleElement.textContent = window.translations[lang]['page-title'];
    }
}

// Product filter functionality
function initializeProductFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    if (!filterButtons.length || !productCards.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter products
            productCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.6s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Smooth scrolling functionality
function initializeSmoothScrolling() {
    // Add smooth scrolling to all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll to section function for buttons
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const elementPosition = element.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Registration buttons functionality
function initializeRegistrationButtons() {
    const registerButtons = document.querySelectorAll('.register-btn');
    
    registerButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.toLowerCase();
            
            if (buttonText.includes('instagram') || this.getAttribute('data-key') === 'register-instagram') {
                window.open('https://www.instagram.com/nano_decor?igsh=eXBwMWh4aXQxNzZw', '_blank');
            } else {
                window.open('https://t.me/nano_decor', '_blank');
            }
        });
    });
}



// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const phone = formData.get('phone');
        const email = formData.get('email');
        const service = formData.get('service');
        const message = formData.get('message');
        
        // Create message for Telegram
        const telegramMessage = `
🔔 Yangi mijoz murojati!

👤 Ismi: ${name}
📱 Telefon: ${phone}
📧 Email: ${email || 'Ko\'rsatilmagan'}
🛠 Xizmat turi: ${service}
💬 Xabar: ${message}
        `;
        
        // Open Telegram with pre-filled message
        const encodedMessage = encodeURIComponent(telegramMessage);
        const telegramUrl = `https://t.me/nano_decor?text=${encodedMessage}`;
        
        
        window.open(telegramUrl, '_blank');
        
        // Show success message
        showNotification('Xabaringiz yuborildi! Tez orada siz bilan bog\'lanamiz.', 'success');
        
        // Reset form
        contactForm.reset();
    });
}

// Mobile menu functionality
function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!hamburger || !navMenu) return;
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Animation on scroll
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.about-card, .product-card, .project-card, .contact-item, .stat-item');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1001;
        max-width: 350px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', function() {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Header scroll effect
function initializeHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'var(--white)';
            header.style.backdropFilter = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Initialize header scroll effect
initializeHeaderScroll();

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Performance optimization
function optimizePerformance() {
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            // Scroll-dependent code here
        }, 10);
    });
    
    // Preload critical resources
    const criticalImages = [
        'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=800'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Call performance optimization
optimizePerformance();

// Export functions for global use
window.scrollToSection = scrollToSection;
window.showNotification = showNotification;