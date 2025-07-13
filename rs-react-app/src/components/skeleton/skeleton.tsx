import { Component } from 'react';
import './skeleton.css';

interface SkeletonLoaderProps {
  count?: number;
}

class SkeletonLoader extends Component<SkeletonLoaderProps> {
  static defaultProps = {
    count: 5,
  };

  render() {
    const { count } = this.props;

    return (
      <div className="skeleton-container">
        {[...Array(count)].map((_, i) => (
          <div key={i} className="skeleton-item">
            <div className="skeleton-line name"></div>
            <div className="skeleton-line url"></div>
          </div>
        ))}
      </div>
    );
  }
}

export default SkeletonLoader;
