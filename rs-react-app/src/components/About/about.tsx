import Link from 'next/link';
import './about.css';
import { useContext } from 'react';
import { themeContext } from '../../util/context';
import Image from 'next/image';
import '../../colors.css';
import rsImage from '../../public/rslogo.png';
import { useTranslations } from 'next-intl';

export default function About() {
  const { theme } = useContext(themeContext);
  const t = useTranslations();
  return (
    <div className={`about__wrapper ${theme}`}>
      <h1>{t('About.welcome')}</h1>
      <h2>{t('About.name')}</h2>
      <div className={`rss__link-wrapper ${theme}`}>
        <Link href={'https://rs.school/'}>
          {' '}
          <Image src={rsImage} alt="Rss scope" width={100} height={100} />
        </Link>
        <Link href={'/'}>{t('About.home')}</Link>
      </div>
    </div>
  );
}
