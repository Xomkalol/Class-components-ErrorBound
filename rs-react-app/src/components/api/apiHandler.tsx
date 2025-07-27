import searchPokemon from '../header/headerHandler';

export const apiLink: string = 'https://pokeapi.co/api/v2/';
export interface Pokemon {
  name: string;
  url: string;
}

export default async function getFirstLoad(): Promise<Pokemon[]> {
  try {
    const savedValue = localStorage.getItem('searchValue');
    if (savedValue) {
      const pokemonData = await searchPokemon(savedValue);
      return [
        {
          name: pokemonData.name,
          url: pokemonData.url || `${apiLink}pokemon/${pokemonData.id}/`,
        },
      ];
    } else {
      const response = await fetch(`${apiLink}/pokemon`);
      const data = await response.json();
      return data.results;
    }
  } catch (err) {
    console.error('Ошибка:', err);
    return [];
  }
}
