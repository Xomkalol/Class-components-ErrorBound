import { useCallback, useEffect, useState } from 'react';
import Header from './components/header/header';
import Main from './components/main/main';
import ErrorBoundary from './components/errorBoundary/errorBoundary';
import './app.css';
import searchPokemon from './components/header/headerHandler';
import getFirstLoad from './components/api/apiHandler';

export default function App() {
  const [pokemons, setPokemons] = useState<{ name: string; url: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchInitialPokemons = useCallback(async () => {
    try {
      setIsLoading(true);
      const initialPokemons = await getFirstLoad();
      setPokemons(initialPokemons);
      setIsLoading(false);
      setError(undefined);
    } catch (err) {
      console.error('Error loading initial pokemons:', err);
      setIsLoading(false);
      setError('Failed to load pokemons. Please try again later.');
    }
  }, []);

  useEffect(() => {
    fetchInitialPokemons();
  }, [fetchInitialPokemons]);

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      try {
        setIsLoading(true);
        const initialPokemons = await getFirstLoad();
        setPokemons(initialPokemons);
        setIsLoading(false);
        setError(undefined);
      } catch (err) {
        setIsLoading(false);
        setError('Failed to load pokemons. Please try again.');
        console.log(err);
      }
      return;
    }

    setIsLoading(true);
    setError(undefined);

    try {
      const pokemonData = await searchPokemon(query);
      if (pokemonData) {
        setPokemons([
          {
            name: pokemonData.name,
            url:
              pokemonData.url ||
              `https://pokeapi.co/api/v2/pokemon/${pokemonData.id}/`,
          },
        ]);
        setIsLoading(false);
        setError(undefined);
      } else {
        setPokemons([]);
        setIsLoading(false);
        setError('Pokemon not found. Try another name.');
      }
    } catch (err) {
      console.error('Search error:', err);
      setPokemons([]);
      setIsLoading(false);
      setError('Search failed. Please check your connection and try again.');
    }
  }, []);

  const handleRetry = useCallback(() => {
    setError(undefined);
    handleSearch('');
  }, [handleSearch]);

  return (
    <div className="app">
      <ErrorBoundary>
        <Header onSearch={handleSearch} />
        <Main
          pokemons={pokemons}
          isLoading={isLoading}
          error={error}
          onRetry={handleRetry}
        />
      </ErrorBoundary>
    </div>
  );
}
