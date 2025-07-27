import './skeleton.css';

interface SkeletonLoaderProps {
  count?: number;
}

export default function SkeletonLoader({ count = 5 }: SkeletonLoaderProps) {
  return (
    <div className="skeleton-container" data-testid="skeleton-container">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="skeleton-item" data-testid="skeleton-item">
          <div className="skeleton-line name"></div>
          <div className="skeleton-line url"></div>
        </div>
      ))}
    </div>
  );
}
