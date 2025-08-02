import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { clearState } from '../../store/counter';
import CreateCSVFile from '../../util/createCSV';

export default function FlyOut() {
  const pokeMonState = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch();

  if (pokeMonState.urls.length == 0) {
    return null;
  }

  return (
    <div className="main-selected">
      {pokeMonState.urls.map((item) =>
        pokeMonState.urls.length > 0 ? (
          <div key="item">{item}</div>
        ) : (
          <div key="nothing"></div>
        )
      )}
      <button onClick={() => dispatch(clearState())}>Unselect</button>
      <button onClick={() => CreateCSVFile(pokeMonState)}>Download</button>
    </div>
  );
}
