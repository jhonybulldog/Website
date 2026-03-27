/**
 * Nuzlocke Guide - Pokémon Spada
 * Interattività: modali starter e console log
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Modale per gli Starter ---
    const starterDetails = {
        scorbunny: {
            title: "🐰 Scorbunny",
            content: "✓ Il più veloce. Cinderace (Fuoco) è velocissimo con ottimo Attacco<br>✓ In Spada hai Darmanitan di Galar come Ghiaccio e Arcanine come Fuoco, ma Cinderace resta eccellente<br>✓ Mosse come Nitrocarburo e Fiammata sono devastanti<br>⚠ Fragile fisicamente<br>⚠ Debole contro Acqua, Terra, Roccia<br><br>⭐ SCELTA MIGLIORE per la flessibilità ⭐"
        },
        sobble: {
            title: "🦎 Sobble",
            content: "✓ Inteleon (Acqua) è veloce con ottimo Attacco Speciale<br>✓ Impara Sgranocchio (Buio) e Geloraggio (Ghiaccio) per copertura<br>✓ In Spada hai Gyarados come Acqua, ma Inteleon è valido<br>⚠ Fragile<br>⚠ Debole contro Elettro, Erba<br><br>✓ Scelta solida"
        },
        grookey: {
            title: "🐒 Grookey",
            content: "⚠ SCELTA SCONSIGLIATA PER NUZLOCKE ⚠<br><br>✓ Rillaboom (Erba) ha buon Attacco fisico<br>✓ In Spada hai Seedot (Shiftry) come Erba/Buio<br>✗ Lento<br>✗ Molte debolezze (Fuoco, Ghiaccio, Volante, Coleottero, Veleno)<br><br>Solo per giocatori esperti"
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
    console.log('✨ Nuzlocke Guide Pokémon Spada - Caricata con successo!');
    console.log('⚔️🐺 ZACIAN è OP! Catturalo durante la storia. Spada Infinita devastante.');
    console.log('❄️🔥 DARMANITAN DI GALAR (Darumaka) è esclusivo Spada. Ira di Drago + Geloraggio devastante per i Draghi.');
    console.log('🦆⚔️ SIRFETCH\'D (Farfetch\'d di Galar) evolve con 3 colpi critici. Lotta eccellente per Marnie.');
    console.log('🐉⚫ DEINO (Hydreigon) e JANGMO-O (Kommo-o) sono due pseudo-leggendari nella Wild Area.');
    console.log('🏞️ WILD AREA: Ogni sottozona conta come area separata. Esplora tutto!');
    console.log('🐦⚙️ CORVIKNIGHT (Rookidee) è un tank Acciaio/Volante eccellente per tutta la run.');
    console.log('⛏️⚙️ EXCADRILL (Drilbur) nella Wild Area è top tier per Aristide (Elettro).');
    console.log('🎮 MT RIUTILIZZABILI in 8ª gen! Sperimenta liberamente.');
    console.log('⚠ Attenzione alle Max Raid: Possono essere pericolose. Preparati bene.');
});