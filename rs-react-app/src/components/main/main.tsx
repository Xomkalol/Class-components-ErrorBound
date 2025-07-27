import { useEffect, useState } from 'react';
import './main.css';
// import Popout from '../popout/popout';
import Skeleton from '../skeleton/skeleton';
import ErrorBoundary from '../errorBoundary/errorBoundary';
import ApiErrorBanner from '../api/apiErrorBanner';
import { Outlet, useNavigate, useParams, useSearchParams } from 'react-router';
import { apiLink } from '../api/apiHandler';

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
  // const [showPopup, setShowPopup] = useState(false);
  const [selectedPokemonUrl, setselectedPokemonUrl] = useState('');
  const [showSkeleton, setshowSkeleton] = useState(true);
  const navigate = useNavigate();

  const offset = Number(searchParams.get('offset')) || 0;
  const limit = Number(searchParams.get('limit')) || 20;

  useEffect(() => {
    if (offset !== currentOffset) {
      // Здесь можно вызвать функцию для загрузки данных с новым offset
      // Например: fetchPokemons(offset, limit);
    }
  }, [offset, currentOffset, limit]);

  useEffect(() => {
    setTimeout(() => {
      setshowSkeleton(false);
    }, 1500);
  }, []);

  useEffect(() => {
    if (pokemonId) {
      const url = `${apiLink}/pokemon/${pokemonId}`;
      setselectedPokemonUrl(url);
      // setShowPopup(true);
    }
  }, [pokemonId]);

  const handleShowPokemon = (url: string) => {
    const match = url.match(/\/(\d+)\/?$/);
    const pokemonId = match ? match[1] : null;
    console.log(pokemonId);
    navigate(`/pokemon/${pokemonId}?${searchParams.toString()}`);
    setselectedPokemonUrl(url);
    // setShowPopup(true);
  };

  /* const handleClosePopup = () => {
    setShowPopup(false);
    navigate(`/?${searchParams.toString()}`);
  }; */

  /* useEffect(() => {
    const handleBackButton = () => {
      if (showPopup) {
        setShowPopup(false);
      }
    }; 

    window.addEventListener('popstate', handleBackButton);
    return () => window.removeEventListener('popstate', handleBackButton);
  }, [showPopup]); */

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
