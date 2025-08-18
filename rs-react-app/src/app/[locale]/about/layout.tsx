import { useTranslations } from 'next-intl';
import AboutPage from './page';
import { Suspense } from 'react';

function LoadingFallback() {
  // const t = useTranslations('search');

  return <div>...loading</div>;
}

export default function layoutAbout() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AboutPage />
    </Suspense>
  );
}
