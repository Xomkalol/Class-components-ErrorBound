import { useEffect, useState } from 'react';
import { addPokemon } from '../../store/counter';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';

export default function CheckBox(checkBoxProps: { pokemonUrl: string }) {
  const dispatch = useDispatch();
  const pokeMonState = useSelector((state: RootState) => state.counter);
  const [isChecked, setIsChecked] = useState(
    pokeMonState.urls.includes(checkBoxProps.pokemonUrl)
  );

  useEffect(() => {
    if (pokeMonState.urls.indexOf(checkBoxProps.pokemonUrl) == -1) {
      setIsChecked(false);
    } else {
      setIsChecked(true);
    }
  }, [checkBoxProps.pokemonUrl, pokeMonState.urls]);
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    dispatch(addPokemon(checkBoxProps.pokemonUrl));
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
