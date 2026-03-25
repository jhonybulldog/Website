/**
 * Nuzlocke Guide - Pokémon Rosso/Blu
 * Interattività: modali starter, effetti hover e toggle opzionali
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Modali per gli Starter (al click sulla card) ---
    const starterDetails = {
        bulba: {
            title: "🌿 Bulbasaur",
            content: "✓ Domina Brock e Misty con Foglielama e Parassisema<br>✓ Parassisema al Lv.13 per catture sicure e logorare nemici<br>✓ Diventa Venusaur, ottimo tank con Sonnifero<br>✓ Meno utile contro Sabrina e Blaine<br><br>⭐ LA SCELTA PIÙ SICURA per la Nuzlocke ⭐"
        },
        squirtle: {
            title: "💧 Squirtle",
            content: "✓ Tank affidabile con ottime difese<br>✓ Morso al Lv.24 (alta probabilità di paura, interrompe mosse)<br>✓ Diventa Blastoise, bilanciato con Surf e Idropompa<br>⚠ Vulnerabile a Lt. Surge (Elettro) ed Erika (Erba)<br><br>✓ Scelta solida e sicura"
        },
        charmander: {
            title: "🔥 Charmander",
            content: "⚠ SCELTA RISCHIOSA PER NUZLOCKE ⚠<br><br>✓ Diventa Charizard, veloce e con Vampecalde/Lanciafiamme<br>✗ Debole contro le prime 2 palestre (Brock e Misty)<br>✗ Necessita obbligatoriamente di Mankey (Percorso 3) o Nidoran con Doppiosmash<br>✗ Se non catturi Mankey, rischi di perdere la run<br><br>Consigliato solo a giocatori esperti"
        }
    };
    
    // Crea overlay modale
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
    
    // Funzione per aprire modale
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
    
    // Chiudi cliccando fuori
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    // Aggiungi event listener alle card starter
    const starterCards = document.querySelectorAll('.starter-card');
    starterCards.forEach(card => {
        card.addEventListener('click', () => {
            if (card.classList.contains('starter-bulba')) {
                openModal('bulba');
            } else if (card.classList.contains('starter-squirtle')) {
                openModal('squirtle');
            } else if (card.classList.contains('starter-charmander')) {
                openModal('charmander');
            }
        });
    });
    
    // --- Effetto hover aggiuntivo per le card Pokémon ---
    const pokemonCards = document.querySelectorAll('.pokemon-card, .league-pokemon-card');
    pokemonCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.2s ease';
        });
    });
    
    // --- Smooth scroll per link interni (se presenti in futuro) ---
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
    
    // --- Console log per conferma caricamento ---
    console.log('✨ Nuzlocke Guide Pokémon Rosso/Blu - Caricata con successo!');
    console.log('📖 Sezioni disponibili: Starter, Catture, Palestre (8), Lega Pokémon');
    console.log('🎮 Team e mosse dettagliate per ogni sfida');
});