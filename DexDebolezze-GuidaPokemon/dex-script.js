// dex-script.js

// Dati dei tipi Pokémon - NUOVA STRUTTURA PER LE COLONNE RICHIESTE
const typeData = {
    "Normale": {
        weakTo: ["Lotta"],
        strongAgainst: [],
        notVeryEffectiveAgainst: ["Roccia", "Acciaio"],
        noEffectAgainst: ["Spettro"],
        resists: [],
        immuneTo: ["Spettro"]
    },
    "Fuoco": {
        weakTo: ["Acqua", "Terra", "Roccia"],
        strongAgainst: ["Erba", "Ghiaccio", "Coleottero", "Acciaio"],
        notVeryEffectiveAgainst: ["Fuoco", "Acqua", "Roccia", "Drago"],
        noEffectAgainst: [],
        resists: ["Fuoco", "Erba", "Ghiaccio", "Coleottero", "Acciaio", "Folletto"],
        immuneTo: []
    },
    "Acqua": {
        weakTo: ["Erba", "Elettro"],
        strongAgainst: ["Fuoco", "Terra", "Roccia"],
        notVeryEffectiveAgainst: ["Acqua", "Erba", "Drago"],
        noEffectAgainst: [],
        resists: ["Fuoco", "Acqua", "Ghiaccio", "Acciaio"],
        immuneTo: []
    },
    "Erba": {
        weakTo: ["Fuoco", "Ghiaccio", "Veleno", "Volante", "Coleottero"],
        strongAgainst: ["Acqua", "Terra", "Roccia"],
        notVeryEffectiveAgainst: ["Fuoco", "Erba", "Veleno", "Volante", "Coleottero", "Drago", "Acciaio"],
        noEffectAgainst: [],
        resists: ["Acqua", "Erba", "Elettro", "Terra"],
        immuneTo: []
    },
    "Elettro": {
        weakTo: ["Terra"],
        strongAgainst: ["Acqua", "Volante"],
        notVeryEffectiveAgainst: ["Erba", "Elettro", "Drago"],
        noEffectAgainst: [],
        resists: ["Elettro", "Volante", "Acciaio"],
        immuneTo: []
    },
    "Ghiaccio": {
        weakTo: ["Fuoco", "Lotta", "Roccia", "Acciaio"],
        strongAgainst: ["Erba", "Terra", "Volante", "Drago"],
        notVeryEffectiveAgainst: ["Fuoco", "Acqua", "Ghiaccio", "Acciaio"],
        noEffectAgainst: [],
        resists: ["Ghiaccio"],
        immuneTo: []
    },
    "Lotta": {
        weakTo: ["Volante", "Psico", "Folletto"],
        strongAgainst: ["Normale", "Ghiaccio", "Roccia", "Buio", "Acciaio"],
        notVeryEffectiveAgainst: ["Veleno", "Volante", "Psico", "Coleottero", "Folletto"],
        noEffectAgainst: [],
        resists: ["Coleottero", "Roccia", "Buio"],
        immuneTo: []
    },
    "Veleno": {
        weakTo: ["Terra", "Psico"],
        strongAgainst: ["Erba", "Folletto"],
        notVeryEffectiveAgainst: ["Veleno", "Terra", "Roccia", "Spettro"],
        noEffectAgainst: [],
        resists: ["Erba", "Lotta", "Veleno", "Coleottero", "Folletto"],
        immuneTo: []
    },
    "Terra": {
        weakTo: ["Acqua", "Erba", "Ghiaccio"],
        strongAgainst: ["Fuoco", "Elettro", "Veleno", "Roccia", "Acciaio"],
        notVeryEffectiveAgainst: ["Erba", "Coleottero"],
        noEffectAgainst: [],
        resists: ["Veleno", "Roccia"],
        immuneTo: ["Elettro"]
    },
    "Volante": {
        weakTo: ["Elettro", "Ghiaccio", "Roccia"],
        strongAgainst: ["Erba", "Lotta", "Coleottero"],
        notVeryEffectiveAgainst: ["Elettro", "Roccia", "Acciaio"],
        noEffectAgainst: [],
        resists: ["Erba", "Lotta", "Coleottero"],
        immuneTo: ["Terra"]
    },
    "Psico": {
        weakTo: ["Coleottero", "Spettro", "Buio"],
        strongAgainst: ["Lotta", "Veleno"],
        notVeryEffectiveAgainst: ["Psico", "Acciaio"],
        noEffectAgainst: [],
        resists: ["Lotta", "Psico"],
        immuneTo: []
    },
    "Coleottero": {
        weakTo: ["Fuoco", "Volante", "Roccia"],
        strongAgainst: ["Erba", "Psico", "Buio"],
        notVeryEffectiveAgainst: ["Fuoco", "Lotta", "Veleno", "Volante", "Spettro", "Drago", "Acciaio", "Folletto"],
        noEffectAgainst: [],
        resists: ["Erba", "Lotta", "Terra"],
        immuneTo: []
    },
    "Roccia": {
        weakTo: ["Acqua", "Erba", "Lotta", "Terra", "Acciaio"],
        strongAgainst: ["Fuoco", "Ghiaccio", "Volante", "Coleottero"],
        notVeryEffectiveAgainst: ["Lotta", "Terra", "Acciaio"],
        noEffectAgainst: [],
        resists: ["Normale", "Fuoco", "Veleno", "Volante"],
        immuneTo: []
    },
    "Spettro": {
        weakTo: ["Spettro", "Buio"],
        strongAgainst: ["Psico", "Spettro"],
        notVeryEffectiveAgainst: ["Buio"],
        noEffectAgainst: [],
        resists: ["Veleno", "Coleottero"],
        immuneTo: ["Normale", "Lotta"]
    },
    "Drago": {
        weakTo: ["Ghiaccio", "Drago", "Folletto"],
        strongAgainst: ["Drago"],
        notVeryEffectiveAgainst: ["Acciaio"],
        noEffectAgainst: [],
        resists: ["Fuoco", "Acqua", "Erba", "Elettro"],
        immuneTo: []
    },
    "Buio": {
        weakTo: ["Lotta", "Coleottero", "Folletto"],
        strongAgainst: ["Psico", "Spettro"],
        notVeryEffectiveAgainst: ["Lotta", "Buio", "Folletto"],
        noEffectAgainst: [],
        resists: ["Spettro", "Buio"],
        immuneTo: ["Psico"]
    },
    "Acciaio": {
        weakTo: ["Fuoco", "Lotta", "Terra"],
        strongAgainst: ["Ghiaccio", "Roccia", "Folletto"],
        notVeryEffectiveAgainst: ["Fuoco", "Acqua", "Elettro", "Acciaio"],
        noEffectAgainst: [],
        resists: ["Normale", "Erba", "Ghiaccio", "Volante", "Psico", "Coleottero", "Roccia", "Drago", "Acciaio", "Folletto"],
        immuneTo: ["Veleno"]
    },
    "Folletto": {
        weakTo: ["Veleno", "Acciaio"],
        strongAgainst: ["Lotta", "Drago", "Buio"],
        notVeryEffectiveAgainst: ["Fuoco", "Veleno", "Acciaio"],
        noEffectAgainst: [],
        resists: ["Lotta", "Coleottero", "Buio"],
        immuneTo: ["Drago"]
    }
};

// Colori per i tipi Pokémon
const typeColors = {
    "Normale": "#A8A77A",
    "Fuoco": "#EE8130",
    "Acqua": "#6390F0",
    "Erba": "#7AC74C",
    "Elettro": "#F7D02C",
    "Ghiaccio": "#96D9D6",
    "Lotta": "#C22E28",
    "Veleno": "#A33EA1",
    "Terra": "#E2BF65",
    "Volante": "#A98FF3",
    "Psico": "#F95587",
    "Coleottero": "#A6B91A",
    "Roccia": "#B6A136",
    "Spettro": "#735797",
    "Drago": "#6F35FC",
    "Buio": "#705746",
    "Acciaio": "#B7B7CE",
    "Folletto": "#D685AD"
};

// ORDINAMENTO SPECIFICO RICHIESTO
const typeOrder = [
    "Normale",
    "Lotta",
    "Fuoco",
    "Acqua",
    "Erba",
    "Elettro",
    "Ghiaccio",
    "Psico",
    "Buio",
    "Drago",
    "Acciaio",
    "Folletto",
    "Volante",
    "Veleno",
    "Terra",
    "Roccia",
    "Coleottero",
    "Spettro"
];

// Inizializzazione
document.addEventListener('DOMContentLoaded', function() {
    initializeDex();
});

function initializeDex() {
    const searchInput = document.getElementById('type-search');
    const typeIconsContainer = document.querySelector('.type-icons');
    const clearButton = document.getElementById('clear-search');
    
    // Popola le icone dei tipi nell'ordine specificato
    populateTypeIcons(typeIconsContainer, searchInput);
    
    // Imposta l'event listener per l'input
    setupSearchInput(searchInput);
    
    // Imposta il pulsante di pulizia
    if (clearButton) {
        clearButton.addEventListener('click', function() {
            searchInput.value = '';
            displayAllTypes();
            updateTypeIcons();
        });
    }
    
    // MOSTRA LA TABELLA COMPLETA ALL'INIZIO nell'ordine specificato
    displayAllTypes();
    updateTableStats();
}

function populateTypeIcons(container, searchInput) {
    // Pulisci il container
    container.innerHTML = '';
    
    // Usa l'ordinamento specificato
    typeOrder.forEach(type => {
        if (!typeColors[type]) return; // Salta se il tipo non esiste nei dati
        
        const icon = document.createElement('div');
        icon.className = 'type-icon';
        icon.textContent = getTypeAbbreviation(type);
        icon.style.backgroundColor = typeColors[type];
        icon.title = type;
        icon.setAttribute('data-type', type);
        
        icon.addEventListener('click', function() {
            searchInput.value = type;
            displaySingleType(type);
            updateTypeIcons(type);
        });
        
        container.appendChild(icon);
    });
}

function getTypeAbbreviation(type) {
    // Crea abbreviazioni di 2-3 lettere per ogni tipo
    const abbreviations = {
        "Normale": "NOR",
        "Lotta": "LOT",
        "Fuoco": "FUO",
        "Acqua": "ACQ",
        "Erba": "ERB",
        "Elettro": "ELE",
        "Ghiaccio": "GHI",
        "Psico": "PSI",
        "Buio": "BUI",
        "Drago": "DRA",
        "Acciaio": "ACC",
        "Folletto": "FOL",
        "Volante": "VOL",
        "Veleno": "VEL",
        "Terra": "TER",
        "Roccia": "ROC",
        "Coleottero": "COL",
        "Spettro": "SPE"
    };
    
    return abbreviations[type] || type.substring(0, 3);
}

function updateTypeIcons(selectedType = null) {
    const icons = document.querySelectorAll('.type-icon');
    icons.forEach(icon => {
        icon.classList.remove('active');
        if (icon.getAttribute('data-type') === selectedType) {
            icon.classList.add('active');
        }
    });
}

function setupSearchInput(input) {
    input.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        if (searchTerm.length === 0) {
            // Se il campo è vuoto, mostra di nuovo tutta la tabella
            displayAllTypes();
            updateTypeIcons();
            updateTableStats();
            return;
        }
        
        // Filtra i tipi che corrispondono alla ricerca
        const matchingTypes = typeOrder.filter(type => 
            type.toLowerCase().includes(searchTerm)
        );
        
        if (matchingTypes.length > 0) {
            // Mostra i tipi filtrati
            displayFilteredTypes(matchingTypes);
            updateTypeIcons(matchingTypes.length === 1 ? matchingTypes[0] : null);
        } else {
            // Nessuna corrispondenza
            displayAllTypes();
            updateTypeIcons();
        }
        
        updateTableStats(matchingTypes.length);
    });
    
    // Aggiungi supporto per la pressione del tasto Enter
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const searchTerm = this.value.trim();
            if (typeColors[searchTerm]) {
                displaySingleType(searchTerm);
                updateTypeIcons(searchTerm);
            }
        }
    });
    
    // Aggiungi supporto per il tasto Escape
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            this.value = '';
            displayAllTypes();
            updateTypeIcons();
            updateTableStats();
        }
    });
}

function displayAllTypes() {
    const resultsTable = document.getElementById('results-table');
    const tableBody = document.getElementById('table-body');
    
    // Assicurati che la tabella sia visibile
    resultsTable.classList.remove('hidden');
    
    // Pulisci il corpo della tabella
    tableBody.innerHTML = '';
    
    // Popola la tabella nell'ordine specificato
    typeOrder.forEach(type => {
        const data = typeData[type];
        if (!data) return;
        
        const row = document.createElement('tr');
        const formattedData = formatTypeData(type, data);
        
        row.innerHTML = `
            <td>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span class="type-badge" style="background-color: ${typeColors[type]}">${type}</span>
                </div>
            </td>
            <td>${formattedData.weakTo}</td>
            <td>${formattedData.strongAgainst}</td>
            <td>${formattedData.notVeryEffectiveAgainst}</td>
            <td>${formattedData.noEffectAgainst}</td>
            <td>${formattedData.resists}</td>
            <td>${formattedData.immuneTo}</td>
        `;
        
        // Aggiungi effetto click per selezionare il tipo
        row.addEventListener('click', function() {
            document.getElementById('type-search').value = type;
            displaySingleType(type);
            updateTypeIcons(type);
        });
        
        tableBody.appendChild(row);
    });
    
    updateTableStats(typeOrder.length);
}

function displayFilteredTypes(types) {
    const resultsTable = document.getElementById('results-table');
    const tableBody = document.getElementById('table-body');
    
    resultsTable.classList.remove('hidden');
    tableBody.innerHTML = '';
    
    // Mantieni l'ordine originale anche per i tipi filtrati
    const filteredTypes = typeOrder.filter(type => types.includes(type));
    
    // Mostra solo i tipi filtrati
    filteredTypes.forEach(type => {
        const data = typeData[type];
        if (!data) return;
        
        const row = document.createElement('tr');
        const formattedData = formatTypeData(type, data);
        
        row.innerHTML = `
            <td>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span class="type-badge" style="background-color: ${typeColors[type]}">${type}</span>
                </div>
            </td>
            <td>${formattedData.weakTo}</td>
            <td>${formattedData.strongAgainst}</td>
            <td>${formattedData.notVeryEffectiveAgainst}</td>
            <td>${formattedData.noEffectAgainst}</td>
            <td>${formattedData.resists}</td>
            <td>${formattedData.immuneTo}</td>
        `;
        
        row.addEventListener('click', function() {
            document.getElementById('type-search').value = type;
            displaySingleType(type);
            updateTypeIcons(type);
        });
        
        tableBody.appendChild(row);
    });
}

function displaySingleType(type) {
    const resultsTable = document.getElementById('results-table');
    const tableBody = document.getElementById('table-body');
    
    resultsTable.classList.remove('hidden');
    tableBody.innerHTML = '';
    
    const data = typeData[type];
    if (!data) {
        displayAllTypes();
        return;
    }
    
    const row = document.createElement('tr');
    const formattedData = formatTypeData(type, data);
    
    row.innerHTML = `
        <td>
            <div style="display: flex; align-items: center; gap: 8px;">
                <span class="type-badge" style="background-color: ${typeColors[type]}">${type}</span>
                <span style="color: var(--dark-green); font-weight: bold;">✓</span>
            </div>
        </td>
        <td>${formattedData.weakTo}</td>
        <td>${formattedData.strongAgainst}</td>
        <td>${formattedData.notVeryEffectiveAgainst}</td>
        <td>${formattedData.noEffectAgainst}</td>
        <td>${formattedData.resists}</td>
        <td>${formattedData.immuneTo}</td>
    `;
    
    row.style.backgroundColor = 'var(--light-gray)';
    tableBody.appendChild(row);
    
    updateTableStats(1);
}

function formatTypeData(type, data) {
    // Funzione per formattare i tipi con badge
    function formatTypeList(types) {
        if (!types || types.length === 0) {
            return '<span class="no-data">—</span>';
        }
        
        // Mantieni l'ordine originale anche nei badge
        return types.sort((a, b) => {
            const indexA = typeOrder.indexOf(a);
            const indexB = typeOrder.indexOf(b);
            return indexA - indexB;
        }).map(t => 
            `<span class="type-badge" style="background-color: ${typeColors[t]}">${t}</span>`
        ).join(' ');
    }
    
    return {
        weakTo: formatTypeList(data.weakTo),
        strongAgainst: formatTypeList(data.strongAgainst),
        notVeryEffectiveAgainst: formatTypeList(data.notVeryEffectiveAgainst),
        noEffectAgainst: formatTypeList(data.noEffectAgainst),
        resists: formatTypeList(data.resists),
        immuneTo: formatTypeList(data.immuneTo)
    };
}

function updateTableStats(count = null) {
    const statsElement = document.getElementById('table-stats');
    if (!statsElement) return;
    
    if (count === null) {
        count = typeOrder.length;
    }
    
    if (count === 1) {
        statsElement.textContent = 'Mostrando 1 tipo';
    } else if (count === typeOrder.length) {
        statsElement.textContent = `Mostrando tutti i ${count} tipi`;
    } else {
        statsElement.textContent = `Mostrando ${count} tipi`;
    }
}