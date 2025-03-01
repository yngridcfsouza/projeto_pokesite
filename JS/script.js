// Configurando o clique de busca 
document.addEventListener("DOMContentLoaded", function(){
 
    fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })

        // como trazer os dados e jogar em sequência na estrutura html?

        //possibilidade: lista

        .catch(error => {
            console.error("Erro ao consumir a API: ", error); // Tratamento para possível exceção
    })
})
