function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.overlay');
    const menuToggle = document.getElementById('menuToggle');
    
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    menuToggle.classList.toggle('active');
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.overlay');
    const menuToggle = document.getElementById('menuToggle');
    
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    menuToggle.classList.remove('active');
}

function selectLocation(locationName) {
    const iframe = document.querySelector('.main-content iframe');
    
    // Tenta carregar da pasta locais/nome-da-pasta/index.htm
    const folderName = locationName.toLowerCase().replace(/\s+/g, '-');
    iframe.src = `./locais/${folderName}/index.htm`;
    console.log(`🌐 Carregando "./locais/${folderName}/index.htm"`);
    
    closeSidebar();
}

// Função para adicionar itens ao menu dinamicamente
function addMenuItem(iconClass, text, onClick) {
    const menuList = document.getElementById('menuList');
    const menuItem = document.createElement('li');
    menuItem.className = 'menu-item';
    menuItem.innerHTML = `
        <i class="${iconClass}"></i>
        ${text}
    `;
    menuItem.onclick = onClick || function() { selectLocation(text); };
    menuList.appendChild(menuItem);
}

// Exemplo de como usar para popular o menu com muitos itens:
const locations = [
    { icon: 'fas fa-home', name: 'Casa dos Braga' },
    { icon: 'fas fa-church', name: 'Consolação' },
    { icon: 'fas fa-industry', name: 'Fábrica de Pios Maurílio Coelho' },
    { icon: 'fas fa-tree', name: 'Floresta Nacional de Pacotuba' },
    { icon: 'fas fa-church', name: 'Matriz Velha' },
    { icon: 'fas fa-monument', name: 'Monumento Natural do Itabira' },
    { icon: 'fas fa-building', name: 'Palácio Bernardino Monteiro' },
    { icon: 'fas fa-mountain', name: 'Pedra da Penha' },
    { icon: 'fas fa-mountain', name: 'Pedra do Caramba' },
    { icon: 'fas fa-bridge', name: 'Ponte de Ferro' },
    { icon: 'fas fa-road', name: 'Rampa do Mirante' },
    { icon: 'fas fa-water', name: 'Beira Rio' },
    { icon: 'fas fa-mountain', name: 'Cachoeira Alta' },
    { icon: 'fas fa-building', name: 'Câmara Municipal' },
    { icon: 'fas fa-home', name: 'Casa da Memória' },
    { icon: 'fas fa-music', name: 'Casa de Cultura Roberto Carlos' }
];

// Carrega locais salvos automaticamente quando a página carrega
async function loadSavedLocations() {
    try {
        // Tenta carregar do arquivo JSON gerado pelo Node.js
        const response = await fetch('./locais.json');
        if (response.ok) {
            const locaisDoNode = await response.json();
            
            console.log(`📂 ${locaisDoNode.length} locais carregados do Node.js`);
            
            locaisDoNode.forEach(local => {
                // Só adiciona se não estiver na lista padrão
                const exists = locations.some(loc => loc.name === local.nome);
                if (!exists) {
                    addMenuItem(local.icone, local.nome);
                }
            });
        } else {
            console.log('⚠️ Arquivo locais.json não encontrado - execute o Node.js monitor');
        }
    } catch (error) {
        console.log('⚠️ Erro ao carregar locais do Node.js:', error.message);
    }
}

// Função para recarregar locais (pode ser chamada periodicamente)
async function reloadLocations() {
    // Limpa itens dinâmicos (mantém os estáticos)
    const menuList = document.getElementById('menuList');
    const staticItems = locations.length;
    
    // Remove itens extras (dinâmicos)
    while (menuList.children.length > staticItems) {
        menuList.removeChild(menuList.lastChild);
    }
    
    // Recarrega
    await loadSavedLocations();
}

// Adiciona os locais padrão primeiro
locations.forEach(location => addMenuItem(location.icon, location.name));

// Depois carrega os locais do Node.js
setTimeout(() => {
    loadSavedLocations();
}, 100);

// Recarrega locais a cada 5 segundos (detecta novos automaticamente)
setInterval(() => {
    reloadLocations();
}, 5000);

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeSidebar();
    }
});