// Inizializzazione
document.addEventListener('DOMContentLoaded', function() {
    // Imposta l'anno corrente nel footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Aggiungi event listeners
    document.getElementById('calculate-btn').addEventListener('click', calculateSubnet);
    document.getElementById('ip-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calculateSubnet();
    });
    
    // Aggiungi event listeners per gli esempi
    const examples = document.querySelectorAll('.hint-example');
    examples.forEach(example => {
        example.addEventListener('click', function() {
            document.getElementById('ip-input').value = this.textContent;
            calculateSubnet();
        });
    });
    
    // Mostra lo stato iniziale (nessun calcolo effettuato)
    resetResultsToPlaceholder();
});

// Resetta i risultati allo stato iniziale
function resetResultsToPlaceholder() {
    document.getElementById('placeholder-message').style.display = 'block';
    document.getElementById('results-container').style.display = 'none';
    document.getElementById('placeholder-info').style.display = 'block';
    document.getElementById('info-grid').style.display = 'none';
}

// Mostra i risultati del calcolo
function showResults() {
    document.getElementById('placeholder-message').style.display = 'none';
    document.getElementById('results-container').style.display = 'flex';
    document.getElementById('placeholder-info').style.display = 'none';
    document.getElementById('info-grid').style.display = 'grid';
}

// Funzione principale di calcolo
function calculateSubnet() {
    const input = document.getElementById('ip-input').value.trim();
    const errorElement = document.getElementById('error-message');
    
    // Nascondi eventuali errori precedenti
    errorElement.classList.remove('show');
    
    // Controllo se l'input è vuoto
    if (!input) {
        showError("Inserisci un indirizzo IP con notazione CIDR (es. 192.168.1.0/24)");
        resetResultsToPlaceholder();
        return;
    }
    
    // Validazione input
    if (!isValidIPCIDR(input)) {
        showError("Formato non valido. Usa la notazione IP/CIDR (es. 192.168.1.0/24)");
        resetResultsToPlaceholder();
        return;
    }
    
    // Parsing dell'input
    const [ipAddress, cidrStr] = input.split('/');
    const cidr = parseInt(cidrStr, 10);
    
    // Validazione CIDR
    if (cidr < 0 || cidr > 32) {
        showError("Il CIDR deve essere un valore tra 0 e 32");
        resetResultsToPlaceholder();
        return;
    }
    
    // Validazione IP
    if (!isValidIPAddress(ipAddress)) {
        showError("Indirizzo IP non valido");
        resetResultsToPlaceholder();
        return;
    }
    
    // Calcola tutte le informazioni
    const subnetInfo = calculateSubnetInfo(ipAddress, cidr);
    
    // Aggiorna l'interfaccia con i risultati
    updateUI(subnetInfo);
    
    // Mostra i risultati
    showResults();
}

// Funzione per validare l'input IP/CIDR
function isValidIPCIDR(input) {
    const regex = /^(\d{1,3}\.){3}\d{1,3}\/\d{1,2}$/;
    return regex.test(input);
}

// Funzione per validare l'indirizzo IP
function isValidIPAddress(ip) {
    const parts = ip.split('.');
    if (parts.length !== 4) return false;
    
    for (let part of parts) {
        const num = parseInt(part, 10);
        if (isNaN(num) || num < 0 || num > 255) return false;
    }
    
    return true;
}

// Mostra un messaggio di errore
function showError(message) {
    const errorElement = document.getElementById('error-message');
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

// Calcola tutte le informazioni sulla subnet
function calculateSubnetInfo(ipAddress, cidr) {
    // Converti l'IP in numero decimale
    const ipDecimal = ipToDecimal(ipAddress);
    
    // Calcola la subnet mask
    const subnetMask = cidrToMask(cidr);
    const subnetMaskDecimal = maskToDecimal(subnetMask);
    
    // Calcola l'indirizzo di rete
    const networkAddress = ipDecimal & subnetMask;
    
    // Calcola la wildcard mask
    const wildcardMask = ~subnetMask >>> 0; // >>> 0 per convertire in unsigned
    const wildcardMaskDecimal = maskToDecimal(wildcardMask);
    
    // Calcola l'indirizzo di broadcast
    const broadcastAddress = networkAddress | wildcardMask;
    
    // Calcola il numero di host
    const totalHosts = Math.pow(2, 32 - cidr);
    const usableHosts = totalHosts - 2;
    
    // Calcola HostMin e HostMax
    let hostMin, hostMax;
    if (cidr === 32) {
        // Per /32, c'è solo un indirizzo
        hostMin = networkAddress;
        hostMax = networkAddress;
    } else if (cidr === 31) {
        // Per /31, entrambi gli indirizzi sono utilizzabili (usato in reti punto-punto)
        hostMin = networkAddress;
        hostMax = broadcastAddress;
    } else {
        // Per tutte le altre subnet
        hostMin = networkAddress + 1;
        hostMax = broadcastAddress - 1;
    }
    
    // Determina la classe e il tipo di rete
    const networkClass = getNetworkClass(ipAddress);
    const addressType = getAddressType(ipAddress);
    
    // Determina la descrizione del CIDR
    const cidrDescription = getCIDRDescription(cidr, ipAddress);
    
    // Restituisci tutte le informazioni
    return {
        ipDecimal: ipDecimal,
        ipAddress: ipAddress,
        cidr: cidr,
        subnetMask: subnetMask,
        subnetMaskDecimal: subnetMaskDecimal,
        networkAddress: networkAddress,
        broadcastAddress: broadcastAddress,
        wildcardMask: wildcardMask,
        wildcardMaskDecimal: wildcardMaskDecimal,
        totalHosts: totalHosts,
        usableHosts: usableHosts,
        hostMin: hostMin,
        hostMax: hostMax,
        networkClass: networkClass,
        addressType: addressType,
        cidrDescription: cidrDescription,
        decimalIP: ipDecimal
    };
}

// Converte un IP in numero decimale
function ipToDecimal(ip) {
    const parts = ip.split('.');
    return (parseInt(parts[0]) << 24) + 
           (parseInt(parts[1]) << 16) + 
           (parseInt(parts[2]) << 8) + 
           parseInt(parts[3]);
}

// Converte un numero decimale in IP
function decimalToIP(decimal) {
    return [
        (decimal >>> 24) & 255,
        (decimal >>> 16) & 255,
        (decimal >>> 8) & 255,
        decimal & 255
    ].join('.');
}

// Converte CIDR in subnet mask (numero decimale)
function cidrToMask(cidr) {
    return (0xFFFFFFFF << (32 - cidr)) >>> 0;
}

// Converte una subnet mask (numero decimale) in formato IP
function maskToDecimal(mask) {
    return decimalToIP(mask);
}

// Ottiene la classe della rete
function getNetworkClass(ipAddress) {
    const firstOctet = parseInt(ipAddress.split('.')[0]);
    
    if (firstOctet >= 1 && firstOctet <= 126) return "Classe A";
    if (firstOctet >= 128 && firstOctet <= 191) return "Classe B";
    if (firstOctet >= 192 && firstOctet <= 223) return "Classe C";
    if (firstOctet >= 224 && firstOctet <= 239) return "Classe D (Multicast)";
    if (firstOctet >= 240 && firstOctet <= 255) return "Classe E (Riservata)";
    
    return "Speciale";
}

// Determina se l'indirizzo è privato o pubblico
function getAddressType(ipAddress) {
    const parts = ipAddress.split('.').map(Number);
    const first = parts[0];
    const second = parts[1];
    
    // Indirizzi privati RFC-1918
    if (first === 10) return "Privato (RFC-1918)";
    if (first === 172 && second >= 16 && second <= 31) return "Privato (RFC-1918)";
    if (first === 192 && second === 168) return "Privato (RFC-1918)";
    
    // Loopback
    if (first === 127) return "Loopback";
    
    // Link-local
    if (first === 169 && second === 254) return "Link-local (APIPA)";
    
    // Multicast
    if (first >= 224 && first <= 239) return "Multicast";
    
    // Broadcast limitato
    if (first === 255 && second === 255 && parts[2] === 255 && parts[3] === 255) return "Broadcast limitato";
    
    // Pubblico
    return "Pubblico";
}

// Ottiene la descrizione del CIDR
function getCIDRDescription(cidr, ipAddress) {
    if (cidr === 32) return "(Singolo indirizzo host)";
    if (cidr === 31) return "(Rete punto-punto)";
    if (cidr >= 24 && cidr <= 30) return "(Rete piccola)";
    if (cidr >= 16 && cidr < 24) return "(Rete media)";
    if (cidr >= 8 && cidr < 16) return "(Rete grande)";
    if (cidr < 8) return "(Rete molto grande)";
    
    const addressType = getAddressType(ipAddress);
    if (addressType.includes("Privato")) {
        return "(Indirizzi per reti private - RFC-1918)";
    }
    
    return "";
}

// Converte un numero decimale in rappresentazione binaria a 8 bit per ottetto
function decimalToBinaryIP(decimal) {
    const ip = decimalToIP(decimal);
    const parts = ip.split('.');
    
    return parts.map(part => {
        const binary = parseInt(part).toString(2);
        return '0'.repeat(8 - binary.length) + binary;
    }).join('.');
}

// Converte una subnet mask in rappresentazione binaria
function maskToBinary(maskDecimal) {
    const mask = ipToDecimal(maskDecimal);
    let binary = mask.toString(2);
    
    // Assicurati che la stringa binaria sia di 32 bit
    binary = '0'.repeat(32 - binary.length) + binary;
    
    // Suddividi in ottetti
    return binary.match(/.{1,8}/g).join('.');
}

// Formatta il numero di host in modo leggibile
function formatHostCount(usableHosts, cidr, totalHosts) {
    if (cidr === 32) {
        return "1 (host singolo)";
    } else if (cidr === 31) {
        return "2 (rete punto-punto)";
    } else if (usableHosts < 0) {
        return "0";
    } else {
        return usableHosts.toLocaleString() + " (su " + totalHosts.toLocaleString() + " totali)";
    }
}

// Aggiorna l'interfaccia con i risultati
function updateUI(info) {
    // Address
    document.getElementById('address-decimal').textContent = info.ipAddress;
    document.getElementById('address-binary').textContent = decimalToBinaryIP(info.ipDecimal);
    
    // Netmask
    document.getElementById('netmask-decimal').textContent = info.subnetMaskDecimal;
    document.getElementById('netmask-binary').textContent = maskToBinary(info.subnetMaskDecimal);
    
    // CIDR
    document.getElementById('cidr-value').textContent = `/${info.cidr}`;
    document.getElementById('cidr-desc').textContent = info.cidrDescription;
    
    // Mostra la parte significativa della subnet mask in binario
    let binaryMask = maskToBinary(info.subnetMaskDecimal);
    if (info.cidr < 32) {
        binaryMask = binaryMask.substring(0, info.cidr + Math.floor(info.cidr/8) - 1) + '...';
    }
    document.getElementById('cidr-binary').textContent = binaryMask;
    
    // Cisco Wildcard
    document.getElementById('wildcard-decimal').textContent = info.wildcardMaskDecimal;
    document.getElementById('wildcard-binary').textContent = decimalToBinaryIP(info.wildcardMask);
    
    // Network
    document.getElementById('network-decimal').textContent = decimalToIP(info.networkAddress);
    document.getElementById('network-binary').textContent = decimalToBinaryIP(info.networkAddress);
    
    // Broadcast
    document.getElementById('broadcast-decimal').textContent = decimalToIP(info.broadcastAddress);
    document.getElementById('broadcast-binary').textContent = decimalToBinaryIP(info.broadcastAddress);
    
    // Hosts
    document.getElementById('hosts-total').textContent = formatHostCount(info.usableHosts, info.cidr, info.totalHosts);
    
    // HostMin
    const hostMinIP = decimalToIP(info.hostMin);
    document.getElementById('hostmin-decimal').textContent = hostMinIP;
    document.getElementById('hostmin-binary').textContent = decimalToBinaryIP(info.hostMin);
    
    // HostMax
    const hostMaxIP = decimalToIP(info.hostMax);
    document.getElementById('hostmax-decimal').textContent = hostMaxIP;
    document.getElementById('hostmax-binary').textContent = decimalToBinaryIP(info.hostMax);
    
    // Informazioni aggiuntive
    document.getElementById('network-class').textContent = info.networkClass;
    document.getElementById('address-type').textContent = info.addressType;
    
    // Formatta il range di indirizzi
    let addressRange;
    if (info.cidr === 32) {
        addressRange = hostMinIP + " (singolo host)";
    } else if (info.cidr === 31) {
        addressRange = hostMinIP + " - " + hostMaxIP + " (entrambi utilizzabili)";
    } else {
        addressRange = hostMinIP + " - " + hostMaxIP;
    }
    document.getElementById('address-range').textContent = addressRange;
    
    document.getElementById('decimal-ip').textContent = info.ipDecimal.toLocaleString();
    
    // Aggiungi classe CSS per il badge in base al tipo di indirizzo
    const addressTypeElement = document.getElementById('address-type');
    addressTypeElement.className = 'info-value badge ';
    if (info.addressType.includes("Privato")) {
        addressTypeElement.classList.add('private');
    } else if (info.addressType.includes("Pubblico")) {
        addressTypeElement.classList.add('public');
    } else {
        addressTypeElement.classList.add('default');
    }
    
    // Anche per la classe di rete
    const networkClassElement = document.getElementById('network-class');
    networkClassElement.className = 'info-value badge ';
    if (info.networkClass.includes("Classe A") || info.networkClass.includes("Classe B") || info.networkClass.includes("Classe C")) {
        if (info.addressType.includes("Privato")) {
            networkClassElement.classList.add('private');
        } else if (info.addressType.includes("Pubblico")) {
            networkClassElement.classList.add('public');
        } else {
            networkClassElement.classList.add('default');
        }
    } else {
        networkClassElement.classList.add('default');
    }
}