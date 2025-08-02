// Vanki Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('mobile-open');
            mobileMenuBtn.classList.toggle('active');
        });
    }
    
    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('mobile-open')) {
                    navMenu.classList.remove('mobile-open');
                    mobileMenuBtn.classList.remove('active');
                }
            }
        });
    });
    
    // Header Scroll Effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Animated Counters for Stats
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const animateCounter = (element, target, suffix = '') => {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, 20);
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                const text = statNumber.textContent;
                
                if (text.includes('%')) {
                    const number = parseInt(text);
                    animateCounter(statNumber, number, '%');
                } else if (text.includes('+')) {
                    const number = parseInt(text.replace(/[+,]/g, ''));
                    animateCounter(statNumber, number, '+');
                } else if (text.includes('/') && text.endsWith('/5')) {
                    // Solo para calificaciones como 4.8/5
                    const number = parseFloat(text);
                    let current = 0;
                    const timer = setInterval(() => {
                        current += 0.1;
                        if (current >= number) {
                            statNumber.textContent = number + '/5';
                            clearInterval(timer);
                        } else {
                            statNumber.textContent = current.toFixed(1) + '/5';
                        }
                    }, 30);
                } else if (text === '24/7') {
                    // Animación para 24/7
                    let current = 0;
                    const timer = setInterval(() => {
                        current++;
                        if (current >= 24) {
                            statNumber.textContent = '24/7';
                            clearInterval(timer);
                        } else {
                            statNumber.textContent = current + '/7';
                        }
                    }, 50);
                } else if (text === '∞') {
                    // Keep infinity symbol as is
                    return;
                } else {
                    const number = parseInt(text.replace(/[,]/g, ''));
                    if (!isNaN(number)) {
                        animateCounter(statNumber, number);
                    }
                }
                
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all stat cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        statsObserver.observe(card);
    });
    
    // Parallax Effect for Floating Elements
    const floatingElements = document.querySelectorAll('.floating-element');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        floatingElements.forEach((element, index) => {
            const speed = (index + 1) * 0.2;
            element.style.transform = `translateY(${rate * speed}px)`;
        });
    });
    
    // Card Hover Effects with Parallax
    const cards = document.querySelectorAll('.value-card, .benefit-card, .testimonial-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) rotateX(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0)';
        });
        
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    });
    
    // Button Click Effects
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Intersection Observer for Animations
    const fadeInElements = document.querySelectorAll('.value-card, .benefit-card, .testimonial-card, .feature-card');
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Initialize fade-in elements
    fadeInElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeInObserver.observe(element);
    });
    
    // Contact Form Handling (if forms are added later)
    const contactForms = document.querySelectorAll('form');
    
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add your form submission logic here
            const formData = new FormData(this);
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.textContent = '¡Mensaje enviado con éxito! Te contactaremos pronto.';
            successMessage.style.cssText = `
                background: var(--gradient-accent);
                color: white;
                padding: 1rem 2rem;
                border-radius: 0.5rem;
                margin-top: 1rem;
                text-align: center;
                font-weight: 500;
            `;
            
            this.appendChild(successMessage);
            this.reset();
            
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        });
    });
    
    // WhatsApp Integration
    const whatsappButtons = document.querySelectorAll('[data-whatsapp]');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function() {
            const phone = '51908835071';
            const message = 'Hola, me interesa obtener más información sobre Vanki y Casa Bonita Residencial.';
            const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
            window.open(url, '_blank');
        });
    });
    
    // Add WhatsApp data attribute to relevant buttons
    const ctaButtons = document.querySelectorAll('.btn-hero');
    ctaButtons.forEach(button => {
        if (button.textContent.includes('SEPARAR CITA')) {
            button.setAttribute('data-whatsapp', 'true');
        }
    });
    
    // Performance optimization: Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // Theme-based animations
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (prefersDarkScheme.matches) {
        document.body.classList.add('dark-theme');
    }
    
    // Console welcome message
    console.log(`
    🚀 Vanki - Transformando el futuro de las familias
    
    ✨ Desarrollado con:
    - HTML5 Semántico
    - CSS3 con Variables Personalizadas
    - JavaScript Vanilla
    - Animaciones CSS
    - Diseño Responsive
    
    📱 ¿Interesado en aprender más? 
    WhatsApp: +51 908 835 071
    `);
});

// Additional CSS for ripple effect and mobile menu
const additionalStyles = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        pointer-events: none;
        animation: ripple-animation 0.6s ease-out;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .nav-menu.mobile-open {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        box-shadow: var(--shadow-card);
        padding: 1rem;
        border-radius: 0 0 1rem 1rem;
    }
    
    .mobile-menu-btn.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-btn.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-btn.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .header.scrolled {
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(20px);
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);