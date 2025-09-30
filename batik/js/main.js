// ===== MAIN JAVASCRIPT =====

// Smooth Scroll Function
function scrollToSection(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ===== IMAGE HANDLER WITH PLACEHOLDER =====

// Konfigurasi gambar untuk setiap batik
const batikImages = {
    'Batik Truntum': {
        main: 'image/batik/truntum.jpg',
        placeholder: 'linear-gradient(135deg, #8B4513, #B8860B)',
        icon: '🌺'
    },
    'Batik Sogan': {
        main: 'image/batik/sogan.jpg',
        placeholder: 'linear-gradient(135deg, #8B7355, #D2691E)',
        icon: '🍂'
    },
    'Batik Tiga Negeri': {
        main: 'image/batik/tiganegeri.jpg',
        placeholder: 'linear-gradient(135deg, #CD853F, #DEB887)',
        icon: '🎨'
    },
    'Batik Sidoluhur': {
        main: 'image/batik/sidoluhur.jpg',
        placeholder: 'linear-gradient(135deg, #A0522D, #D2B48C)',
        icon: '⭐'
    },
    'Batik Besurek': {
        main: 'image/batik/besurek.jpg',
        placeholder: 'linear-gradient(135deg, #8B6914, #DAA520)',
        icon: '☪️'
    },
    'Batik Gentongan': {
        main: 'image/batik/gentongan.jpg',
        placeholder: 'linear-gradient(135deg, #B87333, #CD7F32)',
        icon: '🏺'
    }
};

// Function untuk load image dengan placeholder
function loadImageWithPlaceholder(element, imagePath, placeholder, icon) {
    const img = new Image();
    
    // Set placeholder dulu
    element.style.background = placeholder;
    element.innerHTML = `<div style="display: flex; align-items: center; justify-content: center; height: 100%; font-size: 80px;">${icon}</div>`;
    
    // Coba load gambar
    img.onload = function() {
        // Jika gambar berhasil load, ganti dengan gambar asli
        element.style.background = `url('${imagePath}') center/cover no-repeat`;
        element.innerHTML = '';
        element.classList.add('image-loaded');
    };
    
    img.onerror = function() {
        // Jika gambar gagal load, tetap pakai placeholder
        console.log(`Image not found: ${imagePath}, using placeholder`);
        element.classList.add('placeholder-mode');
    };
    
    // Mulai load gambar
    img.src = imagePath;
}

// Function untuk load semua gambar gallery
function loadGalleryImages() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        const title = item.querySelector('h3').textContent;
        const bgElement = item.querySelector('.gallery-item-bg');
        const imageData = batikImages[title];
        
        if (bgElement && imageData) {
            loadImageWithPlaceholder(
                bgElement,
                imageData.main,
                imageData.placeholder,
                imageData.icon
            );
        }
    });
}

// Function untuk load image di modal
function loadModalImage(batikName) {
    const modalImageElement = document.querySelector('.modal-image-placeholder');
    const imageData = batikImages[batikName];
    
    if (modalImageElement && imageData) {
        loadImageWithPlaceholder(
            modalImageElement,
            imageData.main,
            imageData.placeholder,
            imageData.icon
        );
    }
}

// Auto load saat DOM ready
document.addEventListener('DOMContentLoaded', function() {
    loadGalleryImages();
    
    // Update modal image saat card diklik
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            setTimeout(() => {
                loadModalImage(title);
            }, 100);
        });
    });
});

// Lazy loading dengan Intersection Observer
const observerOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1
};

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const item = entry.target;
            const bgElement = item.querySelector('.gallery-item-bg');
            
            if (bgElement && !bgElement.classList.contains('observed')) {
                bgElement.classList.add('observed');
                // Image sudah diload di loadGalleryImages()
            }
            
            observer.unobserve(item);
        }
    });
}, observerOptions);

// Observe semua gallery items untuk lazy loading
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.gallery-item').forEach(item => {
        imageObserver.observe(item);
    });
});

console.log('🖼️ Image handler loaded with placeholder support!');

// Data detail batik
const batikData = {
    'Batik Truntum': {
        philosophy: 'Melambangkan cinta yang tumbuh kembali seperti tunas muda. Motif ini mengandung harapan agar cinta kasih dalam keluarga tetap tumbuh dan berkembang selamanya. Sering digunakan dalam acara pernikahan sebagai simbol cinta abadi.'
    },
    'Batik Sogan': {
        philosophy: 'Warna sogan yang natural dari kulit pohon soga mencerminkan kesederhanaan dan kebijaksanaan. Batik ini mengajarkan tentang kembali ke alam dan nilai-nilai luhur leluhur. Proses pewarnaan alami menunjukkan keharmonisan dengan lingkungan.'
    },
    'Batik Tiga Negeri': {
        philosophy: 'Kolaborasi tiga kota ini melambangkan persatuan dalam keberagaman. Setiap kota memberikan warna berbeda namun menyatu dalam satu kain yang harmonis. Ini mencerminkan semboyan Bhinneka Tunggal Ika.'
    },
    'Batik Sidoluhur': {
        philosophy: 'Sido berarti jadi atau menjadi, Luhur berarti mulia. Motif ini melambangkan harapan agar pemakainya menjadi orang yang mulia dan berbudi luhur. Sering dikenakan dalam acara penting sebagai doa dan harapan baik.'
    },
    'Batik Besurek': {
        philosophy: 'Perpaduan kaligrafi Arab dengan motif batik menunjukkan keharmonisan Islam dengan budaya lokal. Motif ini sarat dengan nilai-nilai religius dan spiritual. Kata Besurek berarti bersurat atau bertuliskan kaligrafi Arab.'
    },
    'Batik Gentongan': {
        philosophy: 'Teknik celup menggunakan gentong tanah liat mencerminkan kearifan lokal dalam menjaga lingkungan. Warna natural yang dihasilkan menunjukkan kedekatan dengan alam. Proses tradisional ini telah dilakukan turun-temurun.'
    }
};

// Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('batikModal');
    const closeModal = document.querySelector('.close-modal');
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Open modal saat card diklik
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            const description = this.querySelector('p').textContent;
            const region = this.querySelector('.region-tag').textContent;
            
            // Isi modal
            document.getElementById('modalTitle').textContent = title;
            document.getElementById('modalRegion').textContent = region;
            document.getElementById('modalDescription').textContent = description;
            document.getElementById('modalPhilosophy').textContent = 
                batikData[title]?.philosophy || 'Filosofi batik ini mencerminkan kearifan lokal dan nilai budaya Indonesia.';
            
            // Tampilkan modal
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal saat tombol X diklik
    if (closeModal) {
        closeModal.onclick = function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    // Close saat klik di luar modal
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    // Close dengan ESC key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Setup smooth scrolling
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active menu state
    updateActiveMenu();
});

// Update active menu saat scroll
function updateActiveMenu() {
    const sections = document.querySelectorAll('section[id]');
    const menuLinks = document.querySelectorAll('.menu a');

    window.addEventListener('scroll', () => {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= (sectionTop - 200)) {
                currentSection = section.getAttribute('id');
            }
        });

        menuLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    });
}

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// Counter animation untuk stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (target === 5000 ? '+' : target === 800 ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (target === 5000 ? '+' : target === 800 ? '+' : '');
        }
    }, 16);
}

// Trigger counter animation saat stats terlihat
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const statNumber = entry.target.querySelector('.stat-number');
            const targetText = statNumber.textContent;
            const targetNumber = parseInt(targetText.replace(/\D/g, ''));
            
            animateCounter(statNumber, targetNumber, 2000);
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-box').forEach(box => {
    statsObserver.observe(box);
});

console.log('✅ Main.js loaded with modal functionality!');