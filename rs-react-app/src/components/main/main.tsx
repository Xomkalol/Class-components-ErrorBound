import { Component } from 'react';
import './main.css';
import getFirstLoad, { type Pokemon } from '../api/apiHandler';
interface MainState {
  pokemons: Pokemon[];
}
class Main extends Component {
  state: MainState = {
    pokemons: [],
  };
  async componentDidMount() {
    const pokemons = await getFirstLoad();
    this.setState({ pokemons });
  }
  render() {
    const { pokemons } = this.state;

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
                  <span className="item__description">
                    <a
                      href={pokemon.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View details
                    </a>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }
}

export default Main;
/* 
            <div className="main__item">
              <div className="item__name-wrapper">
                <span className="item__name">Item name</span>
              </div>
              <div className="item__description-wrapper">
                <span className="item__description">Item description</span>
              </div>
            </div>
            */
