import { useContext } from 'react';
import './ApiErrorBanner.css';
import { themeContext } from '../../util/context';

interface ApiErrorBannerProps {
  error: string;
  onRetry?: () => void;
}

export default function ApiErrorBanner({
  error,
  onRetry,
}: ApiErrorBannerProps) {
  const { theme } = useContext(themeContext);
  return (
    <div className={`error-banner ${theme}`}>
      <div className={`error-content ${theme}`}>
        <div className={`error-message ${theme}`}>{error}</div>
        {onRetry && (
          <button className={`retry-button" ${theme}`} onClick={onRetry}>
            Retry
          </button>
        )}
      </div>
    </div>
  );
}
