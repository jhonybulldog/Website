/**
 * Nuzlocke Guide - Pokémon Platino
 * Interattività: modali starter e console log
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Modale per gli Starter ---
    const starterDetails = {
        chimchar: {
            title: "🐒 Chimchar",
            content: "✓ Il più versatile. Infernape (Fuoco/Lotta) copre molti tipi (Erba, Ghiaccio, Acciaio, Normale)<br>✓ Veloce e potente, ottimo sweeper<br>✓ In Platino, il Fuoco è ancora più prezioso perché molte palestre sono deboli al Fuoco<br>✓ La componente Lotta è essenziale per i Normali e gli Acciaio<br>⚠ Fragile fisicamente<br>⚠ Debole contro Acqua, Terra, Psico, Volante<br><br>⭐ SCELTA MIGLIORE per Platino ⭐"
        },
        piplup: {
            title: "🐧 Piplup",
            content: "✓ Il più sicuro. Empoleon (Acqua/Acciaio) ha moltissime resistenze (11 resistenze, 3 debolezze)<br>✓ Tank eccellente, perfetto per la Nuzlocke<br>✓ Impara Morso (Buio) utile contro Psico<br>⚠ Lento<br>⚠ Debole contro Lotta, Terra, Elettro<br><br>✓ Scelta solida. Assicurati di avere un Fuoco (Houndoom) per coprire le debolezze."
        },
        turtwig: {
            title: "🐢 Turtwig",
            content: "⚠ SCELTA SCONSIGLIATA PER NUZLOCKE ⚠<br><br>✓ Torterra (Erba/Terra) ha buone difese fisiche<br>✓ Attacco fisico decente<br>✗ Lento, ha molte debolezze (Fuoco, Ghiaccio, Volante, Coleottero)<br>✗ In Platino hai Roserade (Budew) e Ludicolo come opzioni Erba migliori<br>✗ I tipi Ghiaccio e Volante sono molto comuni a Sinnoh<br><br>Solo per giocatori esperti che cercano una sfida extra"
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
    console.log('✨ Nuzlocke Guide Pokémon Platino - Caricata con successo!');
    console.log('⚠ PLATINO È LA VERSIONE PIÙ DIFFICILE DI SINNOH!');
    console.log('👻🐉 GIRATINA prima della Lega! Catturalo nella Distorsione Spazio dopo Candice (Lv.47).');
    console.log('❄️⚫ WEAVILE è l\'EROE contro Mirton! Cattura Sneasel al Monte Tenda (notte). Geloraggio 4x sui Draghi!');
    console.log('🐉🌪️ GARCHOMP sotto il Percorso 206 - Gible è disponibile prima della Lega.');
    console.log('🐕🔥 HOUNDOOM nella Zona Safari è fondamentale per Luciana (Psico).');
    console.log('⚠ FANTINA è ANTICIPATA! 3ª palestra con Mismagius Lv.24. Preparati con Murkrow o Houndour.');
    console.log('⭐💧 STARMIE (Staryu) nella Zona Safari è top tier. Copertura universale.');
    console.log('🪲⚙️ SCIZOR (Scyther + Metallo Rivestito) ha una sola debolezza (Fuoco). Eccellente tank.');
    console.log('💪 CAMILLA è il quarto membro della Lega. Mirton è il Campione Drago.');
    console.log('🎒 BIBAREL come HM slave impara Taglio, Forza, Surf, Cascata, Scogliera.');
});