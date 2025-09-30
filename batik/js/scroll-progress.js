// ===== SCROLL PROGRESS BAR =====

document.addEventListener('DOMContentLoaded', function() {
    // Buat progress bar
    const progressHTML = `
        <div class="scroll-progress-container">
            <div class="scroll-progress-bar" id="scrollProgress"></div>
        </div>
        <button class="scroll-to-top" id="scrollToTop" title="Back to Top">
            ⬆️
        </button>
    `;
    
    document.body.insertAdjacentHTML('afterbegin', progressHTML);
    
    const progressBar = document.getElementById('scrollProgress');
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    // Update progress bar saat scroll
    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        
        progressBar.style.width = scrolled + '%';
        
        // Show/hide scroll to top button
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

console.log('📊 Scroll progress loaded!');