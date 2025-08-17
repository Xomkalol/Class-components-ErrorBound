import { useContext } from 'react';
import './popout.css';
import { useOutletContext } from 'react-router';
import { themeContext } from '../../util/context';
import { useGetPokemonByNameQuery } from '../api/createApi';
import Image from 'next/image';

interface PopoutContext {
  pokemonUrl: string;
  onClose: () => void;
}

export default function Popout() {
  const { pokemonUrl, onClose } = useOutletContext<PopoutContext>();
  const { theme } = useContext(themeContext);
  const {
    data: pokemonData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPokemonByNameQuery(pokemonUrl);

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
            <Image
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
