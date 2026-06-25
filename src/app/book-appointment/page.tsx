import JsonLd from '@/components/JsonLd';
import { CmsPageProvider } from '@/components/CmsPageProvider';
import { fetchCmsPage } from '@/lib/cms-client';
import { buildPageMetadata } from '@/lib/seo';
import { buildBreadcrumbSchema } from '@/lib/structured-data';
import type { Metadata } from 'next';
import BookAppointmentClient from './BookAppointmentClient';

export async function generateMetadata(): Promise<Metadata> {
  const cmsPage = await fetchCmsPage('booking');
  return buildPageMetadata({
    title: cmsPage?.seo?.metaTitle || 'Book Appointment',
    description:
      cmsPage?.seo?.metaDescription ||
      'Request a salon appointment for hair styling, facial, nail art, bridal makeup, party makeup and beauty services.',
    path: '/book-appointment',
  });
}

export default async function BookAppointmentPage() {
  const cmsPage = await fetchCmsPage('booking');

  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Book Appointment', path: '/book-appointment' },
        ])}
      />
      <CmsPageProvider page={cmsPage}>
        <BookAppointmentClient />
      </CmsPageProvider>
    </>
  );
}
