

// Para o usar o Bootstrap no site, pesquisei sobre
// e aprendi a utilizar o recurso de menu responsivo.
// Utilizei o Bootstrap para adaptar o menu a diferentes tamanhos de tela,
// deixando em botão quando estiver em celulares.
// No site de Português, esse recurso foi desenvolvido utilizando JS.

// ==========================================
// 1. MENSAGEM AO RECARREGAR A PÁGINA
// ==========================================

window.addEventListener("load", function() {
    const navegacao = performance.getEntriesByType("navigation")[0];

    if (navegacao && navegacao.type === "reload") {
        alert("Bem-vindo ao nosso site!");
    }
});


// ==========================================
// 2. ARRAY DE OBJETOS - ASSUNTOS
// ==========================================

const assuntos = [
    {
        titulo: "Introdução",
        link: "tema.html#parte1"
    },
    {
        titulo: "Como a inteligência artificial consome água?",
        link: "tema.html#parte2"
    },
    {
        titulo: "A desigualdade no acesso à água e o consumo dos data centers",
        link: "tema.html#parte3"
    },
    {
        titulo: "Como reduzir o consumo de água da inteligência artificial",
        link: "tema.html#parte4"
    },
    {
        titulo: "O futuro da água",
        link: "tema.html#parte6"
    },
    {
        titulo: "Conclusão",
        link: "tema.html#parte7"
    }
];


// ==========================================
// 3. FUNÇÕES DE FORMATAÇÃO
// ==========================================

function formatarTitulo(titulo) {
    return titulo.trim();
}




// ==========================================
// 4. GERAR CARTÕES DE ASSUNTOS
// ==========================================

document.addEventListener("DOMContentLoaded", function() {

    const lista = document.getElementById("lista-assuntos");

    if (lista) {

        function gerarCardsAssuntos() {

            for (let i = 0; i < assuntos.length; i++) {

                const assunto = assuntos[i];

                lista.innerHTML += `
                    <article class="card">
                        <h3>${formatarTitulo(assunto.titulo)}</h3>
                        <a href="${assunto.link}" class="botao-saiba-mais">
                            Saiba mais
                        </a>
                    </article>
                `;
            }
        }

        gerarCardsAssuntos();
    }

});


// ==========================================
// 5. INTERAÇÃO - BOTÃO DE CURIOSIDADE
// ==========================================

document.addEventListener("DOMContentLoaded", function() {

    const botaoCuriosidade = document.getElementById("botaoCuriosidade");
    const mensagemCuriosidade = document.getElementById("mensagemCuriosidade");

    if (botaoCuriosidade && mensagemCuriosidade) {

        botaoCuriosidade.addEventListener("click", function() {

            mensagemCuriosidade.hidden = !mensagemCuriosidade.hidden;

            if (mensagemCuriosidade.hidden) {
                botaoCuriosidade.textContent = "Você sabia?";
            } else {
                botaoCuriosidade.textContent = "Fechar curiosidade";
            }

        });
    }

});


// ==========================================
// 6. BUSCA DE ASSUNTOS NA PÁGINA TEMA
// ==========================================

document.addEventListener("DOMContentLoaded", function() {

    const pesquisa = document.getElementById("pesquisaTema");
    const resultados = document.getElementById("resultadosBusca");

    if (!pesquisa || !resultados) return;

    const assuntosTema = Array.from(
        document.querySelectorAll("main h2, #referencias h2")
    )
    .map(function(titulo) {
        return {
            nome: titulo.textContent.trim(),
            secao: titulo.closest("section")
        };
    })
    .filter(function(assunto) {
        return assunto.secao !== null;
    });

    pesquisa.addEventListener("input", function() {

        const texto = pesquisa.value.toLowerCase().trim();

        const encontrados = assuntosTema.filter((assunto) => {
            return assunto.nome.toLowerCase().includes(texto);
        });

        const primeiroEncontrado = assuntosTema.find((assunto) => {
            return assunto.nome.toLowerCase().includes(texto);
        });
        if (primeiroEncontrado) {
    resultados.dataset.primeiroResultado = primeiroEncontrado.nome;
} else {
    delete resultados.dataset.primeiroResultado;
}

        resultados.innerHTML = "";

        if (texto === "") return;

        encontrados.forEach(function(assunto) {

            const botao = document.createElement("button");

            botao.textContent = assunto.nome;
            botao.type = "button";

            botao.addEventListener("click", function() {
                assunto.secao.scrollIntoView({
                    behavior: "smooth"
                });
            });

            resultados.appendChild(botao);

        });

        if (encontrados.length === 0) {
            resultados.textContent = "Nenhum assunto encontrado.";
        }

    });

});


// ==========================================
// 7. INTERAÇÃO - MUDAR A COR DOS TÍTULOS
// ==========================================

document.addEventListener("DOMContentLoaded", function() {

    const titulos = document.querySelectorAll("main h2");

    titulos.forEach(function(titulo) {

        titulo.addEventListener("mouseenter", function() {
            titulo.style.color = "#1E6FB8";
        });

        titulo.addEventListener("mouseleave", function() {
            titulo.style.color = "";
        });

    });

});


// ==========================================
// 8. QUIZ INTERATIVO DE GEOGRAFIA
// ==========================================

document.addEventListener("DOMContentLoaded", function() {

    const perguntaHTML = document.getElementById("perguntaQuiz");
    const alternativasHTML = document.getElementById("alternativasQuiz");
    const resultadoHTML = document.getElementById("resultadoQuiz");
    const botaoProximo = document.getElementById("proximaPergunta");

    if (!perguntaHTML || !alternativasHTML || !resultadoHTML || !botaoProximo) return;

    // ARRAY DE OBJETOS COM AS PERGUNTAS

    const perguntas = [
        {
            pergunta: "1. Por que os data centers precisam de sistemas de refrigeração?",
            alternativas: [
                "Para diminuir o calor produzido pelos equipamentos.",
                "Para aumentar a velocidade da internet.",
                "Para armazenar água."
            ],
            correta: 0
        },
        {
            pergunta: "2. De onde pode vir a água utilizada na refrigeração dos data centers?",
            alternativas: [
                "Da rede de abastecimento, de reservatórios ou de água de reúso.",
                "Apenas da água do mar.",
                "Somente da água da chuva."
            ],
            correta: 0
        },
        {
            pergunta: "3. Segundo os dados apresentados no site, quantas pessoas não tinham acesso à água potável gerenciada com segurança em 2024?",
            alternativas: [
                "500 milhões.",
                "1 bilhão.",
                "2,1 bilhões."
            ],
            correta: 2
        },
        {
            pergunta: "4. Qual problema ambiental pode ocorrer quando há retirada excessiva de água?",
            alternativas: [
                "Redução da disponibilidade de água para a população e os ecossistemas.",
                "Aumento das reservas naturais.",
                "Diminuição da temperatura do planeta."
            ],
            correta: 0
        },
        {
            pergunta: "5. Qual alternativa representa uma medida para diminuir o consumo de água nos data centers?",
            alternativas: [
                "Aumentar o desperdício de água.",
                "Reutilizar água nos sistemas de refrigeração.",
                "Construir todos os centros de dados em regiões secas."
            ],
            correta: 1
        }
    ];

    let perguntaAtual = 0;
    let pontuacao = 0;
    let respondeu = false;
    let finalizado = false;
// VALIDAR AS PERGUNTAS DO QUIZ

let indice = 0;

while (indice < perguntas.length) {

    if (perguntas[indice].alternativas.length === 0) {
        console.error("Pergunta sem alternativas!");
    }

    indice++;
}

    // MOSTRAR PERGUNTA

    function mostrarPergunta() {

        respondeu = false;

        const pergunta = perguntas[perguntaAtual];

        perguntaHTML.textContent = pergunta.pergunta;
        resultadoHTML.textContent = "";
        alternativasHTML.innerHTML = "";

        botaoProximo.hidden = true;

        for (const [indice, alternativa] of pergunta.alternativas.entries()) {

            const botao = document.createElement("button");

            botao.textContent = alternativa;
            botao.type = "button";
            botao.classList.add("alternativa-quiz");

            botao.addEventListener("click", function() {
                verificarResposta(indice);
            });

            alternativasHTML.appendChild(botao);
        }

    }


    // VERIFICAR RESPOSTA

    function verificarResposta(indice) {

        if (respondeu) return;

        respondeu = true;

        const pergunta = perguntas[perguntaAtual];

        if (indice === pergunta.correta) {

            pontuacao++;

            resultadoHTML.textContent = "Parabéns! Você acertou!";

        } else {

            resultadoHTML.textContent =
                "Não foi dessa vez! A resposta correta era: " +
                pergunta.alternativas[pergunta.correta];

        }

        botaoProximo.hidden = false;

        if (perguntaAtual === perguntas.length - 1) {
            botaoProximo.textContent = "Ver resultado";
        } else {
            botaoProximo.textContent = "Próxima pergunta";
        }

    }


    // MOSTRAR RESULTADO FINAL

    function mostrarResultado() {

        finalizado = true;

        perguntaHTML.textContent = "Quiz finalizado!";

        alternativasHTML.innerHTML = "";

        resultadoHTML.textContent =
            "Você acertou " + pontuacao + " de " +
            perguntas.length + " perguntas!";

        botaoProximo.textContent = "Refazer quiz";
        botaoProximo.hidden = false;

    }


    // AVANÇAR OU RECOMEÇAR

    botaoProximo.addEventListener("click", function() {

        if (finalizado) {

            perguntaAtual = 0;
            pontuacao = 0;
            finalizado = false;

            mostrarPergunta();

        } else if (respondeu) {

            perguntaAtual++;

            if (perguntaAtual < perguntas.length) {
                mostrarPergunta();
            } else {
                mostrarResultado();
            }

        }

    });


    // INICIAR QUIZ

    mostrarPergunta();

});


// FORMULÁRIO DE CONTATO
document.addEventListener("DOMContentLoaded", function() {

    const formulario = document.querySelector(".formulario form");

    if (formulario) {

        formulario.addEventListener("submit", function(event) {

            event.preventDefault();

            const dados = new FormData(formulario);

            const nome = String(dados.get("nome")).trim();
            const email = String(dados.get("email")).trim();
            const telefone = String(dados.get("telefone")).trim();
            const estado = String(dados.get("estado")).trim();
            const assunto = String(dados.get("assunto")).trim();
            const mensagem = String(dados.get("mensagem")).trim();

            if (!nome || !email || !telefone || !estado || !assunto || !mensagem) {
                alert("Preencha todos os campos antes de continuar!");
                return;
            }

            alert(`Olá, ${nome}! Sua mensagem foi registrada nesta demonstração. Obrigado pelo contato!`);

            formulario.reset();

        });

    }

});

