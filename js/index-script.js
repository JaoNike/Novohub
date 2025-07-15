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
    iframe.src = `Novohub/locais/${folderName}/index.htm`;
    console.log(`🌐 Carregando "Novohub/locais/${folderName}/index.htm"`);
    
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


// Variável para controlar a última versão carregada
let ultimoTimestampCarregado = 0;
let ultimosLocaisCarregados = [];
let ultimoHashCarregado = '';

// Função para mostrar feedback visual
function mostrarFeedback(tipo, mensagem) {
    const feedbackDiv = document.getElementById('feedback') || criarFeedbackDiv();
    
    feedbackDiv.className = `feedback ${tipo}`;
    feedbackDiv.textContent = mensagem;
    feedbackDiv.style.display = 'block';
    
    if (tipo === 'loading') {
        feedbackDiv.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${mensagem}`;
    } else if (tipo === 'success') {
        feedbackDiv.innerHTML = `<i class="fas fa-check-circle"></i> ${mensagem}`;
        setTimeout(() => {
            feedbackDiv.style.display = 'none';
        }, 3000);
    } else if (tipo === 'error') {
        feedbackDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${mensagem}`;
        setTimeout(() => {
            feedbackDiv.style.display = 'none';
        }, 5000);
    }
}

function criarFeedbackDiv() {
    const feedbackDiv = document.createElement('div');
    feedbackDiv.id = 'feedback';
    feedbackDiv.style.cssText = `
        position: fixed;
        top: 70px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 8px;
        color: white;
        font-size: 14px;
        z-index: 2147483647;
        display: none;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.2);
        font-family: 'Open Sans', sans-serif;
        font-weight: 500;
    `;
    document.body.appendChild(feedbackDiv);
    
    const style = document.createElement('style');
    style.textContent = `
        .feedback.loading { background: rgba(52, 152, 219, 0.9); }
        .feedback.success { background: rgba(46, 204, 113, 0.9); }
        .feedback.error { background: rgba(231, 76, 60, 0.9); }
        .feedback i { margin-right: 8px; }
    `;
    document.head.appendChild(style);
    
    return feedbackDiv;
}

// Carrega locais salvos automaticamente quando a página carrega
async function loadSavedLocations(isManualCheck = false) {
    try {
        // Só mostra loading se for verificação manual ou primeira carga
        if (isManualCheck || ultimoHashCarregado === '') {
            mostrarFeedback('loading', 'Verificando atualizações...');
        }
        
        // Chama o PHP para obter os locais atualizados
        const response = await fetch('./php/monitor-locais.php?' + Date.now());
        if (response.ok) {
            const resultado = await response.json();
            const locaisDoPhp = resultado.locais || [];
            const novoHash = resultado.hash || '';
            
            // Verifica se houve mudanças comparando o hash
            if (novoHash === ultimoHashCarregado && ultimosLocaisCarregados.length > 0) {
                // Nenhuma mudança detectada - só mostra feedback se for verificação manual
                if (isManualCheck) {
                    mostrarFeedback('success', 'Nenhuma alteração detectada');
                }
                return false;
            }
            
            console.log(`📂 ${locaisDoPhp.length} locais carregados do PHP (${novoHash !== ultimoHashCarregado ? 'atualizados' : 'sem mudanças'})`);
            
            // Se houve mudanças, atualiza o menu
            if (novoHash !== ultimoHashCarregado) {
                // Limpa todos os itens do menu antes de adicionar novos
                const menuList = document.getElementById('menuList');
                menuList.innerHTML = '';

                // Adiciona novos itens vindos do PHP
                locaisDoPhp.forEach(local => {
                    addMenuItem(local.icone, local.nome);
                });
                
                // Atualiza as referências
                ultimosLocaisCarregados = [...locaisDoPhp];
                ultimoHashCarregado = novoHash;
                
                // Mostra feedback apenas se for primeira carga ou verificação manual ou mudança real
                if (isManualCheck || ultimoHashCarregado === '' || locaisDoPhp.length > 0) {
                    mostrarFeedback('success', `${locaisDoPhp.length} locais atualizados`);
                }
                return true;
            } else {
                // Só mostra se for verificação manual
                if (isManualCheck) {
                    mostrarFeedback('success', 'Sistema atualizado');
                }
                return false;
            }
        } else {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
    } catch (error) {
        console.log('⚠️ Erro ao carregar locais do PHP:', error.message);
        // Sempre mostra erro
        mostrarFeedback('error', 'Erro ao conectar com o servidor');
        return false;
    }
}

// Carrega locais salvos automaticamente quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    loadSavedLocations(true); // Primeira carga - mostra feedback
    
    // Verificação automática inteligente a cada 30 segundos
    setInterval(async () => {
        const updated = await loadSavedLocations(false); // Verificação automática - não mostra feedback desnecessário
        if (updated) {
            console.log('🔄 Menu atualizado automaticamente com novas mudanças');
        }
    }, 30000); // 30 segundos
});

// Função para verificar mudanças de forma otimizada (chamada manual)
async function checkForUpdates() {
    const updated = await loadSavedLocations(true); // Verificação manual - mostra feedback
    if (updated) {
        console.log('🔄 Menu atualizado com novas mudanças via PHP');
    }
}

setTimeout(() => {
    console.log('📍 Sistema de monitoramento inteligente carregado');
    // Removido o feedback desnecessário aqui
}, 1000);

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeSidebar();
    }
});