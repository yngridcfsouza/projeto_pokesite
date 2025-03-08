// Função para buscar a lista de 20 Pokémon
async function fetchPokemonLista() {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=20'; 
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayPokemonLista(data.results);
    } catch (error) {
        console.error("Erro ao buscar a lista de Pokémon:", error);
    }
}

// Função para exibir a lista de Pokémon na página
function displayPokemonLista(pokemonLista) {
    const listaElemento = document.getElementById('pokemon-lista');
    listaElemento.innerHTML = '';

    pokemonLista.forEach(pokemon => {
        const listaItem = document.createElement('li');
        listaItem.textContent = pokemon.name; // Exibe apenas o nome do Pokémon
        listaElemento.appendChild(listaItem);
        listaItem.addEventListener("click", function() {
            fetchPokemonPorNome(pokemon.name);
        });
    });
}

// Função para buscar um Pokémon específico
async function fetchPokemonPorNome(pokemonNome) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonNome.toLowerCase()}`;
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayPokemonDetalhes(data);
        } else {
            alert('Pokémon não encontrado!');
        }
    } catch (error) {
        console.error("Erro ao buscar Pokémon:", error);
    }
}

// Função para exibir os detalhes do Pokmon pesquisado
function displayPokemonDetalhes(pokemon) {
    const detalhesSecao = document.getElementById('pokemonDetalhes');
    detalhesSecao.innerHTML = `
        <h2>${pokemon.name.toUpperCase()}</h2>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <p>Tipos: ${pokemon.types.map(type => type.type.name).join(', ')}</p>
        <p>Habilidades: ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
        <p>HP: ${pokemon.stats.find(stat => stat.stat.name === 'hp').base_stat}</p>
        <p>Ataque: ${pokemon.stats.find(stat => stat.stat.name === 'attack').base_stat}</p>
        <p>Defesa: ${pokemon.stats.find(stat => stat.stat.name === 'defense').base_stat}</p>
        <button id="adicionarFavorito">Favoritar</button>
    `;

    // Adiciona evento de clique ao botão Favoritar após a criação do botão
    document.getElementById("adicionarFavorito").addEventListener("click", () => {
        adicionarFavorito(pokemon.name);
    });
}

// Função para configurar o evento do botão de busca
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita recarregar a página e perder os dados digitaods
    const pokemonNome = document.getElementById('campo-busca').value.trim();
    if (pokemonNome) {
        fetchPokemonPorNome(pokemonNome); // Busca o Pokémon pelo nome
    } else {
        alert('Por favor, digite um nome de Pokémon!');
    }
});

// Chama a função para buscar e exibir a lista de Pokémon ao carregar a página
window.addEventListener("DOMContentLoaded", fetchPokemonLista);

// Recupera a lista de favoritos do localStorage
let listaFavoritos = JSON.parse(localStorage.getItem("listaFavoritos")) || [];

// Adicionar ou remover Pokémon da lista de favoritos
function adicionarFavorito(pokemonNome) {
    const index = listaFavoritos.indexOf(pokemonNome.toLowerCase());

    if (index !== -1) {
        listaFavoritos.splice(index, 1); // Remove da lista
    } else {
        listaFavoritos.push(pokemonNome.toLowerCase()); // Adiciona à lista
    }

    localStorage.setItem("listaFavoritos", JSON.stringify(listaFavoritos));
    displayFavoritos();
}

// Exibir a lista de favoritos
function displayFavoritos() {
    const listaElementoFav = document.getElementById("lista-favoritos");
    listaElementoFav.innerHTML = ""; // Limpa a lista

    listaFavoritos.forEach(nome => {
        const listaItemFav = document.createElement("li");
        listaItemFav.textContent = nome;

        // Criando um link para exibir detalhes do favorito
        const link = document.createElement("a");
        link.href = "#";
        link.textContent = "Detalhes";
        link.onclick = (event) => {
            event.preventDefault(); // Evita recarregar a página
            fetchPokemonPorNome(nome); // Chama a função para exibir detalhes
        };

        const botaoRemover = document.createElement("button");
        botaoRemover.textContent = "Remover";
        botaoRemover.onclick = () => adicionarFavorito(nome);

        listaItemFav.appendChild(link);
        listaItemFav.appendChild(botaoRemover);
        listaElementoFav.appendChild(listaItemFav);
    });
}

// Carregar favoritos ao iniciar a página
window.onload = displayFavoritos;