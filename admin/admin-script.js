// ===== CONFIGURAZIONE =====
const CONFIG = {
    scrollOffset: 100,
    scrollThreshold: 0.3,
    storageKeys: {
        sites: 'admin_sites_data',
        visited: 'admin_visited_sites',
        settings: 'admin_settings'
    },
    animationDuration: 300
};

// ===== INIZIALIZZAZIONE =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Admin Panel - Initializing...');
    
    initMobileMenu();
    initNavigation();
    initSitesCounter();
    initQuickActions();
    initVisitedSites();
    loadSitesFromStorage();
    initVisualEffects();
    
    console.log('✅ Admin Panel loaded successfully!');
});

// ===== HAMBURGER MENU =====
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    const closeBtn = document.querySelector('.close-mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    
    console.log('🔧 Mobile Menu Elements:', {
        hamburger: !!hamburger,
        overlay: !!mobileOverlay,
        closeBtn: !!closeBtn,
        links: mobileLinks.length
    });
    
    if (!hamburger || !mobileOverlay || !closeBtn) {
        console.error('❌ Hamburger menu elements not found!');
        return;
    }
    
    // Apri menu
    hamburger.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('🍔 Hamburger clicked - Opening menu');
        toggleMobileMenu(true);
    });
    
    // Chiudi menu
    closeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('❌ Close button clicked - Closing menu');
        toggleMobileMenu(false);
    });
    
    // Chiudi cliccando sull'overlay
    mobileOverlay.addEventListener('click', function(e) {
        if (e.target === mobileOverlay) {
            console.log('🎯 Overlay clicked - Closing menu');
            toggleMobileMenu(false);
        }
    });
    
    // Chiudi con ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileOverlay.classList.contains('active')) {
            console.log('⌨️ ESC pressed - Closing menu');
            toggleMobileMenu(false);
        }
    });
    
    // Click sui link mobile
    mobileLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            console.log('📱 Mobile link clicked:', targetId);
            
            scrollToSection(targetId);
            toggleMobileMenu(false);
        });
    });
    
    console.log('✅ Mobile menu initialized successfully');
}

function toggleMobileMenu(show) {
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    const body = document.body;
    
    if (show) {
        hamburger.classList.add('active');
        mobileOverlay.classList.add('active');
        body.classList.add('mobile-menu-open');
        console.log('📱 Mobile menu OPENED');
    } else {
        hamburger.classList.remove('active');
        mobileOverlay.classList.remove('active');
        body.classList.remove('mobile-menu-open');
        console.log('📱 Mobile menu CLOSED');
    }
}

function scrollToSection(sectionId) {
    const targetSection = document.querySelector(sectionId);
    if (targetSection) {
        const headerHeight = document.querySelector('.admin-header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        console.log('🎯 Scrolling to section:', sectionId);
    }
}

// ===== NAVIGAZIONE AVANZATA =====
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.category-section');
    
    // Click sui link del menu
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            scrollToSection(targetId);
            updateActiveNav(this);
        });
    });
    
    // Highlight menu durante scroll
    window.addEventListener('scroll', debounce(() => {
        const scrollPosition = window.scrollY + CONFIG.scrollOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                updateActiveNav(activeLink);
            }
        });
    }, 100));
    
    console.log('✅ Navigation initialized');
}

function updateActiveNav(activeLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// ===== CONTATORE SITI =====
function initSitesCounter() {
    const sections = document.querySelectorAll('.category-section');
    
    sections.forEach(section => {
        const siteCount = section.querySelectorAll('.sites-list li').length;
        const sectionTitle = section.querySelector('h2');
        
        if (sectionTitle && !sectionTitle.querySelector('.site-count')) {
            const countBadge = document.createElement('span');
            countBadge.className = 'site-count';
            countBadge.textContent = ` (${siteCount})`;
            countBadge.style.color = 'var(--text-gray)';
            countBadge.style.fontSize = '0.8em';
            countBadge.style.fontWeight = 'normal';
            sectionTitle.appendChild(countBadge);
        }
    });
    
    console.log('✅ Sites counter initialized');
}

// ===== AZIONI RAPIDE =====
function initQuickActions() {
    const sections = document.querySelectorAll('.category-section');
    
    sections.forEach(section => {
        section.addEventListener('dblclick', function() {
            showAddSiteForm(this);
        });
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === '+' && e.ctrlKey) {
            e.preventDefault();
            showQuickAddForm();
        }
    });
    
    console.log('✅ Quick actions initialized');
}

function showAddSiteForm(section) {
    const category = section.querySelector('h2').textContent.replace(/[^a-zA-Z]/g, '').toLowerCase();
    const siteName = prompt(`Aggiungi sito alla categoria "${category}":\nNome sito:`);
    
    if (siteName && siteName.trim()) {
        const siteUrl = prompt(`URL per "${siteName}":`, 'https://');
        
        if (siteUrl) {
            addSiteToCategory(category, {
                name: siteName.trim(),
                url: siteUrl,
                added: new Date().toLocaleDateString('it-IT')
            });
        }
    }
}

function addSiteToCategory(category, siteData) {
    const section = document.querySelector(`#${category}`);
    if (!section) return;
    
    const sitesList = section.querySelector('.sites-list');
    const newSiteItem = document.createElement('li');
    
    newSiteItem.innerHTML = `
        <a href="${siteData.url}" target="_blank" data-site="${siteData.name}">
            ${siteData.name}
        </a>
    `;
    
    sitesList.appendChild(newSiteItem);
    saveSitesToStorage();
    initSitesCounter();
    
    newSiteItem.style.opacity = '0';
    newSiteItem.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        newSiteItem.style.transition = 'all 0.3s ease';
        newSiteItem.style.opacity = '1';
        newSiteItem.style.transform = 'translateY(0)';
    }, 10);
    
    console.log('✅ Site added to category:', category);
}

// ===== SITI VISITATI =====
function initVisitedSites() {
    document.addEventListener('click', function(e) {
        const siteLink = e.target.closest('.sites-list a');
        if (siteLink) {
            trackSiteVisit(siteLink);
        }
    });
    
    showRecentlyVisited();
    console.log('✅ Visited sites tracker initialized');
}

function trackSiteVisit(siteLink) {
    const siteName = siteLink.textContent;
    const siteUrl = siteLink.getAttribute('href');
    const category = siteLink.closest('.category-section').id;
    
    const visitData = {
        name: siteName,
        url: siteUrl,
        category: category,
        timestamp: new Date().toISOString(),
        date: new Date().toLocaleDateString('it-IT'),
        time: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })
    };
    
    const visited = JSON.parse(localStorage.getItem(CONFIG.storageKeys.visited) || '[]');
    visited.unshift(visitData);
    const recentVisits = visited.slice(0, 20);
    localStorage.setItem(CONFIG.storageKeys.visited, JSON.stringify(recentVisits));
}

function showRecentlyVisited() {
    const visited = JSON.parse(localStorage.getItem(CONFIG.storageKeys.visited) || '[]');
    if (visited.length > 0) {
        console.log('🎯 Ultimi siti visitati:', visited.slice(0, 3));
    }
}

// ===== GESTIONE DATI LOCALSTORAGE =====
function saveSitesToStorage() {
    const sitesData = {};
    const sections = document.querySelectorAll('.category-section');
    
    sections.forEach(section => {
        const category = section.id;
        const sites = [];
        
        section.querySelectorAll('.sites-list a').forEach(link => {
            sites.push({
                name: link.textContent,
                url: link.getAttribute('href')
            });
        });
        
        sitesData[category] = sites;
    });
    
    localStorage.setItem(CONFIG.storageKeys.sites, JSON.stringify(sitesData));
}

function loadSitesFromStorage() {
    const savedData = localStorage.getItem(CONFIG.storageKeys.sites);
    if (savedData) {
        const sitesData = JSON.parse(savedData);
        console.log('📁 Siti salvati caricati:', sitesData);
    }
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

// ===== EFFETTI VISIVI =====
function initVisualEffects() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.category-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
    
    console.log('✅ Visual effects initialized');
}

// ===== ESCI DALL'APP =====
document.addEventListener('keydown', function(e) {
    if (e.key === 'q' && e.ctrlKey) {
        e.preventDefault();
        if (confirm('Uscire dal pannello admin?')) {
            window.location.href = '../index.html';
        }
    }
});

// ===== FIX DI EMERGENZA =====
setTimeout(function() {
    const closeBtn = document.querySelector('.close-mobile-menu');
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    
    if (closeBtn && hamburger && mobileOverlay) {
        console.log('🛠️ Emergency fix applied');
        
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            mobileOverlay.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.classList.remove('mobile-menu-open');
            console.log('🛠️ Emergency close triggered');
        });
        
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            mobileOverlay.classList.add('active');
            hamburger.classList.add('active');
            document.body.classList.add('mobile-menu-open');
            console.log('🛠️ Emergency open triggered');
        });
    }
}, 2000);