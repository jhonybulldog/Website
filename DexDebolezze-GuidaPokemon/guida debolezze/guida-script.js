/**
 * guida-script.js
 * Gestisce la navigazione verso pagine diverse per ogni card
 * Utilizza parametri URL per distinguere le pagine
 */

// Mappa delle pagine con token e nome visuale
const pageTokens = [
    { selector: '[data-page="garden"]', token: 'giardino', name: 'Giardino Interiore', description: 'Minerali · Foglie · Luce' },
    { selector: '[data-page="architecture"]', token: 'architettura', name: 'Architettura e Natura', description: 'Spazio · Ordine · Matericità' },
    { selector: '[data-page="studio"]', token: 'studio', name: 'Studio Botanico', description: 'Essenza · Design · Quiete' },
    { selector: '[data-page="terrace"]', token: 'terrazza', name: 'Terrazza Aperta', description: 'Aria · Verde · Contemplazione' },
    { selector: '[data-page="materic"]', token: 'materico', name: 'Materia Prima', description: 'Texture · Minerali · Radici' },
    { selector: '[data-page="greenhouse"]', token: 'serra', name: 'Serra Contemporanea', description: 'Trasparenza · Rigenerazione' }
];

/**
 * Imposta gli href delle card con parametri URL univoci
 */
function setupCardLinks() {
    pageTokens.forEach(page => {
        const card = document.querySelector(page.selector);
        if (card) {
            const newUrl = `${window.location.pathname}?view=${page.token}`;
            card.setAttribute('href', newUrl);
            card.setAttribute('data-dest', newUrl);
        }
    });
}

/**
 * Gestisce la visualizzazione della pagina corrente basata sul parametro URL
 * Mostra un badge informativo e aggiorna il titolo
 */
function handleCurrentPageDisplay() {
    const urlParams = new URLSearchParams(window.location.search);
    const currentPage = urlParams.get('view');
    
    if (!currentPage) return;
    
    const pageInfo = pageTokens.find(p => p.token === currentPage);
    if (!pageInfo) return;
    
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    // Evita di creare duplicati
    if (document.querySelector('.page-badge')) return;
    
    // Crea il badge per indicare la pagina attuale
    const badge = document.createElement('div');
    badge.className = 'page-badge';
    badge.innerHTML = `✦ visualizzazione: ${pageInfo.name} ✦`;
    heroSection.appendChild(badge);
    
    // Crea link per tornare alla griglia principale
    const homeLink = document.createElement('a');
    homeLink.href = window.location.pathname;
    homeLink.className = 'home-link';
    homeLink.innerHTML = '← torna alla griglia';
    heroSection.appendChild(homeLink);
    
    // Aggiorna il titolo principale
    const mainTitle = document.querySelector('.hero h1');
    if (mainTitle) {
        mainTitle.innerHTML = `${pageInfo.name} · ${pageInfo.token}`;
    }
    
    // Aggiorna la sottodescrizione
    const heroParagraph = document.querySelector('.hero p');
    if (heroParagraph && pageInfo.description) {
        heroParagraph.innerHTML = pageInfo.description;
    }
    
    // Opzionale: aggiunge una classe al body per stili specifici
    document.body.classList.add('page-active');
}

/**
 * Opzionale: gestisce il titolo della pagina nel tab del browser
 */
function updateDocumentTitle() {
    const urlParams = new URLSearchParams(window.location.search);
    const currentPage = urlParams.get('view');
    
    if (currentPage) {
        const pageInfo = pageTokens.find(p => p.token === currentPage);
        if (pageInfo) {
            document.title = `${pageInfo.name} | Folio essenziale`;
            return;
        }
    }
    document.title = 'Folio | Spazi essenziali';
}

/**
 * Aggiunge un effetto visivo al click per feedback immediato (opzionale)
 */
function addClickFeedback() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Piccolo effetto visivo prima della navigazione
            this.style.transition = 'transform 0.1s ease';
            this.style.transform = 'scale(0.98)';
            
            // Ripristina dopo un breve ritardo (la navigazione potrebbe avvenire prima)
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
            
            // Log per tracciare la navigazione
            const destination = this.getAttribute('href');
            console.log(`✨ Navigazione verso: ${destination}`);
        });
    });
}

/**
 * Inizializza tutte le funzionalità
 */
function init() {
    setupCardLinks();
    handleCurrentPageDisplay();
    updateDocumentTitle();
    addClickFeedback();
}

// Avvia tutto quando il DOM è caricato
document.addEventListener('DOMContentLoaded', init);