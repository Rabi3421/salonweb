import JsonLd from '@/components/JsonLd';
import PolicyPage from '@/components/PolicyPage';
import { buildPageMetadata } from '@/lib/seo';
import { buildBreadcrumbSchema } from '@/lib/structured-data';

export const metadata = buildPageMetadata({
  title: 'Cancellation Policy',
  description:
    'Read appointment cancellation, rescheduling, late arrival and package booking policy for Rosé Luxe Salon.',
  path: '/cancellation-policy',
});

const sections = [
  {
    title: 'Appointment Confirmation',
    content:
      'Online appointment submissions are requests, not confirmed bookings. Your appointment is confirmed only after our team contacts you by call or WhatsApp.',
  },
  {
    title: 'Cancellation Notice',
    content:
      'If you need to cancel your appointment, please inform us at least 2 hours before your scheduled time by call or WhatsApp. This allows us to offer the slot to other clients.',
  },
  {
    title: 'Rescheduling',
    content:
      'Rescheduling is available subject to slot availability. Please contact us as early as possible to adjust your appointment time.',
  },
  {
    title: 'Late Arrival',
    content:
      'If you are running late, please inform us immediately. We will try to accommodate you, but extended delays may require rescheduling to the next available slot.',
  },
  {
    title: 'No-Show',
    content:
      'If you miss your confirmed appointment without notice, it may affect future booking priority. We appreciate your understanding in keeping appointments.',
  },
  {
    title: 'Bridal & Package Bookings',
    content:
      'Bridal and package appointments may have specific cancellation and rescheduling policies due to advance preparation. These will be shared during your consultation.',
  },
  {
    title: 'Refund Note',
    content:
      'Refund policies for prepaid services or packages, if applicable, will be discussed during booking confirmation. Standard enquiry requests do not involve payments.',
  },
  {
    title: 'Contact For Changes',
    content:
      'For any appointment changes, cancellations, or questions, please reach out via our Contact page, call +91 98765 43210, or WhatsApp us.',
  },
];

export default function CancellationPolicyPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Cancellation Policy', path: '/cancellation-policy' },
        ])}
      />
      <PolicyPage
        eyebrow="Cancellation Policy"
        title="Cancellation & Rescheduling Policy"
        subtitle="Our policy for appointment cancellations, rescheduling, and late arrivals."
        lastUpdated="June 2026"
        notice="This policy is a sample template and should be reviewed by the salon owner before final publishing."
        sections={sections}
      />
    </>
  );
}
