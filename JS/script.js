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

// Função para buscar um Pokémon específico
async function fetchPokemonPorNome(pokemonName) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;
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

// Função para exibir os detalhes do Pokémon pesquisado
function displayPokemonDetalhes(pokemon) {
    const detalhesSecao = document.getElementById('pokemonDetalhes');
    detalhesSecao.innerHTML = `
        <h2>${pokemon.name.toUpperCase()}</h2>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <p><strong>Tipos:</strong> ${pokemon.types.map(type => type.type.name).join(', ')}</p>
        <p><strong>Habilidades:</strong> ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
        <p><strong>HP:</strong> ${pokemon.stats.find(stat => stat.stat.name === 'hp').base_stat}</p>
        <p><strong>Ataque:</strong> ${pokemon.stats.find(stat => stat.stat.name === 'attack').base_stat}</p>
        <p><strong>Defesa:</strong> ${pokemon.stats.find(stat => stat.stat.name === 'defense').base_stat}</p>
    `;
}

// Função para configurar o evento do botão de busca
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o comportamento padrão de envio do formulário
    const pokemonName = document.getElementById('campo-busca').value.trim();
    if (pokemonName) {
        fetchPokemonPorNome(pokemonName); // Busca o Pokémon pelo nome
    } else {
        alert('Por favor, digite um nome de Pokémon!');
    }
});

// Chama a função para buscar e exibir a lista de Pokémon ao carregar a página
window.onload = fetchPokemonLista;
