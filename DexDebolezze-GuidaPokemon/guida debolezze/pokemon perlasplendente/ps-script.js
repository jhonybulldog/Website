/**
 * Nuzlocke Guide - Pokémon Perla Splendente
 * Interattività: modali starter e console log
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Modale per gli Starter ---
    const starterDetails = {
        chimchar: {
            title: "🐒 Chimchar",
            content: "✓ Il più versatile. Infernape (Fuoco/Lotta) copre molti tipi (Erba, Ghiaccio, Acciaio, Normale)<br>✓ I tipi Fuoco sono estremamente rari a Sinnoh - questa è la scelta quasi obbligatoria!<br>✓ In Perla Splendente hai Vulpix (Ninetales) come alternativa, ma Chimchar è più versatile<br>✓ Impara Potenziamento (Lotta) al Lv.12, eccellente per Rocco<br>⚠ Fragile fisicamente<br><br>⭐ SCELTA MIGLIORE per Perla Splendente ⭐"
        },
        piplup: {
            title: "🐧 Piplup",
            content: "✓ Il più sicuro. Empoleon (Acqua/Acciaio) ha moltissime resistenze (11 resistenze, 3 debolezze)<br>✓ Tank eccellente per tutta la run<br>✓ Impara Morso (Buio) presto, utile contro Psico<br>⚠ Lento<br>⚠ Debole contro Lotta, Terra, Elettro<br>✓ Se scegli Piplup, assicurati di catturare Vulpix (Ninetales) nel Sotterraneo per avere un Fuoco"
        },
        turtwig: {
            title: "🐢 Turtwig",
            content: "⚠ SCELTA SCONSIGLIATA PER NUZLOCKE ⚠<br><br>✓ Torterra (Erba/Terra) ha buone difese fisiche<br>✗ Lento, ha molte debolezze (Fuoco, Ghiaccio, Volante, Coleottero)<br>✗ La mancanza di un Fuoco nel team rende la run molto più difficile<br>✗ In Perla Splendente hai Roserade come Erba eccellente<br><br>Solo per giocatori esperti che cercano una sfida extra"
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
    const pokemonCards = document.querySelectorAll('.pokemon-card, .league-pokemon-card, .exclusive-card, .key-card, .gifted-card');
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
    console.log('✨ Nuzlocke Guide Pokémon Perla Splendente - Caricata con successo!');
    console.log('⛏️ GRANDE SOTTERRANEO: Ogni badge ti dà una cattura extra! Cattura Bagon (Salamence), Vulpix (Ninetales), Sableye, Gible.');
    console.log('🐉✨ BAGON (Salamence) è l\'esclusivo più importante. Catturalo nel Sotterraneo (Caverna Spaziosa).');
    console.log('👁️⚫ SABLEYE nella Foresta Oscura è immune a Lotta, Normale e Psico. Perfetto per Luciana!');
    console.log('👻💜 MISDREAVUS (Mismagius) al Percorso 211 è esclusivo. Fantasma veloce per Luciana.');
    console.log('🦊🔥 VULPIX (Ninetales) nel Sotterraneo è la tua opzione Fuoco se non hai scelto Chimchar.');
    console.log('❄️⚫ WEAVILE (Sneasel) al Monte Tenda con Alita Rapida è FONDAMENTALE per Garchomp di Camilla.');
    console.log('💧🐉 PALKIA dopo l\'ottava palestra è un attaccante speciale eccellente per la Lega.');
    console.log('🎮 MT RIUTILIZZABILI in 8ª gen! Sperimenta liberamente. Geloraggio su Weavile è fondamentale.');
    console.log('⚠ Attenzione al Selfdestruct: Geodude, Graveler, Koffing, Weezing possono esplodere!');
    console.log('🎒 EXP Share sempre attivo: Non puoi disattivarlo. Ruota i Pokémon per evitare di overlivellare.');
});