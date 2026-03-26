/**
 * Nuzlocke Guide - Pokémon Ultraluna
 * Interattività: modali starter e console log
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Modale per gli Starter ---
    const starterDetails = {
        litten: {
            title: "🐱 Litten",
            content: "✓ Il più importante per UltraNecrozma! Incineroar (Fuoco/Buio) con Sgranocchio è superefficace su UltraNecrozma (Psico)<br>✓ Il tipo Buio è IMMUNE a Psico, rendendo la battaglia molto più gestibile<br>✓ Buon tank fisico con Fuocofuria e Pugnoscarica<br>⚠ Lento<br>⚠ Debole contro Acqua, Terra, Lotta, Roccia, Folletto<br><br>⭐ SCELTA MIGLIORE per UltraNecrozma ⭐"
        },
        popplio: {
            title: "🦭 Popplio",
            content: "✓ Il più sicuro. Primarina (Acqua/Folletto) ha ottimo Attacco Speciale e buone difese<br>✓ Il tipo Folletto è eccellente contro i Draghi della Lega<br>⚠ Lento<br>⚠ NON ha vantaggio su UltraNecrozma (Psico/Drago)<br>⚠ Se scegli Popplio, assicurati di avere altri Pokémon Buio per UltraNecrozma<br><br>✓ Scelta solida, ma richiede supporto per UltraNecrozma"
        },
        rowlet: {
            title: "🦉 Rowlet",
            content: "⚠ SCELTA SCONSIGLIATA PER NUZLOCKE ⚠<br><br>✓ Decidueye (Erba/Fantasma) ha buon Attacco fisico<br>✗ Non ha vantaggi su UltraNecrozma<br>✗ Il tipo Fantasma non è efficace su Psico<br>✗ In Ultraluna, Litten offre un vantaggio diretto sul boss più difficile<br><br>Solo per giocatori esperti che cercano una sfida extra"
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
            if (card.classList.contains('starter-litten')) {
                openModal('litten');
            } else if (card.classList.contains('starter-popplio')) {
                openModal('popplio');
            } else if (card.classList.contains('starter-rowlet')) {
                openModal('rowlet');
            }
        });
    });
    
    // Effetto hover per le card Pokémon
    const pokemonCards = document.querySelectorAll('.pokemon-card, .league-pokemon-card, .exclusive-card, .key-card, .gifted-card, .ub-card');
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
    console.log('✨ Nuzlocke Guide Pokémon Ultraluna - Caricata con successo!');
    console.log('🌀⚠ ULTRA NECROZMA È LA SFIDA PIÙ DIFFICILE! Porta almeno 2 Pokémon di tipo Buio (Incineroar, Muk di Alola, Umbreon).');
    console.log('🐱🔥⚫ LITTEN è lo starter migliore! Incineroar con Sgranocchio (Buio) è superefficace su UltraNecrozma.');
    console.log('🚀⚙️ CELESTEELA è il tank definitivo! Ultra Bestia con altissime difese. Disponibile durante la storia.');
    console.log('🌿🌸 LILLIGANT (Petilil al Percorso 2) è esclusivo Ultraluna! Petalodanza + Ritmo Proprio è devastante.');
    console.log('🦍🧠 ORANGURU (Percorso 10) è esclusivo Ultraluna. Supporto eccellente con Telepatia e Manipolazione.');
    console.log('🐉😴 DRAMPA (Percorso 11) è esclusivo Ultraluna. Drago tank con Adattabilità che potenzia le mosse STAB.');
    console.log('🗿🪨 STAKATAKA Ultra Bestia con difesa altissima. Muro fisico eccellente.');
    console.log('💀⚫ MUK DI ALOLA (Grimer al Percorso 6) è un tank Buio eccellente per UltraNecrozma.');
    console.log('🌙 ATTENZIONE AL CICLO GIORNO/NOTTE INVERTITO! In Ultraluna, il giorno nel gioco corrisponde alla notte reale.');
    console.log('💪 USA Z-MOSSE BUIO! Sgranocchio Z può mettere KO UltraNecrozma in un colpo.');
});