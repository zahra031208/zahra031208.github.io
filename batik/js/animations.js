// ============================================
// BATIK GALLERY - ANIMATIONS.JS
// File ini berisi semua animasi untuk website
// ============================================

// 1. FADE IN ANIMATION (untuk elemen yang muncul saat scroll)
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-active');
        }
    });
}, observerOptions);

// Tambahkan class fade-in ke elemen yang ingin dianimasi
document.addEventListener('DOMContentLoaded', () => {
    // Animasi untuk stat-box, gallery items, dan cards
    const fadeElements = document.querySelectorAll(
        '.stat-box, .gallery-item, .batik-card, .hero-content, .section-header, .proses-item, .filosofi-box'
    );
    
    fadeElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        fadeInObserver.observe(el);
    });
});

// CSS untuk fade-in (tambahkan ke style)
const fadeInStyles = `
    .fade-in-active {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;

// 2. NAVBAR SCROLL EFFECT
// ============================================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Navbar shadow saat scroll
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 5px 20px rgba(218, 165, 32, 0.3)';
        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
    } else {
        navbar.style.boxShadow = 'none';
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    }
    
    // Hide/Show navbar saat scroll (optional)
    if (currentScroll > lastScroll && currentScroll > 500) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Smooth transition untuk navbar
if (navbar) {
    navbar.style.transition = 'all 0.4s ease';
}

// 3. COUNTER ANIMATION (untuk statistik/angka)
// ============================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// Jalankan counter saat elemen terlihat
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            entry.target.classList.add('counted');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(counter => {
    counterObserver.observe(counter);
});

// 4. CARD HOVER 3D EFFECT
// ============================================
document.querySelectorAll('.stat-box, .batik-card, .gallery-item').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
    
    card.style.transition = 'transform 0.3s ease';
});

// 5. TEXT TYPING ANIMATION (untuk hero title)
// ============================================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Jalankan typing animation untuk hero title
const heroTitle = document.querySelector('.hero-title, .page-title-main');
if (heroTitle) {
    const originalText = heroTitle.textContent;
    window.addEventListener('load', () => {
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 500);
    });
}

// 6. PARALLAX EFFECT (untuk background images)
// ============================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-speed') || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// 7. SMOOTH SCROLL untuk anchor links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 8. LOADING ANIMATION
// ============================================
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
    
    // Animasi fade in untuk semua section
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// 9. BUTTON RIPPLE EFFECT
// ============================================
document.querySelectorAll('.btn, .batik-tag, button').forEach(button => {
    button.addEventListener('click', function(e) {
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
    
    // Tambahkan position relative jika belum ada
    if (getComputedStyle(button).position === 'static') {
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
    }
});

// CSS untuk ripple effect
const rippleStyles = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

// 10. IMAGE LAZY LOADING dengan fade in
// ============================================
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
            
            img.onload = () => {
                img.style.opacity = '1';
                img.classList.add('loaded');
            };
            
            imageObserver.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// 11. PROGRESS BAR ANIMATION
// ============================================
const progressBar = document.querySelector('.progress-bar');
if (progressBar) {
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// 12. STAGGER ANIMATION (untuk list items)
// ============================================
function staggerAnimation(selector, delay = 100) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            el.style.transition = 'all 0.5s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateX(0)';
        }, index * delay);
    });
}

// Jalankan stagger animation untuk menu items
document.addEventListener('DOMContentLoaded', () => {
    staggerAnimation('.menu li', 80);
});

// 13. MODAL ANIMATION (jika ada modal)
// ============================================
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.transition = 'opacity 0.3s ease';
            modal.style.opacity = '1';
        }, 10);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

// 14. SCROLL REVEAL untuk section
// ============================================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.section').forEach(section => {
    section.classList.add('reveal');
    revealObserver.observe(section);
});

// 15. INJECT STYLES
// ============================================
const styleSheet = document.createElement('style');
styleSheet.textContent = fadeInStyles + rippleStyles + `
    .reveal {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s ease;
    }
    
    .revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #0a0a0a;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    }
`;
document.head.appendChild(styleSheet);

// Console log
console.log('🎨 Batik Gallery Animations Loaded Successfully!');
console.log('✨ All animations are ready to use!');