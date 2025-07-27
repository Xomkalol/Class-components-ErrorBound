import { useOutletContext } from 'react-router';

interface PokemonOutletContext {
  pokemonUrl: string;
}

export default function PokemonDetails() {
  const { pokemonUrl } = useOutletContext<PokemonOutletContext>();
  return `<div>${pokemonUrl} Hi pokemonUrl</div>`;
}
