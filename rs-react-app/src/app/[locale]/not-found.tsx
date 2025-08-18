'use client';

import { useTranslations, useLocale } from 'next-intl';

import { useRouter } from '../../i18n/navigation';

export default function Error404() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();

  const returnHome = () => {
    router.push('/', { locale: locale });
  };

  return (
    <div>
      Error 404
      <button onClick={returnHome}></button>
    </div>
  );
}
