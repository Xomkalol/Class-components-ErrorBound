import { Component } from 'react';
import './main.css';
import getFirstLoad from '../api/apiHandler';
import Popout from '../popout/popout';
interface MainState {
  pokemons: { name: string; url: string }[];
  showPopup: boolean;
  selectedPokemonUrl: string;
}
class Main extends Component<object, MainState> {
  state: MainState = {
    pokemons: [], // Заполните вашими данными
    showPopup: false,
    selectedPokemonUrl: '',
  };
  async componentDidMount() {
    const pokemons = await getFirstLoad();
    this.setState({ pokemons });
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
  render() {
    const { pokemons, showPopup, selectedPokemonUrl } = this.state;

    return (
      <main className="main__container">
        <h2 className="main__header">Result</h2>
        <div className="result__wrapper">
          <div className="result__header">
            <span className="header__text">Item name</span>
            <span className="header__text">Item description</span>
          </div>
          <div className="results__main">
            {pokemons.map((pokemon) => (
              <div key={pokemon.name} className="main__item">
                <div className="item__name-wrapper">
                  <span className="item__name">{pokemon.name}</span>
                </div>
                <div className="item__description-wrapper">
                  <span
                    className="item__description"
                    onClick={() => this.handleShowPokemon(pokemon.url)}
                  >
                    {pokemon.url}
                  </span>
                </div>
              </div>
            ))}
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
