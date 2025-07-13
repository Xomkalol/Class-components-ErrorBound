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
      <div className="upper__container">
        <div className="upper__controls-wrapper">
          <div className="controls__input-wrapper">
            <input
              id="search-input"
              value={this.state.searchValue}
              onChange={(e) => this.setState({ searchValue: e.target.value })}
              onKeyUp={(e) => e.key === 'Enter' && this.searchPokemon()}
            />
          </div>
          <div className="controls__button-wrapper">
            <button className="controls__button" onClick={this.searchPokemon}>
              Search
            </button>
          </div>
        </div>
      </div>
    );
  }
  searchPokemon = () => {
    const { searchValue } = this.state;
    if (searchValue.trim()) {
      localStorage.setItem('searchValue', searchValue);
      this.props.onSearch(searchValue);
    } else {
      localStorage.setItem('searchValue', searchValue);
      console.log('Please enter a pokemon name');
    }
  };
}

export default Header;
