import './header.css';
import { useLocalStorage } from '../localStorageHook/useLocalStorage';
import { Link } from 'react-router';

interface HeaderProps {
  onSearch: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const [searchValue, setSearchValue] = useLocalStorage('searchValue', '');

  const handleSearch = () => {
    onSearch(searchValue);
  };

  return (
    <div className="upper__container" data-testid="upper-container">
      <Link to={'/about'} className="about-link">
        About
      </Link>
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
