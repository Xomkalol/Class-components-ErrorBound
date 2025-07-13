import './ApiErrorBanner.css';

interface ApiErrorBannerProps {
  error: string;
  onRetry?: () => void;
}

export default function ApiErrorBanner({
  error,
  onRetry,
}: ApiErrorBannerProps) {
  return (
    <div className="error-banner">
      <div className="error-content">
        <div className="error-message">{error}</div>
        {onRetry && (
          <button className="retry-button" onClick={onRetry}>
            Retry
          </button>
        )}
      </div>
    </div>
  );
}
