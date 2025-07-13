import { Component } from 'react';
import Header from './components/header/header';
import Main from './components/main/main';
import './app.css';
import searchPokemon from './components/header/headerHandler';
interface AppState {
  searchResults: { name: string; url: string }[];
}

class App extends Component {
  state: AppState = {
    searchResults: [],
  };
  render() {
    return (
      <div className="container">
        <Header onSearch={this.handleSearch} />
        <Main pokemons={this.state.searchResults} />
      </div>
    );
  }
  handleSearch = async (query: string) => {
    try {
      const pokemonData = await searchPokemon(query);
      if (pokemonData) {
        this.setState({
          searchResults: [
            {
              name: pokemonData.name,
              url:
                pokemonData.url ||
                `https://pokeapi.co/api/v2/pokemon/${pokemonData.id}/`,
            },
          ],
        });
      } else {
        this.setState({ searchResults: [] });
      }
    } catch (error) {
      console.error('Search error:', error);
      this.setState({ searchResults: [] });
    }
  };
}

export default App;
