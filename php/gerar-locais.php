<?php
// Script para gerar locais.json automaticamente
// Execute este arquivo para criar/atualizar o JSON

function escaneiarPastas($pastaBase = 'Novohub/locais') {
    $locaisEncontrados = [];
    
    if (!is_dir($pastaBase)) {
        mkdir($pastaBase, 0777, true);
        return $locaisEncontrados;
    }
    
    $pastas = scandir($pastaBase);
    
    foreach ($pastas as $pasta) {
        if ($pasta === '.' || $pasta === '..') {
            continue;
        }
        
        $caminhoPasta = $pastaBase . '/' . $pasta;
        
        if (is_dir($caminhoPasta)) {
            if (file_exists($caminhoPasta . '/index.htm') || file_exists($caminhoPasta . '/index.html')) {
                $locaisEncontrados[] = [
                    'nome' => $pasta,
                    'caminho' => str_replace('./', '', $caminhoPasta),
                    'icone' => 'fas fa-map-marker-alt',
                    'timestamp' => time() * 1000
                ];
            }
        }
    }
    
    return $locaisEncontrados;
}

// Gera o JSON
$locais = escaneiarPastas('Novohub/locais');
$json = json_encode($locais, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
file_put_contents('Novohub/locais.json', $json);

echo "🔄 Arquivo locais.json atualizado!\n";
echo "📁 " . count($locais) . " locais encontrados:\n";

foreach ($locais as $local) {
    echo "   ✅ " . $local['nome'] . "\n";
}

echo "\n💡 Execute este script sempre que adicionar/remover pastas\n";
?>
