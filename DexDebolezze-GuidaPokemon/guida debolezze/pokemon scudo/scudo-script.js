/**
 * Nuzlocke Guide - Pokémon Scudo
 * Interattività: modali starter e console log
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Modale per gli Starter ---
    const starterDetails = {
        scorbunny: {
            title: "🐰 Scorbunny",
            content: "✓ Il più veloce. Cinderace (Fuoco) è velocissimo con ottimo Attacco<br>✓ In Scudo hai Arcanine come Fuoco, ma Cinderace resta eccellente<br>✓ Mosse come Nitrocarburo e Fiammata sono devastanti<br>⚠ Fragile fisicamente<br>⚠ Debole contro Acqua, Terra, Roccia<br><br>⭐ SCELTA MIGLIORE per la flessibilità ⭐"
        },
        sobble: {
            title: "🦎 Sobble",
            content: "✓ Inteleon (Acqua) è veloce con ottimo Attacco Speciale<br>✓ Impara Sgranocchio (Buio) e Geloraggio (Ghiaccio) per copertura<br>✓ In Scudo hai Ludicolo e Gyarados come Acqua, ma Inteleon è valido<br>⚠ Fragile<br>⚠ Debole contro Elettro, Erba<br><br>✓ Scelta solida"
        },
        grookey: {
            title: "🐒 Grookey",
            content: "⚠ SCELTA SCONSIGLIATA PER NUZLOCKE ⚠<br><br>✓ Rillaboom (Erba) ha buon Attacco fisico<br>✓ In Scudo hai Lotad (Ludicolo) come Erba/Acqua più versatile<br>✗ Lento<br>✗ Molte debolezze (Fuoco, Ghiaccio, Volante, Coleottero, Veleno)<br><br>Solo per giocatori esperti"
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
            if (card.classList.contains('starter-scorbunny')) {
                openModal('scorbunny');
            } else if (card.classList.contains('starter-sobble')) {
                openModal('sobble');
            } else if (card.classList.contains('starter-grookey')) {
                openModal('grookey');
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
    console.log('✨ Nuzlocke Guide Pokémon Scudo - Caricata con successo!');
    console.log('🛡️🐺 ZAMAZENTA è un tank eccellente! Scudo Infinito aumenta la Difesa. Incassa colpi che distruggerebbero altri Pokémon.');
    console.log('🪨💎 LARVITAR (Tyranitar) è l\'esclusivo più importante di Scudo. Pseudo-leggendario con Attacco altissimo.');
    console.log('🐌💧 GOOMY (Goodra) è un tank speciale eccellente con altissima Difesa Speciale. Perfetto per i Draghi.');
    console.log('🪸👻 CORSOLA DI GALAR (Cursola) ha altissima Difesa Speciale. Maledizione + Corruzione logorano i nemici.');
    console.log('🐉😴 DRAMPA con Adattabilità potenzia Dragopulsar e Iperraggio. Tank speciale eccellente.');
    console.log('🦍🧠 ORANGURU con Manipolazione può cambiare le mosse nemiche. Supporto eccellente.');
    console.log('🏞️ WILD AREA: Ogni sottozona conta come area separata. Esplora Zona Sud, Est, Nord, Lago del Fuoco.');
    console.log('🐦⚙️ CORVIKNIGHT (Rookidee) è un tank Acciaio/Volante eccellente per tutta la run.');
    console.log('🎮 MT RIUTILIZZABILI in 8ª gen! Sperimenta liberamente.');
    console.log('⚠ Attenzione alle Max Raid: Possono essere pericolose. Preparati bene.');
});