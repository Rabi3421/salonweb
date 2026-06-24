import JsonLd from '@/components/JsonLd';
import { buildPageMetadata } from '@/lib/seo';
import { buildBreadcrumbSchema } from '@/lib/structured-data';
import BookAppointmentClient from './BookAppointmentClient';

export const metadata = buildPageMetadata({
  title: 'Book Appointment',
  description:
    'Request an appointment at Rosé Luxe Salon for hair styling, facial, nail art, bridal makeup, party makeup and premium salon services.',
  path: '/book-appointment',
});

export default function BookAppointmentPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Book Appointment', path: '/book-appointment' },
        ])}
      />
      <BookAppointmentClient />
    </>
  );
}
