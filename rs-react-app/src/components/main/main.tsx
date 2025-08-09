import { useContext, useEffect, useState } from 'react';
import './main.css';
import Skeleton from '../skeleton/skeleton';
import ErrorBoundary from '../errorBoundary/errorBoundary';
import ApiErrorBanner from '../api/apiErrorBanner';
import { Outlet, useNavigate, useParams, useSearchParams } from 'react-router';
import Checkbox from './checkbox';
import FlyOut from '../flyout/flyout';
import { themeContext } from '../../util/context';
import {
  useGetPokemonByNameQuery,
  useGetPokemonListQuery,
} from '../api/createApi';
import type { Pokemon } from '../api/apiHandler';

interface MainProps {
  queryProp: string;
  error?: string;
  onRetry?: () => void;
  nextPageHandler: () => void;
  prevPageHandler: () => void;
  currentOffset: number;
}

export default function Main({
  queryProp,
  error,
  onRetry,
  nextPageHandler,
  prevPageHandler,
  currentOffset,
}: MainProps) {
  // const { query } = useParams();
  const [searchParams] = useSearchParams();
  const [selectedPokemonUrl, setselectedPokemonUrl] = useState('');
  const [showSkeleton, setshowSkeleton] = useState(true);
  const { theme } = useContext(themeContext);
  let pokemonsToShow: Pokemon[] = [];
  let isSearching = !!queryProp;
  const {
    data: pokemonData,
    isLoading: pokemonIsLoading,
    isSuccess,
    // isError,
    //  error,
  } = useGetPokemonListQuery(currentOffset, { skip: isSearching });
  const {
    data: pokemonByName,
    isLoading: isLoadingByName,
    isSuccess: isSuccessByName,
    //isError,
    //  error,
  } = useGetPokemonByNameQuery(queryProp, { skip: !isSearching });

  if (queryProp && isSuccessByName) {
    pokemonsToShow = [
      {
        name: pokemonByName.species.name,
        url: `https://pokeapi.co/api/v2/pokemon/${pokemonByName.species.name}/`,
      },
    ];
  } else if (!queryProp && isSuccess) {
    pokemonsToShow = pokemonData.results;
  }

  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      setshowSkeleton(false);
    }, 1500);
  }, []);

  const handleShowPokemon = (name: string) => {
    navigate(`/pokemon/${name}?${searchParams.toString()}`);
    if (name) {
      setselectedPokemonUrl(name);
    }
  };

  const handleNextPaginationButton = () => {
    const newOffset = currentOffset + 20;
    nextPageHandler();
    searchParams.set('offset', newOffset.toString());
    isSearching = false;
    navigate(`/?${searchParams.toString()}`);
  };
  const handlePrevPaginationButton = () => {
    const newOffset = Math.max(currentOffset - 20, 0);
    prevPageHandler();
    searchParams.set('offset', newOffset.toString());
    isSearching = false;
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
            {pokemonIsLoading || showSkeleton ? (
              <Skeleton count={8} />
            ) : pokemonsToShow.length > 0 ? (
              pokemonsToShow.map((pokemon) => (
                <div key={pokemon.name} className={`main__item ${theme}`}>
                  <div className={`item__name-wrapper ${theme}`}>
                    <span className={`item__name ${theme}`}>
                      {pokemon.name}
                    </span>
                  </div>
                  <div className={`item__description-wrapper ${theme}`}>
                    <span
                      className={`item__description ${theme}`}
                      onClick={() => handleShowPokemon(pokemon.name)}
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
            disabled={currentOffset === 0 || pokemonIsLoading}
          >
            Show prev
          </button>
          <button
            onClick={() => handleNextPaginationButton()}
            disabled={pokemonIsLoading}
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
