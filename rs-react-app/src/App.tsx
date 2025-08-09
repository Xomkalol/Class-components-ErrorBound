import { useCallback, useEffect, useState } from 'react';
import Header from './components/header/header';
import Main from './components/main/main';
import ErrorBoundary from './components/errorBoundary/errorBoundary';
import './app.css';
import { useSearchParams } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './store/store';

export default function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');

  const offset = parseInt(searchParams.get('offset') || '0', 10);

  const handleSearch = useCallback(
    (query: string) => {
      console.log(query);
      setQuery(query);
      setSearchParams(query ? { query, offset: '0' } : { offset: '0' });
    },
    [setSearchParams]
  );

  const handleRetry = useCallback(() => {
    handleSearch('');
  }, [handleSearch]);

  const handlePagination = useCallback(
    (newOffset: number) => {
      const currentQuery = searchParams.get('query');
      const params: Record<string, string> = { offset: newOffset.toString() };
      if (currentQuery) params.query = currentQuery;
      setSearchParams(params);
    },
    [setSearchParams]
  );

  const nextPageHandler = useCallback(() => {
    handlePagination(offset + 20);
  }, [offset, handlePagination]);

  const prevPageHandler = useCallback(() => {
    handlePagination(Math.max(offset - 20, 0));
  }, [offset, handlePagination]);

  return (
    <Provider store={store}>
      <div className="app">
        <ErrorBoundary>
          <Header onSearch={handleSearch} />
          <Main
            queryProp={query}
            onRetry={handleRetry}
            nextPageHandler={nextPageHandler}
            prevPageHandler={prevPageHandler}
            currentOffset={offset}
          />
        </ErrorBoundary>
      </div>
    </Provider>
  );
}
