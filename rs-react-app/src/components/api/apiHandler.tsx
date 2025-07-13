const apiLink: string = 'https://pokeapi.co/api/v2';
export interface Pokemon {
  name: string;
  url: string;
}

export default async function getFirstLoad(): Promise<Pokemon[]> {
  try {
    const response = await fetch(`${apiLink}/pokemon`);
    const data = await response.json();
    console.log('Данные от API:', data.results);
    return data.results;
  } catch (err) {
    console.error('Ошибка:', err);
    return [];
  }
}
