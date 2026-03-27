/**
 * Nuzlocke Guide - Pokémon Leggende: Arceus
 * Interattività: modali starter e console log
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Modale per gli Starter ---
    const starterDetails = {
        oshawott: {
            title: "🦦 Oshawott",
            content: "✓ Il più importante per la battaglia finale! Hisuian Samurott (Acqua/Buio) è FONDAMENTALE per Volo e Giratina<br>✓ Il tipo Buio è superefficace su Giratina e Spiritomb<br>✓ Impara Sgranocchio e Geloraggio per copertura<br>✓ Taglio Insistente lascia schegge che danneggiano nel tempo<br>⚠ Bassa Difesa Speciale<br>⚠ Debole a Elettro, Erba, Lotta, Coleottero, Folletto<br><br>⭐ SCELTA MIGLIORE per la battaglia finale ⭐"
        },
        cyndaquil: {
            title: "🔥 Cyndaquil",
            content: "✓ Hisuian Typhlosion (Fuoco/Fantasma) ha un tipo unico<br>✓ Parata Infernale può bruciare i nemici<br>✓ Eccellente contro i Nobili (Lilligant, Kleavor)<br>⚠ Fragile fisicamente<br>⚠ Debole ad Acqua, Terra, Roccia, Fantasma, Buio<br><br>✓ Scelta solida, ma meno utile contro Volo"
        },
        rowlet: {
            title: "🦉 Rowlet",
            content: "⚠ SCELTA DIFENSIVA, PIÙ DIFFICILE ⚠<br><br>✓ Hisuian Decidueye (Erba/Lotta) ha buone difese fisiche<br>✓ Triple Frecce riduce le difese avversarie<br>✗ 4x debole a Volante! Attenzione a Togekiss di Volo<br>✗ Lento, molte debolezze<br><br>Solo per giocatori esperti che cercano una sfida extra"
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
            if (card.classList.contains('starter-oshawott')) {
                openModal('oshawott');
            } else if (card.classList.contains('starter-cyndaquil')) {
                openModal('cyndaquil');
            } else if (card.classList.contains('starter-rowlet')) {
                openModal('rowlet');
            }
        });
    });
    
    // Effetto hover per le card Pokémon
    const pokemonCards = document.querySelectorAll('.key-card, .league-pokemon-card, .area-card, .nobile-card');
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
    console.log('✨ Nuzlocke Guide Pokémon Leggende: Arceus - Caricata con successo!');
    console.log('⚠ Leggende: Arceus è completamente diverso dagli altri giochi!');
    console.log('🦦💧⚫ OSHAWOTT è la scelta migliore! Hisuian Samurott (Acqua/Buio) è fondamentale per Volo e Giratina.');
    console.log('❄️⚫ WEAVILE (Sneasel) è FONDAMENTALE! Con Geloraggio (4x) distrugge Giratina. Catturalo a Coronet Highlands.');
    console.log('🌙🐕 UMBREON (Eevee) è il tank Buio perfetto per assorbire gli attacchi Psico di Volo.');
    console.log('🐉🌪️ GARCHOMP (Gible) a Crimson Mirelands è top tier per la battaglia finale.');
    console.log('👑 Regola Nobili: due tentativi. Al primo puoi ritentare senza conseguenze. Al secondo, le morti sono permanenti.');
    console.log('💀 Morte del giocatore: Se il personaggio svenisce, perdi un Pokémon (sacrificio).');
    console.log('🎮 MT RIUTILIZZABILI! Geloraggio su Weavile è fondamentale.');
    console.log('🏆 Sconfiggere Volo + Giratina = fine della Nuzlocke. Arceus è opzionale.');
});