/**
 * Nuzlocke Guide - Pokémon Smeraldo
 * Interattività: modali starter e console log
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Modale per gli Starter ---
    const starterDetails = {
        mudkip: {
            title: "🦎 Mudkip",
            content: "✓ Il più sicuro per una Nuzlocke in Smeraldo<br>✓ Swampert (Acqua/Terra) ha un solo punto debole (Erba)<br>✓ Domina molte palestre (Roccia, Fuoco, Elettro, Acciaio)<br>✓ Con Wallace Campione (Acqua), non hai vantaggio diretto, ma Swampert resiste bene<br>✓ È il tank più affidabile per tutto il gioco<br><br>⭐ SCELTA MIGLIORE per Smeraldo ⭐"
        },
        torchic: {
            title: "🐔 Torchic",
            content: "✓ Blaziken (Fuoco/Lotta) è potente offensivamente<br>⚠ In Smeraldo, Wallace (Campione) è Acqua - Blaziken è in svantaggio<br>✓ Se lo scegli, devi avere un forte Pokémon Acqua (Ludicolo, Gyarados, Starmie) per compensare<br>⚠ Debole contro Acqua, Terra e Psico<br>⚠ Fragile fisicamente<br><br>✓ Scelta rischiosa ma possibile con un buon supporto Acqua"
        },
        treecko: {
            title: "🦎 Treecko",
            content: "✓ Sceptile è veloce e ha Foglielama (sempre critico in 3ª gen)<br>✓ È superefficace contro Wallace (Campione Acqua)<br>✗ Fragile, debole contro le prime palestre (Volante, Coleottero)<br>✗ In Smeraldo hai Ludicolo (Acqua/Erba) che è più versatile e resistente<br><br>✓ Scelta situazionale: ottima per Wallace, ma richiede supporto per le prime fasi"
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
    console.log('✨ Nuzlocke Guide Pokémon Smeraldo - Caricata con successo!');
    console.log('⚠ SMERALDO È LA VERSIONE PIÙ DIFFICILE DI HOENN!');
    console.log('🐉 RAYQUAZA PRIMA DELLA LEGA! Catturalo dopo Tate&Liza (Lv.70) - è OP!');
    console.log('⚠⚠ TATE&LIZA: attenzione! Hanno 4 Pokémon (Xatu, Claydol, Lunatone, Solrock). Usa Sableye e Heracross!');
    console.log('🪲💪 Heracross è fondamentale per Norman! Cercalo al Percorso 119 (raro 5%).');
    console.log('👻⚫ Sableye non ha debolezze in 3ª gen! Catturalo alla Grotta Granito.');
    console.log('💧🌿 Ludicolo (Lotad) è eccellente per Wallace e Drake con Geloraggio.');
    console.log('⚡ Manectric con Tuono è fondamentale per Wallace - Milotic cade con Tuono.');
    console.log('💪 Wallace è il nuovo Campione (Acqua) - prepara un forte Elettro e un Erba!');
    console.log('🎒 Zigzagoon con Muetassalto raccoglie oggetti - tienilo nel team all\'inizio!');
});