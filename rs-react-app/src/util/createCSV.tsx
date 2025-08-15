interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

interface PokemonForm {
  name: string;
  url: string;
}

interface PokemonData {
  name: string;
  abilities: PokemonAbility[];
  forms: PokemonForm[];
  species: {
    name: string;
    url: string;
  };
  sprites: {
    front_default: string;
  };
}

type pokemonDataArray = {
  name: string;
  abilities: string;
  forms: string;
  species: string;
};

export default async function createCSVFile(data: PokemonData[]) {
  const pokemonDataArray: pokemonDataArray[] = [];
  data.map((pokemon) => {
    const pokemonData = {
      name: pokemon.name,
      abilities: pokemon.abilities.map((a) => a.ability.name).join(', '),
      forms: pokemon.forms.map((f) => f.name).join(', '),
      species: pokemon.species.name,
    };
    pokemonDataArray.push(pokemonData);
  });
  console.log(pokemonDataArray);
  const csvContent = formatToCSV(pokemonDataArray);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'selected-pokemons.csv';
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export const getPokemonData = async (pokemonUrl: string) => {
  try {
    const response = await fetch(pokemonUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }
    const data: PokemonData = await response.json();
    return data;
  } catch (error) {
    console.error('Pokemon fetch error:', error);
  }
};

function formatToCSV(
  data: Array<{
    name: string;
    abilities: string;
    forms: string;
    species: string;
  }>
) {
  const headers = Object.keys(data[0]).join(',');
  const rows = data.map((obj) => Object.values(obj).join(','));
  const csvString = [headers, ...rows].join('\n');
  return csvString;
}
