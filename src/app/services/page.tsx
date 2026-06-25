import JsonLd from '@/components/JsonLd';
import { getPublicSiteDataAsync } from '@/lib/public-site-data';
import { buildPageMetadata } from '@/lib/seo';
import { buildBreadcrumbSchema, buildServiceSchema } from '@/lib/structured-data';
import ServicesClient from './ServicesClient';

export const metadata = buildPageMetadata({
  title: 'Salon Services & Pricing',
  description:
    'Explore premium salon services and pricing for hair styling, hair spa, facial treatment, manicure, pedicure, nail art, bridal makeup and party makeup.',
  path: '/services',
});

export default async function ServicesPage() {
  const data = await getPublicSiteDataAsync();

  return (
    <>
      <JsonLd data={buildServiceSchema(data)} />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
        ])}
      />
      <ServicesClient />
    </>
  );
}
