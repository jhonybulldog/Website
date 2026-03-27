/**
 * Nuzlocke Guide - Pokémon Let's Go, Pikachu!
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
    console.log('✨ Nuzlocke Guide Pokémon Let\'s Go, Pikachu! - Caricata con successo!');
    console.log('⚡🐭 PIKACHU PARTNER è forte! Sprintabasso (Lotta) distrugge i Normali. Non evolve, ma resta utile per tutta la run.');
    console.log('🐕🔥 GROWLITHE (Percorso 5-7) è esclusivo Let\'s Go, Pikachu! Arcanine è uno dei migliori Fuoco.');
    console.log('🐒💪 MANKEY (Percorso 3-4) è FONDAMENTALE per Brock! Colpo Basso distrugge Geodude e Onix.');
    console.log('🪨 GEODUDE (Monte Luna) è immune a Elettro. Fondamentale per Lt. Surge.');
    console.log('🐉 DRATINI nella Zona Safari evolve in Dragonite, eccellente per Lance.');
    console.log('😴 SNORLAX (Percorso 12/16) è il miglior tank per Sabrina. Sgranocchio (Buio) fa paura.');
    console.log('🎮 L\'ESP si guadagna CATTURANDO! Cattura molti Pokémon (anche se non li usi) per far salire di livello il team.');
    console.log('📚 Le mosse si imparano dai MAESTRI o dalle Scuole nei centri Pokémon. Non ci sono MT!');
    console.log('🍎 Usa le bacche (es. Baccanana) per facilitare le catture dei Pokémon rari.');
    console.log('💎 MEGA CHARIZARD X è esclusivo di Let\'s Go, Pikachu! Dragartigli + Lanciafiamme devastante.');
});