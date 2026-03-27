/**
 * Nuzlocke Guide - Pokémon Scarlatto
 * Interattività: modali starter, tab di ordinamento e console log
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Modale per gli Starter ---
    const starterDetails = {
        fuecoco: {
            title: "🐊 Fuecoco",
            content: "✓ Il più consigliato per Nuzlocke! Skeledirge (Fuoco/Fantasma) con Canto Funebre è eccellente<br>✓ I tipi Fuoco sono rari a Paldea - questa è la scelta quasi obbligatoria<br>✓ Canto Funebre aumenta l'Attacco Speciale a ogni KO<br>✓ Impara Ombra Notturna e Sgranocchio per copertura<br>⚠ Lento<br>⚠ Debole ad Acqua, Terra, Roccia, Fantasma, Buio<br><br>⭐ SCELTA MIGLIORE per Scarlatto ⭐"
        },
        quaxly: {
            title: "🦆 Quaxly",
            content: "✓ Quaquaval (Acqua/Lotta) è offensivo con Samba Frullante che aumenta la Velocità<br>✓ Il tipo Lotta è utile contro i Normali (Larry)<br>⚠ I tipi Acqua sono molto comuni a Paldea (fiumi, coste)<br>⚠ Meno unico di Fuecoco<br><br>✓ Scelta solida, ma non indispensabile"
        },
        sprigatito: {
            title: "🐱 Sprigatito",
            content: "⚠ SCELTA INTERMEDIA ⚠<br><br>✓ Meowscarada (Erba/Buio) è veloce con Fiore Olocco<br>✓ Il tipo Buio è utile contro Psico e Fantasma (Ryme, Tulip)<br>✗ Fragile fisicamente<br>✗ L'Erba non è ottimale per il primo capo (Katy, Coleottero)<br>✗ Meno valore di Fuecoco per le prime sfide<br><br>Sconsigliato rispetto a Fuecoco"
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
            if (card.classList.contains('starter-fuecoco')) {
                openModal('fuecoco');
            } else if (card.classList.contains('starter-quaxly')) {
                openModal('quaxly');
            } else if (card.classList.contains('starter-sprigatito')) {
                openModal('sprigatito');
            }
        });
    });
    
    // --- Tab per l'ordinamento delle sfide ---
    const tabs = document.querySelectorAll('.order-tab');
    const contents = {
        gyms: document.getElementById('gyms-content'),
        titans: document.getElementById('titans-content'),
        star: document.getElementById('star-content')
    };
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const orderType = tab.getAttribute('data-order');
            
            // Rimuovi active da tutti i tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Nascondi tutti i contenuti
            Object.values(contents).forEach(content => {
                if (content) content.classList.remove('active');
            });
            
            // Mostra il contenuto selezionato
            if (contents[orderType]) {
                contents[orderType].classList.add('active');
            }
        });
    });
    
    // Effetto hover per le card Pokémon
    const pokemonCards = document.querySelectorAll('.key-card, .league-pokemon-card, .area-card, .order-card, .league-card');
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
    console.log('✨ Nuzlocke Guide Pokémon Scarlatto - Caricata con successo!');
    console.log('🌍 Paldea è un mondo completamente aperto! Usa la regola "un Pokémon per area nominata sulla mappa".');
    console.log('🐊🔥 FUECOCO è la scelta migliore! Skeledirge con Canto Funebre è eccellente per tutta la run.');
    console.log('🐒💢 MANKEY (Annihilape) è uno dei migliori Pokémon di nona gen! Catturalo a West Province.');
    console.log('🐉🌪️ GIBLE (Garchomp) nelle province meridionali (South Province Area Two/Six) è top tier.');
    console.log('⚡💪 PAWMI (Pawmot) è un Elettro/Lotta eccellente per Larry (Volante).');
    console.log('🔨✨ TINKATON (Tinkatink) a West Province è Acciaio/Folletto. Perfetto per Hassel (Drago).');
    console.log('🎮 Auto-Battaglie (Let\'s Go!) per grindare in sicurezza! Il Pokémon non sviene mai.');
    console.log('💎 TERACRISTAL: Attenzione ai boss! Cambia tipo e può sorprenderti.');
    console.log('🗺️ Segui l\'ordine di livello consigliato per evitare aree troppo difficili.');
});