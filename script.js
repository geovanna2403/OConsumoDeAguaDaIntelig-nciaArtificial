/*window.addEventListener("load", function() {
    if (performance.getEntriesByType("navigation")[0].type === "reload") {
        alert("Bem vindo ao nosso site!");
    }

});*/


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
        titulo: "Consequências para o meio ambiente",
        link: "tema.html#parte3"
    },
    {
        titulo: "Como reduzir o consumo de água da inteligência artificial",
        link: "tema.html#parte4"
    },
    {
        titulo: "O futuro da inteligência artificial e da água",
        link: "tema.html#parte5"
    },
    {
        titulo: "Conclusão",
        link: "tema.html#parte6"
    }
];

document.addEventListener("DOMContentLoaded", function() {

    const lista = document.getElementById("lista-assuntos");

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