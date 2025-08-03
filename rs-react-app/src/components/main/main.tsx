import { useContext, useEffect, useState } from 'react';
import './main.css';
import Skeleton from '../skeleton/skeleton';
import ErrorBoundary from '../errorBoundary/errorBoundary';
import ApiErrorBanner from '../api/apiErrorBanner';
import { Outlet, useNavigate, useParams, useSearchParams } from 'react-router';
import { apiLink } from '../api/apiHandler';
import Checkbox from './checkbox';
import FlyOut from '../flyout/flyout';
import { themeContext } from '../../util/context';

interface MainProps {
  pokemons: { name: string; url: string }[];
  isLoading: boolean;
  error?: string;
  onRetry?: () => void;
  nextPageHandler: () => void;
  prevPageHandler: () => void;
  currentOffset: number;
}

export default function Main({
  pokemons,
  isLoading,
  error,
  onRetry,
  nextPageHandler,
  prevPageHandler,
  currentOffset,
}: MainProps) {
  const { pokemonId } = useParams();
  const [searchParams] = useSearchParams();
  const [selectedPokemonUrl, setselectedPokemonUrl] = useState('');
  const [showSkeleton, setshowSkeleton] = useState(true);
  const { theme } = useContext(themeContext);

  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      setshowSkeleton(false);
    }, 1500);
  }, []);

  useEffect(() => {
    if (pokemonId) {
      const url = `${apiLink}/pokemon/${pokemonId}`;
      setselectedPokemonUrl(url);
    }
  }, [pokemonId]);

  const handleShowPokemon = (url: string) => {
    const match = url.match(/\/(\d+)\/?$/);
    const pokemonId = match ? match[1] : null;
    navigate(`/pokemon/${pokemonId}?${searchParams.toString()}`);
    setselectedPokemonUrl(url);
  };

  const handleNextPaginationButton = () => {
    const newOffset = currentOffset + 20;
    nextPageHandler();
    searchParams.set('offset', newOffset.toString());
    navigate(`/?${searchParams.toString()}`);
  };
  const handlePrevPaginationButton = () => {
    const newOffset = Math.max(currentOffset - 20, 0);
    prevPageHandler();
    searchParams.set('offset', newOffset.toString());
    navigate(`/?${searchParams.toString()}`);
  };
  return (
    <ErrorBoundary>
      <main className={`main__container ${theme}`}>
        <h2 className={`main__header ${theme}`}>Pokemons</h2>

        {error && <ApiErrorBanner error={error} onRetry={onRetry} />}
        <FlyOut />

        <div className={`result__wrapper ${theme}`}>
          <div className={`result__header ${theme}`}>
            <span className={`header__text ${theme}`}>Pokemon Name</span>
            <span className={`header__text ${theme}`}>Details</span>
          </div>

          <div className={`results__main ${theme}`}>
            {isLoading || showSkeleton ? (
              <Skeleton count={8} />
            ) : pokemons.length > 0 ? (
              pokemons.map((pokemon) => (
                <div key={pokemon.name} className={`main__item ${theme}`}>
                  <div className={`item__name-wrapper ${theme}`}>
                    <span className={`item__name ${theme}`}>
                      {pokemon.name}
                    </span>
                  </div>
                  <div className={`item__description-wrapper ${theme}`}>
                    <span
                      className={`item__description ${theme}`}
                      onClick={() => handleShowPokemon(pokemon.url)}
                    >
                      View details
                    </span>
                    <Checkbox pokemon={pokemon} />
                  </div>
                </div>
              ))
            ) : (
              <div className={`no-results ${theme}`}>
                No pokemons found. Try a different search.
              </div>
            )}
          </div>
        </div>

        <div className={`button-wrapper ${theme}`}>
          <button
            onClick={() => handlePrevPaginationButton()}
            disabled={currentOffset === 0 || isLoading}
          >
            Show prev
          </button>
          <button
            onClick={() => handleNextPaginationButton()}
            disabled={isLoading}
          >
            Show next
          </button>
        </div>

        <Outlet
          context={{
            pokemonUrl: selectedPokemonUrl,
            onClose: () => {
              navigate(`/?${searchParams.toString()}`);
            },
          }}
        />
      </main>
    </ErrorBoundary>
  );
}
