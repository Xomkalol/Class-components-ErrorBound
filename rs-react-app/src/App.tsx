import { Component } from 'react';
import Header from './components/header/header';
import Main from './components/main/main';
import ErrorBoundary from './components/errorBoundary/errorBoundary';
import './app.css';
import searchPokemon from './components/header/headerHandler';
import getFirstLoad from './components/api/apiHandler';

interface AppState {
  pokemons: { name: string; url: string }[];
  isLoading: boolean;
  error?: string; // Изменяем string | null на optional string
}

class App extends Component<object, AppState> {
  state: AppState = {
    pokemons: [],
    isLoading: true,
    // error теперь необязательный, можно не инициализировать
  };

  async componentDidMount() {
    try {
      const initialPokemons = await getFirstLoad();
      this.setState({
        pokemons: initialPokemons,
        isLoading: false,
        error: undefined, // Используем undefined вместо null
      });
    } catch (error) {
      console.error('Error loading initial pokemons:', error);
      this.setState({
        isLoading: false,
        error: 'Failed to load pokemons. Please try again later.',
      });
    }
  }

  handleSearch = async (query: string) => {
    if (!query.trim()) {
      try {
        this.setState({ isLoading: true });
        const initialPokemons = await getFirstLoad();
        this.setState({
          pokemons: initialPokemons,
          isLoading: false,
          error: undefined,
        });
      } catch (error) {
        this.setState({
          isLoading: false,
          error: 'Failed to load pokemons. Please try again.',
        });
        console.log(error);
      }
      return;
    }

    this.setState({ isLoading: true, error: undefined });
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
          isLoading: false,
          error: undefined,
        });
      } else {
        this.setState({
          pokemons: [],
          isLoading: false,
          error: 'Pokemon not found. Try another name.',
        });
      }
    } catch (error) {
      console.error('Search error:', error);
      this.setState({
        pokemons: [],
        isLoading: false,
        error: 'Search failed. Please check your connection and try again.',
      });
    }
  };

  handleRetry = () => {
    this.setState({ error: undefined }, () => {
      this.handleSearch('');
    });
  };

  render() {
    const { pokemons, isLoading, error } = this.state;

    return (
      <div className="app">
        <ErrorBoundary>
          <Header onSearch={this.handleSearch} />
          <Main
            pokemons={pokemons}
            isLoading={isLoading}
            error={error}
            onRetry={this.handleRetry}
          />
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
