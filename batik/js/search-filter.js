// ===== SEARCH & FILTER BATIK =====

document.addEventListener('DOMContentLoaded', function() {
    // Buat search bar
    const gallerySection = document.querySelector('#gallery .section-header');
    const searchHTML = `
        <div class="search-filter-container">
            <div class="search-box">
                <input type="text" id="searchInput" placeholder="🔍 Cari batik...">
            </div>
            <div class="filter-buttons">
                <button class="filter-btn active" data-region="all">Semua</button>
                <button class="filter-btn" data-region="jawa">Jawa</button>
                <button class="filter-btn" data-region="luar-jawa">Luar Jawa</button>
            </div>
        </div>
    `;
    
    gallerySection.insertAdjacentHTML('afterend', searchHTML);
    
    // Data region batik
    const batikRegions = {
        'Batik Truntum': 'jawa',
        'Batik Sogan': 'jawa',
        'Batik Tiga Negeri': 'jawa',
        'Batik Sidoluhur': 'jawa',
        'Batik Besurek': 'luar-jawa',
        'Batik Gentongan': 'jawa'
    };
    
    const galleryItems = document.querySelectorAll('.gallery-item');
    const searchInput = document.getElementById('searchInput');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        let visibleCount = 0;
        
        galleryItems.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            const description = item.querySelector('p').textContent.toLowerCase();
            const region = item.querySelector('.region-tag').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm) || region.includes(searchTerm)) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease';
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });
        
        // Show no results message
        showNoResults(visibleCount);
    });
    
    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const region = this.dataset.region;
            let visibleCount = 0;
            
            galleryItems.forEach(item => {
                const title = item.querySelector('h3').textContent;
                const itemRegion = batikRegions[title];
                
                if (region === 'all' || itemRegion === region) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease';
                    visibleCount++;
                } else {
                    item.style.display = 'none';
                }
            });
            
            showNoResults(visibleCount);
        });
    });
    
    // Show no results message
    function showNoResults(count) {
        let noResultsMsg = document.querySelector('.no-results');
        
        if (count === 0) {
            if (!noResultsMsg) {
                noResultsMsg = document.createElement('div');
                noResultsMsg.className = 'no-results';
                noResultsMsg.innerHTML = `
                    <div style="text-align: center; padding: 60px 20px; color: #aaa;">
                        <div style="font-size: 60px; margin-bottom: 20px;">😔</div>
                        <h3 style="color: #DAA520; margin-bottom: 10px;">Tidak Ada Hasil</h3>
                        <p>Coba kata kunci lain atau filter berbeda</p>
                    </div>
                `;
                document.querySelector('.gallery').appendChild(noResultsMsg);
            }
        } else if (noResultsMsg) {
            noResultsMsg.remove();
        }
    }
});

console.log('🔍 Search & Filter loaded!');