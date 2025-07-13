import { Component } from 'react';
import './main.css';
import Popout from '../popout/popout';

interface MainProps {
  pokemons: { name: string; url: string }[];
  isLoading: boolean;
}

interface MainState {
  showPopup: boolean;
  selectedPokemonUrl: string;
}

class Main extends Component<MainProps, MainState> {
  state: MainState = {
    showPopup: false,
    selectedPokemonUrl: '',
  };
  handleShowPokemon = (url: string) => {
    this.setState({
      showPopup: true,
      selectedPokemonUrl: url,
    });
  };
  handleClosePopup = () => {
    this.setState({ showPopup: false });
  };

  render() {
    const { pokemons, isLoading } = this.props;
    const { showPopup, selectedPokemonUrl } = this.state;

    if (isLoading) {
      return <div className="loading">Loading...</div>;
    }

    return (
      <main className="main__container">
        <h2 className="main__header">Pokemons</h2>
        <div className="result__wrapper">
          <div className="result__header">
            <span className="header__text">Pokemon Name</span>
            <span className="header__text">Details</span>
          </div>
          <div className="results__main">
            {pokemons.length > 0 ? (
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
        {showPopup && (
          <Popout
            pokemon={selectedPokemonUrl}
            onClose={this.handleClosePopup}
          />
        )}
      </main>
    );
  }
}

export default Main;
