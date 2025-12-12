// ===== CONFIGURAZIONE =====
const CONFIG = {
    // Skill bars animation
    skillsAnimation: {
        enabled: true,
        threshold: 0.3,
        rootMargin: '0px'
    },
    
    // Scroll animations
    scrollAnimation: {
        enabled: true,
        threshold: 0.1,
        rootMargin: '-50px'
    }
};

// ===== INIZIALIZZAZIONE =====
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initSmoothScroll();
    initSkillsAnimation();
    initScrollAnimations();
    initContactForm();
    initScrollEffects();
    
    console.log('🚀 Portfolio JS loaded successfully!');
});

// ===== MOBILE MENU =====
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!hamburger || !navMenu) return;

    // Toggle menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close menu on click outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip # links and external links
            if (href === '#' || href.includes('http')) return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (!target) return;
            
            const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

// ===== SKILL BARS ANIMATION =====
function initSkillsAnimation() {
    if (!CONFIG.skillsAnimation.enabled) return;
    
    const skillItems = document.querySelectorAll('.skill-level');
    if (skillItems.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillLevel = entry.target;
                const level = skillLevel.getAttribute('data-level');
                
                setTimeout(() => {
                    skillLevel.style.width = level + '%';
                }, 200);
                
                observer.unobserve(skillLevel);
            }
        });
    }, {
        threshold: CONFIG.skillsAnimation.threshold,
        rootMargin: CONFIG.skillsAnimation.rootMargin
    });
    
    skillItems.forEach(skill => {
        skill.style.width = '0%'; // Reset all skills to 0
        observer.observe(skill);
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    if (!CONFIG.scrollAnimation.enabled) return;
    
    const animatedElements = document.querySelectorAll(
        '.hero-content, .hero-image, .about-content, .skills-grid, .portfolio-grid, .contact-content'
    );
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: CONFIG.scrollAnimation.threshold,
        rootMargin: CONFIG.scrollAnimation.rootMargin
    });
    
    // Set initial styles
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ===== CONTACT FORM =====
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        // RIMOSSO: e.preventDefault() - LASCIA CHE IL FORM SI INVII NORMALMENTE A FORMSPREE
        
        const formElements = this.elements;
        
        // Basic validation
        let isValid = true;
        const requiredFields = ['name', 'email', 'subject', 'message'];
        
        requiredFields.forEach(fieldName => {
            const field = formElements[fieldName];
            if (field && !field.value.trim()) {
                showFieldError(field, 'Questo campo è obbligatorio');
                isValid = false;
                e.preventDefault(); // Previeni l'invio solo se ci sono errori
            } else {
                clearFieldError(field);
            }
        });
        
        // Email validation
        const emailField = formElements['email'];
        if (emailField && emailField.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailField.value)) {
                showFieldError(emailField, 'Inserisci un indirizzo email valido');
                isValid = false;
                e.preventDefault(); // Previeni l'invio solo se ci sono errori
            }
        }
        
        // Se tutto è valido, il form si invierà automaticamente a Formspree
        if (isValid) {
            showLoadingState(this);
        }
    });
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    
    if (!value) {
        showFieldError(field, 'Questo campo è obbligatorio');
        return false;
    }
    
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Inserisci un indirizzo email valido');
            return false;
        }
    }
    
    clearFieldError(field);
    return true;
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    field.style.borderColor = '#EF4444';
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.style.color = '#EF4444';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '0.25rem';
    errorElement.textContent = message;
    
    field.parentNode.appendChild(errorElement);
}

function clearFieldError(field) {
    field.style.borderColor = '';
    
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

function showLoadingState(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Invio in corso...';
    submitBtn.disabled = true;
    
    // Il form ora si invierà normalmente a Formspree
    // Non c'è bisogno di simulare l'invio
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Header background on scroll
        if (currentScrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        }
        
        // Update active nav link
        updateActiveNavLink();
        
        lastScrollY = currentScrollY;
    });
    
    // Initial header state
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});