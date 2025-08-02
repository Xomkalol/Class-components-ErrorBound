import { useEffect, useState } from 'react';
import './main.css';
import Skeleton from '../skeleton/skeleton';
import ErrorBoundary from '../errorBoundary/errorBoundary';
import ApiErrorBanner from '../api/apiErrorBanner';
import { Outlet, useNavigate, useParams, useSearchParams } from 'react-router';
import { apiLink } from '../api/apiHandler';
import Checkbox from './checkbox';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';

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
  const pokeMonState = useSelector((state: RootState) => state.counter);
  const [selectedPokemonUrl, setselectedPokemonUrl] = useState('');
  const [showSkeleton, setshowSkeleton] = useState(true);
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
      <main className="main__container">
        <h2 className="main__header">Pokemons</h2>

        {error && <ApiErrorBanner error={error} onRetry={onRetry} />}
        <div className="main-selected">
          {pokeMonState.urls.map((item) =>
            pokeMonState.urls.length > 0 ? (
              <div key="item">{item}</div>
            ) : (
              <div key="nothing"></div>
            )
          )}
        </div>
        <div className="result__wrapper">
          <div className="result__header">
            <span className="header__text">Pokemon Name</span>
            <span className="header__text">Details</span>
          </div>
          <div className="results__main">
            {isLoading || showSkeleton ? (
              <Skeleton count={8} />
            ) : pokemons.length > 0 ? (
              pokemons.map((pokemon) => (
                <div key={pokemon.name} className="main__item">
                  <div className="item__name-wrapper">
                    <span className="item__name">{pokemon.name}</span>
                  </div>
                  <div className="item__description-wrapper">
                    <span
                      className="item__description"
                      onClick={() => handleShowPokemon(pokemon.url)}
                    >
                      View details
                    </span>
                    <Checkbox pokemonUrl={pokemon.url}></Checkbox>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                No pokemons found. Try a different search.
              </div>
            )}
          </div>
        </div>
        <div className="button-wrapper">
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
