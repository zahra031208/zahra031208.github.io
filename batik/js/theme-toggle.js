// ===== DARK/LIGHT MODE TOGGLE =====

document.addEventListener('DOMContentLoaded', function() {
    // Buat theme toggle button
    const themeToggleHTML = `
        <button class="theme-toggle" id="themeToggle" title="Toggle Theme">
            <span class="theme-icon">🌙</span>
        </button>
    `;
    
    document.body.insertAdjacentHTML('beforeend', themeToggleHTML);
    
    const themeToggle = document.getElementById('themeToggle');
    let isDark = true; // Default dark mode
    
    // Load saved theme
    const savedTheme = localStorage.getItem('batikTheme');
    if (savedTheme === 'light') {
        toggleTheme();
    }
    
    themeToggle.addEventListener('click', function() {
        toggleTheme();
    });
    
    function toggleTheme() {
        isDark = !isDark;
        document.body.classList.toggle('light-mode');
        
        if (isDark) {
            themeToggle.querySelector('.theme-icon').textContent = '🌙';
            localStorage.setItem('batikTheme', 'dark');
        } else {
            themeToggle.querySelector('.theme-icon').textContent = '☀️';
            localStorage.setItem('batikTheme', 'light');
        }
        
        // Animasi toggle
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg)';
        }, 500);
    }
});

console.log('🌙 Theme toggle loaded!');