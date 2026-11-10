const botoesAndares = document.querySelectorAll(".botao-andar");
const mensagemElevador = document.querySelector(".mensagem-elevador");

botoesAndares.forEach(function(botao) {
	botao.addEventListener("click", function() {
		botoesAndares.forEach(function(outroBotao) {
			outroBotao.classList.remove("selecionado");
			outroBotao.setAttribute("aria-pressed", "false");
		});

		botao.classList.add("selecionado");
		botao.setAttribute("aria-pressed", "true");

		mensagemElevador.textContent =
			"Andar selecionado: " + botao.dataset.andar;
	});
});

/* FUNDO DIGITAL COM NÚMEROS CAINDO */

const fundoDigital = document.getElementById("fundo-digital");
const contexto = fundoDigital.getContext("2d");

let larguraTela = window.innerWidth;
let alturaTela = window.innerHeight;
let tamanhoColuna = 18;
let quantidadeColunas;
let posicoes;

const caracteres = "01アイウエオカキクケコ0123456789";

function ajustarFundo() {
    const escala = Math.min(window.devicePixelRatio || 1, 2);

    larguraTela = window.innerWidth;
    alturaTela = window.innerHeight;

    fundoDigital.width = larguraTela * escala;
    fundoDigital.height = alturaTela * escala;

    fundoDigital.style.width = larguraTela + "px";
    fundoDigital.style.height = alturaTela + "px";

    contexto.setTransform(escala, 0, 0, escala, 0, 0);

    quantidadeColunas = Math.ceil(larguraTela / tamanhoColuna);

    posicoes = Array.from(
        { length: quantidadeColunas },
        () => Math.random() * -alturaTela / tamanhoColuna
    );
}

function desenharNumeros() {
    contexto.fillStyle = "rgba(7, 7, 19, 0.12)";
    contexto.fillRect(0, 0, larguraTela, alturaTela);

    contexto.font = tamanhoColuna + "px monospace";

    for (let i = 0; i < posicoes.length; i++) {
        const caractere =
            caracteres[Math.floor(Math.random() * caracteres.length)];

        const x = i * tamanhoColuna;
        const y = posicoes[i] * tamanhoColuna;

        contexto.fillStyle =
            Math.random() > 0.94 ? "#b9f2ff" : "#a855f7";

        contexto.fillText(caractere, x, y);

        if (y > alturaTela && Math.random() > 0.975) {
            posicoes[i] = 0;
        } else {
            posicoes[i]++;
        }
    }
}

ajustarFundo();
window.addEventListener("resize", ajustarFundo);

let animacaoDigital;

function animarFundo() {
    desenharNumeros();
    animacaoDigital = requestAnimationFrame(animarFundo);
}

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    animarFundo();
} else {
    contexto.clearRect(0, 0, larguraTela, alturaTela);
}
