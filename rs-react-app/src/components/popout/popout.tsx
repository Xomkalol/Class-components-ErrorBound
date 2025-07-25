import { useEffect, useState } from 'react';
import './popout.css';

interface PopoutProps {
  pokemon: string;
  onClose: () => void;
}
interface PokemonSelectedData {
  name: string;
  abilities: string[];
  forms: string[];
  species: string;
  imageUrl: string;
}

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

export default function Popout({ pokemon, onClose }: PopoutProps) {
  const [pokemonInfo, setPokemonInfo] = useState<PokemonSelectedData>({
    name: '',
    abilities: [],
    forms: [],
    species: '',
    imageUrl: '',
  });

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(pokemon);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Данные покемона:', data);
        const selectedData: PokemonSelectedData = {
          name: data.name,
          abilities: data.abilities.map(
            (ability: PokemonAbility) => ability.ability.name
          ),
          forms: data.forms.map((form: PokemonForm) => form.name),
          species: data.species.name,
          imageUrl: data.sprites.front_default,
        };
        setPokemonInfo(selectedData);
      } catch (err) {
        console.error('Ошибка при загрузке:', err);
      }
    };

    fetchPokemonData();
  }, [pokemon]);

  return (
    <div className="layout" onClick={onClose} data-testid="popout-overlay">
      <div
        className="pop__container"
        onClick={(e) => e.stopPropagation()}
        data-testid="popout-content"
      >
        <div className="pop__main">
          <h2 className="pop__header" data-testid="pokemon-name">
            {pokemonInfo.name}
          </h2>
          {pokemonInfo.imageUrl && (
            <img
              src={pokemonInfo.imageUrl}
              alt={pokemonInfo.name}
              data-testid="pokemon-image"
            />
          )}
          <ul className="pop__ul">
            <li className="pop__li" data-testid="pokemon-abilities">
              Abilities: {pokemonInfo.abilities}
            </li>
            <li className="pop__li" data-testid="pokemon-forms">
              Forms: {pokemonInfo.forms.join()}
            </li>
            <li className="pop__li" data-testid="pokemon-species">
              Species: {pokemonInfo.species}
            </li>
          </ul>
        </div>
        <button onClick={onClose} data-testid="close-button">
          Закрыть
        </button>
      </div>
    </div>
  );
}
