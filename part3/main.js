$(function() {
  let baseURL = "https://pokeapi.co/api/v2";

  async function fetchData(url) {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    return response.json();
  }

  async function generateRandomPokemon() {
    const pokemonContainer = document.getElementById('pokemon-container');
    pokemonContainer.innerHTML = ''; // Clear previous content

    try {
      // Fetch three random Pokemon
      const pokemonDetails = await Promise.all(Array.from({ length: 3 }, (_, index) => getRandomPokemonData()));
      
      pokemonDetails.forEach(details => {
        const pokemonDiv = document.createElement('div');
        pokemonDiv.innerHTML = `
          <h2>${details.name}</h2>
          <img src="${details.imageUrl}" alt="${details.name}">
          <p>${details.description}</p>
        `;
        pokemonContainer.appendChild(pokemonDiv);
      });
    } catch (error) {
      console.error('Error fetching Pokemon details:', error);
    }
  }

  async function getRandomPokemonData() {
    const pokemonList = await getPokemonList();
    const randomPokemon = getRandomPokemon(pokemonList);
    const details = await fetchData(randomPokemon[0].url);

    const speciesUrl = details.species.url;
    const species = await fetchData(speciesUrl);

    const englishDescription = species.flavor_text_entries.find(entry => entry.language.name === 'en');

    const imageUrl = details.sprites.front_default;
    const description = englishDescription ? englishDescription.flavor_text : 'No English description available';

    return {
      name: randomPokemon[0].name,
      imageUrl: imageUrl,
      description: description,
    };
  }

  async function getPokemonList() {
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=1000';
    const data = await fetchData(apiUrl);
    return data.results.map(pokemon => ({
      name: pokemon.name,
      url: pokemon.url,
    }));
  }
});