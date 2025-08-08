import { useContext /*useEffect, useState*/ } from 'react';
import './popout.css';
import { useOutletContext } from 'react-router';
import { themeContext } from '../../util/context';
import { useGetPokemonByNameQuery } from '../api/createApi';
/*
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
} */

/*interface PokemonData {
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
} */

interface PopoutContext {
  pokemonUrl: string;
  onClose: () => void;
}

export default function Popout() {
  const { pokemonUrl, onClose } = useOutletContext<PopoutContext>();
  //const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
  // const [loading, setLoading] = useState(true);
  //const [errorlol, setError] = useState<string | null>(null);
  const { theme } = useContext(themeContext);
  const {
    data: pokemonData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPokemonByNameQuery('pikachu');

  let content: React.ReactNode;

  if (isLoading) {
    content = <div className={`popout-loading ${theme}`}>Loading...</div>;
  } else if (isSuccess) {
    content = (
      <>
        <div className={`popout-header ${theme}`}>
          <h2 className={`pokemon-name ${theme}`} data-testid="pokemon-name">
            {pokemonData.name}
          </h2>
          {pokemonData.sprites.front_default && (
            <img
              src={pokemonData.sprites.front_default}
              alt={pokemonData.name}
              className={`pokemon-image ${theme}`}
              data-testid="pokemon-image"
            />
          )}
        </div>

        <div className={`pokemon-details ${theme}`}>
          <h3>Details</h3>
          <ul className={`details-list ${theme}`}>
            <li data-testid="pokemon-abilities">
              <strong>Abilities:</strong>{' '}
              {pokemonData.abilities.map((a) => a.ability.name).join(', ')}
            </li>
            <li data-testid="pokemon-forms">
              <strong>Forms:</strong>{' '}
              {pokemonData.forms.map((f) => f.name).join(', ')}
            </li>
            <li data-testid="pokemon-species">
              <strong>Species:</strong> {pokemonData.species.name}
            </li>
          </ul>
        </div>
      </>
    );
  } else if (isError) {
    content = <div className={`popout-error ${theme}`}>{error.toString()}</div>;
  }
  /* useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(pokemonUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }

        const data: PokemonData = await response.json();
        setPokemonData(data);
      } catch (err) {
        console.error('Pokemon fetch error:', err);
        setError('Failed to load Pokemon details');
      } finally {
        setLoading(false);
      }
    };

    if (pokemonUrl) {
      fetchPokemonDetails();
    }
  }, [pokemonUrl]); */

  if (!pokemonUrl) return null;

  return (
    <div
      className={`popout-overlay ${theme}`}
      onClick={onClose}
      data-testid="popout-overlay"
    >
      <div
        className={`popout-content ${theme}`}
        onClick={(e) => e.stopPropagation()}
        data-testid="popout-content"
      >
        {content}
        <button
          onClick={onClose}
          className={`close-button ${theme}`}
          data-testid="close-button"
        >
          Close
        </button>
      </div>
    </div>
  );
}
