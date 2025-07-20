import { Component } from 'react';
import './main.css';
import Popout from '../popout/popout';
import Skeleton from '../skeleton/skeleton';
import ErrorBoundary from '../errorBoundary/errorBoundary';
import ApiErrorBanner from '../api/apiErrorBanner';

interface MainProps {
  pokemons: { name: string; url: string }[];
  isLoading: boolean;
  error?: string;
  onRetry?: () => void;
}

interface MainState {
  showPopup: boolean;
  selectedPokemonUrl: string;
  showSkeleton: boolean;
  hasError: boolean;
}

class Main extends Component<MainProps, MainState> {
  state: MainState = {
    showPopup: false,
    selectedPokemonUrl: '',
    showSkeleton: true,
    hasError: false,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ showSkeleton: false });
    }, 1500);
  }

  handleShowPokemon = (url: string) => {
    this.setState({
      showPopup: true,
      selectedPokemonUrl: url,
    });
  };

  handleClosePopup = () => {
    this.setState({ showPopup: false });
  };

  throwTestError = () => {
    this.setState({ hasError: true });
  };

  render() {
    const { pokemons, isLoading, error, onRetry } = this.props;
    const { showPopup, selectedPokemonUrl, showSkeleton, hasError } =
      this.state;

    if (hasError) {
      throw new Error('Test error triggered by button');
    }

    return (
      <ErrorBoundary>
        <main className="main__container">
          <h2 className="main__header">Pokemons</h2>

          {error && <ApiErrorBanner error={error} onRetry={onRetry} />}

          <div className="result__wrapper">
            <div className="result__header">
              <span className="header__text">Pokemon Name</span>
              <span className="header__text">Details</span>
            </div>
            <div className="results__main">
              {isLoading || showSkeleton ? (
                <Skeleton count={8} />
              ) : pokemons.length > 0 ? (
                pokemons.map((pokemon) => (
                  <div key={pokemon.name} className="main__item">
                    <div className="item__name-wrapper">
                      <span className="item__name">{pokemon.name}</span>
                    </div>
                    <div className="item__description-wrapper">
                      <span
                        className="item__description"
                        onClick={() => this.handleShowPokemon(pokemon.url)}
                      >
                        View details
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-results">
                  No pokemons found. Try a different search.
                </div>
              )}
            </div>
          </div>

          <button className="error-button" onClick={this.throwTestError}>
            Simulate Error (Test)
          </button>

          {showPopup && (
            <Popout
              pokemon={selectedPokemonUrl}
              onClose={this.handleClosePopup}
            />
          )}
        </main>
      </ErrorBoundary>
    );
  }
}

export default Main;
