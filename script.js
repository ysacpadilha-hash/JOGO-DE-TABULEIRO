// Banco de questões alinhadas com os objetivos da BNCC selecionados (Cultura Digital)
const questoes = [
    {
        id: 1,
        pergunta: "Ao navegar em redes sociais, você percebe que os anúncios mostram exatamente produtos que você comentou com amigos. Que mecanismo tecnológico explica isso?",
        opcoes: [
            "Coincidência gerada pelo tráfego da rede mundial.",
            "Algoritmos de IA que analisam dados de navegação e pegada digital.",
            "Acesso ilegal e ao vivo da câmera do celular por hackers.",
            "Sistemas antigos de armazenamento em nuvem sem criptografia."
        ],
        correta: 1,
        justificativa: "Objetivos BNCC (Análise de Dados/Algoritmos): Redes coletam dados de navegação e cliques para traçar perfis comportamentais através de algoritmos preditivos."
    },
    {
        id: 2,
        pergunta: "Um site de notícias duvidoso publica uma manchete bombástica sobre a saúde pública. Qual deve ser sua primeira atitude de letramento digital antes de compartilhar?",
        opcoes: [
            "Compartilhar imediatamente em grupos para alertar o maior número de pessoas.",
            "Comentar na publicação dizendo que acha que é mentira.",
            "Checar a fonte, verificar em agências de checagem e avaliar se o texto é sensacionalista.",
            "Copiar o texto e colar como se fosse seu para evitar processos."
        ],
        correta: 2,
        justificativa: "Objetivos BNCC (Curadoria de Informação): Analisar criticamente as fontes e combater a desinformação faz parte do uso ético das tecnologias."
    },
    {
        id: 3,
        pergunta: "Qual das seguintes práticas garante maior segurança e privacidade para seus dados pessoais e senhas na internet?",
        opcoes: [
            "Usar a mesma senha em todas as contas para não esquecer.",
            "Utilizar autenticação em duas etapas (2FA) e senhas fortes e únicas.",
            "Deixar suas senhas salvas em blocos de notas públicos na nuvem.",
            "Aceitar todos os cookies e termos de privacidade sem ler."
        ],
        correta: 1,
        justificativa: "Objetivos BNCC (Segurança e Ética): A proteção de dados e a segurança cibernética são essenciais para a autonomia digital no Ensino Médio."
    },
    {
        id: 4,
        pergunta: "O que constitui a sua 'Pegada Digital' (Digital Footprint) na internet?",
        opcoes: [
            "O rastro de dados que você deixa ao navegar, curtir, postar e pesquisar online.",
            "Apenas as fotos que você decide apagar da sua galeria.",
            "A velocidade de download do seu provedor de internet banda larga.",
            "O número de vírus que o seu computador consegue bloquear sozinho."
        ],
        correta: 0,
        justificativa: "Objetivos BNCC (Cultura Digital): Tudo o que fazemos na internet gera dados que moldam nossa identidade digital e reputação online."
    },
    {
        id: 5,
        pergunta: "Ao utilizar uma inteligência artificial generativa para criar um texto escolar, qual o procedimento ético correto?",
        opcoes: [
            "Copiar o resultado integralmente e assinar como trabalho próprio.",
            "Ignorar a IA, pois softwares nunca devem ser usados na escola.",
            "Validar as informações geradas pela IA e citar o uso da ferramenta nas referências.",
            "Usar a ferramenta apenas para invadir o sistema da escola."
        ],
        correta: 2,
        justificativa: "Objetivos BNCC (Pensamento Computacional/Ética): Ferramentas digitais devem ser usadas como mediadoras de conhecimento, com honestidade acadêmica."
    }
];

let rodadaAtual = 0;
let pontuacao = 0;
const totalCasas = questoes.length + 1; // +1 para a linha de chegada

// Elementos do DOM
const tabuleiroDiv = document.getElementById('tabuleiro');
const tituloQuestao = document.getElementById('titulo-questao');
const opcoesResposta = document.getElementById('opcoes-resposta');
const btnProximo = document.getElementById('btn-proximo');
const feedbackDiv = document.getElementById('feedback');
const elementoPontuacao = document.getElementById('pontuacao');
const elementoPosicao = document.getElementById('posicao-atual');

// Inicializa o tabuleiro visual
function criarTabuleiro() {
    tabuleiroDiv.innerHTML = '';
    for (let i = 1; i <= totalCasas; i++) {
        const casa = document.createElement('div');
        casa.classList.add('casa');
        casa.innerText = i === totalCasas ? 'Fim' : i;
        casa.id = `casa-${i}`;
        if (i === 1) casa.classList.add('ativa');
        tabuleiroDiv.appendChild(casa);
    }
}

// Carrega a questão na tela
function carregarQuestao() {
    feedbackDiv.classList.add('escondido');
    btnProximo.classList.add('escondido');
    opcoesResposta.innerHTML = '';

    if (rodadaAtual < questoes.length) {
        const q = questoes[rodadaAtual];
        tituloQuestao.innerText = `Desafio ${rodadaAtual + 1}: ${q.pergunta}`;

        q.opcoes.forEach((opcao, index) => {
            const botao = document.createElement('button');
            botao.classList.add('btn-opcao');
            botao.innerText = opcao;
            botao.addEventListener('click', () => verificarResposta(index, botao));
            opcoesResposta.appendChild(botao);
        });
    } else {
        // Fim de jogo
        tituloQuestao.innerText = "🎉 Parabéns! Você completou a Trilha da Cidadania Digital!";
        opcoesResposta.innerHTML = `<p>Você demonstrou grande capacidade de análise crítica e ética digital.</p>`;
        feedbackDiv.innerHTML = `<strong>Pontuação Final: ${pontuacao} pontos.</strong>`;
        feedbackDiv.className = "feedback-sucesso";
        feedbackDiv.classList.remove('escondido');
        atualizarTabuleiro(totalCasas);
    }
}

// Verifica se o estudante acertou
function verificarResposta(indiceSelecionado, botaoClicado) {
    const q = questoes[rodadaAtual];
    const botoes = opcoesResposta.querySelectorAll('.btn-opcao');
    
    // Desabilitar outros botões após a escolha
    botoes.forEach(b => b.disabled = true);

    if (indiceSelecionado === q.correta) {
        botaoClicado.classList.add('correta');
        feedbackDiv.innerHTML = `<strong>Correto!</strong> <br> ${q.justificativa}`;
        feedbackDiv.className = "feedback-sucesso";
        pontuacao += 20;
        elementoPontuacao.innerText = pontuacao;
    } else {
        botaoClicado.classList.add('errada');
        botoes[q.correta].classList.add('correta'); // mostra a certa
        feedbackDiv.innerHTML = `<strong>Ops, não foi dessa vez.</strong> <br> ${q.justificativa}`;
        feedbackDiv.className = "feedback-erro";
    }

    feedbackDiv.classList.remove('escondido');
    btnProximo.classList.remove('escondido');
}

// Atualiza graficamente as casas do tabuleiro
function atualizarTabuleiro(novaPosicao) {
    elementoPosicao.innerText = novaPosicao;
    for (let i = 1; i <= totalCasas; i++) {
        const casa = document.getElementById(`casa-${i}`);
        if (i < novaPosicao) {
            casa.className = 'casa concluida';
        } else if (i === novaPosicao) {
            casa.className = 'casa ativa';
        } else {
            casa.className = 'casa';
        }
    }
}

// Evento do botão próximo/avançar
btnProximo.addEventListener('click', () => {
    rodadaAtual++;
    atualizarTabuleiro(rodadaAtual + 1);
    carregarQuestao();
});

// Inicialização do Jogo ao carregar a página
window.onload = () => {
    criarTabuleiro();
    carregarQuestao();
};
