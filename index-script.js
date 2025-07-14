function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.overlay');
    const menuToggle = document.getElementById('menuToggle');
    const topHeader = document.getElementById('topHeader');
    
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    menuToggle.classList.toggle('active');
    
    // Controla a visibilidade do header
    if (sidebar.classList.contains('active')) {
        topHeader.classList.add('hidden');
    } else {
        topHeader.classList.remove('hidden');
    }
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.overlay');
    const menuToggle = document.getElementById('menuToggle');
    const topHeader = document.getElementById('topHeader');
    
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    menuToggle.classList.remove('active');
    topHeader.classList.remove('hidden');
}

// Adiciona event listener para fechar clicando na área vazia da sidebar
document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    
    // Clique na área vazia da sidebar fecha o menu
    sidebar.addEventListener('click', function(e) {
        // Só fecha se clicou diretamente na sidebar (não em elementos filhos)
        if (e.target === sidebar) {
            closeSidebar();
        }
    });
    
    // Overlay também pode fechar (opcional, mas mantém funcionalidade familiar)
    overlay.addEventListener('click', function() {
        closeSidebar();
    });
});

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

// Variável para controlar a última versão carregada
let ultimoTimestampCarregado = 0;
let ultimosLocaisCarregados = [];

// Carrega locais salvos automaticamente quando a página carrega
async function loadSavedLocations() {
    try {
        // Tenta carregar do arquivo JSON gerado pelo Node.js
        const response = await fetch('./locais.json?' + Date.now()); // Cache busting
        if (response.ok) {
            const locaisDoNode = await response.json();
            
            // Verifica se houve mudanças comparando com a última versão
            const novoHash = JSON.stringify(locaisDoNode);
            const ultimoHash = JSON.stringify(ultimosLocaisCarregados);
            
            if (novoHash === ultimoHash) {
                // Nenhuma mudança detectada
                return false;
            }
            
            console.log(`📂 ${locaisDoNode.length} locais carregados do Node.js (atualizados)`);
            
            // Limpa itens dinâmicos antes de adicionar novos
            const menuList = document.getElementById('menuList');
            const staticItems = locations.length;
            
            // Remove itens extras (dinâmicos)
            while (menuList.children.length > staticItems) {
                menuList.removeChild(menuList.lastChild);
            }
            
            // Adiciona novos itens
            locaisDoNode.forEach(local => {
                // Só adiciona se não estiver na lista padrão
                const exists = locations.some(loc => loc.name === local.nome);
                if (!exists) {
                    addMenuItem(local.icone, local.nome);
                }
            });
            
            // Atualiza a referência da última versão carregada
            ultimosLocaisCarregados = [...locaisDoNode];
            return true;
        } else {
            console.log('⚠️ Arquivo locais.json não encontrado - execute o Node.js monitor');
            return false;
        }
    } catch (error) {
        console.log('⚠️ Erro ao carregar locais do Node.js:', error.message);
        return false;
    }
}

// Função para verificar mudanças de forma otimizada
async function checkForUpdates() {
    try {
        // Verifica apenas o cabeçalho do arquivo para mudanças
        const response = await fetch('./locais.json?' + Date.now(), {
            method: 'HEAD'
        });
        
        if (response.ok) {
            const lastModified = response.headers.get('last-modified');
            const currentTime = new Date(lastModified).getTime();
            
            if (currentTime > ultimoTimestampCarregado) {
                const updated = await loadSavedLocations();
                if (updated) {
                    ultimoTimestampCarregado = currentTime;
                    console.log('🔄 Menu atualizado com novas mudanças');
                }
            }
        }
    } catch (error) {
        // Fallback: se não conseguir verificar o cabeçalho, carrega o conteúdo
        await loadSavedLocations();
    }
}

// Adiciona os locais padrão primeiro
locations.forEach(location => addMenuItem(location.icon, location.name));

// Carrega locais do Node.js na inicialização
setTimeout(async () => {
    await loadSavedLocations();
    ultimoTimestampCarregado = Date.now();
}, 100);

// Verifica por atualizações de forma otimizada a cada 3 segundos
setInterval(() => {
    checkForUpdates();
}, 3000);

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeSidebar();
    }
});