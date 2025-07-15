// Script para executar no terminal e testar o monitor
const MonitorArquivos = require('./monitor-arquivos.js');
const fs = require('fs');
const path = require('path');

console.log('🚀 Iniciando Monitor de Arquivos - Node.js');
console.log('==========================================');

// Configura a pasta para monitorar
const pastaParaMonitorar = 'novohub/locais';

const monitor = new MonitorArquivos(pastaParaMonitorar);

// Array para armazenar os locais encontrados
let locaisEncontrados = [];

// Função para salvar locais em JSON
function salvarLocaisJSON() {
    const jsonPath = 'novohub/locais.json';
    try {
        fs.writeFileSync(jsonPath, JSON.stringify(locaisEncontrados, null, 2));
        console.log(`💾 Arquivo ${jsonPath} atualizado com ${locaisEncontrados.length} locais`);
    } catch (error) {
        console.error('❌ Erro ao salvar JSON:', error.message);
    }
}

// Função para escanear pasta inicial
function escanearPastaInicial() {
    console.log('🔍 Escaneando pasta inicial...');
    
    if (!fs.existsSync(pastaParaMonitorar)) {
        console.log(`📁 Criando pasta: ${pastaParaMonitorar}`);
        fs.mkdirSync(pastaParaMonitorar, { recursive: true });
    }
    
    const pastas = fs.readdirSync(pastaParaMonitorar);
    
    pastas.forEach(pasta => {
        const pastaCaminho = path.join(pastaParaMonitorar, pasta);
        const stats = fs.statSync(pastaCaminho);
        
        if (stats.isDirectory()) {
            verificarPasta(pasta, pastaCaminho);
        }
    });
    
    salvarLocaisJSON();
}

// Função para verificar se uma pasta tem index.htm
function verificarPasta(nomePasta, caminhoPasta) {
    const indexHtm = path.join(caminhoPasta, 'index.htm');
    const indexHtml = path.join(caminhoPasta, 'index.html');
    
    if (fs.existsSync(indexHtm) || fs.existsSync(indexHtml)) {
        const local = {
            nome: nomePasta,
            caminho: caminhoPasta.replace('.\\', './'),
            icone: 'fas fa-map-marker-alt',
            timestamp: Date.now()
        };
        
        // Verifica se já existe na lista
        const existe = locaisEncontrados.some(l => l.nome === nomePasta);
        if (!existe) {
            locaisEncontrados.push(local);
            console.log(`✅ Local encontrado: ${nomePasta}`);
        }
    }
}

// Adiciona callback para novos arquivos
monitor.onNovoArquivo((arquivo) => {
    console.log('\n🆕 NOVO ARQUIVO DETECTADO!');
    console.log('================================');
    console.log(`📁 Nome: ${arquivo.nome}`);
    console.log(`📍 Caminho: ${arquivo.caminho}`);
    console.log(`📏 Tamanho: ${(arquivo.tamanho / 1024).toFixed(2)} KB`);
    console.log(`📅 Criado: ${arquivo.dataCriacao.toLocaleString()}`);
    console.log(`🔄 Modificado: ${arquivo.dataModificacao.toLocaleString()}`);
    console.log(`📄 Tipo: ${arquivo.isFile ? 'Arquivo' : 'Pasta'}`);
    console.log('================================\n');
    
    // Se for uma nova pasta, verifica se tem index.htm
    if (arquivo.isDirectory) {
        console.log('📂 Nova pasta detectada, verificando conteúdo...');
        setTimeout(() => {
            verificarPasta(arquivo.nome, arquivo.caminho);
            salvarLocaisJSON();
        }, 1000); // Aguarda um pouco para os arquivos serem criados
    }
    
    // Se for um index.htm em uma pasta existente
    if (arquivo.isFile && (arquivo.nome === 'index.htm' || arquivo.nome === 'index.html')) {
        const nomePasta = path.basename(path.dirname(arquivo.caminho));
        console.log(`📄 Arquivo index detectado na pasta: ${nomePasta}`);
        verificarPasta(nomePasta, path.dirname(arquivo.caminho));
        salvarLocaisJSON();
    }
});

// Callback para arquivos/pastas removidos
monitor.onArquivoRemovido((nomeArquivo) => {
    console.log(`\n🗑️ PASTA REMOVIDA: ${nomeArquivo}`);
    
    // Remove da lista de locais
    const indexAnterior = locaisEncontrados.length;
    locaisEncontrados = locaisEncontrados.filter(local => local.nome !== nomeArquivo);
    
    if (locaisEncontrados.length < indexAnterior) {
        console.log(`✅ Local "${nomeArquivo}" removido da lista`);
        salvarLocaisJSON();
    }
});

// Executa escaneamento inicial
escanearPastaInicial();

// Inicia o monitoramento
monitor.iniciarMonitoramentoWatcher();

console.log(`👀 Monitorando pasta: ${pastaParaMonitorar}`);
console.log('💡 Adicione novas pastas com index.htm para detectar automaticamente');
console.log('📄 Arquivo locais.json será atualizado automaticamente');
console.log('⏹️  Pressione Ctrl+C para parar\n');

// Tratamento para sair graciosamente
process.on('SIGINT', () => {
    console.log('\n\n⏹️  Parando monitor...');
    monitor.pararWatcher();
    console.log('✅ Monitor parado com sucesso!');
    process.exit(0);
});
