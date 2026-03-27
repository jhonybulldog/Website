/**
 * Nuzlocke Guide - Pokémon Let's Go, Eevee!
 * Interattività: console log e note
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Effetto hover per le card Pokémon
    const pokemonCards = document.querySelectorAll('.pokemon-card, .league-pokemon-card, .exclusive-card, .key-card, .gifted-card, .mega-card');
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
    console.log('✨ Nuzlocke Guide Pokémon Let\'s Go, Eevee! - Caricata con successo!');
    console.log('🐱💧✨ EEVEE PARTNER è IL JOLLY PERFETTO! Le mosse esclusive coprono TUTTI i tipi.');
    console.log('🌙 IPERFOLATA (Buio) per Sabrina - superefficace sui Psico! Rende la palestra più difficile una passeggiata.');
    console.log('❄️ IPERGELO (Ghiaccio) per Lance - 4x sui Draghi! Eevee può gestire Lance da solo.');
    console.log('💪 IPERCALCIO (Lotta) per Snorlax e i Normali della Lega.');
    console.log('🪲💪 PINSIR (Zona Safari) è esclusivo Let\'s Go, Eevee! Attacco altissimo, Mega Pinsir è top tier.');
    console.log('🦊🔥 VULPIX (Percorso 5-7) è esclusivo Let\'s Go, Eevee! Ninetales è un buon Fuoco.');
    console.log('🐱💰 MEOWTH (Percorso 5-7) con Giornopaga ti dà soldi extra. Utile per comprare oggetti.');
    console.log('🪨 GEODUDE (Monte Luna) è immune a Elettro. Fondamentale per Lt. Surge.');
    console.log('🎮 L\'ESP si guadagna CATTURANDO! Cattura molti Pokémon (anche se non li usi) per far salire di livello il team.');
    console.log('📚 Le mosse si imparano dai MAESTRI o dalle Scuole nei centri Pokémon. Non ci sono MT!');
    console.log('💎 MEGA CHARIZARD Y è esclusivo di Let\'s Go, Eevee! Siccità + Lanciafiamme devastante.');
});