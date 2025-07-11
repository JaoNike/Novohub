// Script para monitorar pasta e detectar novos arquivos
// Este script funciona no Node.js

const fs = require('fs');
const path = require('path');

class MonitorArquivos {
    constructor(pastaParaMonitorar) {
        this.pasta = pastaParaMonitorar;
        this.arquivosAnteriores = new Set();
        this.callbacks = [];
        this.callbacksRemocao = [];
        
        // Inicializa com os arquivos existentes
        this.atualizarListaArquivos();
    }

    // Adiciona callback para quando um novo arquivo for encontrado
    onNovoArquivo(callback) {
        this.callbacks.push(callback);
    }

    // Adiciona callback para quando um arquivo for removido
    onArquivoRemovido(callback) {
        this.callbacksRemocao.push(callback);
    }

    // Atualiza a lista de arquivos conhecidos
    atualizarListaArquivos() {
        try {
            if (fs.existsSync(this.pasta)) {
                const arquivos = fs.readdirSync(this.pasta);
                arquivos.forEach(arquivo => {
                    this.arquivosAnteriores.add(arquivo);
                });
            }
        } catch (error) {
            console.error('Erro ao ler pasta:', error);
        }
    }

    // Verifica se há novos arquivos E arquivos removidos
    verificarNovosArquivos() {
        try {
            if (!fs.existsSync(this.pasta)) {
                console.log('Pasta não existe:', this.pasta);
                return;
            }

            const arquivosAtuais = fs.readdirSync(this.pasta);
            const novosArquivos = [];
            const arquivosRemovidosSet = new Set(this.arquivosAnteriores);

            // Verifica novos arquivos
            arquivosAtuais.forEach(arquivo => {
                arquivosRemovidosSet.delete(arquivo); // Remove da lista de "removidos"
                
                if (!this.arquivosAnteriores.has(arquivo)) {
                    novosArquivos.push(arquivo);
                    this.arquivosAnteriores.add(arquivo);
                }
            });

            // Arquivos que sobraram em arquivosRemovidosSet foram removidos
            const arquivosRemovidos = Array.from(arquivosRemovidosSet);
            arquivosRemovidos.forEach(arquivo => {
                this.arquivosAnteriores.delete(arquivo);
                
                // Chama callback de remoção
                this.callbacksRemocao.forEach(callback => {
                    callback(arquivo);
                });
            });

            // Chama callbacks para cada novo arquivo
            novosArquivos.forEach(arquivo => {
                const caminhoCompleto = path.join(this.pasta, arquivo);
                const stats = fs.statSync(caminhoCompleto);
                
                const infoArquivo = {
                    nome: arquivo,
                    caminho: caminhoCompleto,
                    tamanho: stats.size,
                    dataCriacao: stats.birthtime,
                    dataModificacao: stats.mtime,
                    isFile: stats.isFile(),
                    isDirectory: stats.isDirectory()
                };

                this.callbacks.forEach(callback => {
                    callback(infoArquivo);
                });
            });

        } catch (error) {
            console.error('Erro ao verificar novos arquivos:', error);
        }
    }

    // Inicia o monitoramento
    iniciarMonitoramento(intervalo = 1000) {
        console.log(`Iniciando monitoramento da pasta: ${this.pasta}`);
        console.log(`Verificando a cada ${intervalo}ms`);
        
        this.intervalId = setInterval(() => {
            this.verificarNovosArquivos();
        }, intervalo);
    }

    // Para o monitoramento
    pararMonitoramento() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            console.log('Monitoramento parado');
        }
    }

    // Usa o File System Watcher (mais eficiente)
    iniciarMonitoramentoWatcher() {
        console.log(`Iniciando watcher para: ${this.pasta}`);
        
        this.watcher = fs.watch(this.pasta, (eventType, filename) => {
            if (eventType === 'rename' && filename) {
                // 'rename' é disparado quando um arquivo é criado ou deletado
                const caminhoCompleto = path.join(this.pasta, filename);
                
                // Verifica se o arquivo existe (foi criado)
                if (fs.existsSync(caminhoCompleto)) {
                    if (!this.arquivosAnteriores.has(filename)) {
                        this.arquivosAnteriores.add(filename);
                        
                        const stats = fs.statSync(caminhoCompleto);
                        const infoArquivo = {
                            nome: filename,
                            caminho: caminhoCompleto,
                            tamanho: stats.size,
                            dataCriacao: stats.birthtime,
                            dataModificacao: stats.mtime,
                            isFile: stats.isFile(),
                            isDirectory: stats.isDirectory()
                        };

                        this.callbacks.forEach(callback => {
                            callback(infoArquivo);
                        });
                    }
                } else {
                    // Arquivo foi removido
                    if (this.arquivosAnteriores.has(filename)) {
                        this.arquivosAnteriores.delete(filename);
                        
                        this.callbacksRemocao.forEach(callback => {
                            callback(filename);
                        });
                    }
                }
            }
        });
    }

    // Para o watcher
    pararWatcher() {
        if (this.watcher) {
            this.watcher.close();
            console.log('Watcher parado');
        }
    }
}

// Exemplo de uso
if (require.main === module) {
    // Configura a pasta para monitorar
    const pastaParaMonitorar = './locais'; // Mude para sua pasta
    
    const monitor = new MonitorArquivos(pastaParaMonitorar);
    
    // Adiciona callback para novos arquivos
    monitor.onNovoArquivo((arquivo) => {
        console.log('🆕 Novo arquivo detectado:');
        console.log(`   Nome: ${arquivo.nome}`);
        console.log(`   Caminho: ${arquivo.caminho}`);
        console.log(`   Tamanho: ${arquivo.tamanho} bytes`);
        console.log(`   Criado em: ${arquivo.dataCriacao}`);
        console.log('---');
        
        // Aqui você pode processar o arquivo
        processarNovoArquivo(arquivo);
    });
    
    // Inicia o monitoramento (escolha uma das opções)
    // Opção 1: Polling (verifica periodicamente)
    // monitor.iniciarMonitoramento(2000); // Verifica a cada 2 segundos
    
    // Opção 2: File System Watcher (mais eficiente)
    monitor.iniciarMonitoramentoWatcher();
    
    // Para parar o monitoramento após 30 segundos (exemplo)
    // setTimeout(() => {
    //     monitor.pararMonitoramento();
    //     monitor.pararWatcher();
    // }, 30000);
}

// Função para processar o novo arquivo
function processarNovoArquivo(arquivo) {
    try {
        console.log(`Processando arquivo: ${arquivo.nome}`);
        
        // Exemplo: ler conteúdo se for arquivo de texto
        if (arquivo.isFile && path.extname(arquivo.nome).toLowerCase() === '.txt') {
            const conteudo = fs.readFileSync(arquivo.caminho, 'utf8');
            console.log(`Conteúdo do arquivo:\n${conteudo}`);
        }
        
        // Exemplo: mover arquivo para outra pasta
        // const novoCaminho = path.join('./processados', arquivo.nome);
        // fs.copyFileSync(arquivo.caminho, novoCaminho);
        // console.log(`Arquivo copiado para: ${novoCaminho}`);
        
    } catch (error) {
        console.error('Erro ao processar arquivo:', error);
    }
}

module.exports = MonitorArquivos;
