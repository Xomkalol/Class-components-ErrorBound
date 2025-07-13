import { Component } from 'react';
import './popout.css';

interface PopoutProps {
  pokemon: string;
  onClose: () => void;
}
interface PopoutState {
  pokemonInfo: PokemonSelectedData;
}
interface PokemonSelectedData {
  name: string;
  abilities: string[];
  forms: string[];
  species: string;
  imageUrl: string;
}

interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}
/*interface PokemonSprite {
  back_default?: string;
  back_female?: string;
  back_shiny?: string;
  back_shiny_female?: string;
  front_default: string;
  front_female?: string;
  front_shiny?: string;
  front_shiny_female?: string;
} */
interface PokemonForm {
  name: string;
  url: string;
}

class Popout extends Component<PopoutProps, PopoutState> {
  state: PopoutState = {
    pokemonInfo: {
      name: '',
      abilities: [],
      forms: [],
      species: '',
      imageUrl: '',
    },
  };
  async componentDidMount(): Promise<void> {
    try {
      const response = await fetch(this.props.pokemon);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Данные покемона:', data);
      const selectedData: PokemonSelectedData = {
        name: data.name,
        abilities: data.abilities.map(
          (ability: PokemonAbility) => ability.ability.name + ' '
        ),
        forms: data.forms.map((form: PokemonForm) => form.name + ' '),
        species: data.species.name,
        imageUrl: data.sprites.front_default,
      };
      this.setState({
        pokemonInfo: selectedData,
      });
    } catch (err) {
      console.error('Ошибка при загрузке:', err);
    }
  }
  render() {
    return (
      <div className="layout" onClick={this.props.onClose}>
        <div className="pop__container" onClick={(e) => e.stopPropagation()}>
          <div className="pop__main">
            <h2 className="pop__header">{this.state.pokemonInfo.name}</h2>
            {this.state.pokemonInfo.imageUrl && (
              <img
                src={this.state.pokemonInfo.imageUrl}
                alt={this.state.pokemonInfo.name}
              />
            )}
            <ul className="pop__ul">
              <li className="pop__li">
                Abilities: {this.state.pokemonInfo.abilities}
              </li>
              <li className="pop__li">
                Forms: {this.state.pokemonInfo.forms.join()}
              </li>
              <li className="pop__li">
                Species: {this.state.pokemonInfo.species}
              </li>
            </ul>
          </div>
          <button onClick={this.props.onClose}>Закрыть</button>
        </div>
      </div>
    );
  }
}

export default Popout;
