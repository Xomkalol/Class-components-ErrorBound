import { Link } from 'react-router';
import './about.css';
import { useContext } from 'react';
import { themeContext } from '../../util/context';

export default function About() {
  const { theme } = useContext(themeContext);
  return (
    <div className={`about__wrapper ${theme}`}>
      <h1>Welcome to About Page!</h1>
      <h2>My name is Anatoly! Just made my pokemon search with react app!</h2>
      <div className={`rss__link-wrappe ${theme}`}>
        <Link to={'https://rs.school/'}>
          {' '}
          <img src="..\src\assets\rslogo.png" alt="Rss scope"></img>
        </Link>
        <Link to={'/'}>GO HOME</Link>
      </div>
    </div>
  );
}
