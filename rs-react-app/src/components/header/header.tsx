import './header.css';
import { useLocalStorage } from '../localStorageHook/useLocalStorage';
import Link from 'next/link';
import { themeContext } from '../../util/context';
import { useContext } from 'react';

interface HeaderProps {
  onSearch: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const [searchValue, setSearchValue] = useLocalStorage('searchValue', '');
  const { theme, toggleTheme } = useContext(themeContext);

  const handleSearch = () => {
    console.log(searchValue);
    setSearchValue(searchValue);
    onSearch(searchValue);
  };

  const handleClear = async () => {
    setSearchValue('');
    onSearch('');
  };

  return (
    <div className={`upper__container ${theme}`} data-testid="upper-container">
      <Link
        href={'/about'}
        className={`about-link ${theme}`}
        data-testid="about-link"
      >
        About
      </Link>
      <div className="upper__controls-wrapper">
        <div className={`controls__input-wrapper ${theme}`}>
          <input
            id="search-input"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyUp={(e) => e.key === 'Enter' && handleSearch()}
            data-testid="search-input"
            type="search"
          />
        </div>
        <div className="controls__button-wrapper">
          <button
            className={`controls__button ${theme}`}
            onClick={() => handleSearch()}
            data-testid="search-button"
          >
            Search
          </button>
          <button
            className={`controls__button ${theme}`}
            onClick={() => handleClear()}
          >
            Clear
          </button>
          <button className={`controls__button ${theme}`} onClick={toggleTheme}>
            switch theme
          </button>
        </div>
      </div>
    </div>
  );
}
