/**
 * Nuzlocke Guide - Pokémon Bianco 2
 * Interattività: modali starter e console log
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Modale per gli Starter ---
    const starterDetails = {
        tepig: {
            title: "🐷 Tepig",
            content: "✓ Il più versatile. Emboar (Fuoco/Lotta) copre molti tipi (Erba, Ghiaccio, Acciaio, Normale)<br>✓ In Bianco 2 avrai Lilligant e Reuniclus, quindi Emboar completa il trio perfettamente<br>✓ Il tipo Lotta è prezioso per Cheren, Roxie e Grimsley<br>⚠ Lento<br>⚠ Debole contro Acqua, Terra, Psico, Volante<br><br>⭐ SCELTA MIGLIORE per la flessibilità ⭐"
        },
        oshawott: {
            title: "🦦 Oshawott",
            content: "✓ Il più sicuro. Samurott (Acqua) è bilanciato con buone statistiche fisiche e speciali<br>✓ Impara Morso (Buio) presto, utile contro i Psico<br>✓ In Bianco 2 hai Gyarados, Starmie e Jellicent come Acqua eccellenti, ma Samurott è un'alternativa solida<br>⚠ Non ha un secondo tipo, quindi poche resistenze extra<br><br>✓ Scelta solida e affidabile"
        },
        snivy: {
            title: "🐍 Snivy",
            content: "⚠ SCELTA SCONSIGLIATA PER NUZLOCKE ⚠<br><br>✓ Serperior è veloce e ha buone difese<br>✗ Offensivamente debole (Attacco e Attacco Speciale bassi)<br>✗ In Bianco 2 hai LILLIGANT, che è un'Erba infinitamente migliore con Petalodanza + Ritmo Proprio<br>✗ Molte debolezze (Fuoco, Ghiaccio, Volante, Coleottero, Veleno)<br><br>Solo per giocatori esperti che cercano una sfida extra"
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
            if (card.classList.contains('starter-tepig')) {
                openModal('tepig');
            } else if (card.classList.contains('starter-oshawott')) {
                openModal('oshawott');
            } else if (card.classList.contains('starter-snivy')) {
                openModal('snivy');
            }
        });
    });
    
    // Effetto hover per le card Pokémon
    const pokemonCards = document.querySelectorAll('.pokemon-card, .league-pokemon-card, .exclusive-card, .key-card, .priority-card, .gifted-card');
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
    console.log('✨ Nuzlocke Guide Pokémon Bianco 2 - Caricata con successo!');
    console.log('🌿🌸 LILLIGANT è il tuo asso! Cattura Petilil nella Foresta di Smeraldo. Petalodanza + Ritmo Proprio = devastante!');
    console.log('🧠💜 REUNICLUS (Solosis) al Percorso 5/11 è un tank speciale con Recupero. Perfetto per Marshall!');
    console.log('💪🐾 RIOLU (Rancio Ranch) è una delle migliori catture iniziali! Lucario arriva presto.');
    console.log('⚡🐏 MAREEP (Rancio Ranch) è un MUST! Ampharos Elettro affidabile.');
    console.log('⛏️⚙️ EXCADRILL (Fascia Complesso) è top tier. Terra/Acciaio, altissimo Attacco.');
    console.log('❄️🐗 MAMOSWINE (Grotta Gigante) è FONDAMENTALE per Iris! Geloraggio 4x sui Draghi.');
    console.log('❄️🐉 KYUREM (Grotta Gelata) è catturabile prima della Lega. Leggendario Ghiaccio perfetto per Iris.');
    console.log('🔥❄️🐉 KYUREM BIANCO (post-fusione) è uno dei Pokémon più forti del gioco! Fusione Fiamma devastante.');
    console.log('👑 IRIS è la Campionessa più difficile! Porta Mamoswine con Geloraggio e proteggilo.');
    console.log('🎒 Porta almeno 20 Ricarica Max per la Lega - le battaglie sono lunghe e logoranti.');
});