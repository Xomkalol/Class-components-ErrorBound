import type { savedPokemonState } from '../store/counter';

export default function createCSVFile(pokeMonState: savedPokemonState) {
  const content = pokeMonState.urls.join();
  const blob = new Blob([content], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const filename = 'selected pokemons';
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
