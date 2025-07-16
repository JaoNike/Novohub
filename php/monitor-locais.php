<?php
// Script PHP para monitorar pasta e gerar JSON
// Funciona em qualquer servidor web com PHP

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

function escaneiarPastas($pastaBase = '../locais') {
    $locaisEncontrados = [];
    $hashGlobal = ''; // Para detectar mudanças
    
    // Log do caminho absoluto (só para debug - não vai aparecer no JSON)
    $caminhoAbsoluto = realpath($pastaBase);
    $caminhoAtual = getcwd();
    
    // Para debug via console (remover em produção)
    error_log("📂 Diretório atual: $caminhoAtual");
    error_log("🔍 Procurando em: $pastaBase");
    error_log("🎯 Caminho absoluto: " . ($caminhoAbsoluto ? $caminhoAbsoluto : "CAMINHO NÃO ENCONTRADO"));
    error_log("📁 Pasta existe: " . (is_dir($pastaBase) ? "SIM" : "NÃO"));
    
    // Verifica se a pasta existe
    if (!is_dir($pastaBase)) {
        // Cria a pasta se não existir
        mkdir($pastaBase, 0777, true);
        return ['locais' => $locaisEncontrados, 'hash' => md5($hashGlobal)];
    }
    
    // Lê todas as pastas
    $pastas = scandir($pastaBase);
    
    foreach ($pastas as $pasta) {
        // Pula . e ..
        if ($pasta === '.' || $pasta === '..') {
            continue;
        }
        
        $caminhoPasta = $pastaBase . '/' . $pasta;
        
        // Log para debug
        error_log("🔍 Verificando pasta: $pasta");
        error_log("   📁 Caminho completo: $caminhoPasta");
        error_log("   📂 É diretório: " . (is_dir($caminhoPasta) ? "SIM" : "NÃO"));
        
        // Verifica se é uma pasta
        if (is_dir($caminhoPasta)) {
            // Verifica se tem index.htm ou index.html
            $arquivoIndex = '';
            if (file_exists($caminhoPasta . '/index.html')) {
                $arquivoIndex = $caminhoPasta . '/index.html';
                error_log("   ✅ Encontrado: index.html");
            } elseif (file_exists($caminhoPasta . '/index.htm')) {
                $arquivoIndex = $caminhoPasta . '/index.htm';
                error_log("   ✅ Encontrado: index.htm");
            } else {
                error_log("   ❌ Nenhum index encontrado");
            }
            
            if ($arquivoIndex) {
                $timestampModificacao = filemtime($caminhoPasta);
                $timestampArquivo = filemtime($arquivoIndex);
                $timestampFinal = max($timestampModificacao, $timestampArquivo);
                
                $localInfo = [
                    'nome' => $pasta,
                    'caminho' => 'locais/' . $pasta,
                    'icone' => 'fas fa-map-marker-alt',
                    'timestamp' => $timestampFinal * 1000,
                    'dataModificacao' => date('Y-m-d H:i:s', $timestampFinal),
                    'arquivoIndex' => basename($arquivoIndex)
                ];
                
                $locaisEncontrados[] = $localInfo;
                error_log("   ✅ LOCAL ADICIONADO: $pasta");
                
                // Adiciona ao hash global para detectar mudanças
                $hashGlobal .= $pasta . $timestampFinal . filesize($arquivoIndex);
            }
        }
    }
    
    error_log("📊 Total de locais encontrados: " . count($locaisEncontrados));
    
    return ['locais' => $locaisEncontrados, 'hash' => md5($hashGlobal)];
}

function salvarJSON($dados, $arquivo = '../locais.json') {
    $json = json_encode($dados, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    file_put_contents($arquivo, $json);
    return $json;
}

// Função principal
function atualizarLocais() {
    $resultado = escaneiarPastas('../locais');
    $locais = $resultado['locais'];
    $hash = $resultado['hash'];
    
    $json = salvarJSON($locais, '../locais.json');
    
    return [
        'status' => 'success',
        'total' => count($locais),
        'locais' => $locais,
        'hash' => $hash,
        'timestamp' => time(),
        'message' => count($locais) . ' locais encontrados'
    ];
}

// Executa o escaneamento
$resultado = atualizarLocais();

// Retorna JSON
echo json_encode($resultado, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
?>
