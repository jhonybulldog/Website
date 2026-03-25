/**
 * Nuzlocke Guide - Pokémon Oro & Argento
 * Interattività: modali starter e console log
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Modale per gli Starter ---
    const starterDetails = {
        totodile: {
            title: "🐊 Totodile",
            content: "✓ Il più sicuro per una Nuzlocke<br>✓ Feraligatr impara Morso presto (Buio, utile contro Psico)<br>✓ Bilanciato, affidabile dall'inizio alla fine<br>✓ Lento nelle fasi iniziali<br><br>⭐ SCELTA MIGLIORE per la sicurezza ⭐"
        },
        cyndaquil: {
            title: "🔥 Cyndaquil",
            content: "✓ Il più potente offensivamente<br>✓ Typhlosion è veloce e colpisce duro<br>✓ Domina Erba, Ghiaccio, Coleottero<br>⚠ Debole contro il primo capo (Roccia) se non hai altre opzioni<br>⚠ Fragile fisicamente<br><br>✓ Scelta solida, richiede supporto per le prime palestre"
        },
        chikorita: {
            title: "🌿 Chikorita",
            content: "⚠ SCELTA SCONSIGLIATA PER NUZLOCKE ⚠<br><br>✓ Riflesso e Parassisema per supporto<br>✗ Debole contro le prime 4 palestre (Volante, Coleottero, Normale, Fantasma)<br>✗ Offensivamente debole<br>✗ La scelta più difficile<br><br>Solo per giocatori esperti che cercano una sfida extra"
        }
    };
    
    // Crea overlay modale
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
    
    function openModal(starterKey) {
        const data = starterDetails[starterKey];
        if (!data) return;
        
        modalContent.innerHTML = `
            <h2>${data.title}</h2>
            <p>${data.content}</p>
            <button class="modal-close">Chiudi</button>
        `;
        
        modalOverlay.classList.add('active');
        
        const closeBtn = modalContent.querySelector('.modal-close');
        closeBtn.addEventListener('click', closeModal);
    }
    
    function closeModal() {
        modalOverlay.classList.remove('active');
    }
    
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    // Aggiungi event listener alle card starter
    const starterCards = document.querySelectorAll('.starter-card');
    starterCards.forEach(card => {
        card.addEventListener('click', () => {
            if (card.classList.contains('starter-toto')) {
                openModal('totodile');
            } else if (card.classList.contains('starter-cynda')) {
                openModal('cyndaquil');
            } else if (card.classList.contains('starter-chiko')) {
                openModal('chikorita');
            }
        });
    });
    
    // Effetto hover per le card Pokémon
    const pokemonCards = document.querySelectorAll('.pokemon-card, .league-pokemon-card, .gifted-card, .key-card, .version-card');
    pokemonCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.2s ease';
        });
    });
    
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    
    // Console log
    console.log('✨ Nuzlocke Guide Pokémon Oro & Argento - Caricata con successo!');
    console.log('🐄 ATTENZIONE A WHITNEY! Scambia Machop a Fiordoropoli!');
    console.log('❄️ GHIACCIO FONDAMENTALE per Lance: Jynx con Geloraggio');
    console.log('🎮 Differenze Oro/Argento: Growlithe vs Vulpix, Gligar vs Phanpy');
});