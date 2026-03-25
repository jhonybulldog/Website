/**
 * Nuzlocke Guide - Pokémon Giallo
 * Interattività: modali informativi e console log
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Modale per informazioni extra (es. sulla regala dei tre starter) ---
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
    
    function openModal(title, content) {
        modalContent.innerHTML = `
            <h2>${title}</h2>
            <p>${content}</p>
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
    
    // Aggiungi click event alle card delle palestre per info extra (opzionale)
    const gymCards = document.querySelectorAll('.gym-full-card');
    gymCards.forEach(card => {
        const header = card.querySelector('.gym-header');
        if (header) {
            header.style.cursor = 'pointer';
            header.addEventListener('click', () => {
                const gymName = card.querySelector('.gym-title h3')?.innerText || 'Palestra';
                const gymTeam = card.querySelector('.gym-title p')?.innerText || '';
                openModal(`📌 ${gymName}`, `Team avversario: ${gymTeam}<br><br>Consulta la strategia nella sezione sottostante per i dettagli su come affrontare questa palestra.`);
            });
        }
    });
    
    // Effetto hover per le card Pokémon
    const pokemonCards = document.querySelectorAll('.pokemon-card, .league-pokemon-card, .gifted-card, .key-card');
    pokemonCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.2s ease';
        });
    });
    
    // Smooth scroll per eventuali anchor link
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
    
    // Tooltip per i Pokémon regalati
    const giftedCards = document.querySelectorAll('.gifted-card');
    giftedCards.forEach(card => {
        card.addEventListener('click', () => {
            const pokemonName = card.querySelector('h3')?.innerText || '';
            let info = '';
            switch(pokemonName) {
                case 'Bulbasaur':
                    info = 'Ottenuto a Celestopoli dopo aver sconfitto il Team Rocket. Richiede alta amicizia con Pikachu.';
                    break;
                case 'Charmander':
                    info = 'Ottenuto ad Aranciopoli dopo aver sconfitto il Team Rocket. Richiede alta amicizia con Pikachu.';
                    break;
                case 'Squirtle':
                    info = 'Ottenuto a Fucsiapoli dopo aver sconfitto il Team Rocket. Richiede alta amicizia con Pikachu.';
                    break;
                case 'Eevee':
                    info = 'Smeraldopoli, edificio segreto. Scegli Jolteon (Elettro) o Vaporeon (Acqua). Flareon è mediocre in 1ª gen.';
                    break;
                default:
                    info = 'Pokémon ottenibile durante l\'avventura.';
            }
            openModal(`🎁 ${pokemonName}`, info);
        });
    });
    
    // Console log
    console.log('✨ Nuzlocke Guide Pokémon Giallo - Caricata con successo!');
    console.log('⚡ Pikachu non evolve! Usalo con cura.');
    console.log('🎁 Ricorda: ottieni i tre starter con alta amicizia di Pikachu');
    console.log('❄️ Ghiaccio fondamentale per Lance!');
});