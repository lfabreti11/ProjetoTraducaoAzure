// Este evento garante que nosso código só vai rodar depois que
// toda a página HTML for carregada. É uma boa prática.
document.addEventListener('DOMContentLoaded', () => {

    // (O restante do nosso código virá aqui dentro)

    // =========================================================================
    // PASSO 2: PEGAR OS ELEMENTOS DO HTML
    // Criamos variáveis para acessar os elementos HTML com os quais vamos interagir.
    // =========================================================================
    const textToTranslateEl = document.getElementById('text-to-translate');
    const fromLanguageEl = document.getElementById('from-language');
    const toLanguageEl = document.getElementById('to-language');
    const translateBtn = document.getElementById('translate-btn');
    const translatedTextEl = document.getElementById('translated-text');
    const statusMessageEl = document.getElementById('status-message');


// (Dentro do DOMContentLoaded)

    // =========================================================================
    // PASSO 1: CONFIGURAÇÃO OBRIGATÓRIA
    // =========================================================================
    // const subscriptionKey = "";
    // const locationOrRegion = "";
    // const endpoint = "";

    // PASSO 1: CONFIGURAÇÃO OBRIGATÓRIA - AGORA MUITO MAIS SIMPLES!
    const backendApiUrl = ''

    // (As variáveis de captura de elementos continuam aqui)
    // ...

    // =========================================================================
    // PASSO 3: A FUNÇÃO QUE FAZ A MÁGICA ACONTECER
    // =========================================================================

    async function translateText() {
        // Pega o texto do <textarea> e o idioma selecionado no <select>.
        const textToTranslate = textToTranslateEl.value;
        const toLanguage = toLanguageEl.value;
        const fromLanguage = fromLanguageEl.value;

        // Verificação simples para garantir que o usuário digitou algo.
        if (!textToTranslate) {
            alert("Por favor, digite um texto para traduzir.");
            return; // Para a execução da função aqui.
        }

        // Informa ao usuário que a tradução está em andamento.
        statusMessageEl.textContent = 'Traduzindo...';
        translatedTextEl.value = ''; // Limpa o campo de resultado anterior.
        
        // O bloco try...catch é usado para lidar com possíveis erros.
        try {
            // A função 'fetch' faz a requisição para a API.
            const response = await fetch(backendApiUrl, { // <-- Usa a URL do nosso backend
                method: 'POST',
                headers: {
                    // <-- Cabeçalhos de autenticação REMOVIDOS
                    'Content-type': 'application/json'
                },
                // <-- O corpo agora usa o formato que NOSSA API espera
                body: JSON.stringify({
                    'text': textToTranslate,
                    'to': toLanguage,
                    'from': fromLanguage
                })
            });
            
            // (Dentro da função translateText, dentro do bloco try)

            // A API respondeu. Agora, convertemos a resposta para um objeto JavaScript.
            const data = await response.json();

            // Verificamos o status da resposta diretamente
            if (!response.ok) {
                throw new Error(data.error || 'Ocorreu um erro no servidor.');
            }

            // Acessamos a tradução de forma muito mais direta
            const translation = data.translation;
            
            // Colocamos o texto traduzido no <textarea> de resultado.
            translatedTextEl.value = translation;
            statusMessageEl.textContent = 'Tradução concluída!'; // Sucesso!
                    
            // ... (fim do bloco try/catch) ...
            // (fim da função translateText)

         } catch (error) {
            console.error("Ocorreu um erro:", error);
            statusMessageEl.textContent = `Erro na tradução: ${error.message}`;
        } 
    }
    // =========================================================================
    // PASSO 4: ADICIONAR UM "OUVINTE DE EVENTO" AO BOTÃO
    // =========================================================================
    translateBtn.addEventListener('click', translateText);
});