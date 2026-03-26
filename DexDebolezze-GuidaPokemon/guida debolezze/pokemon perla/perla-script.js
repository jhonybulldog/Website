/**
 * Nuzlocke Guide - Pokémon Perla
 * Interattività: modali starter e console log
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Modale per gli Starter ---
    const starterDetails = {
        piplup: {
            title: "🐧 Piplup",
            content: "✓ Il più sicuro. Empoleon (Acqua/Acciaio) ha 11 resistenze e solo 3 debolezze<br>✓ Tank eccellente per tutta la Nuzlocke<br>✓ In Perla hai Houndoom (Fuoco) e Tyranitar (potenza fisica) per coprire le altre nicchie<br>⚠ Lento, debole contro Lotta, Terra, Elettro<br><br>⭐ SCELTA MIGLIORE per la sicurezza ⭐"
        },
        chimchar: {
            title: "🐒 Chimchar",
            content: "✓ Il più versatile. Infernape (Fuoco/Lotta) copre molti tipi<br>✓ Veloce e potente, ottimo sweeper<br>⚠ In Perla hai già Houndoom (Buio/Fuoco) e Magmortar (Fuoco) come opzioni Fuoco eccellenti<br>⚠ Fragile fisicamente<br><br>✓ Scelta valida ma ridondante. Se lo scegli, avrai un team molto offensivo."
        },
        turtwig: {
            title: "🐢 Turtwig",
            content: "⚠ SCELTA SCONSIGLIATA PER NUZLOCKE ⚠<br><br>✓ Torterra (Erba/Terra) ha buone difese fisiche<br>✗ Lento, ha molte debolezze (Fuoco, Ghiaccio, Volante, Coleottero)<br>✗ In Perla hai Roserade (Erba/Veleno) come Erba eccellente e Heracross come Lotta<br><br>Solo per giocatori esperti che cercano una sfida extra"
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
            if (card.classList.contains('starter-piplup')) {
                openModal('piplup');
            } else if (card.classList.contains('starter-chimchar')) {
                openModal('chimchar');
            } else if (card.classList.contains('starter-turtwig')) {
                openModal('turtwig');
            }
        });
    });
    
    // Effetto hover per le card Pokémon
    const pokemonCards = document.querySelectorAll('.pokemon-card, .league-pokemon-card, .gifted-card, .key-card');
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
    console.log('✨ Nuzlocke Guide Pokémon Perla - Caricata con successo!');
    console.log('🔥🐕 HOUNDOOM è il tuo miglior esclusivo! Catturalo nella Zona Safari. Buio/Fuoco, perfetto per Luciana e Aaron.');
    console.log('🪲⚙️ SCIZOR ha una sola debolezza (Fuoco)! Scyther + Metallo Rivestito nella Zona Safari.');
    console.log('🦖💀 TYRANITAR è un mostro! Raro ma vale la pena cercarlo nella Zona Safari.');
    console.log('🐉 GARCHOMP è la chiave! Cattura Gible sotto il Percorso 206 prima della palestra di Byron.');
    console.log('🐌💧 SLOWKING per Starmie: Non hai Starmie in Perla, ma Slowking è un\'ottima alternativa. Zona Safari + Pietra Reale.');
    console.log('🌹🌿 ROSERADE per Erba: Budew al Percorso 204 evolve in Roserade, Erba eccellente per Gastrodon.');
    console.log('💎🐉 PALKIA dopo l\'ottava palestra è un attaccante speciale eccellente per Camilla.');
    console.log('⚠ ATTENZIONE A CAMILLA! Spiritomb non ha debolezze. Garchomp ha bisogno di Geloraggio.');
    console.log('📦 MT preziose: Tuono, Geloraggio, Psichico sono monouso. Scegli bene a chi darle.');
});