/**
 * Nuzlocke Guide - Pokémon Rosso Fuoco & Verde Foglia
 * Interattività: modali starter e console log
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Modale per gli Starter ---
    const starterDetails = {
        bulbasaur: {
            title: "🌿 Bulbasaur",
            content: "✓ Il più sicuro per l'inizio della Nuzlocke<br>✓ Domina le prime 2 palestre (Brock e Misty) con mosse Erba<br>✓ Impara Parassisema e Sonnifero, fondamentali per catture sicure<br>✓ Diventa meno efficace contro Sabrina (Psico) e l'ultima parte del gioco<br><br>⭐ SCELTA MIGLIORE per la sicurezza ⭐"
        },
        squirtle: {
            title: "💧 Squirtle",
            content: "✓ Molto bilanciato, tank difensivo affidabile per tutto il gioco<br>✓ Ottimo contro Brock e Giovanni<br>✓ Impara Morso (Buio) utilissimo contro i Psico di Sabrina<br>⚠ Vulnerabile contro Lt. Surge (Elettro) e contro Erba<br><br>✓ Scelta solida e affidabile"
        },
        charmander: {
            title: "🔥 Charmander",
            content: "⚠ SCELTA SCONSIGLIATA PER NUZLOCKE ⚠<br><br>✓ È un ottimo sweeper nelle fasi finali con Dragartigli e Lanciafiamme<br>✓ In Verde Foglia, Growlithe/Arcanine sono disponibili, riducendo la necessità di Charmander<br>✗ Debole contro le prime 2 palestre (Brock e Misty)<br>✗ Richiede Mankey o Nidoran per sopravvivere a Brock<br><br>Scegli solo se vuoi una difficoltà maggiore"
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
            if (card.classList.contains('starter-bulba')) {
                openModal('bulbasaur');
            } else if (card.classList.contains('starter-squirtle')) {
                openModal('squirtle');
            } else if (card.classList.contains('starter-charmander')) {
                openModal('charmander');
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
    console.log('✨ Nuzlocke Guide Pokémon Rosso Fuoco & Verde Foglia - Caricata con successo!');
    console.log('🌿 Bulbasaur è la scelta più sicura per iniziare!');
    console.log('🪨 Geodude è il tuo migliore amico! Catturalo al Monte Luna - immune a Elettro!');
    console.log('😴 Snorlax è un salvavita per Sabrina. Insegna Riposa per recuperare PS.');
    console.log('💧 Lapras regalata a Celestopoli con Geloraggio è fondamentale per Lance.');
    console.log('🔥 Per Verde Foglia: Growlithe al Percorso 7 → Arcanine');
    console.log('⚡ Per Rosso Fuoco: Electabuzz alla Centrale Elettrica');
    console.log('⚠ Attenzione ai Selfdestruct! Geodude, Graveler, Koffing, Weezing possono esplodere.');
    console.log('💪 Mankey al Percorso 3 è FONDAMENTALE se hai scelto Charmander per Brock!');
});