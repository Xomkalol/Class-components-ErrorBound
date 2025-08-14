import { useState } from 'react';
import { togglePokemon, type pokemonState } from '../../store/counter';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';

export default function CheckBox(checkBoxProps: { pokemon: pokemonState }) {
  const dispatch = useDispatch();
  const pokeMonState = useSelector(
    (state: RootState) => state.counter.pokemons
  );
  const [isChecked, setIsChecked] = useState(
    pokeMonState.some((p) => p.url === checkBoxProps.pokemon.url)
  );

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    dispatch(togglePokemon(checkBoxProps.pokemon));
    console.log('Current pokemons:', pokeMonState);
  };

  return (
    <input
      type="checkbox"
      checked={isChecked}
      onChange={handleCheckboxChange}
    ></input>
  );
}
