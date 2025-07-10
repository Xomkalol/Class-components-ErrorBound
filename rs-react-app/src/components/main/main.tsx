import { Component } from 'react';
import './main.css';

class Main extends Component {
  render() {
    return (
      <main className="main__container">
        <h2 className="main__header">Result</h2>
        <div className="result__wrapper">
          <div className="result__header">
            <span className="header__text">Item name</span>
            <span className="header__text">Item description</span>
          </div>
          <div className="results__main">
            <div className="main__item">
              <div className="item__name-wrapper">
                <span className="item__name">Item name</span>
              </div>
              <div className="item__description-wrapper">
                <span className="item__description">Item description</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default Main;
