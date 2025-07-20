import { Component } from 'react';
import './header.css';

type HeaderState = {
  searchValue: string;
};
interface HeaderProps {
  onSearch: (query: string) => void;
}

class Header extends Component<HeaderProps, HeaderState> {
  state: HeaderState = {
    searchValue: '',
  };
  componentDidMount(): void {
    const savedValue = localStorage.getItem('searchValue');
    if (savedValue) {
      this.setState({ searchValue: savedValue }, () => {
        this.searchPokemon();
      });
    }
  }
  render() {
    return (
      <div className="upper__container" data-testid="upper-container">
        <div className="upper__controls-wrapper">
          <div className="controls__input-wrapper">
            <input
              id="search-input"
              value={this.state.searchValue}
              onChange={(e) => this.setState({ searchValue: e.target.value })}
              onKeyUp={(e) => e.key === 'Enter' && this.searchPokemon()}
              data-testid="search-input"
            />
          </div>
          <div className="controls__button-wrapper">
            <button
              className="controls__button"
              onClick={this.searchPokemon}
              data-testid="search-button"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    );
  }
  searchPokemon = () => {
    this.props.onSearch(this.state.searchValue);
    localStorage.setItem('searchValue', this.state.searchValue);
  };
}

export default Header;
