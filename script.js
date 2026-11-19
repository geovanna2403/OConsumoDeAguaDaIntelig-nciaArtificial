window.addEventListener("load", function() {
    if (performance.getEntriesByType("navigation")[0].type === "reload") {
        alert("Bem vindo ao nosso site!");
    }

});


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
        link: "tema.html#parte5"
    },
    {
        titulo: "Conclusão",
        link: "tema.html#parte6"
    }
];

document.addEventListener("DOMContentLoaded", function() {

    const lista = document.getElementById("lista-assuntos");
    if (!lista) return;

    function gerarCardsAssuntos() {
        assuntos.forEach(function(assunto) {
            lista.innerHTML += `
                <article class="card">
                    <h3>${assunto.titulo}</h3>
                    <a href="${assunto.link}" class="botao-saiba-mais">
                        Saiba mais
                    </a>
                </article>
            `;
        });
    }

    gerarCardsAssuntos();

});


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


// BUSCA DE ASSUNTOS NA PÁGINA TEMA

document.addEventListener("DOMContentLoaded", function() {

    const pesquisa = document.getElementById("pesquisaTema");
    const resultados = document.getElementById("resultadosBusca");

    if (!pesquisa || !resultados) return;

    // Cria um array com os títulos das seções
   const assuntosTema = Array.from(document.querySelectorAll("main h2, #referencias h2"))
        .map(function(titulo) {
            return {
                nome: titulo.textContent.trim(),
                secao: titulo.closest("section")
            };
        })
        .filter(function(assunto) {
            return assunto.secao !== null;
        });

    // Pesquisa os assuntos
    pesquisa.addEventListener("input", function() {

        const texto = pesquisa.value.toLowerCase().trim();

        const encontrados = assuntosTema.filter(function(assunto) {
            return assunto.nome.toLowerCase().includes(texto);
        });

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



/* INTERAÇÃO: MUDAR A COR DOS TÍTULOS */

document.addEventListener("DOMContentLoaded", function() {

    const titulos = document.querySelectorAll("main h2 ");

    titulos.forEach(function(titulo) {

        titulo.addEventListener("mouseenter", function() {
            titulo.style.color = "#1E6FB8";
        });

        titulo.addEventListener("mouseleave", function() {
            titulo.style.color = "";
        });

    });

});



/* QUIZ INTERATIVO DE GEOGRAFIA */

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

    // MOSTRAR PERGUNTA
    function mostrarPergunta() {

        respondeu = false;

        const pergunta = perguntas[perguntaAtual];

        perguntaHTML.textContent = pergunta.pergunta;
        resultadoHTML.textContent = "";
        alternativasHTML.innerHTML = "";

        botaoProximo.hidden = true;

        pergunta.alternativas.forEach(function(alternativa, indice) {

            const botao = document.createElement("button");

            botao.textContent = alternativa;
            botao.type = "button";
            botao.classList.add("alternativa-quiz");

            botao.addEventListener("click", function() {
                verificarResposta(indice);
            });

            alternativasHTML.appendChild(botao);

        });

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


