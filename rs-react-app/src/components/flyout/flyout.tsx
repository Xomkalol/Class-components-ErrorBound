import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { clearState } from '../../store/counter';
import CreateCSVFile from '../../util/createCSV';
import './flyout.css';
import { themeContext } from '../../util/context';
import { useContext } from 'react';

export default function FlyOut() {
  const pokeMonState = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch();
  const { theme } = useContext(themeContext);

  if (pokeMonState.urls.length == 0) {
    return null;
  }

  return (
    <div className={`main-selected ${theme}`}>
      {pokeMonState.urls.map((item) => (
        <div key={item}>{item}</div>
      ))}
      <button
        className={`selected__unselect-button ${theme}`}
        onClick={() => dispatch(clearState())}
      >
        Unselect
      </button>
      <button
        className={`selected__download-button ${theme}`}
        onClick={() => CreateCSVFile(pokeMonState)}
      >
        Download
      </button>
    </div>
  );
}
