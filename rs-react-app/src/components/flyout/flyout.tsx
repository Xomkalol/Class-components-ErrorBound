import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { clearState } from '../../store/counter';
import CreateCSVFile from '../../util/createCSV';
import './flyout.css';
import { themeContext } from '../../util/context';
import { useContext } from 'react';
import { useGetListOfthingsQuery } from '../api/createApi';

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

export interface Pokemon {
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

export default function FlyOut() {
  const pokeMonState = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch();
  const { theme } = useContext(themeContext);
  const pokemonsNames: string[] = [];
  pokeMonState.pokemons.map((pokemon) => {
    pokemonsNames.push(pokemon.name);
  });
  const { data } = useGetListOfthingsQuery(pokemonsNames);

  if (pokeMonState.pokemons.length == 0) {
    return null;
  }

  return (
    <div className={`main-selected ${theme}`} data-testid="flyout">
      {pokeMonState.pokemons.map((item) => (
        <div key={item.name} className="flyout__name">
          {item.name}
        </div>
      ))}
      <div className="flyout__button-wrapper">
        <button
          className={`selected__unselect-button ${theme}`}
          onClick={() => dispatch(clearState())}
          data-testid="unselect"
        >
          Unselect
        </button>
        <button
          className={`selected__download-button ${theme}`}
          onClick={() => CreateCSVFile(data)}
          data-testid="download"
        >
          Download
        </button>
      </div>
    </div>
  );
}
