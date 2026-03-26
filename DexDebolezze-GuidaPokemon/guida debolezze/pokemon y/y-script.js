/**
 * Nuzlocke Guide - Pokémon Y
 * Interattività: modali starter e console log
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Modale per gli Starter ---
    const starterDetails = {
        froakie: {
            title: "🐸 Froakie",
            content: "✓ Il più versatile. Greninja (Acqua/Buio) è velocissimo con Acquartigli e Morso Buio<br>✓ Il tipo Buio è prezioso contro i Psico (palestra di Olympia e Lega)<br>✓ In Y avrai anche Tyranitar e Heracross, quindi Greninja completa il trio perfettamente<br>⚠ Fragile fisicamente<br><br>⭐ SCELTA MIGLIORE per la flessibilità ⭐"
        },
        fennekin: {
            title: "🦊 Fennekin",
            content: "✓ Delphox (Fuoco/Psico) ha buon Attacco Speciale<br>✓ Il tipo Psico è utile contro i Lotta e i Veleno<br>✓ In Y non hai Houndour, ma hai Tyranitar e Heracross<br>⚠ Lento<br>⚠ Debole contro Acqua, Terra, Roccia, Buio, Fantasma<br><br>✓ Scelta solida"
        },
        chespin: {
            title: "🦔 Chespin",
            content: "⚠ SCELTA SCONSIGLIATA PER NUZLOCKE ⚠<br><br>✓ Chesnaught (Erba/Lotta) è un tank fisico con buone difese<br>✗ Lento, ha molte debolezze (Fuoco, Ghiaccio, Volante, Psico, Folletto)<br>✗ L'Erba non è un tipo prioritario in Y<br>✗ In Y hai HERACROSS, che è un Lotta molto migliore<br><br>Solo per giocatori esperti che cercano una sfida extra"
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
            if (card.classList.contains('starter-froakie')) {
                openModal('froakie');
            } else if (card.classList.contains('starter-fennekin')) {
                openModal('fennekin');
            } else if (card.classList.contains('starter-chespin')) {
                openModal('chespin');
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
    console.log('✨ Nuzlocke Guide Pokémon Y - Caricata con successo!');
    console.log('🦖💎 TYRANITAR è il tuo asso! Cattura Larvitar al Percorso 14. Pseudo-leggendario, Mega Tyranitar mostruoso.');
    console.log('🪲💪 HERACROSS (Percorso 12 / Zona Safari) è esclusivo Y. Lotta/Coleottero eccellente per Norman e i Buio.');
    console.log('⚡🐕 MANECTRIC (Electrike al Percorso 10) è esclusivo Y. Mega Manectric è veloce e potente.');
    console.log('🐦🔥 FLETCHLING al Percorso 2 evolve in Talonflame. Coraggio = priorità mosse Volanti.');
    console.log('⚔️👻 HONEDGE al Percorso 6 è Aegislash. Cambio forma strategico con Spadardente.');
    console.log('🧠💜 RALTS al Percorso 4 è Gardevoir. Psico/Folletto eccellente per la Lega (4x sui Draghi).');
    console.log('🐉⚫ YVELTAL è leggendario OP. Obblio + Abbattimento devastanti.');
    console.log('💎 MEGA LUCARIO regalato dopo la terza palestra. Aurasfera + Pugnoscarica devastante.');
    console.log('🎮 MT RIUTILIZZABILI! In sesta generazione puoi usare le MT infinite volte.');
    console.log('⚠ Attenzione all\'EXP Share: dà esperienza a tutto il team. Usalo con moderazione.');
});