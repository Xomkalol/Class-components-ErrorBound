import { useEffect, useState } from 'react';
import './main.css';
import Popout from '../popout/popout';
import Skeleton from '../skeleton/skeleton';
import ErrorBoundary from '../errorBoundary/errorBoundary';
import ApiErrorBanner from '../api/apiErrorBanner';

interface MainProps {
  pokemons: { name: string; url: string }[];
  isLoading: boolean;
  error?: string;
  onRetry?: () => void;
}

export default function Main({
  pokemons,
  isLoading,
  error,
  onRetry,
}: MainProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPokemonUrl, setselectedPokemonUrl] = useState('');
  const [showSkeleton, setshowSkeleton] = useState(true);
  const [hasError, sethasError] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setshowSkeleton(false);
    }, 1500);
  }, []);

  const handleShowPokemon = (url: string) => {
    setselectedPokemonUrl(url);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  if (hasError) {
    throw new Error('Test error triggered by button');
  }

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

        {showPopup && (
          <Popout pokemon={selectedPokemonUrl} onClose={handleClosePopup} />
        )}
      </main>
    </ErrorBoundary>
  );
}
