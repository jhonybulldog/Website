/**
 * Nuzlocke Guide - Pokémon Zaffiro
 * Interattività: modali starter e console log
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Modale per gli Starter ---
    const starterDetails = {
        mudkip: {
            title: "🦎 Mudkip",
            content: "✓ Il più sicuro per una Nuzlocke in Zaffiro<br>✓ Swampert (Acqua/Terra) ha un solo punto debole (Erba)<br>✓ Con Heracross, Sableye e Ludicolo disponibili, hai un team imbattibile<br>✓ Domina le palestre di Roccia, Fuoco, Elettro e Acciaio<br>✓ È il tank definitivo<br><br>⭐ SCELTA MIGLIORE per Zaffiro ⭐"
        },
        torchic: {
            title: "🐔 Torchic",
            content: "✓ Blaziken (Fuoco/Lotta) è potente offensivamente<br>✓ In Zaffiro hai già Heracross per Lotta<br>✓ Domina Erba, Ghiaccio, Coleottero, Buio<br>⚠ Debole contro Acqua, Terra e Psico<br>⚠ Fragile fisicamente<br><br>✓ Scelta valida ma ridondante grazie a Heracross"
        },
        treecko: {
            title: "🦎 Treecko",
            content: "⚠ SCELTA SCONSIGLIATA PER NUZLOCKE ⚠<br><br>✓ Sceptile è veloce e ha ottimo Attacco Speciale<br>✓ Foglielama (sempre critico in 3ª gen) è devastante<br>✗ In Zaffiro hai Ludicolo (Acqua/Erba) che è più versatile e resistente<br>✗ Fragile, debole contro le prime palestre<br><br>Solo per giocatori esperti che cercano una sfida extra"
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
            if (card.classList.contains('starter-mudkip')) {
                openModal('mudkip');
            } else if (card.classList.contains('starter-torchic')) {
                openModal('torchic');
            } else if (card.classList.contains('starter-treecko')) {
                openModal('treecko');
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
    console.log('✨ Nuzlocke Guide Pokémon Zaffiro - Caricata con successo!');
    console.log('🪲💪 Heracross è la cattura più importante! Cercalo al Percorso 119 (5% raro).');
    console.log('👻⚫ Sableye non ha debolezze in 3ª gen! Rende Tate&Liza una passeggiata.');
    console.log('💧🌿 Ludicolo (Lotad) è un tank Acqua/Erba versatile. Perfetto per Drake con Geloraggio.');
    console.log('⚡ Manectric è il tuo Elettro principale. Minun è troppo fragile.');
    console.log('🌊 Kyogre è OP con Pioggiadanza + Idropompa + Tuono + Geloraggio.');
    console.log('🎒 Zigzagoon con Muetassalto raccoglie oggetti - tienilo nel team all\'inizio!');
    console.log('💪 Norman è FACILE in Zaffiro: Heracross con Sottomissione distrugge Slaking!');
});