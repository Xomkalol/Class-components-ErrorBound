import { useTranslations } from 'next-intl';
import { Suspense } from 'react';
import Client from './client';

function LoadingFallback() {
  // const t = useTranslations('search');

  return <div>...loading</div>;
}

async function HomePageContent() {
  return <Client />;
}

export default function HomePage() {
  //  const t = useTranslations('HomePage');
  return (
    <Suspense fallback={<LoadingFallback />}>
      <HomePageContent />
    </Suspense>
  );
}
