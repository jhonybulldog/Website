/**
 * Nuzlocke Guide - Pokémon Leggende: Z-A
 * Interattività: modali starter e console log
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Modale per gli Starter Kalos ---
    const starterDetails = {
        fennekin: {
            title: "🦊 Fennekin",
            content: "✓ Delphox (Fuoco/Psico) ha buon Attacco Speciale<br>✓ In team consigliati si preferisce Charizard come Fuoco (ottenibile da Mabel)<br>⚠ Se non ottieni Charizard, Delphox è un'alternativa valida<br>⚠ Lento, debole ad Acqua, Terra, Roccia, Buio, Fantasma<br><br>✓ Scelta alternativa"
        },
        froakie: {
            title: "🐸 Froakie",
            content: "✓ Greninja (Acqua/Buio) è velocissimo e versatile<br>✓ Il tipo Buio è utile contro Psico e Fantasma<br>✓ In team consigliati si preferisce Feraligatr per la maggiore resistenza (difesa e attacco >100)<br>⚠ Fragile fisicamente<br><br>✓ Scelta alternativa, valido se non ottieni Feraligatr"
        },
        chespin: {
            title: "🦔 Chespin",
            content: "⚠ SCELTA SCONSIGLIATA ⚠<br><br>✓ Chesnaught (Erba/Lotta) è un tank fisico con buone difese<br>✗ Venusaur (Wild Zone 20) è spesso preferito per la Mega Evoluzione e Gigassorbimento<br>✗ Lento, molte debolezze (Fuoco, Ghiaccio, Volante, Psico, Folletto)<br><br>Sconsigliato se puoi ottenere Venusaur"
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
            if (card.classList.contains('starter-fennekin')) {
                openModal('fennekin');
            } else if (card.classList.contains('starter-froakie')) {
                openModal('froakie');
            } else if (card.classList.contains('starter-chespin')) {
                openModal('chespin');
            }
        });
    });
    
    // Effetto hover per le card
    const hoverCards = document.querySelectorAll('.wildzone-card, .district-card, .team-card, .key-card, .mega-card, .trade-card');
    hoverCards.forEach(card => {
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
    console.log('✨ Nuzlocke Guide Pokémon Leggende: Z-A - Caricata con successo!');
    console.log('📅 NOTA: Il gioco uscirà a fine 2025. Questa guida è basata su informazioni preliminari e sarà aggiornata post-lancio.');
    console.log('⭐ PRIORITÀ ASSOLUTA: Mareep (Wild Zone 1) e Kakuna (Wild Zone 2/7) sono le catture più importanti!');
    console.log('⚡🐑 AMPHAROS (Mareep) in Wild Zone 1 è top tier disponibile subito. Non sprecarla su Caterpie.');
    console.log('🐝💪 MEGA BEEDRILL (Kakuna) in Wild Zone 2 o 7 si trova presto ed è fortissimo.');
    console.log('🌿💚 VICTREEBEL (Bellsprout) in Wild Zone 10 è più sicuro di Starmie. Prendilo prima se devi scegliere.');
    console.log('🦑⚠️ INKAY (Malamar) va preso PRIMA di Wild Zone 20, altrimenti non potrai più ottenerlo.');
    console.log('⚙️👹 MAWILE è il Pokémon più importante nei team difensivi. Immunità a Drago e Veleno.');
    console.log('🎁 MEGA GARDEVOIR se disponibile come Mystery Gift non occupa una cattura. Approfittane!');
    console.log('🤝 HERACROSS e FERALIGATR si ottengono da scambi NPC. Non occupano catture e sono eccellenti.');
});