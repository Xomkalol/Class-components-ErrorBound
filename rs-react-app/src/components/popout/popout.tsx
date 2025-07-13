import { Component } from 'react';
import './popout.css';

interface PopoutProps {
  pokemon: string;
  onClose: () => void;
}
class Popout extends Component<PopoutProps> {
  render() {
    return (
      <div className="layout" onClick={this.props.onClose}>
        <div className="pop__container" onClick={(e) => e.stopPropagation()}>
          <div className="pop__main">{this.props.pokemon}</div>
          <button onClick={this.props.onClose}>Закрыть</button>
        </div>
      </div>
    );
  }
}

export default Popout;
