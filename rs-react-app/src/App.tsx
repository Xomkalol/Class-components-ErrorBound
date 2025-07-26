import { useCallback, useEffect, useState } from 'react';
import Header from './components/header/header';
import Main from './components/main/main';
import ErrorBoundary from './components/errorBoundary/errorBoundary';
import './app.css';
import searchPokemon from './components/header/headerHandler';
import getFirstLoad, { apiLink } from './components/api/apiHandler';

export default function App() {
  const [pokemons, setPokemons] = useState<{ name: string; url: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);
  // const [searchMode, setSearchMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentOffset, setCurrentOffset] = useState(20);

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

  const fetchPaginationPokemons = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${apiLink}/pokemon/?limit=20&offset=${currentOffset}`
      );
      const data = await response.json();
      setIsLoading(false);
      setPokemons(data.results);
    } catch {
      setPokemons([]);
      setIsLoading(false);
      setError('Pokemon not found. Try another name.');
    }
  }, [currentOffset]);

  const nextPageHandler = useCallback(() => {
    setCurrentPage(currentPage + 1);
    console.log(`current page is ${currentPage}`);
    fetchPaginationPokemons();
    setCurrentOffset(currentOffset + 20);
    console.log(currentOffset);
  }, [currentOffset, currentPage, fetchPaginationPokemons]);

  const prevPageHandler = useCallback(() => {
    if (currentOffset >= 0) {
      setCurrentPage(currentPage - 1);
      console.log(currentPage);
      fetchPaginationPokemons();
      setCurrentOffset(currentOffset - 20);
      console.log(currentOffset);
    }
  }, [currentOffset, currentPage, fetchPaginationPokemons]);

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
        />
      </ErrorBoundary>
    </div>
  );
}
