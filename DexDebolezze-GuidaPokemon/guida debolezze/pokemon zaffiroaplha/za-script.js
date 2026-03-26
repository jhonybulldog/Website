/**
 * Nuzlocke Guide - Pokémon Zaffiro Alpha
 * Interattività: modali starter e console log
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Modale per gli Starter ---
    const starterDetails = {
        mudkip: {
            title: "🦎 Mudkip",
            content: "✓ Il più sicuro. Swampert (Acqua/Terra) ha un solo punto debole (Erba)<br>✓ Domina le palestre di Roccia, Fuoco, Elettro e Acciaio<br>✓ Mega Swampert con Acquabreccia in pioggia è devastante<br>✓ In Zaffiro Alpha hai Kyogre come Acqua OP, ma Swampert resta eccellente<br>⚠ Lento<br><br>⭐ SCELTA MIGLIORE per la sicurezza ⭐"
        },
        torchic: {
            title: "🐔 Torchic",
            content: "✓ Il più versatile. Blaziken (Fuoco/Lotta) copre molti tipi<br>✓ Mega Blaziken con Acceleratore diventa velocissimo<br>✓ In Zaffiro Alpha hai Heracross come Lotta, ma Blaziken è più veloce<br>⚠ Fragile fisicamente<br>⚠ Debole contro Acqua, Terra, Psico, Volante<br><br>✓ Scelta solida, richiede più attenzione"
        },
        treecko: {
            title: "🦎 Treecko",
            content: "⚠ SCELTA SCONSIGLIATA PER NUZLOCKE ⚠<br><br>✓ Sceptile è veloce e ha alto Attacco Speciale<br>✓ Mega Sceptile è Erba/Drago<br>✗ Fragile, debole contro le prime palestre (Coleottero e Fuoco)<br>✗ In Zaffiro Alpha hai Latias e altre opzioni migliori<br><br>Solo per giocatori esperti che cercano una sfida extra"
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
    const pokemonCards = document.querySelectorAll('.pokemon-card, .league-pokemon-card, .exclusive-card, .key-card, .priority-card, .gifted-card, .mega-card');
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
    console.log('✨ Nuzlocke Guide Pokémon Zaffiro Alpha - Caricata con successo!');
    console.log('👁️⚫ SABLEYE è il tuo asso! Esclusivo Zaffiro Alpha. Immune a Lotta, Normale e Psico. Perfetto per Tell&Pat e Nives.');
    console.log('🪲💪 HERACROSS (Zona Safari) è eccellente per Norman e Furio. Mega Heracross con Abilità è devastante.');
    console.log('💧🐉 LATIAS REGALATA! Dopo la 5ª palestra ti viene data Latias Lv.30. Usala subito nel team, è OP.');
    console.log('🍄💪 BRELOM (Shroomish) nella Foresta di Petalo è fondamentale per Norman (Slaking). Sottomissione lo distrugge.');
    console.log('⚡🐕 MANECTRIC (Electrike) al Percorso 110 è il tuo Elettro principale. Mega Manectric con Intimidator.');
    console.log('💧🐭 AZUMARILL con Huge Power (Azurill al Percorso 104) ha Attacco raddoppiato. Devastante.');
    console.log('🎮 EXP SHARE globale e MT RIUTILIZZABILI in 6ª gen! Sperimenta senza preoccupazioni.');
    console.log('🪨 GEODUDE alla Grotta Granito è immune a Elettro. Fondamentale per Valerio.');
    console.log('🌊 KYOGRE è OP post-Lega. Pioggiadanza + Idropompa devastanti.');
});