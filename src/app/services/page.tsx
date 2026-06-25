import JsonLd from '@/components/JsonLd';
import { CmsPageProvider } from '@/components/CmsPageProvider';
import { getPublicSiteDataAsync } from '@/lib/public-site-data';
import { fetchCmsPage } from '@/lib/cms-client';
import { buildPageMetadata } from '@/lib/seo';
import { buildBreadcrumbSchema, buildServiceSchema } from '@/lib/structured-data';
import type { Metadata } from 'next';
import ServicesClient from './ServicesClient';

export async function generateMetadata(): Promise<Metadata> {
  const cmsPage = await fetchCmsPage('services');
  return buildPageMetadata({
    title: cmsPage?.seo?.metaTitle || 'Salon Services & Pricing',
    description:
      cmsPage?.seo?.metaDescription ||
      'Explore premium salon services and pricing for hair styling, hair spa, facial treatment, manicure, pedicure, nail art, bridal makeup and party makeup.',
    path: '/services',
  });
}

export default async function ServicesPage() {
  const [data, cmsPage] = await Promise.all([
    getPublicSiteDataAsync(),
    fetchCmsPage('services'),
  ]);

  return (
    <>
      <JsonLd data={buildServiceSchema(data)} />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
        ])}
      />
      <CmsPageProvider page={cmsPage}>
        <ServicesClient />
      </CmsPageProvider>
    </>
  );
}
