const prompt = require("prompt-sync")()
let idade = prompt("Digite sua idade: ");

function verificaMaioridade(idade) {
    idade >= 18 ? console.log("Você é maior de idade!") : console.log("Você é menor de idade!");
}
verificaMaioridade(idade);

const saudacao = () => console.log("Olá!");
saudacao();

let listaDeNumeros = [];
let soma = 0;
for (i = 0; i < 3; i++) {
    listaDeNumeros.push(prompt("Digite 3 números para formar o Array: "));
    soma = Number(listaDeNumeros[i]) + soma;
}
console.log(listaDeNumeros);
console.log("O total da soma é: ", soma);

// criar um botão que mude a cor de um texto ao ser clicado 

// obs: código para HTML que pode ser adaptado para JS também 

// <button id="botao">Clique aqui</button>
// <p id="mensagem">Mensagem do dia</p>
// <script>
//    let botao = document.getElementById("botao");
//    let mensagem = document.getElementById("mensagem")
//            
//    botao.addEventListener("click", function() {
//    mensagem.style.color = "red";
//    mensagem.style.fontSize = "20px";
//    });
//
// </script>

// criar um botão que altera a cor do fundo

//         <button id="botao">Mude aqui a cor do fundo para branco</button>
// <script>
// let botao = document.getElementById("botao");
// 
// botao.addEventListener("click", function() {
//     document.body.style.backgroundColor = "white";
// })
// </script>

console.log("Início");

setTimeout(() => {
  console.log("Isso aparece depois de 2 segundos");
}, 2000);

console.log("Fim");
