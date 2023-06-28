const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const form = document.querySelector('.form');
const inputSearch = document.querySelector('.input__search');
const previousPokemon = document.querySelector('.bt-prev');
const nextPokemon = document.querySelector('.bt-next');
let idPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIresponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon.toString().toLowerCase()}`
  );

  if (APIresponse.status === 200) {
    const data = await APIresponse.json();
    return data;
  }
};

const renderPokemon = async (pokemon) => {
  pokemonImage.style.display = 'none';
  pokemonNumber.innerHTML = '';
  pokemonName.innerHTML = 'Loading...';

  const data = await fetchPokemon(pokemon);

  if (data) {
    idPokemon = data.id;
    pokemonImage.style.display = 'block';

    pokemonNumber.innerHTML = idPokemon.toString().padStart(3, '0') + ' - ';
    pokemonName.innerHTML = data.name;
    pokemonImage.src =
      data['sprites']['versions']['generation-v']['black-white']['animated'][
        'front_default'
      ];

    inputSearch.value = '';
  } else {
    pokemonName.innerHTML = 'Not Found';
  }
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(inputSearch.value);
});

previousPokemon.addEventListener('click', () => {
  if (idPokemon > 1) {
    renderPokemon(idPokemon - 1);
  }
});

nextPokemon.addEventListener('click', () => {
  renderPokemon(idPokemon + 1);
});

renderPokemon(idPokemon);
