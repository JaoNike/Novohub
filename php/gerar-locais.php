<?php
// Script para gerar locais.json automaticamente
// Execute este arquivo para criar/atualizar o JSON

function escaneiarPastas($pastaBase = '../locais') {
    $locaisEncontrados = [];
    
    // Log do caminho absoluto
    $caminhoAbsoluto = realpath($pastaBase);
    $caminhoAtual = getcwd();
    
    echo "📂 Diretório atual: $caminhoAtual\n";
    echo "🔍 Procurando em: $pastaBase\n";
    echo "🎯 Caminho absoluto: " . ($caminhoAbsoluto ? $caminhoAbsoluto : "CAMINHO NÃO ENCONTRADO") . "\n";
    echo "📁 Pasta existe: " . (is_dir($pastaBase) ? "SIM" : "NÃO") . "\n\n";
    
    if (!is_dir($pastaBase)) {
        echo "⚠️ Criando pasta: $pastaBase\n";
        mkdir($pastaBase, 0777, true);
        return $locaisEncontrados;
    }
    
    $pastas = scandir($pastaBase);
    
    foreach ($pastas as $pasta) {
        if ($pasta === '.' || $pasta === '..') {
            continue;
        }
        
        $caminhoPasta = $pastaBase . '/' . $pasta;
        
        echo "🔍 Verificando pasta: $pasta\n";
        echo "   📁 Caminho completo: $caminhoPasta\n";
        echo "   📂 É diretório: " . (is_dir($caminhoPasta) ? "SIM" : "NÃO") . "\n";
        
        if (is_dir($caminhoPasta)) {
            $indexHtml = $caminhoPasta . '/index.html';
            $indexHtm = $caminhoPasta . '/index.htm';
            
            echo "   🔍 Procurando index.html: " . (file_exists($indexHtml) ? "ENCONTRADO" : "NÃO ENCONTRADO") . "\n";
            echo "   🔍 Procurando index.htm: " . (file_exists($indexHtm) ? "ENCONTRADO" : "NÃO ENCONTRADO") . "\n";
            
            if (file_exists($indexHtml) || file_exists($indexHtm)) {
                $locaisEncontrados[] = [
                    'nome' => $pasta,
                    'caminho' => 'locais/' . $pasta,
                    'icone' => 'fas fa-map-marker-alt',
                    'timestamp' => time() * 1000
                ];
                echo "   ✅ LOCAL ADICIONADO: $pasta\n";
            } else {
                echo "   ❌ Pasta ignorada (sem index): $pasta\n";
            }
        }
        echo "\n";
    }
    
    return $locaisEncontrados;
}

// Gera o JSON
$locais = escaneiarPastas('../locais');
$json = json_encode($locais, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
file_put_contents('../locais.json', $json);

echo "🔄 Arquivo locais.json atualizado!\n";
echo "📁 " . count($locais) . " locais encontrados:\n";

foreach ($locais as $local) {
    echo "   ✅ " . $local['nome'] . "\n";
}

echo "\n💡 Execute este script sempre que adicionar/remover pastas\n";
?>
