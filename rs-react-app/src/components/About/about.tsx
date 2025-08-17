import Link from 'next/link';
import './about.css';
import { useContext } from 'react';
import { themeContext } from '../../util/context';
import Image from 'next/image';

export default function About() {
  const { theme } = useContext(themeContext);
  return (
    <div className={`about__wrapper ${theme}`}>
      <h1>Welcome to About Page!</h1>
      <h2>My name is Anatoly! Just made my pokemon search with react app!</h2>
      <div className={`rss__link-wrapper ${theme}`}>
        <Link href={'https://rs.school/'}>
          {' '}
          <Image src="..\src\assets\rslogo.png" alt="Rss scope" />
        </Link>
        <Link href={'/'}>GO HOME</Link>
      </div>
    </div>
  );
}
