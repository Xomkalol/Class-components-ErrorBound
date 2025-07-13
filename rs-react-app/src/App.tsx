import { Component } from 'react';
import Header from './components/header/header';
import Main from './components/main/main';
import './app.css';
import searchPokemon from './components/header/headerHandler';
import getFirstLoad from './components/api/apiHandler';

interface AppState {
  pokemons: { name: string; url: string }[];
  isLoading: boolean;
}

class App extends Component<object, AppState> {
  state: AppState = {
    pokemons: [],
    isLoading: true,
  };

  async componentDidMount() {
    try {
      const initialPokemons = await getFirstLoad();
      this.setState({
        pokemons: initialPokemons,
        isLoading: false,
      });
    } catch (error) {
      console.error('Error loading initial pokemons:', error);
      this.setState({ isLoading: false });
    }
  }

  render() {
    return (
      <div className="app">
        <Header onSearch={this.handleSearch} />
        <Main pokemons={this.state.pokemons} isLoading={this.state.isLoading} />
      </div>
    );
  }
  handleSearch = async (query: string) => {
    if (!query.trim()) {
      // Если запрос пустой, показываем первоначальные покемоны
      const initialPokemons = await getFirstLoad();
      this.setState({ pokemons: initialPokemons });
      return;
    }

    this.setState({ isLoading: true });
    try {
      const pokemonData = await searchPokemon(query);
      if (pokemonData) {
        this.setState({
          pokemons: [
            {
              name: pokemonData.name,
              url:
                pokemonData.url ||
                `https://pokeapi.co/api/v2/pokemon/${pokemonData.id}/`,
            },
          ],
        });
      } else {
        this.setState({ pokemons: [] });
      }
    } catch (error) {
      console.error('Search error:', error);
      this.setState({ pokemons: [] });
    } finally {
      this.setState({ isLoading: false });
    }
  };
}

export default App;
