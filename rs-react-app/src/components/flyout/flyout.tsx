import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';

export default function FlyOut() {
  const pokeMonState = useSelector((state: RootState) => state.counter);

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
      <button>Unselect</button>
      <button>Download</button>
    </div>
  );
}
