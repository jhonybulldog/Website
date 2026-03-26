/**
 * Nuzlocke Guide - Pokémon HeartGold & SoulSilver
 * Interattività: modali starter e console log
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Modale per gli Starter ---
    const starterDetails = {
        cyndaquil: {
            title: "🔥 Cyndaquil",
            content: "✓ Il più versatile. Typhlosion è veloce e ha ottimo Attacco Speciale<br>✓ Domina le palestre di Erba, Ghiaccio e Coleottero<br>✓ In SoulSilver hai anche Houndoom come Fuoco alternativo<br>⚠ Debole contro il primo capo (Roccia) se non hai altre opzioni<br>⚠ Fragile fisicamente<br><br>⭐ SCELTA MIGLIORE per la flessibilità ⭐"
        },
        totodile: {
            title: "🐊 Totodile",
            content: "✓ Il più sicuro. Feraligatr ha buone statistiche fisiche<br>✓ Impara Morso (Buio) presto, utile contro i Psico<br>✓ Tank affidabile per tutta l'avventura<br>✓ In HG/SS hai anche Gyarados e Lapras come Acqua<br>⚠ Lento nelle fasi iniziali<br><br>⭐ SCELTA MIGLIORE per la sicurezza ⭐"
        },
        chikorita: {
            title: "🌿 Chikorita",
            content: "⚠ SCELTA SCONSIGLIATA PER NUZLOCKE ⚠<br><br>✓ Riflesso e Parassisema per supporto<br>✗ Debole contro le prime 4 palestre (Volante, Coleottero, Normale, Fantasma)<br>✗ Offensivamente debole<br>✗ In HG/SS hai molte opzioni Erba migliori (Bellsprout, Oddish, Exeggcute)<br><br>Solo per giocatori esperti che cercano una sfida extra"
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
            if (card.classList.contains('starter-cynda')) {
                openModal('cyndaquil');
            } else if (card.classList.contains('starter-toto')) {
                openModal('totodile');
            } else if (card.classList.contains('starter-chiko')) {
                openModal('chikorita');
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
    console.log('✨ Nuzlocke Guide Pokémon HeartGold & SoulSilver - Caricata con successo!');
    console.log('🏆 Due regioni: Johto + Kanto + Sfida contro Rosso sul Monte Argento!');
    console.log('⚡ MAREEP è un MUST! Catturalo al Percorso 32 - Ampharos è l\'Elettro migliore.');
    console.log('💪 MACHOP SCAMBIATO per Whitney! A Fiordoropoli, scambia Drowzee per Machop.');
    console.log('❄️ JYNX alla Fonte di Ghiaccio è FONDAMENTALE per Lance. Geloraggio 4x sui Draghi.');
    console.log('🪲⚙️ SCIZOR (Scyther + Metallo Rivestito) ha una sola debolezza (Fuoco). Parco Nazionale.');
    console.log('🔥 Per HEARTGOLD: Cerca Growlithe (Arcanine) e Larvitar (Tyranitar).');
    console.log('🔥 Per SOULSILVER: Cerca Houndour (Houndoom) e Murkrow (Honchkrow). Skarmory tank eccellente.');
    console.log('👑 ROSSO è la sfida finale! Livelli 75-80. Preparati con Elettro, Buio, Ghiaccio, Lotta, Fuoco.');
    console.log('⚠ Attenzione ai Selfdestruct: Geodude, Graveler, Koffing, Weezing possono esplodere!');
});