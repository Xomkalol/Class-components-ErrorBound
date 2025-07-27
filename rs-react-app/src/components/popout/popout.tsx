import { useEffect, useState } from 'react';
import './popout.css';
import { useOutletContext } from 'react-router';

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

interface PopoutContext {
  pokemonUrl: string;
  onClose: () => void;
}

export default function Popout() {
  const { pokemonUrl, onClose } = useOutletContext<PopoutContext>();
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
  }, [pokemonUrl]);

  if (!pokemonUrl) return null;

  return (
    <div
      className="popout-overlay"
      onClick={onClose}
      data-testid="popout-overlay"
    >
      <div
        className="popout-content"
        onClick={(e) => e.stopPropagation()}
        data-testid="popout-content"
      >
        {loading ? (
          <div className="popout-loading">Loading...</div>
        ) : error ? (
          <div className="popout-error">{error}</div>
        ) : pokemonData ? (
          <>
            <div className="popout-header">
              <h2 className="pokemon-name" data-testid="pokemon-name">
                {pokemonData.name}
              </h2>
              {pokemonData.sprites.front_default && (
                <img
                  src={pokemonData.sprites.front_default}
                  alt={pokemonData.name}
                  className="pokemon-image"
                  data-testid="pokemon-image"
                />
              )}
            </div>

            <div className="pokemon-details">
              <h3>Details</h3>
              <ul className="details-list">
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
        ) : null}

        <button
          onClick={onClose}
          className="close-button"
          data-testid="close-button"
        >
          Close
        </button>
      </div>
    </div>
  );
}
