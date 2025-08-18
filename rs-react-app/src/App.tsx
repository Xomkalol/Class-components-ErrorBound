'use client';

import { useCallback, useEffect, useState } from 'react';
import Header from './components/header/header';
import Main from './components/main/main';
import './app.css';
import './colors.css';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { useLocalStorage } from './components/localStorageHook/useLocalStorage';

export default function App() {
  const [searchValue] = useLocalStorage('searchValue', '');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState('');

  const offset = parseInt(searchParams.get('offset') || '0', 10);

  const handleSearch = useCallback((query: string) => {
    console.log(query);
    setQuery(query);
    const updatedPath = query ? `${pathname}?${query}` : pathname;
    router.push(updatedPath);
  }, []);

  useEffect(() => {
    if (searchValue !== '') {
      //  setSearchParams(searchValue);
      setQuery(searchValue);
    }
  }, []);

  const handleRetry = useCallback(() => {
    handleSearch('');
  }, [handleSearch]);

  const handlePagination = useCallback((newOffset: number) => {
    const currentQuery = searchParams.get('query');
    const params: Record<string, string> = { offset: newOffset.toString() };
    if (currentQuery) params.query = currentQuery;
    const updatedPath = `${pathname}?${params}`;
    router.push(updatedPath);
  }, []);

  const nextPageHandler = useCallback(() => {
    handlePagination(offset + 20);
  }, [offset, handlePagination]);

  const prevPageHandler = useCallback(() => {
    handlePagination(Math.max(offset - 20, 0));
  }, [offset, handlePagination]);

  return (
    <Provider store={store}>
      <div className="app">
        <Header onSearch={handleSearch} />
        <Main
          queryProp={query}
          onRetry={handleRetry}
          nextPageHandler={nextPageHandler}
          prevPageHandler={prevPageHandler}
          currentOffset={offset}
        />
      </div>
    </Provider>
  );
}
