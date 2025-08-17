import { useContext, useEffect, useState } from 'react';
import './main.css';
import Skeleton from '../skeleton/skeleton';
import ErrorBoundary from '../errorBoundary/errorBoundary';
import ApiErrorBanner from '../api/apiErrorBanner';
import { Outlet, useNavigate } from 'react-router';
import Checkbox from './checkbox';
import FlyOut from '../flyout/flyout';
import { themeContext } from '../../util/context';
import {
  useGetPokemonByNameQuery,
  useGetPokemonListQuery,
} from '../api/createApi';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import router from 'next/router';

interface MainProps {
  queryProp: string;
  error?: string;
  onRetry?: () => void;
  nextPageHandler: () => void;
  prevPageHandler: () => void;
  currentOffset: number;
}
type PokemonToShow = {
  name: string;
  url: string;
};

export default function Main({
  queryProp,
  error,
  onRetry,
  nextPageHandler,
  prevPageHandler,
  currentOffset,
}: MainProps) {
  const [selectedPokemonUrl, setselectedPokemonUrl] = useState('');
  const [showSkeleton, setshowSkeleton] = useState(true);
  const { theme } = useContext(themeContext);
  const searchParams = useSearchParams();
  let pokemonsToShow: PokemonToShow[] = [];
  let isSearching = !!queryProp;
  const {
    data: pokemonData,
    isLoading: pokemonIsLoading,
    isSuccess,
    refetch,
  } = useGetPokemonListQuery(currentOffset, { skip: isSearching });
  const { data: pokemonByName, isSuccess: isSuccessByName } =
    useGetPokemonByNameQuery(queryProp, { skip: !isSearching });

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

  useEffect(() => {
    setTimeout(() => {
      setshowSkeleton(false);
    }, 1500);
  }, []);

  const handleShowPokemon = (name: string) => {
    const updatedPath = `pokemon/${name}`;
    router.push(updatedPath);
    if (name) {
      setselectedPokemonUrl(name);
    }
  };

  const handleNextPaginationButton = () => {
    const newOffset = currentOffset + 20;
    nextPageHandler();
    const updatedPath = `offset=${newOffset.toString()}`;
    router.push(updatedPath);
    isSearching = false;
  };
  const handlePrevPaginationButton = () => {
    const newOffset = Math.max(currentOffset - 20, 0);
    prevPageHandler();
    const updatedPath = `offset=${newOffset.toString()}`;
    router.push(updatedPath);
    isSearching = false;
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
          <button onClick={refetch}>Refetch</button>
        </div>

        <Outlet
          context={{
            pokemonUrl: selectedPokemonUrl,
            onClose: () => {
              const updatedPath = `/?${searchParams.toString()}`;
              router.push(updatedPath);
            },
          }}
        />
      </main>
    </ErrorBoundary>
  );
}
