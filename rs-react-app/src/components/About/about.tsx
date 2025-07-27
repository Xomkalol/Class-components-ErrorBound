import { Link } from 'react-router';
import './about.css';

export default function About() {
  return (
    <div className="about__wrapper">
      <h1>Welcome to About Page!</h1>
      <h2>My name is Anatoly! Just made my pokemon search with react app!</h2>
      <div className="rss__link-wrapper">
        <Link to={'https://rs.school/'}>
          {' '}
          <img src="..\src\assets\rslogo.png" alt="Rss scope"></img>
        </Link>
        <Link to={'/'}>GO HOME</Link>
      </div>
    </div>
  );
}
