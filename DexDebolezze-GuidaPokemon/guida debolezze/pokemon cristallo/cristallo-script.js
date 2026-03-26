/**
 * Nuzlocke Guide - Pokémon Cristallo
 * Interattività: modali starter e console log
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Modale per gli Starter ---
    const starterDetails = {
        totodile: {
            title: "🐊 Totodile",
            content: "✓ Il più sicuro per una Nuzlocke in Cristallo<br>✓ Senza Mareep, avere Feraligatr come tank Acqua affidabile è fondamentale<br>✓ Feraligatr impara Morso presto (Buio, utile contro Psico)<br>✓ Bilanciato, affidabile dall'inizio alla fine<br>✓ Lento nelle fasi iniziali<br><br>⭐ SCELTA MIGLIORE per Cristallo ⭐"
        },
        cyndaquil: {
            title: "🔥 Cyndaquil",
            content: "✓ Il più potente offensivamente<br>✓ Typhlosion è veloce e colpisce duro<br>✓ Domina Erba, Ghiaccio, Coleottero<br>⚠ Debole contro il primo capo (Roccia) se non hai altre opzioni<br>⚠ Fragile fisicamente<br><br>✓ In Cristallo puoi ottenere Jynx dall'Odd Egg (Ghiaccio/Psico) e Magnemite per Elettro"
        },
        chikorita: {
            title: "🌿 Chikorita",
            content: "⚠ SCELTA SCONSIGLIATA PER NUZLOCKE ⚠<br><br>✓ Riflesso e Parassisema per supporto<br>✗ Debole contro le prime 4 palestre (Volante, Coleottero, Normale, Fantasma)<br>✗ Offensivamente debole<br>✗ Ancora più difficile senza Mareep come supporto<br><br>Solo per giocatori esperti che cercano una sfida extra"
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
            if (card.classList.contains('starter-toto')) {
                openModal('totodile');
            } else if (card.classList.contains('starter-cynda')) {
                openModal('cyndaquil');
            } else if (card.classList.contains('starter-chiko')) {
                openModal('chikorita');
            }
        });
    });
    
    // Effetto hover per le card Pokémon
    const pokemonCards = document.querySelectorAll('.pokemon-card, .league-pokemon-card, .gifted-card, .key-card, .egg-result');
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
    console.log('✨ Nuzlocke Guide Pokémon Cristallo - Caricata con successo!');
    console.log('⚠ ATTENZIONE: MAREEP NON È DISPONIBILE al Percorso 32!');
    console.log('⚡ Usa Magnemite (Percorso 34) o Chinchou (Percorso 41) come Elettro principali.');
    console.log('🥚 Odd Egg: cerca Smoochum (Jynx) per Lance o Elekid (Electabuzz) per Elettro!');
    console.log('🐘 Phanpy (Donphan) disponibile per tutti al Percorso 45!');
    console.log('💧 Suicune catturabile alla Torre Bruciata prima della Lega.');
    console.log('❄️ GHIACCIO FONDAMENTALE per Lance: Jynx con Geloraggio è la scelta migliore!');
});