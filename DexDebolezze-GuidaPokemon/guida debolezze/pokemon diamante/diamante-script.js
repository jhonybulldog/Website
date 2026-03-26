/**
 * Nuzlocke Guide - Pokémon Diamante
 * Interattività: modali starter e console log
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Modale per gli Starter ---
    const starterDetails = {
        chimchar: {
            title: "🐒 Chimchar",
            content: "✓ Il più versatile. Infernape (Fuoco/Lotta) copre molti tipi (Erba, Ghiaccio, Acciaio, Normale)<br>✓ Veloce e potente, ottimo sweeper<br>✓ In Diamante hai meno opzioni Fuoco (perdi Houndoom), quindi Chimchar è ancora più prezioso<br>⚠ Fragile fisicamente<br>⚠ Debole contro Acqua, Terra, Psico, Volante<br><br>⭐ SCELTA MIGLIORE per la flessibilità ⭐"
        },
        piplup: {
            title: "🐧 Piplup",
            content: "✓ Il più sicuro. Empoleon (Acqua/Acciaio) ha moltissime resistenze (11 resistenze, 3 debolezze)<br>✓ Tank eccellente, perfetto per la Nuzlocke<br>✓ Impara Morso (Buio) utile contro Psico<br>⚠ Lento<br>⚠ Debole contro Lotta, Terra, Elettro<br><br>⭐ SCELTA MIGLIORE per la sicurezza ⭐"
        },
        turtwig: {
            title: "🐢 Turtwig",
            content: "⚠ SCELTA SCONSIGLIATA PER NUZLOCKE ⚠<br><br>✓ Torterra (Erba/Terra) ha buone difese fisiche<br>✓ Attacco fisico decente<br>✗ Lento, ha molte debolezze (Fuoco, Ghiaccio, Volante, Coleottero)<br>✗ In Diamante hai già Breloom e Ludicolo come opzioni Erba migliori<br><br>Solo per giocatori esperti che cercano una sfida extra"
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
            if (card.classList.contains('starter-chimchar')) {
                openModal('chimchar');
            } else if (card.classList.contains('starter-piplup')) {
                openModal('piplup');
            } else if (card.classList.contains('starter-turtwig')) {
                openModal('turtwig');
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
    console.log('✨ Nuzlocke Guide Pokémon Diamante - Caricata con successo!');
    console.log('🐉 GARCHOMP è la chiave! Cattura Gible sotto il Percorso 206 prima della palestra di Byron.');
    console.log('🐦‍⬛⚫ HONCHKROW è il tuo miglior esclusivo! Cattura Murkrow al Percorso 211 (di notte) per Luciana.');
    console.log('⭐💧 STARMIE nella Zona Safari è top tier. Surf, Psichico, Geloraggio, Tuono copertura universale.');
    console.log('🍄💪 BRELOM (Shroomish) nella Zona Safari è eccellente per i Normali e per Byron.');
    console.log('💎🐉 DIALGA dopo l\'ottava palestra è un tank eccellente per la Lega.');
    console.log('⚠ ATTENZIONE A CAMILLA! Spiritomb non ha debolezze. Garchomp ha bisogno di Geloraggio.');
    console.log('📦 MT preziose: Tuono, Geloraggio, Psichico sono monouso. Scegli bene a chi darle.');
});