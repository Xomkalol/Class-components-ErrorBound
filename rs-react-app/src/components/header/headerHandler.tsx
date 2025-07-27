import { apiLink } from '../api/apiHandler';

export default async function searchPokemon(value: string) {
  try {
    const response = await fetch(
      `${apiLink}/pokemon/${value.toLowerCase().trim()}/`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Ошибка:', err);
    return null;
  }
}
