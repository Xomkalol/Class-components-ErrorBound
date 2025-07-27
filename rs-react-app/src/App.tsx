import { useCallback, useEffect, useState } from 'react';
import Header from './components/header/header';
import Main from './components/main/main';
import ErrorBoundary from './components/errorBoundary/errorBoundary';
import './app.css';
import searchPokemon from './components/header/headerHandler';
import getFirstLoad, { apiLink } from './components/api/apiHandler';
import { useSearchParams } from 'react-router';

export default function App() {
  const [pokemons, setPokemons] = useState<{ name: string; url: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialOffset = parseInt(searchParams.get('offset') || '0', 10);
  const [currentOffset, setCurrentOffset] = useState(initialOffset);
  const [currentPage, setCurrentPage] = useState(
    Math.floor(initialOffset / 20)
  );

  const fetchInitialPokemons = useCallback(async (offset: number) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${apiLink}/pokemon/?limit=20&offset=${offset}`
      );
      const data = await response.json();
      setPokemons(data.results);
      setIsLoading(false);
      setError(undefined);

      setSearchParams({ limit: '20', offset: offset.toString() });
    } catch (err) {
      console.error('Error loading initial pokemons:', err);
      setIsLoading(false);
      setError('Failed to load pokemons');
    }
  }, []);

  useEffect(() => {
    fetchInitialPokemons(initialOffset);
  }, [fetchInitialPokemons, initialOffset]);

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

  /* const fetchPaginationPokemons = useCallback(async (offset: number) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${apiLink}/pokemon/?limit=20&offset=${offset}`
      );
      const data = await response.json();
      setIsLoading(false);
      setPokemons(data.results);
    } catch {
      setPokemons([]);
      setIsLoading(false);
      setError('Pokemon not found. Try another name.');
    }
  }, []); */

  const nextPageHandler = useCallback(() => {
    const newOffset = currentOffset + 20;
    setCurrentOffset(newOffset);
    fetchInitialPokemons(newOffset);
  }, [currentOffset, fetchInitialPokemons]);

  const prevPageHandler = useCallback(() => {
    const newOffset = Math.max(currentOffset - 20, 0);
    setCurrentOffset(newOffset);
    fetchInitialPokemons(newOffset);
  }, [currentOffset, fetchInitialPokemons]);

  return (
    <div className="app">
      <ErrorBoundary>
        <Header onSearch={handleSearch} />
        <Main
          pokemons={pokemons}
          isLoading={isLoading}
          error={error}
          onRetry={handleRetry}
          nextPageHandler={nextPageHandler}
          prevPageHandler={prevPageHandler}
          currentOffset={currentOffset}
        />
      </ErrorBoundary>
    </div>
  );
}
