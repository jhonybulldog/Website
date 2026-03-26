/**
 * Nuzlocke Guide - Pokémon Nero
 * Interattività: modali starter e console log
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Modale per gli Starter ---
    const starterDetails = {
        tepig: {
            title: "🐷 Tepig",
            content: "✓ Il più versatile. Emboar (Fuoco/Lotta) copre molti tipi (Erba, Ghiaccio, Acciaio, Normale)<br>✓ Tank fisico con buon Attacco<br>✓ In Nero, dove hai Whimsicott come supporto e Scrafty come Lotta, Tepig è eccellente<br>⚠ Lento<br>⚠ Debole contro Acqua, Terra, Psico, Volante<br><br>⭐ SCELTA MIGLIORE per la flessibilità ⭐"
        },
        oshawott: {
            title: "🦦 Oshawott",
            content: "✓ Il più sicuro. Samurott (Acqua) è bilanciato con buone statistiche fisiche e speciali<br>✓ Impara Morso (Buio) presto, utile contro i Psico<br>✓ In Nero hai Jellicent come Acqua/Fantasma, ma Samurott è un'alternativa solida<br>⚠ Non ha un secondo tipo, quindi poche resistenze extra<br><br>✓ Scelta solida e affidabile"
        },
        snivy: {
            title: "🐍 Snivy",
            content: "⚠ SCELTA SCONSIGLIATA PER NUZLOCKE ⚠<br><br>✓ Serperior è veloce e ha buone difese<br>✗ Offensivamente debole (Attacco e Attacco Speciale bassi)<br>✗ In Nero hai Whimsicott come supporto Erba eccellente<br>✗ Molte debolezze (Fuoco, Ghiaccio, Volante, Coleottero, Veleno)<br><br>Solo per giocatori esperti che cercano una sfida extra"
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
            if (card.classList.contains('starter-tepig')) {
                openModal('tepig');
            } else if (card.classList.contains('starter-oshawott')) {
                openModal('oshawott');
            } else if (card.classList.contains('starter-snivy')) {
                openModal('snivy');
            }
        });
    });
    
    // Effetto hover per le card Pokémon
    const pokemonCards = document.querySelectorAll('.pokemon-card, .league-pokemon-card, .exclusive-card, .key-card');
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
    
    // Console log con avvisi importanti
    console.log('✨ Nuzlocke Guide Pokémon Nero - Caricata con successo!');
    console.log('⛏️⚙️ EXCADRILL è la chiave! Cattura Drilbur nella Grotta Spettro (Percorso 3). Top tier assoluto!');
    console.log('🌿');
});