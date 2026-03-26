/**
 * Nuzlocke Guide - Pokémon Luna
 * Interattività: modali starter e console log
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Modale per gli Starter ---
    const starterDetails = {
        popplio: {
            title: "🦭 Popplio",
            content: "✓ Il più sicuro. Primarina (Acqua/Folletto) ha ottimo Attacco Speciale e buone difese<br>✓ Il tipo Folletto è eccellente contro i Draghi della Lega e contro i Lotta<br>✓ Impara Forza Lunare, devastante contro i Draghi<br>⚠ Lento<br>⚠ Debole contro Elettro, Erba, Veleno, Acciaio<br><br>⭐ SCELTA MIGLIORE per la sicurezza ⭐"
        },
        litten: {
            title: "🐱 Litten",
            content: "✓ Il più offensivo. Incineroar (Fuoco/Buio) è un tank fisico con Fuocofuria e Sgranocchio<br>✓ Buona copertura con mosse Fuoco e Buio<br>⚠ Lento<br>⚠ Debole contro Acqua, Terra, Lotta, Roccia, Folletto<br>⚠ Il tipo Buio aggiunge debolezza a Lotta e Folletto<br><br>✓ Scelta solida, richiede più attenzione"
        },
        rowlet: {
            title: "🦉 Rowlet",
            content: "✓ Il più versatile all'inizio. Decidueye (Erba/Fantasma) ha buon Attacco fisico<br>✓ Mosse di copertura interessanti<br>✗ Statistiche nella media<br>✗ Debole contro Fuoco, Ghiaccio, Volante, Buio, Fantasma<br>✗ Non eccelle in nulla<br><br>⚠ Scelta intermedia - Popplio offre più valore in una Nuzlocke"
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
            if (card.classList.contains('starter-popplio')) {
                openModal('popplio');
            } else if (card.classList.contains('starter-litten')) {
                openModal('litten');
            } else if (card.classList.contains('starter-rowlet')) {
                openModal('rowlet');
            }
        });
    });
    
    // Effetto hover per le card Pokémon
    const pokemonCards = document.querySelectorAll('.pokemon-card, .league-pokemon-card, .exclusive-card, .key-card, .gifted-card, .ub-card');
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
    console.log('✨ Nuzlocke Guide Pokémon Luna - Caricata con successo!');
    console.log('🌙 ATTENZIONE AL CICLO GIORNO/NOTTE INVERTITO! In Luna, il giorno nel gioco corrisponde alla notte reale.');
    console.log('🏝️ ZONA SAFARI DI ALOLA è un tesoro! Cattura Gible (Garchomp) e Bagon (Salamence) appena possibile.');
    console.log('🌿🌸 LILLIGANT (Petilil al Percorso 2) è esclusivo Luna! Petalodanza + Ritmo Proprio è devastante.');
    console.log('🦍🧠 ORANGURU (Percorso 10) è esclusivo Luna. Supporto eccellente con Telepatia e Manipolazione.');
    console.log('🐉😴 DRAMPA (Percorso 12) è esclusivo Luna. Drago tank con Adattabilità che potenzia le mosse STAB.');
    console.log('💀⚫ MUK DI ALOLA (Grimer al Percorso 6) ha un solo punto debole (Terra). Tank eccellente per Acero.');
    console.log('🐴💪 MUDSDALE (Mudbray al Percorso 4) è un tank Terra con alti PS e Attacco.');
    console.log('⚙️🧲 MAGNEZONE (Magnemite al Percorso 3) è top tier per Kahili (Volante).');
    console.log('🦭💧 POPPLIO è il starter più sicuro. Primarina con Forza Lunare eccellente contro i Draghi.');
    console.log('🌙🦇 LUNALA è OP! Catturala durante la storia (Lv.55). Ali dello Spettro devastante.');
    console.log('🎮 EXP SHARE globale in 7ª gen! Riduce il grind ma usalo con moderazione.');
});