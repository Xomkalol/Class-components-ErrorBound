import { Component } from 'react';
import './header.css';

class Header extends Component {
  render() {
    return (
      <div className="upper__container">
        <div className="upper__controls-wrapper">
          <div className="controls__input-wrapper">
            <input></input>
          </div>
          <div className="controls__button-wrapper">
            <button className="controls__button">Search</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
