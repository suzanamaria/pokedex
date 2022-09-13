const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_img');

const form = document.querySelector('.form');
const input = document.querySelector('.pokemon_search');

const buttonAnterior = document.querySelector('.btn-ant');
const buttonSeguinte = document.querySelector('.btn-seg');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(APIResponse.status == 200){
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Procurando...'
    pokemonNumber.innerHTML = '...'
    const data = await fetchPokemon(pokemon);
    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id;
    } else{
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Não encontrado';
        pokemonNumber.innerHTML = ':(';
    }
}

form.addEventListener('submit', (event) => {

    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonAnterior.addEventListener('click', () => {

    if (searchPokemon >1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);        
    }

});

buttonSeguinte.addEventListener('click', () => {

    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);