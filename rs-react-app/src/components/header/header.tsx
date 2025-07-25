import { useEffect, useState } from 'react';
import './header.css';

interface HeaderProps {
  onSearch: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const savedValue = localStorage.getItem('searchValue');
    if (savedValue) {
      setSearchValue(savedValue);
      onSearch(savedValue);
      localStorage.setItem('searchValue', savedValue);
    }
  }, [onSearch]);

  const handleSearch = () => {
    onSearch(searchValue);
    localStorage.setItem('searchValue', searchValue);
  };

  return (
    <div className="upper__container" data-testid="upper-container">
      <div className="upper__controls-wrapper">
        <div className="controls__input-wrapper">
          <input
            id="search-input"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyUp={(e) => e.key === 'Enter' && handleSearch()}
            data-testid="search-input"
          />
        </div>
        <div className="controls__button-wrapper">
          <button
            className="controls__button"
            onClick={() => handleSearch()}
            data-testid="search-button"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
