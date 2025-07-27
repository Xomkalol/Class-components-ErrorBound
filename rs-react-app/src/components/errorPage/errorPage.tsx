import { Link } from 'react-router';
import './errorPage.css';

export default function ErrorPage() {
  return (
    <div className="error-page__container">
      <div className="error-page__content">
        <h1 className="error-page__title">Oops! Something went wrong</h1>
        <p className="error-page__message">
          The page youre looking for encountered an error.
        </p>
        <Link to="/" className="error-page__link">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
