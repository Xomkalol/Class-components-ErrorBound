import { Link } from 'react-router';
import './errorPage.css';
import { themeContext } from '../../util/context';
import { useContext } from 'react';

export default function ErrorPage() {
  const { theme } = useContext(themeContext);
  return (
    <div className={`error-page__container ${theme}`}>
      <div className={`error-page__content ${theme}`}>
        <h1 className={`error-page__title ${theme}`}>
          Oops! Something went wrong
        </h1>
        <p className={`error-page__message ${theme}`}>
          The page you&apos;re looking for encountered an error.
        </p>
        <Link
          to="/"
          className={`error-page__link ${theme}`}
          data-testid="back-home-link"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
